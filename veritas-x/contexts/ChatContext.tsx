'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { chatService, Conversation, Message } from '@/lib/chat';
import { useAuth } from './AuthContext';

interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isTyping: boolean;
}

interface ChatContextType extends ChatState {
  createNewConversation: () => Promise<void>;
  selectConversation: (conversationId: string) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  deleteConversation: (conversationId: string) => Promise<void>;
  searchConversations: (query: string) => Promise<Conversation[]>;
  clearError: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

type ChatAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'SET_CURRENT_CONVERSATION'; payload: Conversation | null }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'CLEAR_ERROR' };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };
    case 'SET_CURRENT_CONVERSATION':
      return { ...state, currentConversation: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState: ChatState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  error: null,
  isTyping: false,
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load conversations when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadConversations();
    }
  }, [isAuthenticated, user]);

  const loadConversations = async () => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const conversations = await chatService.getConversations(user.id);
      dispatch({ type: 'SET_CONVERSATIONS', payload: conversations });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load conversations';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createNewConversation = async () => {
    if (!user) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newConversation = await chatService.createConversation({
        title: 'New Chat',
        user_id: user.id,
      });

      dispatch({ type: 'SET_CONVERSATIONS', payload: [newConversation, ...state.conversations] });
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: newConversation });
      dispatch({ type: 'SET_MESSAGES', payload: [] });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create conversation';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const selectConversation = async (conversationId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const conversation = state.conversations.find(c => c.id === conversationId);
      
      if (!conversation) {
        throw new Error('Conversation not found');
      }

      const messages = await chatService.getMessages(conversationId);
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation });
      dispatch({ type: 'SET_MESSAGES', payload: messages });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load conversation';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const sendMessage = async (content: string) => {
    if (!user || !state.currentConversation) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Create user message
      const userMessage = await chatService.createMessage({
        conversation_id: state.currentConversation.id,
        role: 'user',
        content,
      });

      dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

      // Update conversation title if it's the first message and title is "New Chat"
      if (state.messages.length === 0 && state.currentConversation.title === 'New Chat') {
        const newTitle = chatService.generateTitle(content);
        await chatService.updateConversationTitle(state.currentConversation.id, newTitle);
        
        // Update local state
        const updatedConversation = { ...state.currentConversation, title: newTitle };
        dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: updatedConversation });
        
        // Update conversations list
        const updatedConversations = state.conversations.map(c => 
          c.id === state.currentConversation!.id ? updatedConversation : c
        );
        dispatch({ type: 'SET_CONVERSATIONS', payload: updatedConversations });
      }

      // TODO: Generate AI response (will implement in next step)
      dispatch({ type: 'SET_TYPING', payload: true });
      
      // Simulate AI response for now
      setTimeout(async () => {
        try {
          const assistantMessage = await chatService.createMessage({
            conversation_id: state.currentConversation!.id,
            role: 'assistant',
            content: 'This is a placeholder response. AI integration will be added in the next phase.',
          });

          dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
        } catch (error) {
          console.error('Failed to create assistant message:', error);
        } finally {
          dispatch({ type: 'SET_TYPING', payload: false });
        }
      }, 1000);

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message';
      dispatch({ type: 'SET_ERROR', payload: message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      await chatService.deleteConversation(conversationId);
      
      const updatedConversations = state.conversations.filter(c => c.id !== conversationId);
      dispatch({ type: 'SET_CONVERSATIONS', payload: updatedConversations });
      
      // If deleted conversation was current, clear current conversation
      if (state.currentConversation?.id === conversationId) {
        dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: null });
        dispatch({ type: 'SET_MESSAGES', payload: [] });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete conversation';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const searchConversations = async (query: string): Promise<Conversation[]> => {
    if (!user) return [];

    try {
      return await chatService.searchConversations(user.id, query);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to search conversations';
      dispatch({ type: 'SET_ERROR', payload: message });
      return [];
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: ChatContextType = {
    ...state,
    createNewConversation,
    selectConversation,
    sendMessage,
    deleteConversation,
    searchConversations,
    clearError,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

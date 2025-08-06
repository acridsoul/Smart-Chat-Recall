import { supabase } from './supabase';

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface CreateConversationData {
  title: string;
  user_id: string;
}

export interface CreateMessageData {
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const chatService = {
  // Get all conversations for a user
  async getConversations(userId: string): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch conversations: ${error.message}`);
    }

    return data || [];
  },

  // Create a new conversation
  async createConversation(conversationData: CreateConversationData): Promise<Conversation> {
    const { data, error } = await supabase
      .from('conversations')
      .insert(conversationData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create conversation: ${error.message}`);
    }

    return data;
  },

  // Get messages for a conversation
  async getMessages(conversationId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch messages: ${error.message}`);
    }

    return data || [];
  },

  // Create a new message
  async createMessage(messageData: CreateMessageData): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert(messageData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create message: ${error.message}`);
    }

    // Update conversation's updated_at timestamp
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', messageData.conversation_id);

    return data;
  },

  // Delete a conversation and all its messages
  async deleteConversation(conversationId: string): Promise<void> {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId);

    if (error) {
      throw new Error(`Failed to delete conversation: ${error.message}`);
    }
  },

  // Update conversation title
  async updateConversationTitle(conversationId: string, title: string): Promise<void> {
    const { error } = await supabase
      .from('conversations')
      .update({ title })
      .eq('id', conversationId);

    if (error) {
      throw new Error(`Failed to update conversation title: ${error.message}`);
    }
  },

  // Generate conversation title from first message
  generateTitle(firstMessage: string): string {
    // Take first 50 characters and clean up
    const title = firstMessage
      .substring(0, 50)
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    return title.length < firstMessage.length ? `${title}...` : title;
  },

  // Search conversations by title
  async searchConversations(userId: string, query: string): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .ilike('title', `%${query}%`)
      .order('updated_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to search conversations: ${error.message}`);
    }

    return data || [];
  }
};

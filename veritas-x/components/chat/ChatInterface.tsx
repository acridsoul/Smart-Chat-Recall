'use client';

import React, { useEffect, useRef } from 'react';
import { useChat } from '@/contexts/ChatContext';
import ChatMessage, { TypingIndicator } from './ChatMessage';
import ChatInput from './ChatInput';
import { ChatBubbleLeftRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ChatInterfaceProps {
  className?: string;
}

export default function ChatInterface({ className }: ChatInterfaceProps) {
  const {
    currentConversation,
    messages,
    isLoading,
    isTyping,
    error,
    clearError,
    createNewConversation,
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Clear error when component unmounts or conversation changes
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [currentConversation?.id, clearError]);

  const handleStartNewChat = () => {
    createNewConversation();
  };

  // Empty state when no conversation is selected
  if (!currentConversation) {
    return (
      <div className={`flex flex-col h-full bg-white ${className}`}>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-3xl font-normal text-gray-800 mb-8">
              What can I help with ?
            </h2>
            <button
              onClick={handleStartNewChat}
              className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-normal rounded-lg transition-colors"
            >
              Start New Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-white ${className}`}>
      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 text-sm flex-1">{error}</p>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Chat Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-lg font-medium text-gray-900 truncate">
            {currentConversation.title}
          </h1>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.length === 0 ? (
          // Empty conversation state
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md mx-auto px-4">
              <h3 className="text-2xl font-normal text-gray-800 mb-4">
                What can I help with ?
              </h3>
              <p className="text-gray-600 text-sm">
                Send a message to begin chatting with the assistant.
              </p>
            </div>
          </div>
        ) : (
          // Messages list
          <div>
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
              />
            ))}
            
            {/* Typing indicator */}
            {isTyping && <TypingIndicator />}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput />
    </div>
  );
}

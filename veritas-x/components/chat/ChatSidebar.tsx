'use client';

import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Conversation } from '@/lib/chat';
import { PlusIcon, MagnifyingGlassIcon, TrashIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface ChatSidebarProps {
  className?: string;
}

export default function ChatSidebar({ className }: ChatSidebarProps) {
  const {
    conversations,
    currentConversation,
    isLoading,
    createNewConversation,
    selectConversation,
    deleteConversation,
    searchConversations,
  } = useChat();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Conversation[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const displayConversations = searchQuery ? searchResults : conversations;

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchConversations(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDeleteConversation = async (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this conversation?')) {
      await deleteConversation(conversationId);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

      if (diffInDays === 0) {
        return format(date, 'HH:mm');
      } else if (diffInDays === 1) {
        return 'Yesterday';
      } else if (diffInDays < 7) {
        return format(date, 'EEEE');
      } else {
        return format(date, 'MMM d');
      }
    } catch (error) {
      return '';
    }
  };

  return (
    <div className={`flex flex-col h-full bg-black text-white ${className}`}>
      {/* Header with New Chat Button */}
      <div className="p-3 border-b border-gray-800">
        <button
          onClick={createNewConversation}
          disabled={isLoading}
          className="w-full flex items-center justify-start gap-3 px-3 py-2.5 bg-transparent hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-left"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="font-normal text-sm">New chat</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-gray-800">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm placeholder-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-3 w-3 border border-gray-400 border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {displayConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <ChatBubbleLeftIcon className="w-6 h-6 mb-2" />
            <p className="text-xs text-center">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </p>
          </div>
        ) : (
          <div className="py-2">
            {displayConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => selectConversation(conversation.id)}
                className={`group relative flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg cursor-pointer transition-colors ${
                  currentConversation?.id === conversation.id
                    ? 'bg-gray-800'
                    : 'hover:bg-gray-900'
                }`}
              >
                <ChatBubbleLeftIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-normal truncate text-white">
                    {conversation.title}
                  </h3>
                </div>
                
                {/* Delete button - visible on hover */}
                <button
                  onClick={(e) => handleDeleteConversation(e, conversation.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all flex-shrink-0"
                  title="Delete conversation"
                >
                  <TrashIcon className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800">
        <div className="text-xs text-gray-500 text-center">
          {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}

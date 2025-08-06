'use client';

import React from 'react';
import { Message } from '@/lib/chat';
import { UserIcon, CpuChipIcon } from '@heroicons/react/24/outline';

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export default function ChatMessage({ message, isTyping = false }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`group w-full ${isUser ? 'bg-transparent' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-black text-white' 
              : 'bg-gray-600 text-white'
          }`}>
            {isUser ? (
              <UserIcon className="w-5 h-5" />
            ) : (
              <CpuChipIcon className="w-5 h-5" />
            )}
          </div>

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-900">
                {isUser ? 'You' : 'Assistant'}
              </span>
            </div>

            <div className="prose prose-sm max-w-none">
              {isTyping ? (
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {message.content}
                </div>
              )}
            </div>

            {/* Message Actions (visible on hover) */}
            {!isTyping && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-3">
                <div className="flex gap-2">
                  <button
                    className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                    onClick={() => navigator.clipboard.writeText(message.content)}
                  >
                    Copy
                  </button>
                  {!isUser && (
                    <button
                      className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                      onClick={() => {
                        // TODO: Implement regenerate response
                        console.log('Regenerate response for message:', message.id);
                      }}
                    >
                      Regenerate
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Typing indicator component for when assistant is responding
export function TypingIndicator() {
  return (
    <div className="w-full bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center">
            <CpuChipIcon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-900">Assistant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

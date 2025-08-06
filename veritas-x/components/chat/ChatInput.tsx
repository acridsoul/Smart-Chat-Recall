'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useChat } from '@/contexts/ChatContext';

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Ask anything"
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isLoading, isTyping } = useChat();

  const isDisabled = disabled || isLoading || isTyping;

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [message]);

  // Focus textarea on mount
  useEffect(() => {
    if (textareaRef.current && !isDisabled) {
      textareaRef.current.focus();
    }
  }, [isDisabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || isDisabled || isComposing) return;

    const messageToSend = message.trim();
    setMessage('');

    try {
      if (onSendMessage) {
        onSendMessage(messageToSend);
      } else {
        await sendMessage(messageToSend);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Restore message on error
      setMessage(messageToSend);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      } else {
        // Send message with Enter
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3 p-4 border border-gray-300 rounded-2xl bg-white hover:border-gray-400 focus-within:border-gray-500 transition-all shadow-sm">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder={placeholder}
              disabled={isDisabled}
              rows={1}
              className="flex-1 resize-none border-0 bg-transparent placeholder-gray-500 focus:outline-none focus:ring-0 text-gray-900 disabled:opacity-50"
              style={{ 
                minHeight: '24px',
                maxHeight: '200px'
              }}
            />
            
            <button
              type="submit"
              disabled={!message.trim() || isDisabled || isComposing}
              className={`flex-shrink-0 p-2 rounded-full transition-colors ${
                message.trim() && !isDisabled && !isComposing
                  ? 'bg-black hover:bg-gray-800 text-white' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              title={isLoading ? 'Sending...' : 'Send message'}
            >
              {isLoading ? (
                <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <PaperAirplaneIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

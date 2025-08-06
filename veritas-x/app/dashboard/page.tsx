'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatInterface from '@/components/chat/ChatInterface';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent animate-spin rounded-full mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <h1 className="font-medium text-gray-900 text-base">Veritas Chat</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {user.name}
          </span>
          <Link 
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Chat Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <ChatSidebar />
        </div>
        
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}

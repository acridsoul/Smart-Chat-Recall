'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = async () => {
    console.log('Logout button clicked');
    try {
      console.log('Calling logout...');
      await logout();
      console.log('Logout successful, redirecting to home...');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent animate-spin rounded-full mx-auto mb-4"></div>
          <p className="font-roboto text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-[#3549cb] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <h1 className="font-manrope font-extralight text-xl text-white">
              Veritas-X Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="font-roboto text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <button
              className="px-4 py-2 text-sm bg-transparent text-white border border-white hover:bg-white hover:text-black transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="font-manrope font-extralight text-5xl text-white mb-4">
            Welcome back, {user.name}!
          </h1>
          <p className="font-roboto text-xl text-gray-400 mb-8">
            Your journey to the future begins here.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 mb-8 max-w-2xl mx-auto">
          <h2 className="font-manrope font-extralight text-2xl text-white mb-6">
            Account Information
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-700">
              <span className="font-roboto text-gray-400">Name:</span>
              <div className="flex items-center space-x-3">
                {user.avatar_url && (
                  <img 
                    src={user.avatar_url} 
                    alt="Avatar" 
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span className="font-roboto text-white">{user.name}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-700">
              <span className="font-roboto text-gray-400">Email:</span>
              <span className="font-roboto text-white">{user.email}</span>
            </div>

            {user.provider && (
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="font-roboto text-gray-400">Sign-in method:</span>
                <div className="flex items-center space-x-2">
                  {user.provider === 'google' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  {user.provider === 'github' && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  <span className="font-roboto text-white capitalize">
                    {user.provider === 'email' ? 'Email/Password' : user.provider}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center py-3 border-b border-gray-700">
              <span className="font-roboto text-gray-400">Member since:</span>
              <span className="font-roboto text-white">
                {new Date(user.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="font-roboto text-gray-400">User ID:</span>
              <span className="font-roboto text-white font-mono text-sm">{user.id}</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-[#3549cb] transition-colors">
            <div className="w-12 h-12 bg-[#3549cb] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-manrope font-extralight text-xl text-white mb-2">Analytics</h3>
            <p className="font-roboto text-gray-400 text-sm">
              Track your progress and insights with detailed analytics.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-[#3549cb] transition-colors">
            <div className="w-12 h-12 bg-[#3549cb] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-manrope font-extralight text-xl text-white mb-2">Settings</h3>
            <p className="font-roboto text-gray-400 text-sm">
              Customize your experience and manage your preferences.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-[#3549cb] transition-colors">
            <div className="w-12 h-12 bg-[#3549cb] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-manrope font-extralight text-xl text-white mb-2">Support</h3>
            <p className="font-roboto text-gray-400 text-sm">
              Get help and support when you need it most.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="font-roboto text-gray-400 mb-6">
            Ready to explore what we can build together?
          </p>
          <div className="space-x-4">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-manrope font-extralight text-gray-400 text-sm">
            Veritas-X © 2025 - Designing experiences that move businesses to the future.
          </p>
        </div>
      </footer>
    </div>
  );
}

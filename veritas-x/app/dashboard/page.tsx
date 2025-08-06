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

  const handleLogout = () => {
    logout();
    router.push('/');
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
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
              <span className="font-roboto text-white">{user.name}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-700">
              <span className="font-roboto text-gray-400">Email:</span>
              <span className="font-roboto text-white">{user.email}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-700">
              <span className="font-roboto text-gray-400">Member since:</span>
              <span className="font-roboto text-white">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
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

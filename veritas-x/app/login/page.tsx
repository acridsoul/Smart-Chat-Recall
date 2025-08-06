'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/AuthForm';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import OAuthButtons from '@/components/OAuthButtons';
import { useAuth } from '@/contexts/AuthContext';
import { validateLoginForm } from '@/lib/validation';
import { FormErrors, LoginData } from '@/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError, isAuthenticated, setError } = useAuth();
  
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Handle URL parameters for messages and errors
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const errorParam = urlParams.get('error');
    
    if (message === 'email_confirmed') {
      setSuccessMessage('Email confirmed successfully! You can now sign in with your credentials.');
      // Clean URL
      window.history.replaceState({}, '', '/login');
    }
    
    if (errorParam) {
      let errorMessage = 'An error occurred. Please try again.';
      
      switch (errorParam) {
        case 'verification_failed':
          errorMessage = 'Email verification failed. Please check your email and try clicking the confirmation link again.';
          break;
        case 'session_failed':
          errorMessage = 'Failed to establish session. Please try signing in again.';
          break;
        case 'callback_failed':
          errorMessage = 'Authentication callback failed. Please try signing in again.';
          break;
        case 'no_session':
          errorMessage = 'No active session found. Please sign in to continue.';
          break;
        case 'callback_error':
          errorMessage = 'An error occurred during authentication. Please try again.';
          break;
        default:
          errorMessage = 'An authentication error occurred. Please try again.';
      }
      
      // Use the auth context to set the error
      clearError(); // Clear any existing errors first
      setError(errorMessage);
      
      // Clean URL
      window.history.replaceState({}, '', '/login');
    }
  }, [clearError, setError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear auth error
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateLoginForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await login(formData);
      // Redirect will happen automatically via useEffect
    } catch (err) {
      // Error handling is done in the auth context
    }
  };

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Sign in to your account"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      {/* Demo credentials info */}
      <div className="bg-gray-900 border border-gray-700 rounded p-4 mb-6">
        <p className="text-white font-manrope font-extralight text-sm mb-1">
          Demo Credentials:
        </p>
        <p className="text-gray-300 font-roboto text-xs">
          Email: demo@veritas-x.com
        </p>
        <p className="text-gray-300 font-roboto text-xs">
          Password: password123
        </p>
      </div>

      <Input
        type="email"
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange}
        error={formErrors.email}
        required
      />

      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInputChange}
        error={formErrors.password}
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4 bg-black border border-white rounded focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          />
          <span className="ml-2 text-sm font-roboto text-gray-300">
            Remember me
          </span>
        </label>
        
        <Link 
          href="/forgot-password" 
          className="text-sm font-roboto text-[#3549cb] hover:text-[#2938a5] transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {successMessage && (
        <div className="bg-green-900 border border-green-500 text-green-200 px-4 py-3 rounded">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="font-roboto text-sm">{successMessage}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded">
          <p className="font-roboto text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
      >
        Sign In
      </Button>

      <OAuthButtons mode="login" />

      <div className="text-center">
        <p className="font-roboto text-gray-400">
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            className="text-[#3549cb] hover:text-[#2938a5] transition-colors font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>

      <div className="text-center">
        <Link 
          href="/" 
          className="text-gray-400 hover:text-white transition-colors font-roboto text-sm"
        >
          ← Back to home
        </Link>
      </div>
    </AuthForm>
  );
}

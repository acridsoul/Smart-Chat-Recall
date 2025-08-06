'use client';

import React from 'react';
import { Button } from './Button';

interface EmailConfirmationModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
  onResendEmail?: () => void;
  isResending?: boolean;
}

export function EmailConfirmationModal({ 
  email, 
  isOpen, 
  onClose, 
  onResendEmail,
  isResending = false 
}: EmailConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center px-4 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
          
          <h2 className="font-manrope font-light text-2xl text-white mb-2">
            Check Your Email
          </h2>
          
          <p className="font-roboto text-gray-300 text-sm">
            We've sent a confirmation link to:
          </p>
          <p className="font-roboto text-white font-medium mt-1">
            {email}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 border border-gray-600 rounded p-4">
            <p className="font-roboto text-gray-300 text-sm leading-relaxed">
              Please check your email and click the confirmation link to complete your account setup. 
              The link will expire in 24 hours.
            </p>
          </div>

          <div className="bg-yellow-900 border border-yellow-600 rounded p-4">
            <p className="font-roboto text-yellow-200 text-sm">
              <span className="font-medium">Can't find the email?</span> Check your spam folder 
              or try resending the confirmation email.
            </p>
          </div>

          <div className="flex space-x-3">
            {onResendEmail && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onResendEmail}
                isLoading={isResending}
                className="flex-1"
              >
                Resend Email
              </Button>
            )}
            
            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
              className="flex-1"
            >
              Got It
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="font-roboto text-gray-400 text-xs">
              Once confirmed, you'll be able to sign in to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

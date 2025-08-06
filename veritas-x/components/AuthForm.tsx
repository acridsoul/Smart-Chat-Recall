import React from 'react';

interface AuthFormProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export function AuthForm({ 
  title, 
  subtitle, 
  children, 
  onSubmit, 
  isLoading = false 
}: AuthFormProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-manrope font-extralight text-4xl text-white mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="font-roboto text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          {children}
        </form>
      </div>
    </div>
  );
}

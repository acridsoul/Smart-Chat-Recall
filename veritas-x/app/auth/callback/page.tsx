'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { EmailOtpType } from '@supabase/supabase-js';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check URL parameters to determine the type of callback
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type') as EmailOtpType | null;
        const tokenHash = urlParams.get('token_hash');
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');
        
        // Handle email confirmation callback
        if (tokenHash && type === 'email') {
          // This is email confirmation - verify OTP but don't auto-login
          const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash: tokenHash,
          });
          
          if (error) {
            console.error('Email verification error:', error);
            router.push('/login?error=verification_failed');
          } else {
            // Email verified successfully, redirect to login with success message
            router.push('/login?message=email_confirmed');
          }
          return;
        }
        
        // Handle OAuth callback with access/refresh tokens
        if (accessToken && refreshToken) {
          // This is OAuth login - proceed with authentication
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (error) {
            console.error('OAuth session setup error:', error);
            router.push('/login?error=session_failed');
          } else {
            router.push('/dashboard');
          }
          return;
        }
        
        // Handle PKCE callback (implicit flow)
        // Check if Supabase detected a session from URL
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/login?error=callback_failed');
          return;
        }

        if (session) {
          // Session exists - this is likely OAuth or magic link
          router.push('/dashboard');
        } else {
          // No session found, redirect to login
          router.push('/login?error=no_session');
        }
      } catch (error) {
        console.error('Callback handling error:', error);
        router.push('/login?error=callback_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B1B1B] mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

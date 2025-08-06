'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/AuthForm';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import OAuthButtons from '@/components/OAuthButtons';
import { EmailConfirmationModal } from '@/components/EmailConfirmationModal';
import { useAuth } from '@/contexts/AuthContext';
import { validateSignupForm, getPasswordStrength } from '@/lib/validation';
import { FormErrors, SignupData } from '@/lib/types';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading, error, clearError, isAuthenticated, resendConfirmation } = useAuth();
  
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [isResendingEmail, setIsResendingEmail] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Update password strength when password changes
  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(getPasswordStrength(formData.password));
    } else {
      setPasswordStrength({ score: 0, text: '', color: '' });
    }
  }, [formData.password]);

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
    const errors = validateSignupForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const result = await signup(formData);
      
      // Check if email confirmation is needed
      if (result.needsConfirmation && result.email) {
        setConfirmationEmail(result.email);
        setShowConfirmationModal(true);
      }
      // If no confirmation needed, the AuthContext will handle the redirect
    } catch (err) {
      // Error handling is done in the auth context
    }
  };

  const handleResendEmail = async () => {
    if (!confirmationEmail) return;
    
    setIsResendingEmail(true);
    try {
      await resendConfirmation(confirmationEmail);
    } catch (error) {
      console.error('Failed to resend confirmation email:', error);
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
    // Redirect to login page after closing modal
    router.push('/login');
  };

  return (
    <>
      <AuthForm
        title="Create Account"
        subtitle="Join us and start your journey"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
      <Input
        type="text"
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleInputChange}
        error={formErrors.name}
        required
      />

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

      <div>
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          error={formErrors.password}
          required
        />
        {formData.password && passwordStrength.text && (
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-roboto text-gray-400">
                Password strength:
              </span>
              <span 
                className="text-sm font-roboto font-medium"
                style={{ color: passwordStrength.color }}
              >
                {passwordStrength.text}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(passwordStrength.score / 5) * 100}%`,
                  backgroundColor: passwordStrength.color
                }}
              />
            </div>
          </div>
        )}
      </div>

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={formErrors.confirmPassword}
        required
      />

      <div>
        <label className="flex items-start">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className="w-4 h-4 bg-black border border-white rounded focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black mt-1 mr-3 flex-shrink-0"
          />
          <span className="text-sm font-roboto text-gray-300 leading-relaxed">
            I agree to the{' '}
            <Link href="/terms" className="text-[#3549cb] hover:text-[#2938a5] transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#3549cb] hover:text-[#2938a5] transition-colors">
              Privacy Policy
            </Link>
          </span>
        </label>
        {formErrors.acceptTerms && (
          <p className="mt-1 text-sm text-red-500 font-roboto ml-7">
            {formErrors.acceptTerms}
          </p>
        )}
      </div>

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
        Create Account
      </Button>

      <OAuthButtons mode="signup" />

      <div className="text-center">
        <p className="font-roboto text-gray-400">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="text-[#3549cb] hover:text-[#2938a5] transition-colors font-medium"
          >
            Sign in
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

      <EmailConfirmationModal
        email={confirmationEmail}
        isOpen={showConfirmationModal}
        onClose={handleCloseModal}
        onResendEmail={handleResendEmail}
        isResending={isResendingEmail}
      />
    </>
  );
}

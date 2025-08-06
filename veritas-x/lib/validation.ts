import { FormErrors, LoginData, SignupData } from './types';

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters long';
  if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters long';
  if (name.length > 50) return 'Name must be less than 50 characters';
  return null;
};

export const validateLoginForm = (data: LoginData): FormErrors => {
  const errors: FormErrors = {};
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  if (!data.password) errors.password = 'Password is required';
  
  return errors;
};

export const validateSignupForm = (data: SignupData): FormErrors => {
  const errors: FormErrors = {};
  
  const nameError = validateName(data.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateEmail(data.email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(data.password);
  if (passwordError) errors.password = passwordError;
  
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (!data.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms and conditions';
  }
  
  return errors;
};

export const getPasswordStrength = (password: string): { score: number; text: string; color: string } => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z\d]/.test(password)) score++;
  
  if (score <= 2) return { score, text: 'Weak', color: '#ef4444' };
  if (score <= 3) return { score, text: 'Fair', color: '#f59e0b' };
  if (score <= 4) return { score, text: 'Good', color: '#10b981' };
  return { score, text: 'Strong', color: '#059669' };
};

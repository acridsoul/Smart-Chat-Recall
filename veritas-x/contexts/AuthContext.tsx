'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginData, SignupData } from '@/lib/types';
import { authService } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<{ needsConfirmation?: boolean; email?: string }>;
  oauthLogin: (provider: 'google' | 'github') => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setError: (error: string) => void;
  resendConfirmation: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        isLoading: false, 
        error: null 
      };
    case 'LOGOUT':
      return { 
        user: null, 
        isAuthenticated: false, 
        isLoading: false, 
        error: null 
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing authentication on mount and set up auth listener
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authService.getCurrentSession();
        if (session?.user) {
          dispatch({ type: 'SET_USER', payload: session.user });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      dispatch({ type: 'SET_USER', payload: user });
    });

    checkAuth();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (data: LoginData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const { user } = await authService.login(data);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const signup = async (data: SignupData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const result = await authService.signup(data);
      
      // Check if email confirmation is needed
      if ('needsConfirmation' in result) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { needsConfirmation: true, email: result.email };
      } else {
        // Normal signup with immediate session
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.user });
        return {};
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      dispatch({ type: 'SET_ERROR', payload: message });
      return {};
    }
  };

  const oauthLogin = async (provider: 'google' | 'github') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      // OAuth will redirect, so we don't get immediate user data
      await authService.oauthLogin(provider);
      // The auth state change listener will handle the user update after redirect
    } catch (error) {
      const message = error instanceof Error ? error.message : `${provider} login failed`;
      // Only show error if it's not the expected OAuth redirect
      if (!message.includes('OAuth redirect initiated')) {
        dispatch({ type: 'SET_ERROR', payload: message });
      }
    }
  };

  const logout = async () => {
    try {
      console.log('AuthContext logout called');
      await authService.logout();
      console.log('AuthService logout successful');
      dispatch({ type: 'LOGOUT' });
      console.log('Logout state updated');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if signOut fails, clear local state to ensure UI updates
      console.log('Clearing local auth state due to logout error');
      dispatch({ type: 'LOGOUT' });
      // Don't re-throw the error - we want to proceed with logout even if server signOut fails
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const setError = (error: string) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const resendConfirmation = async (email: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      await authService.resendConfirmation(email);
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to resend confirmation email';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    oauthLogin,
    logout,
    clearError,
    setError,
    resendConfirmation,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

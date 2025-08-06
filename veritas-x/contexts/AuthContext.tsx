'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, LoginData, SignupData } from '@/lib/types';
import { authService } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  oauthLogin: (provider: 'google' | 'github') => Promise<void>;
  logout: () => void;
  clearError: () => void;
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

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        if (authService.isAuthenticated()) {
          const user = authService.getCurrentUser();
          if (user) {
            dispatch({ type: 'SET_USER', payload: user });
          } else {
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (data: LoginData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const { user, token } = await authService.login(data);
      authService.storeAuthData(user, token);
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
      const { user, token } = await authService.signup(data);
      authService.storeAuthData(user, token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const oauthLogin = async (provider: 'google' | 'github') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const { user, token } = await authService.oauthLogin(provider);
      authService.storeAuthData(user, token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      const message = error instanceof Error ? error.message : `${provider} login failed`;
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    oauthLogin,
    logout,
    clearError,
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

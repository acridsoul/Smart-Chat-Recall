import { User, LoginData, SignupData } from './types';
import { supabase } from './supabase';

// Helper function to convert Supabase user to our User type
const mapSupabaseUser = async (supabaseUser: any, profile?: any): Promise<User> => {
  // Get profile data if not provided
  if (!profile && supabaseUser) {
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();
    profile = profileData;
  }

  return {
    id: supabaseUser.id,
    name: profile?.name || supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
    email: supabaseUser.email,
    avatar_url: profile?.avatar_url || supabaseUser.user_metadata?.avatar_url,
    provider: (profile?.provider || 'email') as 'email' | 'google' | 'github',
    created_at: profile?.created_at || supabaseUser.created_at,
    updated_at: profile?.updated_at
  };
};

export const authService = {
  // Login function
  async login(data: LoginData): Promise<{ user: User; token: string }> {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!authData.user) {
      throw new Error('Login failed - no user returned');
    }

    const user = await mapSupabaseUser(authData.user);
    const token = authData.session?.access_token || '';

    return { user, token };
  },

  // OAuth Login function
  async oauthLogin(provider: 'google' | 'github'): Promise<{ user: User; token: string }> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      throw new Error(`${provider} authentication failed: ${error.message}`);
    }

    // For OAuth, we need to handle the redirect flow
    // The actual user data will be available after the redirect
    // This is a placeholder - the real flow happens via redirect
    throw new Error('OAuth redirect initiated');
  },

  // Signup function
  async signup(data: SignupData): Promise<{ user: User; token: string }> {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
          name: data.name,
        },
      },
    });

    if (error) {
      console.error('Signup error:', error);
      throw new Error(error.message);
    }

    if (!authData.user) {
      throw new Error('Signup failed - no user returned');
    }

    // Handle different signup scenarios
    if (!authData.session) {
      // Email confirmation is required
      if (authData.user && !authData.user.email_confirmed_at) {
        // For now, we'll create a mock user for UI purposes
        // In a real app, you'd show a "check your email" message
        const tempUser: User = {
          id: authData.user.id,
          name: data.name,
          email: data.email,
          avatar_url: null,
          provider: 'email',
          created_at: authData.user.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        return { 
          user: tempUser, 
          token: 'temp-token-awaiting-confirmation' 
        };
      } else {
        throw new Error('Signup completed but no session created. Please try logging in.');
      }
    }

    // Normal signup with immediate session
    const user = await mapSupabaseUser(authData.user);
    const token = authData.session?.access_token || '';

    return { user, token };
  },

  // Get current session
  async getCurrentSession(): Promise<{ user: User; token: string } | null> {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session || !session.user) {
      return null;
    }

    const user = await mapSupabaseUser(session.user);
    return { user, token: session.access_token };
  },

  // Logout function
  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  },

  // Get current user from session
  async getCurrentUser(): Promise<User | null> {
    const session = await this.getCurrentSession();
    return session?.user || null;
  },

  // Storage functions (keeping interface compatibility)
  storeAuthData(user: User, token: string): void {
    // Supabase handles session storage automatically
    // This is kept for interface compatibility
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getCurrentSession();
    return session !== null;
  },

  // Verify token
  async verifyToken(token: string): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return null;
    }

    return await mapSupabaseUser(user);
  },

  // Auth state change listener
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await mapSupabaseUser(session.user);
        callback(user);
      } else {
        callback(null);
      }
    });
  },
};

import { User, LoginData, SignupData } from './types';

const AUTH_STORAGE_KEY = 'veritas-auth';

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database (in a real app, this would be handled by your backend)
let mockUsers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@veritas-x.com',
    createdAt: new Date().toISOString(),
  }
];

export const authService = {
  // Login function
  async login(data: LoginData): Promise<{ user: User; token: string }> {
    await delay(1000); // Simulate API delay
    
    // Find user by email
    const user = mockUsers.find(u => u.email === data.email);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // In a real app, you'd verify the password hash
    // For demo purposes, we'll accept any password for existing users
    // or the password "password123" for demo@veritas-x.com
    if (data.email === 'demo@veritas-x.com' && data.password !== 'password123') {
      throw new Error('Invalid email or password');
    }
    
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;
    
    return { user, token };
  },

  // Signup function
  async signup(data: SignupData): Promise<{ user: User; token: string }> {
    await delay(1000); // Simulate API delay
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      createdAt: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`;
    
    return { user: newUser, token };
  },

  // Logout function
  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  // Get current user from storage
  getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const { user } = JSON.parse(stored);
        return user;
      }
    } catch (error) {
      console.error('Error getting current user:', error);
    }
    return null;
  },

  // Store auth data
  storeAuthData(user: User, token: string): void {
    const authData = { user, token, timestamp: Date.now() };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const { timestamp } = JSON.parse(stored);
        const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
        return Date.now() - timestamp < ONE_WEEK;
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
    return false;
  },

  // Verify token (mock implementation)
  async verifyToken(token: string): Promise<User | null> {
    await delay(500);
    
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const { user, token: storedToken } = JSON.parse(stored);
        if (token === storedToken) {
          return user;
        }
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
    
    return null;
  }
};

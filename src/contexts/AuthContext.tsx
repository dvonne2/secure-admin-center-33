import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, LoginCredentials, ActivityLog } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    username: 'superadmin',
    email: 'superadmin@company.com',
    role: 'superadmin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-06-19T10:00:00Z'
  },
  {
    id: '2',
    username: 'admin',
    email: 'admin@company.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    lastLogin: '2024-06-19T09:30:00Z'
  },
  {
    id: '3',
    username: 'manager',
    email: 'manager@company.com',
    role: 'manager',
    status: 'active',
    createdAt: '2024-01-03T00:00:00Z',
    lastLogin: '2024-06-19T09:00:00Z'
  },
  {
    id: '4',
    username: 'user',
    email: 'user@company.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-04T00:00:00Z',
    lastLogin: '2024-06-19T08:30:00Z'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('rbac_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user (password is same as username for demo)
    const foundUser = mockUsers.find(
      u => u.username === credentials.username && 
           credentials.password === credentials.username && 
           u.status === 'active'
    );
    
    if (foundUser) {
      const updatedUser = { ...foundUser, lastLogin: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('rbac_user', JSON.stringify(updatedUser));
      
      // Log the activity
      logActivity(updatedUser.id, updatedUser.username, 'User logged in');
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${updatedUser.username}!`,
      });
      
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials or inactive account",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    if (user) {
      logActivity(user.id, user.username, 'User logged out');
    }
    setUser(null);
    localStorage.removeItem('rbac_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const logActivity = (userId: string, username: string, action: string) => {
    const activity: ActivityLog = {
      id: Date.now().toString(),
      userId,
      username,
      action,
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.100', // Mock IP
      userAgent: navigator.userAgent
    };
    
    const existingLogs = JSON.parse(localStorage.getItem('rbac_activity_logs') || '[]');
    existingLogs.unshift(activity);
    
    // Keep only last 100 logs
    if (existingLogs.length > 100) {
      existingLogs.splice(100);
    }
    
    localStorage.setItem('rbac_activity_logs', JSON.stringify(existingLogs));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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

// Mock users for login hints (remove in production)
export { mockUsers };

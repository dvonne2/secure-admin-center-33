
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'superadmin' | 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  username: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

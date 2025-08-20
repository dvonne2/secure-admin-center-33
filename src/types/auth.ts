
export type Role = "admin" | "user" | "guest" | "superadmin" | "manager";

export interface User {
  id: string;
  username?: string;
  name: string;
  email: string;
  role: Role;
  business_role?: BusinessRole;
  permissions?: string[];
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
}

export type BusinessRole = 
  | 'kyc' 
  | 'systemforce_academy' 
  | 'production' 
  | 'inventory' 
  | 'telesales' 
  | 'delivery_agent' 
  | 'accountant' 
  | 'cfo' 
  | 'cfo_chief'
  | 'business_analysis'
  | 'manager'
  | 'ceo' 
  | 'hr' 
  | 'manufacturing' 
  | 'media_buyer' 
  | 'investor';

export interface LoginCredentials {
  username: string;
  email: string;
  password: string;
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

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

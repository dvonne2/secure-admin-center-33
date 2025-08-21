
export type UserRole = 
  | "production"
  | "inventory" 
  | "telesales"
  | "delivery_agent"
  | "accountant"
  | "cfo"
  | "ceo"
  | "hr"
  | "manufacturing"
  | "media_buyer"
  | "investor"
  | "manager"
  | "user"
  | "superadmin"
  | "admin"
  | "kyc"
  | "systemforce_academy";

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  role: UserRole;
  avatar?: string;
  status?: "active" | "inactive" | "pending";
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  username?: string;
  action: string;
  details?: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

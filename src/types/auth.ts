
export type User = {
  id: string;
  email: string;
  name: string;
  role: 'production' | 'inventory' | 'telesales' | 'delivery_agent' | 'accountant' | 'cfo' | 'ceo' | 'hr' | 'manufacturing' | 'media_buyer' | 'investor' | 'manager' | 'user' | 'superadmin' | 'admin' | 'kyc' | 'systemforce_academy';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

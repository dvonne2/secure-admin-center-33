
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'superadmin' | 'admin' | 'manager' | 'user' | 'kyc' | 'systemforce_academy' | 'production' | 'inventory' | 'telesales' | 'delivery_agent' | 'accountant' | 'cfo' | 'ceo' | 'hr' | 'manufacturing' | 'media_buyer' | 'investor';
  status: 'active' | 'inactive' | 'suspended';
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

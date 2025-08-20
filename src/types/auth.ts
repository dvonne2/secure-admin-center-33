export type Role = "admin" | "user" | "guest";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  business_role?: BusinessRole;
  permissions?: string[];
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

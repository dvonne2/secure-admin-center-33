
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BusinessRole } from '@/types/auth';
import MainLayout from '@/components/MainLayout';

interface BusinessRoleLayoutProps {
  children: React.ReactNode;
  allowedBusinessRoles: (BusinessRole | 'superadmin')[];
}

export function BusinessRoleLayout({ children, allowedBusinessRoles }: BusinessRoleLayoutProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = user.role === 'superadmin' || 
    (user.business_role && allowedBusinessRoles.includes(user.business_role)) ||
    allowedBusinessRoles.includes('superadmin');

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}

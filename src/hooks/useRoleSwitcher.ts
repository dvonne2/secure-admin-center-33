import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ActivityLog } from "@/types/auth";
import { useNavigate } from "react-router-dom";

interface RoleSwitchOptions {
  targetRole: 'admin' | 'manager' | 'user';
  originalRole: string;
}

export function useRoleSwitcher() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const logRoleSwitch = (originalRole: string, targetRole: string) => {
    if (!user) return;

    const activity: ActivityLog = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      action: `Role impersonation: ${originalRole} → ${targetRole}`,
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

  const switchToRole = ({ targetRole, originalRole }: RoleSwitchOptions) => {
    if (!user || user.role !== 'superadmin') {
      toast({
        title: "Access Denied",
        description: "Only superadmin can switch roles",
        variant: "destructive",
      });
      return;
    }

    // Log the role switch
    logRoleSwitch(originalRole, targetRole);

    // Create a temporary user object with the new role
    const impersonatedUser = {
      ...user,
      role: targetRole,
      username: `${user.username} (as ${targetRole})`,
    };

    // Update localStorage with impersonated user
    localStorage.setItem('rbac_user', JSON.stringify(impersonatedUser));
    
    toast({
      title: "Role Switched",
      description: `Now viewing as ${targetRole}`,
    });

    // Force page refresh to update the context
    window.location.href = '/dashboard';
  };

  const exitRoleSwitch = () => {
    if (!user) return;

    // Get original user data (assuming we can identify superadmin by checking localStorage)
    const originalUser = {
      id: '1',
      username: 'superadmin',
      email: 'superadmin@company.com',
      role: 'superadmin' as const,
      status: 'active' as const,
      createdAt: '2024-01-01T00:00:00Z',
      lastLogin: new Date().toISOString()
    };

    logRoleSwitch(user.role, 'superadmin');
    
    localStorage.setItem('rbac_user', JSON.stringify(originalUser));
    
    toast({
      title: "Returned to Superadmin",
      description: "Back to superadmin view",
    });

    window.location.href = '/dashboard';
  };

  const isImpersonating = user?.username.includes('(as ') || false;

  return {
    switchToRole,
    exitRoleSwitch,
    isImpersonating,
    canSwitchRoles: user?.role === 'superadmin'
  };
}

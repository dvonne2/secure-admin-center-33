
import React from 'react';
import {
  LayoutDashboard,
  User,
  Settings,
  FileText,
  BarChart,
  DollarSign,
  Package,
  Truck,
  Users,
  Calculator,
  TrendingUp,
  Factory,
  Monitor,
  Lightbulb,
  Wallet,
  Headphones,
  Shield,
  Database,
  Activity,
  LogOut,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRoleSwitcher } from '@/hooks/useRoleSwitcher';
import { Button } from '@/components/ui/button';
import { BusinessRole } from '@/types/auth';
import { SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

interface NavItem {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  route: string;
  targetRole?: BusinessRole | 'superadmin';
  color?: string;
}

const roleBasedNavItems: NavItem[] = [
  {
    title: "Dashboard",
    subtitle: "Overview of your application",
    icon: LayoutDashboard,
    route: '/dashboard'
  },
  {
    title: "User Management",
    subtitle: "Manage user accounts and roles",
    icon: Users,
    targetRole: 'superadmin',
    route: '/user-management'
  },
  {
    title: "Activity Logs",
    subtitle: "Track user activities and changes",
    icon: Activity,
    targetRole: 'superadmin',
    route: '/activity-logs'
  },
  {
    title: "Forms",
    subtitle: "Create and manage forms",
    icon: FileText,
    route: '/forms'
  },
  {
    title: "Settings",
    subtitle: "System configuration",
    icon: Settings,
    route: '/settings'
  },
  {
    title: "Database",
    subtitle: "Data management",
    icon: Database,
    route: '/database'
  },
  {
    title: "KYC",
    subtitle: "Compliance",
    icon: Shield,
    targetRole: 'kyc',
    route: '/dashboard/kyc',
    color: 'bg-red-500'
  },
  {
    title: "SystemForce Academy",
    subtitle: "Academy",
    icon: Lightbulb,
    targetRole: 'systemforce_academy',
    route: '/dashboard/systemforce-academy',
    color: 'bg-purple-500'
  },
  {
    title: "System Automation",
    subtitle: "Automation",
    icon: Activity,
    targetRole: 'system_automation',
    route: '/dashboard/system-automation',
    color: 'bg-orange-500'
  },
  {
    title: "Logistics",
    subtitle: "Operations",
    icon: Truck,
    targetRole: 'production',
    route: '/dashboard/production',
    color: 'bg-teal-500'
  },
  {
    title: "Inventory",
    subtitle: "Management",
    icon: Package,
    targetRole: 'inventory',
    route: '/dashboard/inventory',
    color: 'bg-green-500'
  },
  {
    title: "Telesales",
    subtitle: "Operations",
    icon: Headphones,
    targetRole: 'telesales',
    route: '/dashboard/telesales',
    color: 'bg-purple-500'
  },
  {
    title: "Delivery",
    subtitle: "Operations",
    icon: Truck,
    targetRole: 'delivery_agent',
    route: '/dashboard/delivery-agent',
    color: 'bg-orange-500'
  },
  {
    title: "Accountant",
    subtitle: "Finance",
    icon: Calculator,
    targetRole: 'accountant',
    route: '/dashboard/accountant',
    color: 'bg-blue-500'
  },
  {
    title: "Financial Controller",
    subtitle: "Management",
    icon: DollarSign,
    targetRole: 'cfo',
    route: '/dashboard/cfo',
    color: 'bg-red-500'
  },
  {
    title: "Business Analysis",
    subtitle: "Analytics",
    icon: BarChart,
    targetRole: 'business_analysis',
    route: '/dashboard/business-analysis',
    color: 'bg-indigo-500'
  },
  {
    title: "General Manager",
    subtitle: "Executive",
    icon: Users,
    targetRole: 'manager',
    route: '/dashboard/manager',
    color: 'bg-teal-500'
  },
  {
    title: "CEO",
    subtitle: "Executive Officer",
    icon: Shield,
    targetRole: 'ceo',
    route: '/dashboard/ceo',
    color: 'bg-blue-500'
  },
  {
    title: "HR",
    subtitle: "Human Resources",
    icon: User,
    targetRole: 'hr',
    route: '/dashboard/hr',
    color: 'bg-green-500'
  },
  {
    title: "Manufacturing",
    subtitle: "Operations",
    icon: Factory,
    targetRole: 'manufacturing',
    route: '/dashboard/manufacturing',
    color: 'bg-blue-500'
  },
  {
    title: "Media Buyer",
    subtitle: "Marketing",
    icon: Monitor,
    targetRole: 'media_buyer',
    route: '/dashboard/media-buyer',
    color: 'bg-yellow-500'
  },
  {
    title: "Investor",
    subtitle: "Management",
    icon: TrendingUp,
    targetRole: 'investor',
    route: '/dashboard/investor',
    color: 'bg-orange-500'
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { switchToRole, exitRoleSwitch, isImpersonating, canSwitchRoles } = useRoleSwitcher();

  const filteredNavItems = roleBasedNavItems.filter(item => {
    if (!item.targetRole) return true;
    return user?.role === 'superadmin' || user?.business_role === item.targetRole;
  });

  const mainNavItems = filteredNavItems.filter(item => !item.targetRole || item.targetRole === 'superadmin');
  const roleNavItems = filteredNavItems.filter(item => item.targetRole && item.targetRole !== 'superadmin');

  return (
    <>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">VitalVida ERP</h1>
            <p className="text-sm text-gray-500">Enterprise System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <SidebarMenu className="space-y-1">
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.route}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {roleNavItems.length > 0 && (
          <>
            <div className="px-3 py-4">
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <User className="h-4 w-4" />
                <span className="text-sm">Enter As Role</span>
              </div>
            </div>
            
            <SidebarMenu className="space-y-1">
              {roleNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.route}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color || 'bg-gray-500'}`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.subtitle}</div>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
              {user?.name?.slice(0, 2).toUpperCase() || 'SU'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 text-sm">{user?.name || 'superadmin'}</div>
            <div className="text-xs text-blue-600 capitalize">{user?.role || 'Superadmin'}</div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={() => logout()}
          className="w-full justify-start gap-2 mt-2 text-gray-700 hover:bg-gray-50"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </>
  );
}

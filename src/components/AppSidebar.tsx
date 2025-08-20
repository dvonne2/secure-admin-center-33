
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
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRoleSwitcher } from '@/hooks/useRoleSwitcher';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import { BusinessRole } from '@/types/auth';

interface NavItem {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  route: string;
  targetRole?: BusinessRole | 'superadmin';
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
    title: "KYC Dashboard",
    subtitle: "Know Your Customer",
    icon: User,
    targetRole: 'kyc',
    route: '/dashboard/kyc'
  },
  {
    title: "Systemforce Academy",
    subtitle: "Manage Academy Courses",
    icon: Lightbulb,
    targetRole: 'systemforce_academy',
    route: '/dashboard/systemforce-academy'
  },
  {
    title: "Production Overview",
    subtitle: "Monitor Production Metrics",
    icon: Factory,
    targetRole: 'production',
    route: '/dashboard/production'
  },
  {
    title: "Inventory Management",
    subtitle: "Track Stock Levels",
    icon: Package,
    targetRole: 'inventory',
    route: '/dashboard/inventory'
  },
  {
    title: "Telesales Performance",
    subtitle: "Analyze Sales Data",
    icon: Headphones,
    targetRole: 'telesales',
    route: '/dashboard/telesales'
  },
  {
    title: "Delivery Agent Tracking",
    subtitle: "Monitor Deliveries",
    icon: Truck,
    targetRole: 'delivery_agent',
    route: '/dashboard/delivery-agent'
  },
  {
    title: "Financial Controller",
    subtitle: "Auditor",
    icon: Calculator,
    targetRole: 'accountant',
    route: '/dashboard/accountant'
  },
  {
    title: "CFO",
    subtitle: "Chief Financial Officer",
    icon: DollarSign,
    targetRole: 'cfo',
    route: '/dashboard/cfo'
  },
  {
    title: "Business Analysis",
    subtitle: "Analytics",
    icon: BarChart,
    targetRole: 'business_analysis',
    route: '/dashboard/business-analysis'
  },
  {
    title: "General Manager",
    subtitle: "Team Performance",
    icon: Users,
    targetRole: 'manager',
    route: '/dashboard/manager'
  },
  {
    title: "CEO Overview",
    subtitle: "Company Performance",
    icon: Monitor,
    targetRole: 'ceo',
    route: '/dashboard/ceo'
  },
  {
    title: "HR Management",
    subtitle: "Human Resources",
    icon: User,
    targetRole: 'hr',
    route: '/dashboard/hr'
  },
  {
    title: "Manufacturing Metrics",
    subtitle: "Production Line Analysis",
    icon: Factory,
    targetRole: 'manufacturing',
    route: '/dashboard/manufacturing'
  },
  {
    title: "Media Buying Analytics",
    subtitle: "Ad Campaign Performance",
    icon: Monitor,
    targetRole: 'media_buyer',
    route: '/dashboard/media-buyer'
  },
  {
    title: "Investor Relations",
    subtitle: "Investment Portfolio",
    icon: Wallet,
    targetRole: 'investor',
    route: '/dashboard/investor'
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { switchToRole, exitRoleSwitch, isImpersonating, canSwitchRoles } = useRoleSwitcher();

  const filteredNavItems = roleBasedNavItems.filter(item => {
    if (!item.targetRole) return true;
    return user?.role === 'superadmin' || user?.business_role === item.targetRole;
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r py-4">
      <div className="px-6 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 w-full justify-start px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-sm">{user?.name}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {canSwitchRoles && (
              <>
                {isImpersonating ? (
                  <DropdownMenuItem onClick={exitRoleSwitch}>
                    Exit Impersonation
                  </DropdownMenuItem>
                ) : (
                  <>
                    {roleBasedNavItems.filter(item => item.targetRole && item.targetRole !== 'superadmin').map(item => (
                      <DropdownMenuItem key={item.targetRole} onClick={() => {
                        if (user && item.targetRole !== 'superadmin') {
                          switchToRole({ targetRole: item.targetRole as BusinessRole, originalRole: user.role });
                        }
                      }}>
                        Impersonate as {item.title}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-grow px-6">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `flex items-center space-x-2 rounded-md p-2 text-sm font-medium hover:bg-gray-100 transition-colors ${
                    isActive ? 'bg-gray-100 font-bold' : 'text-gray-600'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 pt-4">
        <NavLink
          to="/settings"
          className="flex items-center space-x-2 rounded-md p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
}

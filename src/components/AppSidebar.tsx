

import {
  Calendar,
  Users,
  Settings,
  BarChart3,
  FileText,
  Shield,
  Activity,
  UserCog,
  Database,
  LogOut,
  ChevronRight,
  UserCheck,
  Package,
  Truck,
  Cog,
  ClipboardList,
  Headphones,
  Box,
  Book,
  Megaphone,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link, useLocation } from "react-router-dom";
import { useRoleSwitcher } from "@/hooks/useRoleSwitcher";

// Main dashboard navigation items (top section)
const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "User Management", url: "/users", icon: UserCog },
  { title: "System Logs", url: "/logs", icon: ClipboardList },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Database", url: "/database", icon: Database },
];

// Vitalvida System Automation items (bottom section)
const vitalvidaAutomationItems = [
  { title: "Vitalvida CRM", url: "/vitalvida/crm", icon: Headphones },
  { title: "Vitalvida Inventory", url: "/vitalvida/inventory", icon: Box },
  { title: "Vitalvida Books", url: "/vitalvida/books", icon: Book },
  { title: "Vitalvida Marketing", url: "/vitalvida/marketing", icon: Megaphone },
];

const businessRoles = [
  { name: 'production', label: 'Logistics', description: 'Logistics Operations' },
  { name: 'inventory', label: 'Inventory', description: 'Inventory Management' },
  { name: 'telesales', label: 'Telesales', description: 'Telesales Operations' },
  { name: 'delivery_agent', label: 'Delivery', description: 'Delivery Operations' },
  { name: 'accountant', label: 'Accountant', description: 'Accounting & Finance' },
  { name: 'cfo', label: 'Financial Controller', description: 'Financial Management' },
  { name: 'manager', label: 'General Manager', description: 'Executive Management' },
  { name: 'ceo', label: 'CEO', description: 'Chief Executive Officer' },
  { name: 'hr', label: 'HR', description: 'Human Resources' },
  { name: 'manufacturing', label: 'Manufacturing', description: 'Manufacturing Operations' },
  { name: 'media_buyer', label: 'Media Buyer', description: 'Media Buying & Marketing' },
  { name: 'investor', label: 'Investor', description: 'Investment Management' },
];

type BusinessRoleType = 'production' | 'inventory' | 'telesales' | 'delivery_agent' | 'accountant' | 'cfo' | 'ceo' | 'hr' | 'manufacturing' | 'media_buyer' | 'investor' | 'manager';

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { switchToRole, exitRoleSwitch, isImpersonating, canSwitchRoles } = useRoleSwitcher();

  if (!user) return null;

  const handleRoleSwitch = (targetRole: BusinessRoleType) => {
    switchToRole({ targetRole, originalRole: user.role });
  };

  return (
    <Sidebar className="border-r border-modern-slate-200">
      <SidebarHeader className="p-4 border-b border-modern-slate-200 bg-gradient-to-r from-modern-blue-50 to-modern-slate-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-xl shadow-modern">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-modern-blue-600 to-modern-slate-700 bg-clip-text text-transparent">
              VitalVida ERP
            </h1>
            <p className="text-xs text-modern-slate-500 font-medium">Enterprise System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-modern-slate-50/50 to-white">
        {/* Main Navigation Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="transition-all duration-200 hover:shadow-modern rounded-lg mx-2"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${location.pathname === item.url ? 'bg-gradient-primary text-white' : 'bg-modern-slate-100 text-modern-slate-600'}`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className={`font-medium ${location.pathname === item.url ? 'text-modern-blue-600' : 'text-modern-slate-700'}`}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {canSwitchRoles && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 text-modern-slate-600 font-semibold px-4">
              <div className="p-1 rounded bg-modern-blue-100">
                <UserCheck className="h-4 w-4 text-modern-blue-600" />
              </div>
              Enter As Role
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {businessRoles.map((role) => (
                  <SidebarMenuItem key={role.name}>
                    <SidebarMenuButton 
                      onClick={() => handleRoleSwitch(role.name as BusinessRoleType)}
                      className="mx-2 p-2 hover:bg-modern-slate-100 hover:shadow-modern rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="p-1.5 rounded-lg bg-gradient-secondary">
                          {role.name === 'production' && <Truck className="h-4 w-4 text-white" />}
                          {role.name === 'inventory' && <Package className="h-4 w-4 text-white" />}
                          {role.name === 'telesales' && <Users className="h-4 w-4 text-white" />}
                          {role.name === 'delivery_agent' && <Truck className="h-4 w-4 text-white" />}
                          {role.name === 'accountant' && <FileText className="h-4 w-4 text-white" />}
                          {role.name === 'cfo' && <FileText className="h-4 w-4 text-white" />}
                          {role.name === 'manager' && <UserCog className="h-4 w-4 text-white" />}
                          {role.name === 'ceo' && <Shield className="h-4 w-4 text-white" />}
                          {role.name === 'hr' && <Users className="h-4 w-4 text-white" />}
                          {role.name === 'manufacturing' && <Cog className="h-4 w-4 text-white" />}
                          {role.name === 'media_buyer' && <Megaphone className="h-4 w-4 text-white" />}
                          {role.name === 'investor' && <BarChart3 className="h-4 w-4 text-white" />}
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-modern-slate-700">{role.label}</span>
                          <span className="text-xs text-modern-slate-500">{role.description}</span>
                        </div>
                        <ChevronRight className="ml-auto h-4 w-4 text-modern-slate-400" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Vitalvida System Automation Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-bold text-modern-slate-600 border-b border-modern-slate-200 pb-2 mb-3 mx-4">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-gradient-accent">
                <Activity className="h-4 w-4 text-white" />
              </div>
              Vitalvida System Automation
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {vitalvidaAutomationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="mx-2 hover:shadow-modern rounded-lg transition-all duration-200"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${location.pathname === item.url ? 'bg-gradient-accent text-white' : 'bg-modern-slate-100 text-modern-slate-600'}`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className={`font-medium ${location.pathname === item.url ? 'text-orange-600' : 'text-modern-slate-700'}`}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isImpersonating && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={exitRoleSwitch} 
                    className="mx-2 bg-gradient-warning hover:shadow-modern text-white rounded-lg transition-all duration-200"
                  >
                    <div className="p-1.5 rounded bg-white/20">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">Exit Role Switch</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-modern-slate-200 bg-gradient-to-r from-modern-slate-50 to-white">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-10 w-10 border-2 border-modern-blue-100">
            <AvatarFallback className="bg-gradient-primary text-white text-sm font-bold">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-modern-slate-700 truncate">{user.username}</p>
            <p className="text-xs text-modern-slate-500 capitalize font-medium">
              {user.role}
              {isImpersonating && (
                <span className="ml-1 text-orange-600 font-semibold">(Impersonating)</span>
              )}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout} 
          className="w-full border-modern-slate-200 hover:bg-gradient-primary hover:text-white hover:border-transparent transition-all duration-200 font-medium"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

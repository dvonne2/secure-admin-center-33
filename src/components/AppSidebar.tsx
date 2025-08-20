
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
  GraduationCap,
  IdCard,
  DollarSign,
  BarChart,
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

// Main dashboard navigation items with enhanced colors
const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3, gradient: "bg-gradient-primary", hoverGradient: "hover-gradient-purple" },
  { title: "User Management", url: "/users", icon: UserCog, gradient: "bg-gradient-secondary", hoverGradient: "hover-gradient-teal" },
  { title: "System Logs", url: "/logs", icon: ClipboardList, gradient: "bg-gradient-accent", hoverGradient: "hover-gradient-amber" },
  { title: "Forms", url: "/forms", icon: FileText, gradient: "bg-gradient-info", hoverGradient: "hover-gradient-blue" },
  { title: "Settings", url: "/settings", icon: Settings, gradient: "bg-gradient-success", hoverGradient: "hover-gradient-emerald" },
  { title: "Database", url: "/database", icon: Database, gradient: "bg-gradient-info", hoverGradient: "hover-gradient-indigo" },
];

// Vitalvida System Automation items with vibrant colors
const vitalvidaAutomationItems = [
  { title: "Vitalvida CRM", url: "/vitalvida/crm", icon: Headphones, gradient: "bg-gradient-rose", hoverGradient: "hover-gradient-rose" },
  { title: "Vitalvida Inventory", url: "/vitalvida/inventory", icon: Box, gradient: "bg-gradient-emerald", hoverGradient: "hover-gradient-emerald" },
  { title: "Vitalvida Books", url: "/vitalvida/books", icon: Book, gradient: "bg-gradient-purple", hoverGradient: "hover-gradient-purple" },
  { title: "Vitalvida Marketing", url: "/vitalvida/marketing", icon: Megaphone, gradient: "bg-gradient-amber", hoverGradient: "hover-gradient-amber" },
];

const businessRoles = [
  { name: 'kyc', label: 'KYC', description: 'Compliance', gradient: 'bg-gradient-rose' },
  { name: 'systemforce_academy', label: 'SystemForce Academy', description: 'Academy', gradient: 'bg-gradient-purple' },
  { name: 'production', label: 'Logistics', description: 'Operations', gradient: 'bg-gradient-teal' },
  { name: 'inventory', label: 'Inventory', description: 'Management', gradient: 'bg-gradient-emerald' },
  { name: 'telesales', label: 'Telesales', description: 'Operations', gradient: 'bg-gradient-purple' },
  { name: 'delivery_agent', label: 'Delivery', description: 'Operations', gradient: 'bg-gradient-amber' },
  { name: 'accountant', label: 'Accountant', description: 'Finance', gradient: 'bg-gradient-indigo' },
  { name: 'cfo', label: 'Financial Controller', description: 'Auditor', gradient: 'bg-gradient-rose' },
  { name: 'cfo_chief', label: 'CFO', description: 'Chief Financial Officer', gradient: 'bg-gradient-rose' },
  { name: 'business_analysis', label: 'Business Analysis', description: 'Analytics', gradient: 'bg-gradient-info' },
  { name: 'manager', label: 'General Manager', description: 'Executive', gradient: 'bg-gradient-secondary' },
  { name: 'ceo', label: 'CEO', description: 'Executive Officer', gradient: 'bg-gradient-primary' },
  { name: 'hr', label: 'HR', description: 'Human Resources', gradient: 'bg-gradient-success' },
  { name: 'manufacturing', label: 'Manufacturing', description: 'Operations', gradient: 'bg-gradient-info' },
  { name: 'media_buyer', label: 'Media Buyer', description: 'Marketing', gradient: 'bg-gradient-warning' },
  { name: 'investor', label: 'Investor', description: 'Management', gradient: 'bg-gradient-accent' },
];

type BusinessRoleType = 'kyc' | 'systemforce_academy' | 'production' | 'inventory' | 'telesales' | 'delivery_agent' | 'accountant' | 'cfo' | 'cfo_chief' | 'business_analysis' | 'ceo' | 'hr' | 'manufacturing' | 'media_buyer' | 'investor' | 'manager';

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
      <SidebarHeader className="p-4 border-b border-modern-slate-200 bg-gradient-to-br from-modern-blue-50 via-modern-purple-50 to-modern-emerald-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl shadow-modern-lg transform hover:scale-105 transition-all duration-300">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-modern-blue-600 via-modern-purple-600 to-modern-emerald-600 bg-clip-text text-transparent">
              VitalVida ERP
            </h1>
            <p className="text-sm text-modern-slate-600 font-medium">Enterprise System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-modern-slate-50/80 via-white to-modern-blue-50/30">
        {/* Main Navigation Section with Enhanced Colors */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className={`transition-all duration-300 mx-2 rounded-xl ${location.pathname === item.url ? 'shadow-modern-lg transform scale-105' : 'hover:shadow-modern hover:transform hover:scale-102'} ${item.hoverGradient}`}
                  >
                    <Link to={item.url} className="flex items-center gap-3 p-3">
                      <div className={`p-2 rounded-lg ${location.pathname === item.url ? item.gradient : 'bg-modern-slate-100'} shadow-modern transition-all duration-300`}>
                        <item.icon className={`h-4 w-4 ${location.pathname === item.url ? 'text-white' : 'text-modern-slate-600'}`} />
                      </div>
                      <span className={`font-semibold transition-colors duration-300 ${location.pathname === item.url ? 'bg-gradient-to-r from-modern-blue-600 to-modern-purple-600 bg-clip-text text-transparent' : 'text-modern-slate-700'}`}>
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
            <SidebarGroupLabel className="flex items-center gap-2 text-modern-slate-700 font-bold px-4 mb-2">
              <div className="p-1.5 rounded-lg bg-gradient-secondary shadow-modern">
                <UserCheck className="h-4 w-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-modern-teal-600 to-modern-blue-600 bg-clip-text text-transparent">
                Enter As Role
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {businessRoles.map((role) => (
                  <SidebarMenuItem key={role.name}>
                    <SidebarMenuButton 
                      onClick={() => handleRoleSwitch(role.name as BusinessRoleType)}
                      className="mx-2 p-2 hover:bg-gradient-to-r hover:from-modern-slate-100 hover:to-modern-blue-50 hover:shadow-modern rounded-xl transition-all duration-300 hover:transform hover:scale-102"
                    >
                      <div className="flex items-center gap-2.5 w-full">
                        <div className={`p-1.5 rounded-lg ${role.gradient} shadow-modern transform transition-all duration-300 hover:scale-110 flex-shrink-0`}>
                          {role.name === 'kyc' && <IdCard className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'systemforce_academy' && <GraduationCap className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'production' && <Truck className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'inventory' && <Package className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'telesales' && <Users className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'delivery_agent' && <Truck className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'accountant' && <FileText className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'cfo' && <FileText className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'cfo_chief' && <DollarSign className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'business_analysis' && <BarChart className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'manager' && <UserCog className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'ceo' && <Shield className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'hr' && <Users className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'manufacturing' && <Cog className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'media_buyer' && <Megaphone className="h-3.5 w-3.5 text-white" />}
                          {role.name === 'investor' && <BarChart3 className="h-3.5 w-3.5 text-white" />}
                        </div>
                        <div className="flex flex-col items-start min-w-0 flex-1">
                          <span className="font-medium text-modern-slate-700 text-sm truncate w-full">{role.label}</span>
                          <span className="text-xs text-modern-slate-500 font-normal truncate w-full">{role.description}</span>
                        </div>
                        <ChevronRight className="ml-auto h-3.5 w-3.5 text-modern-slate-400 transition-transform duration-300 group-hover:transform group-hover:translate-x-1 flex-shrink-0" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Vitalvida System Automation Section with Rainbow Colors */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-bold text-modern-slate-700 border-b border-modern-slate-200 pb-3 mb-3 mx-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-modern-orange-500 to-modern-rose-500 shadow-modern">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-modern-orange-600 via-modern-rose-600 to-modern-purple-600 bg-clip-text text-transparent">
                Vitalvida System Automation
              </span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {vitalvidaAutomationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className={`mx-2 rounded-xl transition-all duration-300 ${location.pathname === item.url ? 'shadow-modern-lg transform scale-105' : 'hover:shadow-modern hover:transform hover:scale-102'} ${item.hoverGradient}`}
                  >
                    <Link to={item.url} className="flex items-center gap-3 p-3">
                      <div className={`p-2 rounded-lg ${location.pathname === item.url ? item.gradient : 'bg-modern-slate-100'} shadow-modern transition-all duration-300`}>
                        <item.icon className={`h-4 w-4 ${location.pathname === item.url ? 'text-white' : 'text-modern-slate-600'}`} />
                      </div>
                      <span className={`font-semibold transition-colors duration-300 ${location.pathname === item.url ? 'bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent' : 'text-modern-slate-700'}`}>
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
                    className="mx-2 bg-gradient-warning hover:shadow-modern-lg text-white rounded-xl transition-all duration-300 hover:transform hover:scale-105 p-3"
                  >
                    <div className="p-2 rounded-lg bg-white/20 shadow-modern">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold">Exit Role Switch</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-modern-slate-200 bg-gradient-to-r from-modern-slate-50 via-modern-blue-50 to-modern-purple-50">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-12 w-12 border-2 border-transparent bg-gradient-to-r from-modern-blue-500 to-modern-purple-500 p-0.5">
            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
              <AvatarFallback className="bg-gradient-primary text-white text-sm font-bold border-0">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </div>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold bg-gradient-to-r from-modern-slate-700 to-modern-blue-700 bg-clip-text text-transparent truncate">{user.username}</p>
            <p className="text-xs text-modern-slate-600 capitalize font-medium">
              <span className="bg-gradient-to-r from-modern-emerald-600 to-modern-teal-600 bg-clip-text text-transparent">
                {user.role}
              </span>
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
          className="w-full border-modern-slate-300 hover:bg-gradient-primary hover:text-white hover:border-transparent transition-all duration-300 font-semibold hover:shadow-modern transform hover:scale-105"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

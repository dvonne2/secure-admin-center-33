
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

const menuItems = {
  superadmin: [
    { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
    { title: "User Management", url: "/users", icon: UserCog },
    { title: "System Logs", url: "/logs", icon: Activity },
    { title: "Settings", url: "/settings", icon: Settings },
    { title: "Database", url: "/database", icon: Database },
  ],
  admin: [
    { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
    { title: "Users", url: "/users", icon: Users },
    { title: "Reports", url: "/reports", icon: FileText },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
  manager: [
    { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
    { title: "Team", url: "/team", icon: Users },
    { title: "Projects", url: "/projects", icon: FileText },
    { title: "Calendar", url: "/calendar", icon: Calendar },
  ],
  user: [
    { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
    { title: "Profile", url: "/profile", icon: Users },
    { title: "Tasks", url: "/tasks", icon: FileText },
    { title: "Calendar", url: "/calendar", icon: Calendar },
  ],
  cfo: [
    { title: "CFO Dashboard", url: "/dashboard/cfo", icon: BarChart3 },
    { title: "Financial Reports", url: "/finance/reports", icon: FileText },
    { title: "Budget Management", url: "/finance/budget", icon: Settings },
  ],
  cto: [
    { title: "CTO Dashboard", url: "/dashboard/cto", icon: BarChart3 },
    { title: "Technology Stack", url: "/tech/stack", icon: Settings },
    { title: "Development Teams", url: "/tech/teams", icon: Users },
  ],
  ceo: [
    { title: "CEO Dashboard", url: "/dashboard/ceo", icon: BarChart3 },
    { title: "Executive Reports", url: "/executive/reports", icon: FileText },
    { title: "Strategic Planning", url: "/executive/strategy", icon: Settings },
  ],
  chro: [
    { title: "CHRO Dashboard", url: "/dashboard/chro", icon: BarChart3 },
    { title: "HR Analytics", url: "/hr/analytics", icon: BarChart3 },
    { title: "Employee Management", url: "/hr/employees", icon: Users },
  ],
  cmo: [
    { title: "CMO Dashboard", url: "/dashboard/cmo", icon: BarChart3 },
    { title: "Marketing Analytics", url: "/marketing/analytics", icon: BarChart3 },
    { title: "Campaign Management", url: "/marketing/campaigns", icon: FileText },
  ],
  coo: [
    { title: "COO Dashboard", url: "/dashboard/coo", icon: BarChart3 },
    { title: "Operations Analytics", url: "/operations/analytics", icon: BarChart3 },
    { title: "Process Management", url: "/operations/processes", icon: Settings },
  ],
  ciso: [
    { title: "CISO Dashboard", url: "/dashboard/ciso", icon: BarChart3 },
    { title: "Security Analytics", url: "/security/analytics", icon: Shield },
    { title: "Compliance Reports", url: "/security/compliance", icon: FileText },
  ],
  cpo: [
    { title: "CPO Dashboard", url: "/dashboard/cpo", icon: BarChart3 },
    { title: "Product Analytics", url: "/product/analytics", icon: BarChart3 },
    { title: "Product Roadmap", url: "/product/roadmap", icon: FileText },
  ],
  cdo: [
    { title: "CDO Dashboard", url: "/dashboard/cdo", icon: BarChart3 },
    { title: "Data Analytics", url: "/data/analytics", icon: BarChart3 },
    { title: "Data Governance", url: "/data/governance", icon: Settings },
  ],
  clo: [
    { title: "CLO Dashboard", url: "/dashboard/clo", icon: BarChart3 },
    { title: "Legal Analytics", url: "/legal/analytics", icon: BarChart3 },
    { title: "Compliance Management", url: "/legal/compliance", icon: FileText },
  ],
  cao: [
    { title: "CAO Dashboard", url: "/dashboard/cao", icon: BarChart3 },
    { title: "Audit Analytics", url: "/audit/analytics", icon: BarChart3 },
    { title: "Risk Management", url: "/audit/risk", icon: Shield },
  ],
};

const businessRoles = [
  { name: 'cfo', label: 'CFO', description: 'Chief Financial Officer' },
  { name: 'cto', label: 'CTO', description: 'Chief Technology Officer' },
  { name: 'ceo', label: 'CEO', description: 'Chief Executive Officer' },
  { name: 'chro', label: 'CHRO', description: 'Chief Human Resources Officer' },
  { name: 'cmo', label: 'CMO', description: 'Chief Marketing Officer' },
  { name: 'coo', label: 'COO', description: 'Chief Operating Officer' },
  { name: 'ciso', label: 'CISO', description: 'Chief Information Security Officer' },
  { name: 'cpo', label: 'CPO', description: 'Chief Product Officer' },
  { name: 'cdo', label: 'CDO', description: 'Chief Data Officer' },
  { name: 'clo', label: 'CLO', description: 'Chief Legal Officer' },
  { name: 'cao', label: 'CAO', description: 'Chief Audit Officer' },
];

type BusinessRoleType = 'cfo' | 'cto' | 'ceo' | 'chro' | 'cmo' | 'coo' | 'ciso' | 'cpo' | 'cdo' | 'clo' | 'cao';

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { switchToRole, exitRoleSwitch, isImpersonating, canSwitchRoles } = useRoleSwitcher();

  if (!user) return null;

  const userMenuItems = menuItems[user.role as keyof typeof menuItems] || [];

  const handleRoleSwitch = (targetRole: BusinessRoleType) => {
    switchToRole({ targetRole, originalRole: user.role });
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">RBAC System</h1>
            <p className="text-xs text-muted-foreground">Role-Based Access</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {canSwitchRoles && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              🔐 Enter As Role
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {businessRoles.map((role) => (
                  <SidebarMenuItem key={role.name}>
                    <SidebarMenuButton onClick={() => handleRoleSwitch(role.name as BusinessRoleType)}>
                      <UserCheck className="h-4 w-4" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{role.label}</span>
                        <span className="text-xs text-muted-foreground">{role.description}</span>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {isImpersonating && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={exitRoleSwitch} className="bg-orange-100 hover:bg-orange-200 text-orange-800">
                    <Shield className="h-4 w-4" />
                    <span>Exit Role Switch</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.username}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user.role}
              {isImpersonating && (
                <span className="ml-1 text-orange-600">(Impersonating)</span>
              )}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={logout} className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}


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
  Crown,
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
};

const availableRoles = [
  { name: 'admin', label: 'Admin', icon: UserCog },
  { name: 'manager', label: 'Manager', icon: Users },
  { name: 'user', label: 'User', icon: UserCheck },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { switchToRole, exitRoleSwitch, isImpersonating, canSwitchRoles } = useRoleSwitcher();

  if (!user) return null;

  const userMenuItems = menuItems[user.role] || [];

  const handleRoleSwitch = (targetRole: 'admin' | 'manager' | 'user') => {
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
              <Crown className="h-4 w-4" />
              Enter As Role
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {availableRoles.map((role) => (
                  <SidebarMenuItem key={role.name}>
                    <SidebarMenuButton onClick={() => handleRoleSwitch(role.name as 'admin' | 'manager' | 'user')}>
                      <role.icon className="h-4 w-4" />
                      <span>{role.label}</span>
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

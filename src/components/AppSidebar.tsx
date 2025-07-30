
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

// Staff & Daily Operations items (main functional section)
const staffOperationsItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "User Management", url: "/user/management", icon: UserCog },
  { title: "System Logs", url: "/system/logs", icon: ClipboardList },
  { title: "Settings", url: "/system/settings", icon: Cog },
  { title: "Database", url: "/system/database", icon: Database },
];

// Vitalvida System Automation items (bottom section)
const vitalvidaAutomationItems = [
  { title: "Vitalvida CRM", url: "/vitalvida/crm", icon: Headphones },
  { title: "Vitalvida Inventory", url: "/vitalvida/inventory", icon: Box },
  { title: "Vitalvida Books", url: "/vitalvida/books", icon: Book },
  { title: "Vitalvida Marketing", url: "/vitalvida/marketing", icon: Megaphone },
];

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
  production: [
    { title: "Logistics Dashboard", url: "/dashboard/production", icon: BarChart3 },
    { title: "Logistics Lines", url: "/production/lines", icon: Settings },
    { title: "Quality Control", url: "/production/quality", icon: FileText },
  ],
  inventory: [
    { title: "Inventory Dashboard", url: "/dashboard/inventory", icon: BarChart3 },
    { title: "Stock Management", url: "/inventory/stock", icon: Package },
    { title: "Purchase Orders", url: "/inventory/orders", icon: FileText },
  ],
  telesales: [
    { title: "Telesales Dashboard", url: "/dashboard/telesales", icon: BarChart3 },
    { title: "Call Queue", url: "/telesales/queue", icon: Users },
    { title: "Sales Reports", url: "/telesales/reports", icon: FileText },
  ],
  delivery_agent: [
    { title: "Delivery Dashboard", url: "/dashboard/delivery_agent", icon: BarChart3 },
    { title: "Route Planning", url: "/delivery/routes", icon: Settings },
    { title: "Delivery History", url: "/delivery/history", icon: FileText },
  ],
  accountant: [
    { title: "Accountant Dashboard", url: "/dashboard/accountant", icon: BarChart3 },
    { title: "Invoices", url: "/accounting/invoices", icon: FileText },
    { title: "Financial Reports", url: "/accounting/reports", icon: Settings },
  ],
  cfo: [
    { title: "CFO Dashboard", url: "/dashboard/cfo", icon: BarChart3 },
    { title: "Financial Reports", url: "/finance/reports", icon: FileText },
    { title: "Budget Management", url: "/finance/budget", icon: Settings },
  ],
  ceo: [
    { title: "CEO Dashboard", url: "/dashboard/ceo", icon: BarChart3 },
    { title: "Executive Reports", url: "/executive/reports", icon: FileText },
    { title: "Strategic Planning", url: "/executive/strategy", icon: Settings },
  ],
  hr: [
    { title: "HR Dashboard", url: "/dashboard/hr", icon: BarChart3 },
    { title: "Employee Management", url: "/hr/employees", icon: Users },
    { title: "Recruitment", url: "/hr/recruitment", icon: FileText },
  ],
  manufacturing: [
    { title: "Manufacturing Dashboard", url: "/dashboard/manufacturing", icon: BarChart3 },
    { title: "Production Planning", url: "/manufacturing/planning", icon: Settings },
    { title: "Equipment Management", url: "/manufacturing/equipment", icon: FileText },
  ],
  media_buyer: [
    { title: "Media Buyer Dashboard", url: "/dashboard/media_buyer", icon: BarChart3 },
    { title: "Campaign Management", url: "/media/campaigns", icon: Settings },
    { title: "Analytics", url: "/media/analytics", icon: FileText },
  ],
  investor: [
    { title: "Investor Dashboard", url: "/dashboard/investor", icon: BarChart3 },
    { title: "Portfolio Analysis", url: "/investor/portfolio", icon: BarChart3 },
    { title: "Financial Reports", url: "/investor/reports", icon: FileText },
  ],
};

const businessRoles = [
  { name: 'production', label: 'Logistics', description: 'Logistics Operations' },
  { name: 'inventory', label: 'Inventory', description: 'Inventory Management' },
  { name: 'telesales', label: 'Telesales', description: 'Telesales Operations' },
  { name: 'delivery_agent', label: 'Delivery', description: 'Delivery Operations' },
  { name: 'accountant', label: 'Accountant', description: 'Accounting & Finance' },
  { name: 'cfo', label: 'CFO', description: 'Chief Financial Officer' },
  { name: 'ceo', label: 'CEO', description: 'Chief Executive Officer' },
  { name: 'hr', label: 'HR', description: 'Human Resources' },
  { name: 'manufacturing', label: 'Manufacturing', description: 'Manufacturing Operations' },
  { name: 'media_buyer', label: 'Media Buyer', description: 'Media Buying & Marketing' },
  { name: 'investor', label: 'Investor', description: 'Investment Management' },
];

type BusinessRoleType = 'production' | 'inventory' | 'telesales' | 'delivery_agent' | 'accountant' | 'cfo' | 'ceo' | 'hr' | 'manufacturing' | 'media_buyer' | 'investor';

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
        {/* Staff & Daily Operations Section (renamed from System Control Center) */}
        <SidebarGroup>
          <SidebarGroupLabel className="nav-header text-sm font-semibold text-primary border-b pb-2 mb-3">
            🧰 Staff & Daily Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {staffOperationsItems.map((item) => (
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

        {/* Vitalvida System Automation Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="nav-header text-sm font-semibold text-accent-foreground border-b pb-2 mb-3">
            🤖 Vitalvida System Automation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {vitalvidaAutomationItems.map((item) => (
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


import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainLayout from "@/components/MainLayout";
import { User } from "@/types/auth";

interface RoleBasedLayoutProps {
  children: React.ReactNode;
  allowedRoles: User['role'][];
}

export function RoleBasedLayout({ children, allowedRoles }: RoleBasedLayoutProps) {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <SidebarProvider>
        <MainLayout>
          {children}
        </MainLayout>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

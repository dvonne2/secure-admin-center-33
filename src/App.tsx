
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import ActivityLogs from "./pages/ActivityLogs";
import TeamPage from "./pages/TeamPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import ReportsPage from "./pages/ReportsPage";
import DatabasePage from "./pages/DatabasePage";
import CFODashboard from "./pages/CFODashboard";
import CTODashboard from "./pages/CTODashboard";
import CEODashboard from "./pages/CEODashboard";
import CHRODashboard from "./pages/CHRODashboard";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes with Sidebar Layout */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            {/* Business Role Dashboards */}
            <Route path="/dashboard/cfo" element={
              <ProtectedRoute allowedRoles={['cfo', 'superadmin']}>
                <SidebarProvider>
                  <MainLayout>
                    <CFODashboard />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/cto" element={
              <ProtectedRoute allowedRoles={['cto', 'superadmin']}>
                <SidebarProvider>
                  <MainLayout>
                    <CTODashboard />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/ceo" element={
              <ProtectedRoute allowedRoles={['ceo', 'superadmin']}>
                <SidebarProvider>
                  <MainLayout>
                    <CEODashboard />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/chro" element={
              <ProtectedRoute allowedRoles={['chro', 'superadmin']}>
                <SidebarProvider>
                  <MainLayout>
                    <CHRODashboard />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute allowedRoles={['superadmin', 'admin']}>
                <SidebarProvider>
                  <MainLayout>
                    <UserManagement />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/logs" element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <SidebarProvider>
                  <MainLayout>
                    <ActivityLogs />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/team" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <SidebarProvider>
                  <MainLayout>
                    <TeamPage />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/projects" element={
              <ProtectedRoute allowedRoles={['manager']}>
                <SidebarProvider>
                  <MainLayout>
                    <ProjectsPage />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/tasks" element={
              <ProtectedRoute allowedRoles={['user']}>
                <SidebarProvider>
                  <MainLayout>
                    <TasksPage />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/calendar" element={
              <ProtectedRoute allowedRoles={['manager', 'user']}>
                <SidebarProvider>
                  <MainLayout>
                    <CalendarPage />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <SidebarProvider>
                  <MainLayout>
                    <ReportsPage />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/database" element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <SidebarProvider>
                  <MainLayout>
                    <DatabasePage />
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <MainLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Profile</h1>
                      <p>User profile page - coming soon!</p>
                    </div>
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <MainLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Settings</h1>
                      <p>Settings page - coming soon!</p>
                    </div>
                  </MainLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            <Route path="/unauthorized" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">403</h1>
                  <p className="text-xl text-gray-600 mb-4">Unauthorized Access</p>
                  <p className="text-gray-500">You don't have permission to access this page.</p>
                </div>
              </div>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

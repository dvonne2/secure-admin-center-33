import { Route } from "react-router-dom";
import { ProtectedLayout } from "@/components/layouts/ProtectedLayout";
import Dashboard from "@/pages/Dashboard";
import UserManagement from "@/pages/UserManagement";
import ActivityLogs from "@/pages/ActivityLogs";
import SystemLogs from "@/pages/SystemLogs";
import SystemSettings from "@/pages/SystemSettings";
import TeamPage from "@/pages/TeamPage";
import ProjectsPage from "@/pages/ProjectsPage";
import TasksPage from "@/pages/TasksPage";
import CalendarPage from "@/pages/CalendarPage";
import ReportsPage from "@/pages/ReportsPage";
import DatabasePage from "@/pages/DatabasePage";
import FormPage from "@/pages/FormPage";

export const protectedRoutes = [
  <Route key="dashboard" path="/dashboard" element={
    <ProtectedLayout>
      <Dashboard />
    </ProtectedLayout>
  } />,
  
  <Route key="user-management" path="/user/management" element={
    <ProtectedLayout allowedRoles={['superadmin', 'admin']}>
      <UserManagement />
    </ProtectedLayout>
  } />,
  
  <Route key="users" path="/users" element={
    <ProtectedLayout allowedRoles={['superadmin', 'admin']}>
      <UserManagement />
    </ProtectedLayout>
  } />,
  
  <Route key="system-logs" path="/system/logs" element={
    <ProtectedLayout allowedRoles={['superadmin']}>
      <SystemLogs />
    </ProtectedLayout>
  } />,
  
  <Route key="logs" path="/logs" element={
    <ProtectedLayout allowedRoles={['superadmin']}>
      <ActivityLogs />
    </ProtectedLayout>
  } />,

  <Route key="forms" path="/forms" element={
    <ProtectedLayout allowedRoles={['superadmin']}>
      <FormPage />
    </ProtectedLayout>
  } />,
  
  <Route key="system-settings" path="/system/settings" element={
    <ProtectedLayout allowedRoles={['superadmin', 'admin']}>
      <SystemSettings />
    </ProtectedLayout>
  } />,
  
  <Route key="system-database" path="/system/database" element={
    <ProtectedLayout allowedRoles={['superadmin']}>
      <DatabasePage />
    </ProtectedLayout>
  } />,
  
  <Route key="team" path="/team" element={
    <ProtectedLayout allowedRoles={['manager']}>
      <TeamPage />
    </ProtectedLayout>
  } />,
  
  <Route key="projects" path="/projects" element={
    <ProtectedLayout allowedRoles={['manager']}>
      <ProjectsPage />
    </ProtectedLayout>
  } />,
  
  <Route key="tasks" path="/tasks" element={
    <ProtectedLayout allowedRoles={['user']}>
      <TasksPage />
    </ProtectedLayout>
  } />,
  
  <Route key="calendar" path="/calendar" element={
    <ProtectedLayout allowedRoles={['manager', 'user']}>
      <CalendarPage />
    </ProtectedLayout>
  } />,
  
  <Route key="reports" path="/reports" element={
    <ProtectedLayout allowedRoles={['admin']}>
      <ReportsPage />
    </ProtectedLayout>
  } />,
  
  <Route key="database" path="/database" element={
    <ProtectedLayout allowedRoles={['superadmin']}>
      <DatabasePage />
    </ProtectedLayout>
  } />,
  
  <Route key="profile" path="/profile" element={
    <ProtectedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>User profile page - coming soon!</p>
      </div>
    </ProtectedLayout>
  } />,
  
  <Route key="settings" path="/settings" element={
    <ProtectedLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p>Settings page - coming soon!</p>
      </div>
    </ProtectedLayout>
  } />
];

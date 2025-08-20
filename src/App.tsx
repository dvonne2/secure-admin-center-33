
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import MainLayout from '@/components/MainLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import UserManagement from '@/pages/UserManagement';
import ActivityLogs from '@/pages/ActivityLogs';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import FormsListPage from '@/pages/forms/FormsListPage';
import FormBuilderPage from '@/pages/forms/FormBuilderPage';
import FormDesignerPage from '@/pages/forms/FormDesignerPage';
import FormPreviewPage from '@/pages/forms/FormPreviewPage';
import { protectedRoutes } from '@/routes/protectedRoutes';
import { roleBasedRoutes } from '@/routes/roleBasedRoutes';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/user-management" element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <MainLayout>
                    <UserManagement />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/activity-logs" element={
                <ProtectedRoute allowedRoles={['superadmin']}>
                  <MainLayout>
                    <ActivityLogs />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/forms" element={
                <ProtectedRoute>
                  <MainLayout>
                    <FormsListPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/forms/builder" element={
                <ProtectedRoute>
                  <FormBuilderPage />
                </ProtectedRoute>
              } />
              <Route path="/forms/:id/design" element={
                <ProtectedRoute>
                  <FormDesignerPage />
                </ProtectedRoute>
              } />
              <Route path="/forms/:id/preview" element={
                <ProtectedRoute>
                  <MainLayout>
                    <FormPreviewPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              } />
              {protectedRoutes}
              {roleBasedRoutes}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

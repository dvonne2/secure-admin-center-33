
import { Route } from "react-router-dom";
import { RoleBasedLayout } from "@/components/layouts/RoleBasedLayout";
import CFODashboard from "@/pages/CFODashboard";
import CTODashboard from "@/pages/CTODashboard";
import CEODashboard from "@/pages/CEODashboard";
import CHRODashboard from "@/pages/CHRODashboard";

export const roleBasedRoutes = [
  <Route key="cfo-dashboard" path="/dashboard/cfo" element={
    <RoleBasedLayout allowedRoles={['cfo', 'superadmin']}>
      <CFODashboard />
    </RoleBasedLayout>
  } />,
  
  <Route key="cto-dashboard" path="/dashboard/cto" element={
    <RoleBasedLayout allowedRoles={['cto', 'superadmin']}>
      <CTODashboard />
    </RoleBasedLayout>
  } />,
  
  <Route key="ceo-dashboard" path="/dashboard/ceo" element={
    <RoleBasedLayout allowedRoles={['ceo', 'superadmin']}>
      <CEODashboard />
    </RoleBasedLayout>
  } />,
  
  <Route key="chro-dashboard" path="/dashboard/chro" element={
    <RoleBasedLayout allowedRoles={['chro', 'superadmin']}>
      <CHRODashboard />
    </RoleBasedLayout>
  } />
];

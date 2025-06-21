
import { Route } from "react-router-dom";
import { RoleBasedLayout } from "@/components/layouts/RoleBasedLayout";
import CFODashboard from "@/pages/CFODashboard";
import CTODashboard from "@/pages/CTODashboard";
import CEODashboard from "@/pages/CEODashboard";
import CHRODashboard from "@/pages/CHRODashboard";
import CMODashboard from "@/pages/CMODashboard";
import COODashboard from "@/pages/COODashboard";
import CISODashboard from "@/pages/CISODashboard";
import CPODashboard from "@/pages/CPODashboard";
import CDODashboard from "@/pages/CDODashboard";
import CLODashboard from "@/pages/CLODashboard";
import CAODashboard from "@/pages/CAODashboard";

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
  } />,

  <Route key="cmo-dashboard" path="/dashboard/cmo" element={
    <RoleBasedLayout allowedRoles={['cmo', 'superadmin']}>
      <CMODashboard />
    </RoleBasedLayout>
  } />,

  <Route key="coo-dashboard" path="/dashboard/coo" element={
    <RoleBasedLayout allowedRoles={['coo', 'superadmin']}>
      <COODashboard />
    </RoleBasedLayout>
  } />,

  <Route key="ciso-dashboard" path="/dashboard/ciso" element={
    <RoleBasedLayout allowedRoles={['ciso', 'superadmin']}>
      <CISODashboard />
    </RoleBasedLayout>
  } />,

  <Route key="cpo-dashboard" path="/dashboard/cpo" element={
    <RoleBasedLayout allowedRoles={['cpo', 'superadmin']}>
      <CPODashboard />
    </RoleBasedLayout>
  } />,

  <Route key="cdo-dashboard" path="/dashboard/cdo" element={
    <RoleBasedLayout allowedRoles={['cdo', 'superadmin']}>
      <CDODashboard />
    </RoleBasedLayout>
  } />,

  <Route key="clo-dashboard" path="/dashboard/clo" element={
    <RoleBasedLayout allowedRoles={['clo', 'superadmin']}>
      <CLODashboard />
    </RoleBasedLayout>
  } />,

  <Route key="cao-dashboard" path="/dashboard/cao" element={
    <RoleBasedLayout allowedRoles={['cao', 'superadmin']}>
      <CAODashboard />
    </RoleBasedLayout>
  } />
];

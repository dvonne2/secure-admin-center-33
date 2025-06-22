
import { Route } from "react-router-dom";
import { RoleBasedLayout } from "@/components/layouts/RoleBasedLayout";
import ProductionDashboard from "@/pages/ProductionDashboard";
import InventoryDashboard from "@/pages/InventoryDashboard";
import TelesalesDashboard from "@/pages/TelesalesDashboard";
import DeliveryAgentDashboard from "@/pages/DeliveryAgentDashboard";
import AccountantDashboard from "@/pages/AccountantDashboard";
import CFODashboard from "@/pages/CFODashboard";
import CEODashboard from "@/pages/CEODashboard";
import HRDashboard from "@/pages/HRDashboard";
import ManufacturingDashboard from "@/pages/ManufacturingDashboard";
import MediaBuyerDashboard from "@/pages/MediaBuyerDashboard";
import InvestorDashboard from "@/pages/InvestorDashboard";

export const roleBasedRoutes = [
  <Route key="production-dashboard" path="/dashboard/production" element={
    <RoleBasedLayout allowedRoles={['production', 'superadmin']}>
      <ProductionDashboard />
    </RoleBasedLayout>
  } />,
  
  <Route key="inventory-dashboard" path="/dashboard/inventory" element={
    <RoleBasedLayout allowedRoles={['inventory', 'superadmin']}>
      <InventoryDashboard />
    </RoleBasedLayout>
  } />,
  
  <Route key="telesales-dashboard" path="/dashboard/telesales" element={
    <RoleBasedLayout allowedRoles={['telesales', 'superadmin']}>
      <TelesalesDashboard />
    </RoleBasedLayout>
  } />,
  
  <Route key="delivery-agent-dashboard" path="/dashboard/delivery_agent" element={
    <RoleBasedLayout allowedRoles={['delivery_agent', 'superadmin']}>
      <DeliveryAgentDashboard />
    </RoleBasedLayout>
  } />,

  <Route key="accountant-dashboard" path="/dashboard/accountant" element={
    <RoleBasedLayout allowedRoles={['accountant', 'superadmin']}>
      <AccountantDashboard />
    </RoleBasedLayout>
  } />,

  <Route key="cfo-dashboard" path="/dashboard/cfo" element={
    <RoleBasedLayout allowedRoles={['cfo', 'superadmin']}>
      <CFODashboard />
    </RoleBasedLayout>
  } />,

  <Route key="ceo-dashboard" path="/dashboard/ceo" element={
    <RoleBasedLayout allowedRoles={['ceo', 'superadmin']}>
      <CEODashboard />
    </RoleBasedLayout>
  } />,

  <Route key="hr-dashboard" path="/dashboard/hr" element={
    <RoleBasedLayout allowedRoles={['hr', 'superadmin']}>
      <HRDashboard />
    </RoleBasedLayout>
  } />,

  <Route key="manufacturing-dashboard" path="/dashboard/manufacturing" element={
    <RoleBasedLayout allowedRoles={['manufacturing', 'superadmin']}>
      <ManufacturingDashboard />
    </RoleBasedLayout>
  } />,

  <Route key="media-buyer-dashboard" path="/dashboard/media_buyer" element={
    <RoleBasedLayout allowedRoles={['media_buyer', 'superadmin']}>
      <MediaBuyerDashboard />
    </RoleBasedLayout>
  } />,

  <Route key="investor-dashboard" path="/dashboard/investor" element={
    <RoleBasedLayout allowedRoles={['investor', 'superadmin']}>
      <InvestorDashboard />
    </RoleBasedLayout>
  } />
];

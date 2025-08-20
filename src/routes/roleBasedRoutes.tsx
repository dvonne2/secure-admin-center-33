
import { Route } from "react-router-dom";
import { BusinessRoleLayout } from "@/components/layouts/BusinessRoleLayout";
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
import KycRoleDashboard from "@/pages/KycRoleDashboard";
import SystemForceAcademyDashboard from "@/pages/SystemForceAcademyDashboard";

export const roleBasedRoutes = [
  <Route key="kyc-dashboard" path="/dashboard/kyc" element={
    <BusinessRoleLayout allowedBusinessRoles={['kyc', 'superadmin']}>
      <KycRoleDashboard />
    </BusinessRoleLayout>
  } />,

  <Route key="systemforce-academy-dashboard" path="/dashboard/systemforce_academy" element={
    <BusinessRoleLayout allowedBusinessRoles={['systemforce_academy', 'superadmin']}>
      <SystemForceAcademyDashboard />
    </BusinessRoleLayout>
  } />,

  <Route key="production-dashboard" path="/dashboard/production" element={
    <BusinessRoleLayout allowedBusinessRoles={['production', 'superadmin']}>
      <ProductionDashboard />
    </BusinessRoleLayout>
  } />,
  
  <Route key="inventory-dashboard" path="/dashboard/inventory" element={
    <BusinessRoleLayout allowedBusinessRoles={['inventory', 'superadmin']}>
      <InventoryDashboard />
    </BusinessRoleLayout>
  } />,
  
  <Route key="telesales-dashboard" path="/dashboard/telesales" element={
    <BusinessRoleLayout allowedBusinessRoles={['telesales', 'superadmin']}>
      <TelesalesDashboard />
    </BusinessRoleLayout>
  } />,
  
  <Route key="delivery-agent-dashboard" path="/dashboard/delivery_agent" element={
    <BusinessRoleLayout allowedBusinessRoles={['delivery_agent', 'superadmin']}>
      <DeliveryAgentDashboard />
    </BusinessRoleLayout>
  } />,

  <Route key="accountant-dashboard" path="/dashboard/accountant" element={
    <BusinessRoleLayout allowedBusinessRoles={['accountant', 'superadmin']}>
      <AccountantDashboard />
    </BusinessRoleLayout>
  } />,

  <Route key="cfo-dashboard" path="/dashboard/cfo" element={
    <BusinessRoleLayout allowedBusinessRoles={['cfo', 'superadmin']}>
      <CFODashboard />
    </BusinessRoleLayout>
  } />,

  <Route key="ceo-dashboard" path="/dashboard/ceo" element={
    <BusinessRoleLayout allowedBusinessRoles={['ceo', 'superadmin']}>
      <CEODashboard />
    </BusinessRoleLayout>
  } />,

  <Route key="hr-dashboard" path="/dashboard/hr" element={
    <BusinessRoleLayout allowedBusinessRoles={['hr', 'superadmin']}>
      <HRDashboard />
    </BusinessRoleLayout>
  } />,

  <Route key="manufacturing-dashboard" path="/dashboard/manufacturing" element={
    <BusinessRoleLayout allowedBusinessRoles={['manufacturing', 'superadmin']}>
      <ManufacturingDashboard />
    </BusinessRoleLayout>
  } />,

  <Route key="media-buyer-dashboard" path="/dashboard/media_buyer" element={
    <BusinessRoleLayout allowedBusinessRoles={['media_buyer', 'superadmin']}>
      <MediaBuyerDashboard />
    </BusinessRoleLayout>
  } />,

  <Route key="investor-dashboard" path="/dashboard/investor" element={
    <BusinessRoleLayout allowedBusinessRoles={['investor', 'superadmin']}>
      <InvestorDashboard />
    </BusinessRoleLayout>
  } />
];

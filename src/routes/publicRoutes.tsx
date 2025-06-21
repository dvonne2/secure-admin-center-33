
import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

export const publicRoutes = [
  <Route key="index" path="/" element={<Index />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="unauthorized" path="/unauthorized" element={
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">403</h1>
        <p className="text-xl text-gray-600 mb-4">Unauthorized Access</p>
        <p className="text-gray-500">You don't have permission to access this page.</p>
      </div>
    </div>
  } />,
  <Route key="notfound" path="*" element={<NotFound />} />
];

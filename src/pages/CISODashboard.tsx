
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Lock, Eye } from "lucide-react";

export default function CISODashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CISO Dashboard</h1>
          <p className="text-muted-foreground">Chief Information Security Officer Overview</p>
        </div>
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          Security Executive
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              -2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">
              +0.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents Resolved</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
            <CardDescription>Recent security incidents and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Suspicious Login Attempt</span>
                <Badge variant="destructive">High</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Malware Detection</span>
                <Badge variant="outline">Medium</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Firewall Anomaly</span>
                <Badge variant="secondary">Low</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>Regulatory compliance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>GDPR Compliance</span>
                <span className="font-bold text-green-600">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>SOX Compliance</span>
                <span className="font-bold text-green-600">98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>ISO 27001</span>
                <span className="font-bold text-green-600">99%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>HIPAA Compliance</span>
                <span className="font-bold text-yellow-600">95%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

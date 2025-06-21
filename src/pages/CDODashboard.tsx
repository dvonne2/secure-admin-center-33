
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, BarChart3, Server, Zap } from "lucide-react";

export default function CDODashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CDO Dashboard</h1>
          <p className="text-muted-foreground">Chief Data Officer Overview</p>
        </div>
        <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">
          Data Executive
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Quality Score</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.7%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              +3 from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Storage</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847 TB</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Speed</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">
              -0.5s from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Data Initiatives</CardTitle>
            <CardDescription>Current data science and analytics projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Customer Behavior Analysis</span>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Predictive Maintenance</span>
                <Badge>In Progress</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Real-time Analytics</span>
                <Badge variant="secondary">Planning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Governance</CardTitle>
            <CardDescription>Data governance and compliance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Data Lineage Coverage</span>
                <span className="font-bold">89%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Privacy Compliance</span>
                <span className="font-bold">96%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Catalog Completeness</span>
                <span className="font-bold">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Access Control Coverage</span>
                <span className="font-bold">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, TrendingDown, AlertTriangle } from "lucide-react";

export default function CAODashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CAO Dashboard</h1>
          <p className="text-muted-foreground">Chief Audit Officer Overview</p>
        </div>
        <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">
          Audit Executive
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Control Effectiveness</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <p className="text-xs text-muted-foreground">
              +3% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Reduction</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15%</div>
            <p className="text-xs text-muted-foreground">
              This quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Findings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              -3 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Audit Pipeline</CardTitle>
            <CardDescription>Current and upcoming audit activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Financial Controls Audit</span>
                <Badge>In Progress</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">IT Security Assessment</span>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Operational Risk Review</span>
                <Badge variant="secondary">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Enterprise risk management overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Financial Risk</span>
                <span className="font-bold text-green-600">Low</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Operational Risk</span>
                <span className="font-bold text-yellow-600">Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Compliance Risk</span>
                <span className="font-bold text-green-600">Low</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Strategic Risk</span>
                <span className="font-bold text-yellow-600">Medium</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

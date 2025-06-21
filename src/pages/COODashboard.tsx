
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Users, TrendingUp } from "lucide-react";

export default function COODashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">COO Dashboard</h1>
          <p className="text-muted-foreground">Chief Operating Officer Overview</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Operations Executive
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational Efficiency</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Process Automation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Productivity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Reduction</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Operations</CardTitle>
            <CardDescription>Current operational initiatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Supply Chain Optimization</span>
                <Badge>In Progress</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Quality Control Enhancement</span>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Process Automation</span>
                <Badge variant="secondary">Planning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational KPIs</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Customer Satisfaction</span>
                <span className="font-bold">96%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Order Fulfillment Rate</span>
                <span className="font-bold">98.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Inventory Turnover</span>
                <span className="font-bold">8.2x</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Defect Rate</span>
                <span className="font-bold">0.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

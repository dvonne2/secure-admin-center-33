
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Users, TrendingUp, Target } from "lucide-react";

export default function CPODashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CPO Dashboard</h1>
          <p className="text-muted-foreground">Chief Product Officer Overview</p>
        </div>
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
          Product Executive
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">
              +3 from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">
              +0.2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Product Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">
              +18% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feature Adoption</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Roadmap</CardTitle>
            <CardDescription>Upcoming product milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Mobile App v2.0</span>
                <Badge>In Development</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">API Enhancement</span>
                <Badge>Testing</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Analytics Dashboard</span>
                <Badge variant="secondary">Planning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Metrics</CardTitle>
            <CardDescription>Key product performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Daily Active Users</span>
                <span className="font-bold">45,230</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Monthly Retention</span>
                <span className="font-bold">82%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Churn Rate</span>
                <span className="font-bold">3.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Time to Value</span>
                <span className="font-bold">2.3 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

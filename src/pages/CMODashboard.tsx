
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Target, BarChart3 } from "lucide-react";

export default function CMODashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CMO Dashboard</h1>
          <p className="text-muted-foreground">Chief Marketing Officer Overview</p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Marketing Executive
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaign ROI</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324%</div>
            <p className="text-xs text-muted-foreground">
              +12% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lead Generation</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brand Awareness</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
            <CardDescription>Currently running marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Summer Product Launch</span>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Brand Awareness Campaign</span>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Customer Retention</span>
                <Badge variant="secondary">Planning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketing Channels</CardTitle>
            <CardDescription>Performance by marketing channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Digital Advertising</span>
                <span className="font-bold">42%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Social Media</span>
                <span className="font-bold">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Content Marketing</span>
                <span className="font-bold">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Email Marketing</span>
                <span className="font-bold">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

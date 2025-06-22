
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Wrench, TrendingUp, AlertTriangle } from "lucide-react";

export default function ManufacturingDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manufacturing Dashboard</h1>
          <p className="text-muted-foreground">Manufacturing Department Overview</p>
        </div>
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
          Manufacturing
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Output</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              Units produced today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.5%</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Machine Status</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15/18</div>
            <p className="text-xs text-muted-foreground">
              Machines operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Scheduled maintenance due
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Production Lines</CardTitle>
            <CardDescription>Manufacturing line status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Line A - Assembly</span>
                <Badge>Running</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Line B - Packaging</span>
                <Badge>Running</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Line C - Quality Check</span>
                <Badge className="bg-orange-100 text-orange-800">Maintenance</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics</CardTitle>
            <CardDescription>Manufacturing quality indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>First Pass Yield</span>
                <span className="font-bold">97.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Scrap Rate</span>
                <span className="font-bold">2.1%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Overall Equipment Efficiency</span>
                <span className="font-bold">89.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

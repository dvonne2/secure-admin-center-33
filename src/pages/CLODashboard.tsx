
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, FileText, AlertCircle, CheckCircle } from "lucide-react";

export default function CLODashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CLO Dashboard</h1>
          <p className="text-muted-foreground">Chief Legal Officer Overview</p>
        </div>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          Legal Executive
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              -2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contracts Reviewed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">
              +23 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Risks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              -1 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cases Won</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              This year
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Legal Matters</CardTitle>
            <CardDescription>Current legal cases and matters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Intellectual Property Dispute</span>
                <Badge variant="destructive">High Priority</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Contract Negotiation</span>
                <Badge>In Progress</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Regulatory Compliance</span>
                <Badge variant="outline">Medium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>Legal and regulatory compliance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Corporate Governance</span>
                <span className="font-bold text-green-600">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Contract Compliance</span>
                <span className="font-bold text-green-600">97%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Protection</span>
                <span className="font-bold text-green-600">95%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Employment Law</span>
                <span className="font-bold text-yellow-600">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

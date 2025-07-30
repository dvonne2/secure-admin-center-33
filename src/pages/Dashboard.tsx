
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, ShoppingCart, DollarSign, Package, AlertTriangle, Bell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const metricCards = [
  {
    title: "Total Leads This Month",
    value: "1,284",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Orders Processed This Month", 
    value: "892",
    change: "+8.3%",
    icon: ShoppingCart,
    color: "text-green-600"
  },
  {
    title: "Sales Volume (₦)",
    value: "₦45,678,900",
    change: "+15.7%",
    icon: DollarSign,
    color: "text-purple-600"
  },
  {
    title: "Pending Deliveries",
    value: "127",
    change: "-2.1%",
    icon: Package,
    color: "text-orange-600"
  }
];

const salesTrendData = [
  { date: 'Jan 1', orders: 45 },
  { date: 'Jan 8', orders: 52 },
  { date: 'Jan 15', orders: 48 },
  { date: 'Jan 22', orders: 61 },
  { date: 'Jan 29', orders: 55 },
  { date: 'Feb 5', orders: 67 },
  { date: 'Feb 12', orders: 73 },
];

const recentActivity = [
  {
    id: 1,
    timestamp: "2024-07-30 14:25:00",
    user: "admin@company.com",
    description: "Updated inventory for Product SKU-001"
  },
  {
    id: 2, 
    timestamp: "2024-07-30 13:45:00",
    user: "manager@company.com",
    description: "Approved order #ORD-2024-001"
  },
  {
    id: 3,
    timestamp: "2024-07-30 12:15:00", 
    user: "telesales@company.com",
    description: "Created new lead for Lagos region"
  },
  {
    id: 4,
    timestamp: "2024-07-30 11:30:00",
    user: "delivery@company.com", 
    description: "Marked delivery #DEL-001 as completed"
  },
  {
    id: 5,
    timestamp: "2024-07-30 10:20:00",
    user: "inventory@company.com",
    description: "Stock replenishment for Warehouse A"
  }
];

const lowStockItems = [
  { productName: "Vita Boost Capsules", sku: "VBC-001", currentQty: 5 },
  { productName: "Energy Mix Powder", sku: "EMP-002", currentQty: 3 },
  { productName: "Immune Support Tablets", sku: "IST-003", currentQty: 7 },
  { productName: "Daily Multivitamin", sku: "DMV-004", currentQty: 2 }
];

const notifications = [
  {
    id: 1,
    type: "success",
    message: "Database Backup Successful",
    timestamp: "2024-07-30 12:00:00"
  },
  {
    id: 2,
    type: "info", 
    message: "New Telesales Staff Added",
    timestamp: "2024-07-30 10:30:00"
  },
  {
    id: 3,
    type: "warning",
    message: "Server CPU usage at 85%",
    timestamp: "2024-07-30 09:15:00"
  }
];

export default function Dashboard() {
  const [timeFilter, setTimeFilter] = React.useState("month");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">High-level system overview</p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={metric.change.includes('+') ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </span>
                {' '}from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Graph */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Order volume over time</CardDescription>
              </div>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Last 20 system actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex flex-col space-y-1 p-3 rounded-lg bg-muted/50">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium">{activity.user}</span>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Warning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Low Stock Warnings
            </CardTitle>
            <CardDescription>Products with less than 10 units</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Current Qty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.map((item, index) => (
                  <TableRow key={index} className="bg-red-50">
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">{item.currentQty}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Notifications Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Admin Notifications
            </CardTitle>
            <CardDescription>System alerts and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-green-500' :
                    notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Download, Search, Filter, Clock } from 'lucide-react';

// Mock log data
const mockLogs = [
  {
    id: 1,
    timestamp: "2024-07-30 14:25:32",
    user: "admin@company.com",
    actionType: "Update",
    description: "Updated inventory for Product SKU-001",
    ipAddress: "192.168.1.100"
  },
  {
    id: 2,
    timestamp: "2024-07-30 13:45:18",
    user: "manager@company.com", 
    actionType: "Login",
    description: "Successful login to dashboard",
    ipAddress: "192.168.1.105"
  },
  {
    id: 3,
    timestamp: "2024-07-30 12:15:44",
    user: "telesales@company.com",
    actionType: "Create",
    description: "Created new lead for Lagos region",
    ipAddress: "192.168.1.110"
  },
  {
    id: 4,
    timestamp: "2024-07-30 11:30:22",
    user: "delivery@company.com",
    actionType: "Update", 
    description: "Marked delivery #DEL-001 as completed",
    ipAddress: "192.168.1.115"
  },
  {
    id: 5,
    timestamp: "2024-07-30 10:20:55",
    user: "inventory@company.com",
    actionType: "API Call",
    description: "Stock replenishment API called for Warehouse A",
    ipAddress: "192.168.1.120"
  },
  {
    id: 6,
    timestamp: "2024-07-30 09:45:12",
    user: "admin@company.com",
    actionType: "Delete",
    description: "Deleted inactive user account",
    ipAddress: "192.168.1.100"
  },
  {
    id: 7,
    timestamp: "2024-07-30 08:30:33",
    user: "accountant@company.com",
    actionType: "Login",
    description: "Failed login attempt - incorrect password",
    ipAddress: "192.168.1.125"
  },
  {
    id: 8,
    timestamp: "2024-07-29 17:22:41",
    user: "system",
    actionType: "API Call",
    description: "Automated backup process initiated",
    ipAddress: "127.0.0.1"
  }
];

export default function SystemLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState<string>('all');
  const [actionTypeFilter, setActionTypeFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = userFilter === 'all' || log.user === userFilter;
    const matchesActionType = actionTypeFilter === 'all' || log.actionType === actionTypeFilter;
    
    return matchesSearch && matchesUser && matchesActionType;
  });

  const getActionTypeBadge = (actionType: string) => {
    const colorMap: { [key: string]: string } = {
      'Login': 'bg-blue-100 text-blue-800',
      'Update': 'bg-yellow-100 text-yellow-800', 
      'Create': 'bg-green-100 text-green-800',
      'Delete': 'bg-red-100 text-red-800',
      'API Call': 'bg-purple-100 text-purple-800'
    };
    return colorMap[actionType] || 'bg-gray-100 text-gray-800';
  };

  const uniqueUsers = Array.from(new Set(mockLogs.map(log => log.user)));
  const uniqueActionTypes = Array.from(new Set(mockLogs.map(log => log.actionType)));

  const exportLogs = (format: 'csv' | 'pdf') => {
    // Mock export functionality
    console.log(`Exporting logs in ${format.toUpperCase()} format...`);
    alert(`Logs exported in ${format.toUpperCase()} format!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Logs</h1>
        <p className="text-muted-foreground">
          Track internal actions, system changes, user behavior, and API events
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Log Filters</CardTitle>
          <CardDescription>Filter and search through system logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* User Filter */}
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {uniqueUsers.map(user => (
                  <SelectItem key={user} value={user}>{user}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Action Type Filter */}
            <Select value={actionTypeFilter} onValueChange={setActionTypeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {uniqueActionTypes.map(actionType => (
                  <SelectItem key={actionType} value={actionType}>{actionType}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Range Filter */}
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Options */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportLogs('csv')}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => exportLogs('pdf')}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>
            {filteredLogs.length} of {mockLogs.length} log entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>
                    <Badge className={getActionTypeBadge(log.actionType)}>
                      {log.actionType}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md truncate">{log.description}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Retention Policy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Data Retention Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Logs retained for 90 days.</strong> Contact admin to extend retention period or for archived log access.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

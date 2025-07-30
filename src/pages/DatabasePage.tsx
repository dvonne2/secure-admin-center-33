
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Database, Download, HardDrive, History, Shield, Trash2 } from 'lucide-react';

// Mock data for database management
const mockBackups = [
  {
    id: 1,
    filename: "vitalvida_backup_2024-07-30_14-00.sql",
    size: "145.2 MB",
    date: "2024-07-30 14:00:00",
    type: "Manual"
  },
  {
    id: 2,
    filename: "vitalvida_backup_2024-07-29_02-00.sql",
    size: "143.8 MB", 
    date: "2024-07-29 02:00:00",
    type: "Automatic"
  },
  {
    id: 3,
    filename: "vitalvida_backup_2024-07-28_02-00.sql",
    size: "142.1 MB",
    date: "2024-07-28 02:00:00", 
    type: "Automatic"
  },
  {
    id: 4,
    filename: "vitalvida_backup_2024-07-27_02-00.sql",
    size: "141.5 MB",
    date: "2024-07-27 02:00:00",
    type: "Automatic"
  },
  {
    id: 5,
    filename: "vitalvida_backup_2024-07-26_02-00.sql",
    size: "140.9 MB",
    date: "2024-07-26 02:00:00",
    type: "Automatic"
  }
];

const mockRestoreLogs = [
  {
    id: 1,
    timestamp: "2024-07-25 10:30:00",
    initiatedBy: "admin@company.com",
    status: "Success",
    notes: "Restored from backup after data corruption incident"
  },
  {
    id: 2,
    timestamp: "2024-07-20 15:45:00", 
    initiatedBy: "superadmin@company.com",
    status: "Failed",
    notes: "Backup file corrupted - used previous backup instead"
  },
  {
    id: 3,
    timestamp: "2024-07-15 09:00:00",
    initiatedBy: "admin@company.com", 
    status: "Success",
    notes: "Monthly system maintenance restore"
  }
];

const databaseStats = {
  totalSize: "147.8 MB",
  totalRecords: "89,432",
  monthlyGrowth: "+3.2%"
};

export default function DatabasePage() {
  const [selectedModule, setSelectedModule] = useState<string>('');

  const createBackup = () => {
    console.log('Creating new backup...');
    alert('Database backup initiated! You will be notified when complete.');
  };

  const downloadBackup = (filename: string) => {
    console.log(`Downloading backup: ${filename}`);
    alert(`Downloading ${filename}...`);
  };

  const deleteBackup = (filename: string) => {
    console.log(`Deleting backup: ${filename}`);
    if (confirm(`Are you sure you want to delete ${filename}?`)) {
      alert(`${filename} deleted successfully!`);
    }
  };

  const exportModule = () => {
    if (!selectedModule) {
      alert('Please select a module to export');
      return;
    }
    console.log(`Exporting module: ${selectedModule}`);
    alert(`Exporting ${selectedModule} data to CSV...`);
  };

  const getStatusBadge = (status: string) => {
    return status === 'Success' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Database Management</h1>
        <p className="text-muted-foreground">
          Admin-only access to view database status, trigger backups, and monitor data volume
        </p>
      </div>

      {/* Security Notice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Security Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              <strong>Admin Access Only:</strong> Only Global Admins can access this panel. 
              Logs of access are automatically recorded for security compliance.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Database Size Monitor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Database Statistics
          </CardTitle>
          <CardDescription>Current database size and growth metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Database className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-blue-900">{databaseStats.totalSize}</p>
              <p className="text-sm text-blue-700">Total Database Size</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <HardDrive className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <p className="text-2xl font-bold text-green-900">{databaseStats.totalRecords}</p>
              <p className="text-sm text-green-700"># of Records</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <AlertTriangle className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <p className="text-2xl font-bold text-purple-900">{databaseStats.monthlyGrowth}</p>
              <p className="text-sm text-purple-700">Monthly Growth</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup Management Panel */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Backup Management</CardTitle>
                <CardDescription>Create and manage database backups</CardDescription>
              </div>
              <Button onClick={createBackup}>
                <Database className="mr-2 h-4 w-4" />
                Create New Backup
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Filename</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBackups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell className="font-mono text-xs">{backup.filename}</TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>{new Date(backup.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={backup.type === 'Manual' ? 'default' : 'secondary'}>
                        {backup.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadBackup(backup.filename)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteBackup(backup.filename)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Export by Module */}
        <Card>
          <CardHeader>
            <CardTitle>Export by Module</CardTitle>
            <CardDescription>Export specific module data to CSV</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Module</label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a module to export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                  <SelectItem value="leads">Leads</SelectItem>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="deliveries">Deliveries</SelectItem>
                  <SelectItem value="financial">Financial Records</SelectItem>
                  <SelectItem value="logs">Activity Logs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={exportModule} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Export to CSV
            </Button>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> Large exports may take several minutes to complete. 
                You'll receive an email notification when the export is ready for download.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restore Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Restore Logs
          </CardTitle>
          <CardDescription>Previous restore attempts and their outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Initiated By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRestoreLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono">{log.timestamp}</TableCell>
                  <TableCell>{log.initiatedBy}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md truncate">{log.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

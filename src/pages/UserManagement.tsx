import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, UserPlus } from 'lucide-react';
import { User } from '@/types/auth';
import { AddUserModal } from '@/components/AddUserModal';

// Mock users data
const mockAllUsers: User[] = [
  {
    id: '1',
    username: 'superadmin',
    email: 'superadmin@company.com',
    role: 'superadmin',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-06-19T10:00:00Z'
  },
  {
    id: '2',
    username: 'admin',
    email: 'admin@company.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    lastLogin: '2024-06-19T09:30:00Z'
  },
  {
    id: '3',
    username: 'manager',
    email: 'manager@company.com',
    role: 'manager',
    status: 'active',
    createdAt: '2024-01-03T00:00:00Z',
    lastLogin: '2024-06-19T09:00:00Z'
  },
  {
    id: '4',
    username: 'user',
    email: 'user@company.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-04T00:00:00Z',
    lastLogin: '2024-06-19T08:30:00Z'
  },
  {
    id: '5',
    username: 'jane.smith',
    email: 'jane.smith@company.com',
    role: 'manager',
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z',
    lastLogin: '2024-06-18T16:45:00Z'
  },
  {
    id: '6',
    username: 'bob.wilson',
    email: 'bob.wilson@company.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-03-15T00:00:00Z',
    lastLogin: '2024-05-20T14:30:00Z'
  }
];

export default function UserManagement() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  if (!user || (user.role !== 'superadmin' && user.role !== 'admin')) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Access denied. Insufficient permissions.</p>
      </div>
    );
  }

  const filteredUsers = mockAllUsers.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeColor = (role: User['role']) => {
    switch (role) {
      case 'superadmin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'manager': return 'bg-green-100 text-green-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: User['status']) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        {user.role === 'superadmin' && (
          <Button onClick={() => setShowAddUserModal(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {filteredUsers.length} of {mockAllUsers.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(u.role)}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(u.status)}>
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user.role === 'superadmin' && u.id !== user.id && (
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddUserModal 
        open={showAddUserModal} 
        onOpenChange={setShowAddUserModal} 
      />
    </div>
  );
}

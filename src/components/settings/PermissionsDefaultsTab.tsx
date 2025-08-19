
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Users, ExternalLink } from 'lucide-react';

interface PermissionsDefaultsTabProps {
  onDataChange?: () => void;
}

const modules = [
  'Inventory',
  'Logistics', 
  'Telesales',
  'Finance',
  'Marketing',
  'KYC',
  'Academy'
];

const roles = [
  'Admin',
  'Manager', 
  'User',
  'Viewer'
];

const permissions = ['Create', 'Read', 'Update', 'Delete'];

export function PermissionsDefaultsTab({ onDataChange }: PermissionsDefaultsTabProps) {
  const [rolePermissions, setRolePermissions] = useState<Record<string, Record<string, Record<string, boolean>>>>({});

  const handlePermissionChange = (role: string, module: string, permission: string, checked: boolean) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [module]: {
          ...prev[role]?.[module],
          [permission]: checked
        }
      }
    }));
    onDataChange?.();
  };

  const getPermissionValue = (role: string, module: string, permission: string) => {
    return rolePermissions[role]?.[module]?.[permission] || false;
  };

  return (
    <div className="space-y-6">
      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Manage individual user permissions and access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full justify-start">
            <ExternalLink className="mr-2 h-4 w-4" />
            Go to User Management
          </Button>
        </CardContent>
      </Card>

      {/* Role-based Default Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Default Permissions by Role</CardTitle>
          <CardDescription>
            Set default CRUD permissions for each role across modules. These are defaults for new users - individual overrides can be set in User Management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {roles.map(role => (
            <div key={role} className="space-y-4">
              <h4 className="font-medium text-lg border-b pb-2">{role} Defaults</h4>
              <div className="grid gap-4">
                {modules.map(module => (
                  <div key={module} className="space-y-3">
                    <Label className="font-medium">{module}</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pl-4">
                      {permissions.map(permission => (
                        <div key={permission} className="flex items-center space-x-2">
                          <Switch
                            id={`${role}-${module}-${permission}`}
                            checked={getPermissionValue(role, module, permission)}
                            onCheckedChange={(checked) => 
                              handlePermissionChange(role, module, permission, checked)
                            }
                          />
                          <Label 
                            htmlFor={`${role}-${module}-${permission}`}
                            className="text-sm"
                          >
                            {permission}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

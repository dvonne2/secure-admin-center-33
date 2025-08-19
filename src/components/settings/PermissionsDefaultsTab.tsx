
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Users, ExternalLink } from 'lucide-react';

interface PermissionsDefaultsTabProps {
  onDataChange: () => void;
}

const modules = [
  'Inventory', 'Logistics', 'Telesales', 'Finance', 
  'Marketing', 'KYC', 'Academy'
];

const roles = ['superadmin', 'admin', 'manager', 'user'];

const permissions = ['Create', 'Read', 'Update', 'Delete'];

export function PermissionsDefaultsTab({ onDataChange }: PermissionsDefaultsTabProps) {
  const [rolePermissions, setRolePermissions] = useState<Record<string, Record<string, Record<string, boolean>>>>({
    superadmin: {},
    admin: {},
    manager: {},
    user: {}
  });

  const handlePermissionChange = (role: string, module: string, permission: string, value: boolean) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [module]: {
          ...prev[role]?.[module],
          [permission]: value
        }
      }
    }));
    onDataChange();
  };

  const getPermissionValue = (role: string, module: string, permission: string): boolean => {
    return rolePermissions[role]?.[module]?.[permission] || false;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Default Role Permissions
          </CardTitle>
          <CardDescription>
            Set default permissions for each role across modules. Individual user overrides can be managed in User Management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button variant="outline" className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open User Management
          </Button>

          <div className="space-y-6">
            {roles.map((role) => (
              <Card key={role} className="border-muted">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg capitalize">{role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modules.map((module) => (
                      <div key={module} className="border rounded-lg p-4">
                        <Label className="text-sm font-medium mb-3 block">{module}</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {permissions.map((permission) => (
                            <div key={permission} className="flex items-center justify-between">
                              <Label className="text-xs text-muted-foreground">{permission}</Label>
                              <Switch
                                checked={getPermissionValue(role, module, permission)}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(role, module, permission, checked)
                                }
                                size="sm"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> These settings define the default permissions granted when creating new users with each role. 
              Existing users and individual permission overrides are managed in the User Management section.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

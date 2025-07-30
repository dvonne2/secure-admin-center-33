
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Upload, Save, Building, Palette, Bell, Shield, Settings, Database } from 'lucide-react';

export default function SystemSettings() {
  const [companyProfile, setCompanyProfile] = useState({
    businessName: 'Vitalvida Enterprise',
    address: '123 Business District, Lagos, Nigeria',
    supportEmail: 'support@vitalvida.com',
    supportPhone: '+234-800-VITA-LIFE',
    logo: null,
    favicon: null
  });

  const [branding, setBranding] = useState({
    sidebarTheme: 'blue',
    font: 'inter',
    defaultBranding: true
  });

  const [notifications, setNotifications] = useState({
    systemNotifications: true,
    emailAlerts: true,
    newUserAlert: true,
    lowStockAlert: true,
    slackWebhook: ''
  });

  const [sessionControl, setSessionControl] = useState({
    sessionTimeout: 30,
    simultaneousLogin: false
  });

  const [systemBehavior, setSystemBehavior] = useState({
    maintenanceMode: false,
    enableEditLogs: true,
    allowManualBackups: true
  });

  const handleSaveTab = (tabName: string) => {
    console.log(`Saving ${tabName} settings...`);
    alert(`${tabName} settings saved successfully!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">
          Configure core business info, branding, and platform behavior
        </p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="session">Session</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Company Profile Tab */}
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Profile
              </CardTitle>
              <CardDescription>
                Manage your business information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={companyProfile.businessName}
                    onChange={(e) => setCompanyProfile(prev => ({
                      ...prev,
                      businessName: e.target.value
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={companyProfile.supportEmail}
                    onChange={(e) => setCompanyProfile(prev => ({
                      ...prev,
                      supportEmail: e.target.value
                    }))}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    value={companyProfile.address}
                    onChange={(e) => setCompanyProfile(prev => ({
                      ...prev,
                      address: e.target.value
                    }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input
                    id="supportPhone"
                    value={companyProfile.supportPhone}
                    onChange={(e) => setCompanyProfile(prev => ({
                      ...prev,
                      supportPhone: e.target.value
                    }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload favicon
                    </p>
                    <p className="text-xs text-gray-500">ICO, PNG 32x32px</p>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSaveTab('Company Profile')} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Company Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Branding Tab */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Platform Branding
              </CardTitle>
              <CardDescription>
                Customize the look and feel of your platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Sidebar Theme Color</Label>
                  <Select
                    value={branding.sidebarTheme}
                    onValueChange={(value) => setBranding(prev => ({
                      ...prev,
                      sidebarTheme: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Font</Label>
                  <Select
                    value={branding.font}
                    onValueChange={(value) => setBranding(prev => ({
                      ...prev,
                      font: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                      <SelectItem value="lato">Lato</SelectItem>
                      <SelectItem value="nunito">Nunito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="defaultBranding"
                  checked={branding.defaultBranding}
                  onCheckedChange={(checked) => setBranding(prev => ({
                    ...prev,
                    defaultBranding: checked
                  }))}
                />
                <Label htmlFor="defaultBranding">
                  Apply default branding company-wide
                </Label>
              </div>

              <Button onClick={() => handleSaveTab('Platform Branding')} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Branding Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable in-app system notifications
                    </p>
                  </div>
                  <Switch
                    checked={notifications.systemNotifications}
                    onCheckedChange={(checked) => setNotifications(prev => ({
                      ...prev,
                      systemNotifications: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Send important alerts via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({
                      ...prev,
                      emailAlerts: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New User Alert</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when new users are added
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newUserAlert}
                    onCheckedChange={(checked) => setNotifications(prev => ({
                      ...prev,
                      newUserAlert: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Low Stock Alert</Label>
                    <p className="text-sm text-muted-foreground">
                      Alert when inventory is low
                    </p>
                  </div>
                  <Switch
                    checked={notifications.lowStockAlert}
                    onCheckedChange={(checked) => setNotifications(prev => ({
                      ...prev,
                      lowStockAlert: checked
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slackWebhook">Slack Webhook URL (Optional)</Label>
                <Input
                  id="slackWebhook"
                  placeholder="https://hooks.slack.com/services/..."
                  value={notifications.slackWebhook}
                  onChange={(e) => setNotifications(prev => ({
                    ...prev,
                    slackWebhook: e.target.value
                  }))}
                />
              </div>

              <Button onClick={() => handleSaveTab('Notification Settings')} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Session Control Tab */}
        <TabsContent value="session">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Session Control
              </CardTitle>
              <CardDescription>
                Manage user session behavior and security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="480"
                    value={sessionControl.sessionTimeout}
                    onChange={(e) => setSessionControl(prev => ({
                      ...prev,
                      sessionTimeout: parseInt(e.target.value)
                    }))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Users will be logged out after this period of inactivity
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Simultaneous Logins</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to login from multiple devices
                  </p>
                </div>
                <Switch
                  checked={sessionControl.simultaneousLogin}
                  onCheckedChange={(checked) => setSessionControl(prev => ({
                    ...prev,
                    simultaneousLogin: checked
                  }))}
                />
              </div>

              <Button onClick={() => handleSaveTab('Session Control')} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Session Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Behavior Tab */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Behavior
              </CardTitle>
              <CardDescription>
                Configure core system functionality and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable maintenance mode to restrict access
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={systemBehavior.maintenanceMode}
                      onCheckedChange={(checked) => setSystemBehavior(prev => ({
                        ...prev,
                        maintenanceMode: checked
                      }))}
                    />
                    {systemBehavior.maintenanceMode && (
                      <Badge variant="destructive">Active</Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Edit/Delete Logs</Label>
                    <p className="text-sm text-muted-foreground">
                      Log all edit and delete operations for audit
                    </p>
                  </div>
                  <Switch
                    checked={systemBehavior.enableEditLogs}
                    onCheckedChange={(checked) => setSystemBehavior(prev => ({
                      ...prev,
                      enableEditLogs: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Manual Database Backups</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable manual backup creation by admins
                    </p>
                  </div>
                  <Switch
                    checked={systemBehavior.allowManualBackups}
                    onCheckedChange={(checked) => setSystemBehavior(prev => ({
                      ...prev,
                      allowManualBackups: checked
                    }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSaveTab('System Behavior')} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save System Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Security & Compliance
              </CardTitle>
              <CardDescription>
                Security settings and compliance configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Security Notice</h4>
                <p className="text-blue-700 text-sm">
                  These settings affect system security. Changes are logged and require admin approval.
                  Contact your system administrator for sensitive security modifications.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Password Policy</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Minimum 8 characters required</li>
                    <li>• Must contain uppercase, lowercase, and numbers</li>
                    <li>• Special characters recommended</li>
                    <li>• Password expires every 90 days</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    2FA is enabled for all admin accounts
                  </p>
                  <Badge variant="outline">Configured</Badge>
                </div>
              </div>

              <Button onClick={() => handleSaveTab('Security Settings')} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

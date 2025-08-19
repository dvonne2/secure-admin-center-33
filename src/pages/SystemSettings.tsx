
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
import { Upload, Save, Building, Palette, Bell, Shield, Settings, Database, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SystemSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [companyProfile, setCompanyProfile] = useState({
    businessName: 'Vitalvida Enterprise',
    address: '123 Business District, Lagos, Nigeria',
    supportEmail: 'support@vitalvida.com',
    supportPhone: '+234-800-VITA-LIFE',
    website: 'https://www.vitalvida.com',
    logo: null,
    favicon: null
  });

  const [branding, setBranding] = useState({
    sidebarTheme: 'blue',
    font: 'inter',
    defaultBranding: true,
    primaryColor: '#000000',
    secondaryColor: '#6c757d'
  });

  const [notifications, setNotifications] = useState({
    systemNotifications: true,
    emailAlerts: true,
    newUserAlert: true,
    lowStockAlert: true,
    securityAlerts: true,
    maintenanceNotifications: true,
    slackWebhook: '',
    emailNotifications: 'immediate'
  });

  const [sessionControl, setSessionControl] = useState({
    sessionTimeout: 30,
    simultaneousLogin: false,
    passwordExpiry: 90,
    maxLoginAttempts: 3,
    twoFactorAuth: true
  });

  const [systemBehavior, setSystemBehavior] = useState({
    maintenanceMode: false,
    enableEditLogs: true,
    allowManualBackups: true,
    autoBackupFrequency: 'daily',
    dataRetentionPeriod: 365
  });

  const [security, setSecurity] = useState({
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    sessionEncryption: true,
    auditLogging: true
  });

  const handleSaveTab = async (tabName: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Saving ${tabName} settings...`);
      toast({
        title: "Settings Saved",
        description: `${tabName} settings have been successfully updated.`,
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: `Failed to save ${tabName} settings. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (type: 'logo' | 'favicon') => {
    // Simulate file upload
    toast({
      title: "File Upload",
      description: `${type} upload functionality would be implemented here.`,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
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
          <TabsTrigger value="session">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
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
                  <Label htmlFor="website">Company Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={companyProfile.website}
                    onChange={(e) => setCompanyProfile(prev => ({
                      ...prev,
                      website: e.target.value
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => handleFileUpload('logo')}
                  >
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => handleFileUpload('favicon')}
                  >
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload favicon
                    </p>
                    <p className="text-xs text-gray-500">ICO, PNG 32x32px</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => handleSaveTab('Company Profile')} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Company Profile
                  </>
                )}
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

                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={branding.primaryColor}
                    onChange={(e) => setBranding(prev => ({
                      ...prev,
                      primaryColor: e.target.value
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={branding.secondaryColor}
                    onChange={(e) => setBranding(prev => ({
                      ...prev,
                      secondaryColor: e.target.value
                    }))}
                  />
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

              <Button 
                onClick={() => handleSaveTab('Platform Branding')} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Branding Settings
                  </>
                )}
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
                {[
                  { key: 'systemNotifications', label: 'System Notifications', desc: 'Enable in-app system notifications' },
                  { key: 'emailAlerts', label: 'Email Alerts', desc: 'Send important alerts via email' },
                  { key: 'newUserAlert', label: 'New User Alert', desc: 'Notify when new users are added' },
                  { key: 'lowStockAlert', label: 'Low Stock Alert', desc: 'Alert when inventory is low' },
                  { key: 'securityAlerts', label: 'Security Alerts', desc: 'Notify about security-related events' },
                  { key: 'maintenanceNotifications', label: 'Maintenance Notifications', desc: 'System maintenance and updates' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications] as boolean}
                      onCheckedChange={(checked) => setNotifications(prev => ({
                        ...prev,
                        [item.key]: checked
                      }))}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Email Notification Frequency</Label>
                  <Select
                    value={notifications.emailNotifications}
                    onValueChange={(value) => setNotifications(prev => ({
                      ...prev,
                      emailNotifications: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Report</SelectItem>
                    </SelectContent>
                  </Select>
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
              </div>

              <Button 
                onClick={() => handleSaveTab('Notification Settings')} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Notification Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security & Session Control Tab */}
        <TabsContent value="session">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Session & Security Settings
                </CardTitle>
                <CardDescription>
                  Manage user session behavior and security policies
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
                        sessionTimeout: parseInt(e.target.value) || 30
                      }))}
                    />
                    <p className="text-sm text-muted-foreground">
                      Users will be logged out after this period of inactivity
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      min="30"
                      max="365"
                      value={sessionControl.passwordExpiry}
                      onChange={(e) => setSessionControl(prev => ({
                        ...prev,
                        passwordExpiry: parseInt(e.target.value) || 90
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      min="3"
                      max="10"
                      value={sessionControl.maxLoginAttempts}
                      onChange={(e) => setSessionControl(prev => ({
                        ...prev,
                        maxLoginAttempts: parseInt(e.target.value) || 3
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      min="6"
                      max="20"
                      value={security.passwordMinLength}
                      onChange={(e) => setSecurity(prev => ({
                        ...prev,
                        passwordMinLength: parseInt(e.target.value) || 8
                      }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'simultaneousLogin', state: sessionControl, setState: setSessionControl, label: 'Allow Simultaneous Logins', desc: 'Allow users to login from multiple devices' },
                    { key: 'twoFactorAuth', state: sessionControl, setState: setSessionControl, label: 'Two-Factor Authentication', desc: 'Require 2FA for all users' },
                    { key: 'requireSpecialChars', state: security, setState: setSecurity, label: 'Require Special Characters', desc: 'Passwords must contain special characters' },
                    { key: 'requireNumbers', state: security, setState: setSecurity, label: 'Require Numbers', desc: 'Passwords must contain numbers' },
                    { key: 'requireUppercase', state: security, setState: setSecurity, label: 'Require Uppercase', desc: 'Passwords must contain uppercase letters' },
                    { key: 'sessionEncryption', state: security, setState: setSecurity, label: 'Session Encryption', desc: 'Encrypt user session data' },
                    { key: 'auditLogging', state: security, setState: setSecurity, label: 'Audit Logging', desc: 'Log all security-related events' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{item.label}</Label>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch
                        checked={item.state[item.key as keyof typeof item.state] as boolean}
                        onCheckedChange={(checked) => item.setState(prev => ({
                          ...prev,
                          [item.key]: checked
                        }))}
                      />
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={() => handleSaveTab('Security Settings')} 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Security Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Auto Backup Frequency</Label>
                  <Select
                    value={systemBehavior.autoBackupFrequency}
                    onValueChange={(value) => setSystemBehavior(prev => ({
                      ...prev,
                      autoBackupFrequency: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataRetentionPeriod">Data Retention Period (days)</Label>
                  <Input
                    id="dataRetentionPeriod"
                    type="number"
                    min="30"
                    max="2555"
                    value={systemBehavior.dataRetentionPeriod}
                    onChange={(e) => setSystemBehavior(prev => ({
                      ...prev,
                      dataRetentionPeriod: parseInt(e.target.value) || 365
                    }))}
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleSaveTab('System Behavior')} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save System Settings
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Advanced Configuration
                </CardTitle>
                <CardDescription>
                  Advanced system settings and database management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Advanced Settings Warning</h4>
                      <p className="text-yellow-700 text-sm">
                        These settings can significantly impact system performance and security. 
                        Only modify these settings if you understand the implications or have been 
                        instructed by technical support.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      System Health
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Database Status:</span>
                        <Badge variant="outline" className="text-green-600">Online</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Backup:</span>
                        <span className="text-muted-foreground">2 hours ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Disk Usage:</span>
                        <span className="text-muted-foreground">68% (2.3GB)</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Database className="mr-2 h-4 w-4" />
                        Create Manual Backup
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        System Diagnostics
                      </Button>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">System Maintenance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="justify-start">
                      Clear Cache
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Rebuild Index
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Export Logs
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={() => handleSaveTab('Advanced Configuration')} 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Advanced Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

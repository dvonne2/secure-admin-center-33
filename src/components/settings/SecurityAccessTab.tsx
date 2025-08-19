
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, LogOut, Lock, Network } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityAccessTabProps {
  onDataChange: () => void;
}

export function SecurityAccessTab({ onDataChange }: SecurityAccessTabProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordMinLength: 8,
    passwordComplexity: true,
    passwordExpiry: 90,
    ipAllowlist: '',
    ipBlocklist: '',
    rateLimiting: 'medium'
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    onDataChange();
  };

  const handleForceLogoutAll = () => {
    toast({
      title: "Force Logout Initiated",
      description: "All active sessions will be terminated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentication & Sessions
          </CardTitle>
          <CardDescription>
            Manage user authentication and session policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require 2FA for all user roles by default
              </p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => handleInputChange('twoFactorAuth', checked)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                min="5"
                max="480"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value) || 30)}
              />
              <p className="text-xs text-muted-foreground">
                Users will be logged out after this period of inactivity
              </p>
            </div>

            <div className="space-y-2">
              <Label>Force Logout All Sessions</Label>
              <Button 
                variant="destructive" 
                onClick={handleForceLogoutAll}
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout All Users
              </Button>
              <p className="text-xs text-muted-foreground">
                Immediately terminate all active user sessions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Password Policy
          </CardTitle>
          <CardDescription>
            Configure password requirements and expiry rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passwordMinLength">Minimum Length</Label>
              <Input
                id="passwordMinLength"
                type="number"
                min="6"
                max="20"
                value={settings.passwordMinLength}
                onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value) || 8)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordExpiry">Expiry (days)</Label>
              <Input
                id="passwordExpiry"
                type="number"
                min="30"
                max="365"
                value={settings.passwordExpiry}
                onChange={(e) => handleInputChange('passwordExpiry', parseInt(e.target.value) || 90)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Complexity Required</Label>
                <p className="text-xs text-muted-foreground">
                  Upper, lower, numbers, symbols
                </p>
              </div>
              <Switch
                checked={settings.passwordComplexity}
                onCheckedChange={(checked) => handleInputChange('passwordComplexity', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            IP Rules & Rate Limiting
          </CardTitle>
          <CardDescription>
            Control access by IP address and set rate limiting policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ipAllowlist">IP Allowlist</Label>
              <Textarea
                id="ipAllowlist"
                placeholder="192.168.1.0/24&#10;10.0.0.1&#10;203.0.113.0/24"
                value={settings.ipAllowlist}
                onChange={(e) => handleInputChange('ipAllowlist', e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                One IP address or CIDR block per line
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ipBlocklist">IP Blocklist</Label>
              <Textarea
                id="ipBlocklist"
                placeholder="203.0.113.1&#10;198.51.100.0/24"
                value={settings.ipBlocklist}
                onChange={(e) => handleInputChange('ipBlocklist', e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Blocked IPs take priority over allowlist
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rate Limiting Preset</Label>
            <Select value={settings.rateLimiting} onValueChange={(value) => handleInputChange('rateLimiting', value)}>
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (100 req/min)</SelectItem>
                <SelectItem value="medium">Medium (50 req/min)</SelectItem>
                <SelectItem value="high">High (20 req/min)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Rate limiting is enforced by the backend
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

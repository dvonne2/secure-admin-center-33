
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, MessageSquare, ExternalLink } from 'lucide-react';

interface NotificationsTabProps {
  onDataChange: () => void;
}

export function NotificationsTab({ onDataChange }: NotificationsTabProps) {
  const [settings, setSettings] = useState({
    fromName: 'Vitalvida Enterprise',
    fromEmail: 'noreply@vitalvida.com',
    smsProvider: 'twilio',
    senderId: 'VitalVida',
    senderNumber: '+234800000000',
    criticalErrors: true,
    lowStockAlerts: true,
    paymentMismatch: true,
    slaBreachAlerts: true
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    onDataChange();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            System Email Settings
          </CardTitle>
          <CardDescription>
            Configure system email sender details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromName">From Name</Label>
              <Input
                id="fromName"
                value={settings.fromName}
                onChange={(e) => handleInputChange('fromName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input
                id="fromEmail"
                type="email"
                value={settings.fromEmail}
                onChange={(e) => handleInputChange('fromEmail', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            SMS/WhatsApp Settings
          </CardTitle>
          <CardDescription>
            Configure SMS and WhatsApp messaging providers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select value={settings.smsProvider} onValueChange={(value) => handleInputChange('smsProvider', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="vonage">Vonage</SelectItem>
                  <SelectItem value="africastalking">Africa's Talking</SelectItem>
                  <SelectItem value="whatsapp-business">WhatsApp Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senderId">Sender ID</Label>
              <Input
                id="senderId"
                value={settings.senderId}
                onChange={(e) => handleInputChange('senderId', e.target.value)}
                maxLength={11}
              />
              <p className="text-xs text-muted-foreground">Max 11 characters</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senderNumber">Sender Number</Label>
              <Input
                id="senderNumber"
                value={settings.senderNumber}
                onChange={(e) => handleInputChange('senderNumber', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alert Settings
          </CardTitle>
          <CardDescription>
            Configure which system events trigger notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: 'criticalErrors', label: 'Critical System Errors', desc: 'Server errors, database issues, payment gateway failures' },
            { key: 'lowStockAlerts', label: 'Low Stock Alerts', desc: 'When inventory levels fall below minimum thresholds' },
            { key: 'paymentMismatch', label: 'Payment Mismatch Alerts', desc: 'When payments don\'t match expected amounts' },
            { key: 'slaBreachAlerts', label: 'SLA Breach Alerts', desc: 'When service level agreements are violated' }
          ].map((alert) => (
            <div key={alert.key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{alert.label}</Label>
                <p className="text-sm text-muted-foreground">{alert.desc}</p>
              </div>
              <Switch
                checked={settings[alert.key as keyof typeof settings] as boolean}
                onCheckedChange={(checked) => handleInputChange(alert.key, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email/SMS Templates</CardTitle>
          <CardDescription>
            Manage notification message templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            View/Edit Templates
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Opens the Templates management screen (coming soon)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

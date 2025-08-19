
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plug, CreditCard, Mail, HardDrive, RotateCw, TestTube } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IntegrationsTabProps {
  onDataChange: () => void;
}

export function IntegrationsTab({ onDataChange }: IntegrationsTabProps) {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    moniepointPublicKey: '',
    moniepointSecretKey: '',
    moniepointWebhookUrl: 'https://erp.vitalvida.com/webhooks/moniepoint',
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    smtpEncryption: 'tls',
    storageProvider: 'local',
    s3Bucket: '',
    s3AccessKey: '',
    s3SecretKey: '',
    cloudinaryCloudName: '',
    cloudinaryApiKey: '',
    cloudinaryApiSecret: ''
  });

  const handleInputChange = (field: string, value: string | number) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    onDataChange();
  };

  const handleRotateSecret = () => {
    toast({
      title: "Secret Rotation Requested",
      description: "New Moniepoint secret key will be generated.",
    });
  };

  const handleTestConnection = () => {
    toast({
      title: "Testing Connection",
      description: "SMTP connection test initiated...",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Moniepoint Payment Gateway
          </CardTitle>
          <CardDescription>
            Configure Moniepoint payment processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="moniepointPublicKey">Public Key</Label>
              <Input
                id="moniepointPublicKey"
                value={settings.moniepointPublicKey}
                onChange={(e) => handleInputChange('moniepointPublicKey', e.target.value)}
                placeholder="pk_test_..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="moniepointSecretKey">Secret Key</Label>
              <Input
                id="moniepointSecretKey"
                type="password"
                value={settings.moniepointSecretKey}
                onChange={(e) => handleInputChange('moniepointSecretKey', e.target.value)}
                placeholder="sk_test_..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moniepointWebhookUrl">Webhook URL (Read-only)</Label>
              <Input
                id="moniepointWebhookUrl"
                value={settings.moniepointWebhookUrl}
                readOnly
                className="bg-muted"
              />
            </div>

            <div className="flex items-end">
              <Button onClick={handleRotateSecret} variant="outline" className="w-full">
                <RotateCw className="mr-2 h-4 w-4" />
                Rotate Secret Key
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            SMTP Email Configuration
          </CardTitle>
          <CardDescription>
            Configure SMTP server for outbound emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={settings.smtpHost}
                onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                placeholder="smtp.gmail.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtpPort">Port</Label>
              <Input
                id="smtpPort"
                type="number"
                value={settings.smtpPort}
                onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value) || 587)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtpUsername">Username</Label>
              <Input
                id="smtpUsername"
                value={settings.smtpUsername}
                onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtpPassword">Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Encryption</Label>
              <Select value={settings.smtpEncryption} onValueChange={(value) => handleInputChange('smtpEncryption', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="tls">TLS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleTestConnection} variant="outline" className="w-full">
                <TestTube className="mr-2 h-4 w-4" />
                Test Connection
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            File Storage Configuration
          </CardTitle>
          <CardDescription>
            Configure where uploaded files are stored
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Storage Provider</Label>
            <Select value={settings.storageProvider} onValueChange={(value) => handleInputChange('storageProvider', value)}>
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local Storage</SelectItem>
                <SelectItem value="s3">Amazon S3</SelectItem>
                <SelectItem value="cloudinary">Cloudinary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.storageProvider === 's3' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="s3Bucket">S3 Bucket</Label>
                <Input
                  id="s3Bucket"
                  value={settings.s3Bucket}
                  onChange={(e) => handleInputChange('s3Bucket', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s3AccessKey">Access Key</Label>
                <Input
                  id="s3AccessKey"
                  value={settings.s3AccessKey}
                  onChange={(e) => handleInputChange('s3AccessKey', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s3SecretKey">Secret Key</Label>
                <Input
                  id="s3SecretKey"
                  type="password"
                  value={settings.s3SecretKey}
                  onChange={(e) => handleInputChange('s3SecretKey', e.target.value)}
                />
              </div>
            </div>
          )}

          {settings.storageProvider === 'cloudinary' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="cloudinaryCloudName">Cloud Name</Label>
                <Input
                  id="cloudinaryCloudName"
                  value={settings.cloudinaryCloudName}
                  onChange={(e) => handleInputChange('cloudinaryCloudName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cloudinaryApiKey">API Key</Label>
                <Input
                  id="cloudinaryApiKey"
                  value={settings.cloudinaryApiKey}
                  onChange={(e) => handleInputChange('cloudinaryApiKey', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cloudinaryApiSecret">API Secret</Label>
                <Input
                  id="cloudinaryApiSecret"
                  type="password"
                  value={settings.cloudinaryApiSecret}
                  onChange={(e) => handleInputChange('cloudinaryApiSecret', e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

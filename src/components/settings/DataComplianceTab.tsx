
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Database, Download, Trash2, FileText } from 'lucide-react';

interface DataComplianceTabProps {
  onDataChange: () => void;
}

export function DataComplianceTab({ onDataChange }: DataComplianceTabProps) {
  const [settings, setSettings] = useState({
    dataRetentionDays: 365,
    privacyNoticeUrl: '',
    termsUrl: ''
  });

  const handleInputChange = (field: string, value: string | number) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    onDataChange();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Retention & Audit
          </CardTitle>
          <CardDescription>
            Configure data retention policies and audit logging
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dataRetentionDays">Data Retention Period (days)</Label>
            <Input
              id="dataRetentionDays"
              type="number"
              min="30"
              max="2555"
              value={settings.dataRetentionDays}
              onChange={(e) => handleInputChange('dataRetentionDays', parseInt(e.target.value) || 365)}
              className="w-full md:w-1/3"
            />
            <p className="text-sm text-muted-foreground">
              Logs and audit trails older than this will be automatically deleted
            </p>
          </div>

          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export System Logs
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Legal & Privacy
          </CardTitle>
          <CardDescription>
            Configure privacy policy and terms of service URLs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="privacyNoticeUrl">Privacy Notice URL</Label>
            <Input
              id="privacyNoticeUrl"
              type="url"
              value={settings.privacyNoticeUrl}
              onChange={(e) => handleInputChange('privacyNoticeUrl', e.target.value)}
              placeholder="https://vitalvida.com/privacy"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="termsUrl">Terms of Service URL</Label>
            <Input
              id="termsUrl"
              type="url"
              value={settings.termsUrl}
              onChange={(e) => handleInputChange('termsUrl', e.target.value)}
              placeholder="https://vitalvida.com/terms"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Data Management</CardTitle>
          <CardDescription>
            Handle user data requests and account deletion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download User Data (Coming Soon)
          </Button>

          <Button variant="destructive" className="w-full">
            <Trash2 className="mr-2 h-4 w-4" />
            Process Account Deletion Requests (Coming Soon)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

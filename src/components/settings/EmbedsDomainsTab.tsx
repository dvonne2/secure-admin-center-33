
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe, Shield } from 'lucide-react';

interface EmbedsDomainsTabProps {
  onDataChange: () => void;
}

export function EmbedsDomainsTab({ onDataChange }: EmbedsDomainsTabProps) {
  const [settings, setSettings] = useState({
    allowedDomains: 'https://vitalvida.com\nhttps://www.vitalvida.com\nhttps://app.vitalvida.com',
    clickjackingProtection: true
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
            <Globe className="h-5 w-5" />
            Allowed Embed Domains
          </CardTitle>
          <CardDescription>
            Configure which domains can embed your forms and content (CSP policy)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="allowedDomains">Allowed Domains</Label>
            <Textarea
              id="allowedDomains"
              placeholder="https://example.com&#10;https://www.example.com&#10;https://subdomain.example.com"
              value={settings.allowedDomains}
              onChange={(e) => handleInputChange('allowedDomains', e.target.value)}
              rows={6}
            />
            <p className="text-sm text-muted-foreground">
              Enter one domain per line. These domains will be allowed to embed your forms and content.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security headers and frame protection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Clickjacking Protection</Label>
              <p className="text-sm text-muted-foreground">
                Enable X-Frame-Options header (SAMEORIGIN or ALLOWLIST based on domains above)
              </p>
            </div>
            <Switch
              checked={settings.clickjackingProtection}
              onCheckedChange={(checked) => handleInputChange('clickjackingProtection', checked)}
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Note:</strong> This section controls global embedding rules for your ERP system. 
              Form-specific embed codes and iFrame generators are managed in the Forms section.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

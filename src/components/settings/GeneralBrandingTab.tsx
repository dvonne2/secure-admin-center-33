
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Building, Palette } from 'lucide-react';

interface GeneralBrandingTabProps {
  onDataChange: () => void;
}

export function GeneralBrandingTab({ onDataChange }: GeneralBrandingTabProps) {
  const [settings, setSettings] = useState({
    companyName: 'Vitalvida Enterprise',
    supportEmail: 'support@vitalvida.com',
    supportPhone: '+234-800-VITA-LIFE',
    primaryColor: '#000000',
    secondaryColor: '#6c757d',
    timezone: 'Africa/Lagos',
    currency: 'NGN',
    numberFormat: 'en-NG'
  });

  const handleInputChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    onDataChange();
  };

  const handleFileUpload = (type: 'square-logo' | 'horizontal-logo' | 'favicon') => {
    console.log(`Uploading ${type}...`);
    onDataChange();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Information
          </CardTitle>
          <CardDescription>
            Basic company details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange('supportEmail', e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="supportPhone">Support Phone</Label>
              <Input
                id="supportPhone"
                value={settings.supportPhone}
                onChange={(e) => handleInputChange('supportPhone', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Branding & Theme
          </CardTitle>
          <CardDescription>
            Logo uploads and color theme customization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: 'square-logo' as const, label: 'Square Logo', desc: 'For avatars and icons' },
              { type: 'horizontal-logo' as const, label: 'Horizontal Logo', desc: 'For headers and navigation' },
              { type: 'favicon' as const, label: 'Favicon', desc: 'Browser tab icon' }
            ].map((item) => (
              <div key={item.type} className="space-y-2">
                <Label>{item.label}</Label>
                <div 
                  className="border-2 border-dashed border-muted rounded-lg p-4 text-center cursor-pointer hover:border-muted-foreground transition-colors"
                  onClick={() => handleFileUpload(item.type)}
                >
                  <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload
                  </p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={settings.secondaryColor}
                  onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                  placeholder="#6c757d"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regional Settings</CardTitle>
          <CardDescription>
            Timezone, currency and number formatting preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Number Format</Label>
              <Select value={settings.numberFormat} onValueChange={(value) => handleInputChange('numberFormat', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-NG">Nigerian (1,234.56)</SelectItem>
                  <SelectItem value="en-US">US (1,234.56)</SelectItem>
                  <SelectItem value="de-DE">German (1.234,56)</SelectItem>
                  <SelectItem value="fr-FR">French (1 234,56)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

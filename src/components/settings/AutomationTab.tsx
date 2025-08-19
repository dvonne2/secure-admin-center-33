
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, Info } from 'lucide-react';

interface AutomationTabProps {
  onDataChange: () => void;
}

export function AutomationTab({ onDataChange }: AutomationTabProps) {
  const [settings, setSettings] = useState({
    autoInvoice: true,
    autoPackage: false,
    daCompliance: true,
    slaTimers: true,
    auditTrailLock: false
  });

  const handleToggle = (field: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    onDataChange();
  };

  const automationFeatures = [
    {
      key: 'autoInvoice',
      label: 'Auto-Invoice on Order Create',
      description: 'Automatically generate invoices when new orders are created'
    },
    {
      key: 'autoPackage',
      label: 'Auto-Package on Payment Match',
      description: 'Automatically create packages when payments are matched to orders'
    },
    {
      key: 'daCompliance',
      label: 'DA Compliance Checks',
      description: 'Enforce delivery agent compliance verification workflows'
    },
    {
      key: 'slaTimers',
      label: 'SLA Timers',
      description: 'Activate service level agreement monitoring and alerts'
    },
    {
      key: 'auditTrailLock',
      label: 'Audit Trail Hard-Lock',
      description: 'Prevent any modification of audit trail records once created'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Automation & Feature Flags
          </CardTitle>
          <CardDescription>
            Control automated workflows and system behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {automationFeatures.map((feature) => (
            <div key={feature.key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{feature.label}</Label>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <Switch
                checked={settings[feature.key as keyof typeof settings]}
                onCheckedChange={(checked) => handleToggle(feature.key, checked)}
              />
            </div>
          ))}

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Important Note</h4>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  These toggles control UI behavior and state management only. 
                  The actual business logic and rule enforcement is handled by the backend system.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

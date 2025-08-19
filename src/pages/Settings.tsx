
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { GeneralBrandingTab } from '@/components/settings/GeneralBrandingTab';
import { SecurityAccessTab } from '@/components/settings/SecurityAccessTab';
import { PermissionsDefaultsTab } from '@/components/settings/PermissionsDefaultsTab';
import { NotificationsTab } from '@/components/settings/NotificationsTab';
import { IntegrationsTab } from '@/components/settings/IntegrationsTab';
import { DataComplianceTab } from '@/components/settings/DataComplianceTab';
import { AutomationTab } from '@/components/settings/AutomationTab';
import { EmbedsDomainsTab } from '@/components/settings/EmbedsDomainsTab';

export type SettingsTab = 
  | 'general-branding'
  | 'security-access'
  | 'permissions-defaults'
  | 'notifications'
  | 'integrations'
  | 'data-compliance'
  | 'automation'
  | 'embeds-domains';

export default function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general-branding');
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Saving ${activeTab} settings...`);
      toast({
        title: "Settings updated successfully",
        description: "Your changes have been saved.",
      });
      setHasChanges(false);
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general-branding':
        return <GeneralBrandingTab onDataChange={() => setHasChanges(true)} />;
      case 'security-access':
        return <SecurityAccessTab onDataChange={() => setHasChanges(true)} />;
      case 'permissions-defaults':
        return <PermissionsDefaultsTab onDataChange={() => setHasChanges(true)} />;
      case 'notifications':
        return <NotificationsTab onDataChange={() => setHasChanges(true)} />;
      case 'integrations':
        return <IntegrationsTab onDataChange={() => setHasChanges(true)} />;
      case 'data-compliance':
        return <DataComplianceTab onDataChange={() => setHasChanges(true)} />;
      case 'automation':
        return <AutomationTab onDataChange={() => setHasChanges(true)} />;
      case 'embeds-domains':
        return <EmbedsDomainsTab onDataChange={() => setHasChanges(true)} />;
      default:
        return <GeneralBrandingTab onDataChange={() => setHasChanges(true)} />;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <nav className="flex text-sm text-muted-foreground mb-2">
          <span>Dashboard</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">ERP Settings</span>
        </nav>
        <h1 className="text-3xl font-bold">ERP Settings</h1>
        <p className="text-muted-foreground">
          Configure your ERP system preferences and behavior
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6">
        {/* Left sidebar navigation */}
        <div className="w-64 flex-shrink-0">
          <SettingsSidebar 
            activeTab={activeTab} 
            onTabChange={setActiveTab}
          />
        </div>

        {/* Right content panel */}
        <div className="flex-1 relative">
          <div className="pb-20">
            {renderTabContent()}
          </div>
          
          {/* Sticky save button */}
          {hasChanges && (
            <div className="fixed bottom-6 right-6 z-50">
              <Button 
                onClick={handleSaveChanges}
                disabled={isLoading}
                size="lg"
                className="shadow-lg"
              >
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

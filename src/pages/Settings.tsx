
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  const renderTabContent = (tabValue: string) => {
    switch (tabValue as SettingsTab) {
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

      {/* Horizontal Tabs Layout */}
      <Tabs defaultValue="general-branding" onValueChange={(value) => setActiveTab(value as SettingsTab)}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
          <TabsTrigger value="general-branding" className="text-xs">General</TabsTrigger>
          <TabsTrigger value="security-access" className="text-xs">Security</TabsTrigger>
          <TabsTrigger value="permissions-defaults" className="text-xs">Permissions</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
          <TabsTrigger value="integrations" className="text-xs">Integrations</TabsTrigger>
          <TabsTrigger value="data-compliance" className="text-xs">Data</TabsTrigger>
          <TabsTrigger value="automation" className="text-xs">Automation</TabsTrigger>
          <TabsTrigger value="embeds-domains" className="text-xs">Embeds</TabsTrigger>
        </TabsList>

        {/* Content Area */}
        <div className="relative">
          <div className="pb-20">
            <TabsContent value="general-branding">
              {renderTabContent('general-branding')}
            </TabsContent>
            <TabsContent value="security-access">
              {renderTabContent('security-access')}
            </TabsContent>
            <TabsContent value="permissions-defaults">
              {renderTabContent('permissions-defaults')}
            </TabsContent>
            <TabsContent value="notifications">
              {renderTabContent('notifications')}
            </TabsContent>
            <TabsContent value="integrations">
              {renderTabContent('integrations')}
            </TabsContent>
            <TabsContent value="data-compliance">
              {renderTabContent('data-compliance')}
            </TabsContent>
            <TabsContent value="automation">
              {renderTabContent('automation')}
            </TabsContent>
            <TabsContent value="embeds-domains">
              {renderTabContent('embeds-domains')}
            </TabsContent>
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
      </Tabs>
    </div>
  );
}

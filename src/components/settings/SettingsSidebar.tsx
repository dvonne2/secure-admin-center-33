
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Building, 
  Shield, 
  Users, 
  Bell, 
  Plug, 
  Database, 
  Zap, 
  Globe 
} from 'lucide-react';
import type { SettingsTab } from '@/pages/Settings';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

const tabs = [
  {
    id: 'general-branding' as SettingsTab,
    label: 'General & Branding',
    icon: Building,
  },
  {
    id: 'security-access' as SettingsTab,
    label: 'Security & Access',
    icon: Shield,
  },
  {
    id: 'permissions-defaults' as SettingsTab,
    label: 'Permissions Defaults',
    icon: Users,
  },
  {
    id: 'notifications' as SettingsTab,
    label: 'Notifications',
    icon: Bell,
  },
  {
    id: 'integrations' as SettingsTab,
    label: 'Integrations',
    icon: Plug,
  },
  {
    id: 'data-compliance' as SettingsTab,
    label: 'Data & Compliance',
    icon: Database,
  },
  {
    id: 'automation' as SettingsTab,
    label: 'Automation & Feature Flags',
    icon: Zap,
  },
  {
    id: 'embeds-domains' as SettingsTab,
    label: 'Embeds & Domains',
    icon: Globe,
  },
];

export function SettingsSidebar({ activeTab, onTabChange }: SettingsSidebarProps) {
  return (
    <nav className="space-y-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors text-left",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

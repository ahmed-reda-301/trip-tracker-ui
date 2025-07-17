// components/MainContent.jsx
import React from "react";
import {
  MapPin,
  Route,
  Anchor,
  BarChart3,
  Settings,
  AlertTriangle,
  FileText,
} from "lucide-react";
import StatusCard from "./StatusCard";

interface MainContentProps {
  activeTab: string;
}

const tabConfig: Record<string, { title: string; icon: React.ElementType }> = {
  "location-monitor": { title: "Location Monitor", icon: MapPin },
  "focused-trips": { title: "Focused Trips", icon: Route },
  "assigned-ports": { title: "My Assigned Ports", icon: Anchor },
  dashboard: { title: "Dashboard", icon: BarChart3 },
  configuration: { title: "Configuration", icon: Settings },
  "suspicious-trips": { title: "Suspicious Trips", icon: AlertTriangle },
  reports: { title: "Reports", icon: FileText },
  default: { title: "Page Under Construction", icon: Settings },
};

const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const { title, icon: Icon } = tabConfig[activeTab] || tabConfig.default;

  return (
    <main className="flex-1 bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Icon className="w-10 h-10 text-teal-600" />
            <h1 className="text-5xl font-bold text-gray-900">{title}</h1>
          </div>
        </div>
        <div className="grid gap-6 max-w-4xl mx-auto mb-12">
          <StatusCard
            title="Under Construction"
            content="This page is currently under construction. Please check back later."
            type="notice"
            icon={undefined}
            onClick={undefined}
          />
        </div>
      </div>
    </main>
  );
};

export default MainContent;

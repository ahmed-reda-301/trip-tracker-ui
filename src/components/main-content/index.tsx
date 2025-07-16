// components/MainContent.jsx
import React from "react";
import { Settings, MapPin, Activity, Clock } from "lucide-react";
import StatusCard from "./StatusCard";

interface MainContentProps {
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  activeTab,
  onTabChange,
}) => {
  const getPageContent = () => {
    switch (activeTab) {
      case "location-monitor":
        return {
          title: "Location Monitor",
          subtitle: "Real-time tracking and monitoring of cargo movements",
          description:
            "This page is under development. Content will be added soon.",
          cards: [
            {
              title: "Navigation Test",
              content:
                "This page demonstrates that the navigation system is working correctly.",
              type: "info",
            },
            {
              title: "System Status",
              content:
                "All location monitoring systems are operational and functioning as expected.",
              type: "success",
            },
            {
              title: "Development Notice",
              content:
                "Advanced tracking features and real-time dashboards are currently in development.",
              type: "notice",
            },
          ],
        };

      case "focused-trips":
        return {
          title: "Focused Trips",
          subtitle: "Monitor high-priority and flagged cargo movements",
          description:
            "Track and analyze focused trips for enhanced security monitoring.",
          cards: [
            {
              title: "Active Monitoring",
              content:
                "Currently monitoring 12 high-priority trips across different ports.",
              type: "info",
            },
            {
              title: "Alert System",
              content:
                "Real-time alerts for suspicious activities and route deviations.",
              type: "warning",
            },
          ],
        };

      case "assigned-ports":
        return {
          title: "My Assigned Ports",
          subtitle: "Manage and monitor your assigned port locations",
          description: "View and manage all ports under your supervision.",
          cards: [
            {
              title: "Port Assignment",
              content:
                "You are currently assigned to 3 major ports in the Eastern region.",
              type: "info",
            },
            {
              title: "Port Status",
              content:
                "All assigned ports are operational with normal traffic flow.",
              type: "success",
            },
          ],
        };

      case "dashboard":
        return {
          title: "Dashboard",
          subtitle: "Overview of system performance and key metrics",
          description:
            "Comprehensive dashboard with real-time analytics and reports.",
          cards: [
            {
              title: "Performance Metrics",
              content:
                "System performance is optimal with 99.8% uptime this month.",
              type: "success",
            },
            {
              title: "Traffic Analysis",
              content:
                "Processing 1,247 cargo movements with average clearance time of 2.3 hours.",
              type: "info",
            },
          ],
        };

      default:
        return {
          title: "Page Under Development",
          subtitle: "This section is currently being built",
          description: "New features and functionality will be available soon.",
          cards: [
            {
              title: "Coming Soon",
              content:
                "This page is under active development. Please check back later.",
              type: "notice",
            },
          ],
        };
    }
  };

  const content = getPageContent();

  return (
    <main className="flex-1 bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MapPin className="w-8 h-8 text-teal-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              {content.title}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
            {content.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid gap-6 max-w-4xl mx-auto mb-12">
          {content.cards.map((card) => (
            <StatusCard
              key={card.title}
              title={card.title}
              content={card.content}
              type={card.type}
              icon={undefined}
              onClick={onTabChange ? () => onTabChange(card.title) : undefined}
            />
          ))}
        </div>

        {/* Development Notice */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200">
            <Settings className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Under Development</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Monitors</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tracked Locations</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">2.3s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;

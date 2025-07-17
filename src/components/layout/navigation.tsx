"use client";

// components/Navigation.jsx
import React, { useState } from "react";
import {
  ChevronDown,
  MapPin,
  Route,
  Anchor,
  BarChart3,
  Settings,
  AlertTriangle,
  FileText,
  TrendingUp,
  Users,
  Database,
  Menu,
} from "lucide-react";

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (key: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeTab = "",
  onTabChange = () => {},
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    {
      key: "location-monitor",
      label: "Location Monitor",
      icon: MapPin,
      active: true,
    },
    {
      key: "focused-trips",
      label: "Focused Trips",
      icon: Route,
    },
    {
      key: "assigned-ports",
      label: "My Assigned Ports",
      icon: Anchor,
    },
    {
      key: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
    },
    {
      key: "configuration",
      label: "Configuration",
      icon: Settings,
    },
    {
      key: "suspicious-trips",
      label: "Suspicious Trips",
      icon: AlertTriangle,
    },
    {
      key: "reports",
      label: "Reports",
      icon: FileText,
      hasDropdown: true,
      dropdownItems: [
        { key: "analytics", label: "Analytics Reports", icon: TrendingUp },
        { key: "compliance", label: "Compliance Reports", icon: FileText },
        { key: "user-activity", label: "User Activity", icon: Users },
        { key: "system-logs", label: "System Logs", icon: Database },
      ],
    },
  ];

  const handleDropdownToggle = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleTabClick = (item: (typeof navigationItems)[number]) => {
    if (item.hasDropdown) {
      handleDropdownToggle(item.key);
    } else {
      onTabChange(item.key);
      setOpenDropdown(null);
    }
  };

  const handleDropdownItemClick = (parentKey: string, itemKey: string) => {
    onTabChange(`${parentKey}-${itemKey}`);
    setOpenDropdown(null);
  };

  return (
    <>
      {/* Sidebar Button for small screens */}
      {!sidebarOpen && (
        <button
          className="md:hidden absolute top-20 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
          style={{ position: "absolute" }}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "transparent" }}
        onClick={() => setSidebarOpen(false)}
      >
        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-slate-800 text-white shadow-lg transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex flex-col gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    handleTabClick(item);
                    setSidebarOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 min-w-fit text-slate-300 hover:text-white hover:bg-slate-600"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main horizontal navigation (hidden on small screens) */}
      <nav className="bg-slate-700 border-t border-slate-600 relative w-full hidden md:block">
        <div className="px-2 py-2 w-full">
          <div className="flex gap-2 overflow-x-auto w-full">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeTab === item.key || activeTab.startsWith(`${item.key}-`);

              return (
                <div key={item.key} className="relative">
                  <button
                    onClick={() => handleTabClick(item)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 min-w-fit
                      ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-slate-300 hover:text-white hover:bg-slate-600"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.key ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && openDropdown === item.key && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {item.dropdownItems.map((dropdownItem) => {
                        const DropdownIcon = dropdownItem.icon;
                        return (
                          <button
                            key={dropdownItem.key}
                            onClick={() =>
                              handleDropdownItemClick(
                                item.key,
                                dropdownItem.key
                              )
                            }
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                          >
                            <DropdownIcon className="w-4 h-4" />
                            <span>{dropdownItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

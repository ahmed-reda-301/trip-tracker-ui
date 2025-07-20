"use client";

/**
 * Navigation Component
 *
 * Main navigation component for the Trip Tracker application.
 * Provides horizontal navigation for desktop and sidebar navigation for mobile.
 * Supports dropdown menus for nested navigation items.
 *
 * @author Trip Tracker Team
 * @version 1.0.0
 */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/shared/LanguageToggle";
import {
  ChevronDown,
  MapPin,
  Route,
  Anchor,
  BarChart3,
  Settings,
  AlertTriangle,
  FileText,
  Users,
  Database,
  Menu,
  LucideIcon,
  User,
  Globe,
  Bell,
  UserCircle,
  LogOut,
} from "lucide-react";

/**
 * Dropdown item interface for navigation sub-items
 */
interface DropdownItem {
  /** Unique identifier for the dropdown item */
  key: string;
  /** Display label for the dropdown item */
  label: string;
  /** Lucide icon component for the dropdown item */
  icon: LucideIcon;
  /** Navigation href/route for the dropdown item */
  href: string;
}

/**
 * Props interface for NavigationItem component
 */
interface NavigationItemProps {
  /** Display label for the navigation item */
  label: string;
  /** Lucide icon component for the navigation item */
  icon: LucideIcon;
  /** Whether this navigation item is currently active */
  isActive: boolean;
  /** Whether this item has a dropdown menu */
  hasDropdown?: boolean;
  /** Array of dropdown items if hasDropdown is true */
  dropdownItems?: DropdownItem[];
  /** Whether the dropdown is currently open */
  isDropdownOpen?: boolean;
  /** Click handler for the main navigation item */
  onClick: () => void;
  /** Click handler for dropdown items */
  onDropdownItemClick?: (itemKey: string) => void;
  /** Whether RTL mode is active */
  isRTL?: boolean;
}

/**
 * NavigationItem Component
 *
 * Individual navigation item component that supports both regular navigation
 * and dropdown functionality. Handles active states and click events.
 *
 * @param props - NavigationItemProps
 * @returns JSX.Element
 */
const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  icon: Icon,
  isActive,
  hasDropdown = false,
  dropdownItems = [],
  isDropdownOpen = false,
  onClick,
  onDropdownItemClick,
  isRTL = false,
}) => {
  return (
    <div className="relative dropdown-container">
      <button
        onClick={onClick}
        className={`
          flex items-center px-4 py-3 font-medium whitespace-nowrap transition-all duration-200 min-w-fit
          ${isRTL ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"}
          ${
            isActive
              ? "bg-[rgb(5,148,211)] text-white"
              : "bg-white text-black hover:bg-[#61B34F] hover:text-white"
          }
        `}
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
        {hasDropdown && (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Dropdown Menu - Responsive positioning */}
      {hasDropdown && isDropdownOpen && (
        <div
          className="absolute top-full left-0 z-50 min-w-[200px] bg-white shadow-xl border border-gray-200 py-1 rounded-lg mt-1
                        md:left-auto md:right-0
                        max-h-64 overflow-y-auto"
        >
          {dropdownItems.map((dropdownItem) => {
            const DropdownIcon = dropdownItem.icon;
            return (
              <button
                key={dropdownItem.key}
                onClick={() => onDropdownItemClick?.(dropdownItem.key)}
                className={`w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center text-sm whitespace-nowrap ${
                  isRTL ? "text-right flex-row-reverse" : "text-left"
                }`}
              >
                <DropdownIcon
                  className={`w-4 h-4 flex-shrink-0 ${isRTL ? "ml-3" : "mr-3"}`}
                />
                <span>{dropdownItem.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/**
 * Props interface for Navigation component
 */
interface NavigationProps {
  /** Currently active tab/navigation item key */
  activeTab?: string;
  /** Callback function when a tab/navigation item is changed */
  onTabChange?: (key: string) => void;
  /** Callback function when a report item is changed (for dropdown items) */
  onReportItemChange?: (key: string) => void;
  /** Header component props for mobile integration */
  headerProps?: {
    user?: {
      name?: string;
      email?: string;
      role?: string;
    };
    onLanguageChange?: (lang: string) => void;
    currentLanguage?: string;
  };
  /** External control for sidebar state */
  sidebarOpen?: boolean;
  /** Callback to set sidebar state */
  onSidebarChange?: (open: boolean) => void;
}

/**
 * Navigation Component
 *
 * Main navigation component that provides both horizontal navigation for desktop
 * and collapsible sidebar navigation for mobile devices. Supports nested dropdown
 * menus for complex navigation structures like reports.
 *
 * Features:
 * - Responsive design (horizontal on desktop, sidebar on mobile)
 * - Dropdown support for nested navigation
 * - Active state management
 * - Router integration for navigation
 * - Accessibility support
 *
 * @param props - NavigationProps
 * @returns JSX.Element
 */
const Navigation: React.FC<NavigationProps> = ({
  activeTab = "",
  onTabChange = () => {},
  onReportItemChange = () => {},
  headerProps = {
    user: {
      name: "Ahmed Al-Rashid",
      email: "ahmed@customs.gov.sa",
      role: "Customs Officer",
    },
    currentLanguage: "EN",
    onLanguageChange: () => {},
  },
  sidebarOpen: externalSidebarOpen = false,
  onSidebarChange = () => {},
}) => {
  const router = useRouter();
  const { language, setLanguage, t, isRTL } = useLanguage();

  // State management
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  // Use external sidebar state if provided, otherwise use internal state
  const sidebarOpen = externalSidebarOpen || internalSidebarOpen;
  const setSidebarOpen = (open: boolean) => {
    if (onSidebarChange) {
      onSidebarChange(open);
    } else {
      setInternalSidebarOpen(open);
    }
  };

  /**
   * Navigation items configuration
   * Defines all navigation items with their properties and dropdown items
   */
  const navigationItems = [
    {
      key: "location-monitor",
      label: t("navigation.locationMonitor"),
      icon: MapPin,
      href: "/location-monitor",
      hasDropdown: false,
    },
    {
      key: "focused-trips",
      label: t("navigation.focusedTrips"),
      icon: Route,
      href: "/focused-trips",
      hasDropdown: false,
    },
    {
      key: "assigned-ports",
      label: t("navigation.assignedPorts"),
      icon: Anchor,
      href: "/assigned-ports",
      hasDropdown: false,
    },
    {
      key: "dashboard",
      label: t("navigation.dashboard"),
      icon: BarChart3,
      href: "/dashboard",
      hasDropdown: false,
    },
    {
      key: "configuration",
      label: t("navigation.configuration"),
      icon: Settings,
      href: "/configuration",
      hasDropdown: false,
    },
    {
      key: "suspicious-trips",
      label: t("navigation.suspiciousTrips"),
      icon: AlertTriangle,
      href: "/suspicious-trips",
      hasDropdown: false,
    },
    {
      key: "reports",
      label: t("navigation.reports"),
      icon: FileText,
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        {
          key: "trip-panel",
          label: t("reports.tripPanel"),
          icon: Route,
          href: "/reports/trip-panel",
        },
        {
          key: "all-alerts",
          label: t("reports.allAlerts"),
          icon: AlertTriangle,
          href: "/reports/all-alerts",
        },
        {
          key: "alert-panel",
          label: t("reports.alertPanel"),
          icon: AlertTriangle,
          href: "/reports/alert-panel",
        },
        {
          key: "employees",
          label: t("reports.employees"),
          icon: Users,
          href: "/reports/employees",
        },
        {
          key: "assign-ports",
          label: t("reports.assignPorts"),
          icon: Anchor,
          href: "/reports/assign-ports",
        },
        {
          key: "focused-trips",
          label: t("reports.focusedTrips"),
          icon: Route,
          href: "/reports/focused-trips",
        },
        {
          key: "completed-trips",
          label: t("reports.completedTrips"),
          icon: Database,
          href: "/reports/completed-trips",
        },
      ],
    },
  ];

  /**
   * Toggles the dropdown menu for a navigation item
   * @param key - The key of the navigation item
   */
  const handleDropdownToggle = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  /**
   * Handles click events on main navigation items
   * @param item - The navigation item that was clicked
   */
  const handleTabClick = (item: (typeof navigationItems)[number]) => {
    if (item.hasDropdown) {
      handleDropdownToggle(item.key);
    } else {
      onTabChange(item.key);
      setOpenDropdown(null);
      router.push(item.href);
    }
  };

  /**
   * Handles click events on dropdown items
   * @param parentKey - The key of the parent navigation item
   * @param itemKey - The key of the dropdown item that was clicked
   */
  const handleDropdownItemClick = (parentKey: string, itemKey: string) => {
    const parentItem = navigationItems.find((item) => item.key === parentKey);
    const dropdownItem = parentItem?.dropdownItems?.find(
      (item) => item.key === itemKey
    );

    if (dropdownItem) {
      // Update state first
      onTabChange(`${parentKey}-${itemKey}`);
      onReportItemChange(itemKey);
      setOpenDropdown(null);

      // Navigate with a small delay to ensure state updates
      setTimeout(() => {
        router.push(dropdownItem.href);
      }, 10);
    }
  };

  return (
    <>
      {/* Sidebar Drawer - Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "transparent" }}
        onClick={() => setSidebarOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setSidebarOpen(false);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Close sidebar"
      >
        {/* Sidebar Navigation */}
        <nav
          className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Main navigation"
        >
          {/* Mobile Sidebar Content */}
          <div className="flex flex-col h-full">
            {/* Sidebar Header with Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Trip Tracker
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="Close sidebar"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* User Profile Section */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              {/* User Profile */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 text-sm">
                    {headerProps.user?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {headerProps.user?.role}
                  </span>
                </div>
              </div>

              {/* Language & Notifications */}
              <div className="flex items-center justify-between">
                <LanguageToggle
                  variant="sidebar"
                  onLanguageChange={headerProps.onLanguageChange}
                />

                <button
                  onClick={() => {
                    router.push("/notifications");
                    setSidebarOpen(false);
                  }}
                  className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all relative"
                >
                  <Bell className="w-4 h-4 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">3</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    activeTab === item.key ||
                    activeTab.startsWith(`${item.key}-`);

                  if (item.hasDropdown) {
                    // Reports section with expanded items
                    return (
                      <div key={item.key} className="space-y-1">
                        <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        <div className="ml-4 space-y-1">
                          {item.dropdownItems?.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon;
                            const isDropdownActive =
                              activeTab === `${item.key}-${dropdownItem.key}`;
                            return (
                              <button
                                key={dropdownItem.key}
                                onClick={() => {
                                  handleDropdownItemClick(
                                    item.key,
                                    dropdownItem.key
                                  );
                                  setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                                  isDropdownActive
                                    ? "bg-blue-100 text-blue-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                <DropdownIcon className="w-4 h-4" />
                                <span>{dropdownItem.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  } else {
                    // Regular navigation items
                    return (
                      <button
                        key={item.key}
                        onClick={() => {
                          handleTabClick(item);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  }
                })}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                  <UserCircle className="w-4 h-4" />
                  <span>My Profile</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Desktop Horizontal Navigation */}
      <nav className="bg-[rgb(var(--nav-bg))] relative w-full hidden md:block navigation-container">
        <div className="px-4 py-0 w-full">
          <div className="flex items-center justify-between w-full">
            {/* Desktop Navigation Items */}
            <div className="flex gap-0 navigation-container">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  activeTab === item.key ||
                  activeTab.startsWith(`${item.key}-`);

                return (
                  <NavigationItem
                    key={item.key}
                    label={item.label}
                    icon={Icon}
                    isActive={isActive}
                    hasDropdown={item.hasDropdown}
                    dropdownItems={item.dropdownItems || []}
                    isDropdownOpen={openDropdown === item.key}
                    onClick={() => handleTabClick(item)}
                    onDropdownItemClick={(itemKey) =>
                      handleDropdownItemClick(item.key, itemKey)
                    }
                    isRTL={isRTL}
                  />
                );
              })}
            </div>

            {/* Saudi Customs Logo */}
            <div className="flex items-center h-full group">
              <Image
                src="/assets/Saudi-Customs-Logo-new.png"
                alt="Saudi Customs Logo"
                width={320}
                height={10}
                className="object-contain  transition-all duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-110 group-hover:drop-shadow-lg cursor-pointer"
                priority
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

/**
 * Navigation Component Usage:
 *
 * @example
 * ```tsx
 * <Navigation
 *   activeTab="dashboard"
 *   onTabChange={(key) => setActiveTab(key)}
 *   onReportItemChange={(key) => setReportItem(key)}
 * />
 * ```
 *
 * @features
 * - Responsive design (horizontal on desktop, comprehensive sidebar on mobile)
 * - Dropdown menus with smart positioning (left on mobile, right on desktop)
 * - Integrated header controls in mobile sidebar (user profile, language, notifications)
 * - Expanded reports navigation in mobile sidebar
 * - Active state management with visual feedback
 * - Router integration with smooth transitions
 * - Accessibility support with ARIA labels
 * - Professional animations and hover effects
 * - Custom styling with CSS variables and Tailwind
 *
 * @improvements
 * - Enhanced mobile sidebar with header integration
 * - Smart dropdown positioning for different screen sizes
 * - Professional styling with gradients and shadows
 * - Comprehensive user profile display
 * - Direct language toggle functionality
 * - Expanded navigation items display in mobile
 *
 * @dependencies
 * - next/navigation (useRouter)
 * - lucide-react (icons)
 * - React hooks (useState, useEffect)
 */

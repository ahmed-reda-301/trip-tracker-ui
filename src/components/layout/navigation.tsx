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
}) => {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`
          flex items-center space-x-2 px-4 py-3 font-medium whitespace-nowrap transition-all duration-200 min-w-fit
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

      {/* Dropdown Menu */}
      {hasDropdown && isDropdownOpen && (
        <div className="dropdown-menu bg-white shadow-xl border border-gray-200 py-1 rounded-sm">
          {dropdownItems.map((dropdownItem) => {
            const DropdownIcon = dropdownItem.icon;
            return (
              <button
                key={dropdownItem.key}
                onClick={() => onDropdownItemClick?.(dropdownItem.key)}
                className="w-full px-3 py-1.5 text-left text-gray-700 hover:bg-[rgb(5,148,211)] hover:text-white transition-colors flex items-center text-sm whitespace-nowrap"
                style={{ minWidth: "150px" }}
              >
                <DropdownIcon className="w-4 h-4 mr-2 flex-shrink-0" />
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
}) => {
  const router = useRouter();

  // State management
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   * Navigation items configuration
   * Defines all navigation items with their properties and dropdown items
   */
  const navigationItems = [
    {
      key: "location-monitor",
      label: "Location Monitor",
      icon: MapPin,
      href: "/location-monitor",
      hasDropdown: false,
    },
    {
      key: "focused-trips",
      label: "Focused Trips",
      icon: Route,
      href: "/focused-trips",
      hasDropdown: false,
    },
    {
      key: "assigned-ports",
      label: "My Assigned Ports",
      icon: Anchor,
      href: "/assigned-ports",
      hasDropdown: false,
    },
    {
      key: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
      hasDropdown: false,
    },
    {
      key: "configuration",
      label: "Configuration",
      icon: Settings,
      href: "/configuration",
      hasDropdown: false,
    },
    {
      key: "suspicious-trips",
      label: "Suspicious Trips",
      icon: AlertTriangle,
      href: "/suspicious-trips",
      hasDropdown: false,
    },
    {
      key: "reports",
      label: "Reports",
      icon: FileText,
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        {
          key: "trip-panel",
          label: "Trip Panel",
          icon: Route,
          href: "/reports/trip-panel",
        },
        {
          key: "all-alerts",
          label: "All Alerts",
          icon: AlertTriangle,
          href: "/reports/all-alerts",
        },
        {
          key: "alert-panel",
          label: "Alert Panel",
          icon: AlertTriangle,
          href: "/reports/alert-panel",
        },
        {
          key: "employees",
          label: "Employees",
          icon: Users,
          href: "/reports/employees",
        },
        {
          key: "assign-ports",
          label: "Assign Ports",
          icon: Anchor,
          href: "/reports/assign-ports",
        },
        {
          key: "focused-trips",
          label: "Focused Trips",
          icon: Route,
          href: "/reports/focused-trips",
        },
        {
          key: "completed-trips",
          label: "Completed Trips",
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
      {/* Mobile Menu Toggle Button */}
      {!sidebarOpen && (
        <button
          className="md:hidden absolute top-20 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          type="button"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

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
          className={`fixed top-0 left-0 h-full w-64 bg-[rgb(var(--nav-bg))] shadow-lg transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Main navigation"
        >
          {/* Mobile Navigation Items */}
          <div className="p-4 flex flex-col gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeTab === item.key || activeTab.startsWith(`${item.key}-`);
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    handleTabClick(item);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 font-medium whitespace-nowrap transition-all duration-200 min-w-fit ${
                    isActive
                      ? "bg-[rgb(var(--nav-active))] text-[rgb(var(--nav-text-active))]"
                      : "bg-[rgb(var(--nav-bg))] text-[rgb(var(--nav-text))] hover:bg-[rgb(var(--nav-hover))] hover:text-[rgb(var(--nav-text-active))]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
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
 * - Responsive design (horizontal on desktop, sidebar on mobile)
 * - Dropdown menus for nested navigation
 * - Active state management
 * - Router integration
 * - Accessibility support
 * - Custom styling with CSS variables
 *
 * @dependencies
 * - next/navigation (useRouter)
 * - lucide-react (icons)
 * - React hooks (useState)
 */

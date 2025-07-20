"use client";

/**
 * Header Component
 *
 * Main header component for the Trip Tracker application.
 * Provides user profile, notifications, and language switching functionality.
 *
 * @author Trip Tracker Team
 * @version 2.0.0
 */

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Globe,
  Bell,
  Settings,
  LogOut,
  UserCircle,
  Menu,
} from "lucide-react";

interface HeaderProps {
  user?: {
    name?: string;
    email?: string;
    role?: string;
  };
  onLanguageChange?: (lang: string) => void;
  currentLanguage?: string;
  /** Callback to open mobile sidebar */
  onSidebarToggle?: () => void;
  /** Whether sidebar is currently open */
  isSidebarOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  user = {
    name: "Ahmed Al-Rashid",
    email: "ahmed@customs.gov.sa",
    role: "Customs Officer",
  },
  onLanguageChange = () => {},
  currentLanguage = "EN",
  onSidebarToggle = () => {},
  isSidebarOpen = false,
}) => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-profile")) setIsProfileOpen(false);
      if (!target.closest(".dropdown-notification"))
        setIsNotificationOpen(false);
    };
    if (isProfileOpen || isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, isNotificationOpen]);

  /**
   * Toggle language between English and Arabic
   */
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "EN" ? "AR" : "EN";
    onLanguageChange(newLanguage);
  };

  /**
   * Get notification badge color based on type
   */
  const getNotificationColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  const notifications = [
    {
      id: 1,
      title: "New suspicious trip detected",
      time: "2 min ago",
      type: "warning",
    },
    {
      id: 2,
      title: "System maintenance scheduled",
      time: "1 hour ago",
      type: "info",
    },
    {
      id: 3,
      title: "Monthly report ready",
      time: "3 hours ago",
      type: "success",
    },
  ];

  return (
    <header className="relative w-full">
      <div className="px-0 py-0 w-full">
        {/* Mobile Header Layout - White Background */}
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 py-0">
          {/* Mobile Menu Button */}
          <button
            onClick={onSidebarToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105 text-gray-700"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Mobile Spacer */}
          <div className="flex-1"></div>

          {/* Mobile Logo - Right Aligned */}
          <div className="flex items-center">
            <Image
              src="/assets/Saudi-Customs-Logo-new.png"
              alt="Saudi Customs Logo"
              width={180}
              height={30}
              className="object-contain h-12"
              priority
            />
          </div>
        </div>

        {/* Desktop Header Layout - Original Blue Background */}
        <div className="hidden md:flex items-center justify-between gap-4 w-full bg-[rgb(var(--header-primary))] text-white ">
          {/* Left side - Reserved for future content */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Logo section can be added here if needed */}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end flex-wrap">
            {/* Notifications */}
            <div className="relative dropdown-notification">
              <button
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors relative"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {notifications.length}
                    </span>
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${getNotificationColor(
                              notification.type
                            )}`}
                          ></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button
                      onClick={() => {
                        router.push('/notifications');
                        setIsNotificationOpen(false);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher - Direct Toggle */}
            <button
              className="flex items-center space-x-2 hover:bg-slate-700 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
              onClick={toggleLanguage}
              title={`Switch to ${
                currentLanguage === "EN" ? "Arabic" : "English"
              }`}
            >
              <Globe className="w-5 h-5" />
              <span className="font-medium text-sm">
                {currentLanguage === "EN" ? "🇺🇸 EN" : "🇸🇦 AR"}
              </span>
            </button>

            {/* User Profile */}
            <div className="relative dropdown-profile">
              <button
                className="flex items-center space-x-2 hover:bg-slate-700 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                title="User Profile"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm">{user.name}</span>
                  <span className="text-xs text-gray-300">{user.role}</span>
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{user.role}</p>
                  </div>

                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-3">
                      <UserCircle className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-3">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-3">
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

/**
 * Header Component Usage:
 *
 * @example
 * ```tsx
 * <Header
 *   user={{
 *     name: "Ahmed Al-Rashid",
 *     email: "ahmed@customs.gov.sa",
 *     role: "Customs Officer"
 *   }}
 *   currentLanguage="EN"
 *   onLanguageChange={(lang) => setLanguage(lang)}
 * />
 * ```
 *
 * @features
 * - Responsive design with different layouts for mobile and desktop
 * - Mobile: Clean header with logo and sidebar toggle button
 * - Desktop: Full header with user profile, language toggle, and notifications
 * - Direct language toggle (EN/AR) without dropdown
 * - Notifications with badge counter
 * - Professional hover animations and effects
 * - Accessibility support with ARIA labels
 * - Integration with mobile sidebar navigation
 *
 * @improvements
 * - Added responsive mobile/desktop layouts
 * - Integrated sidebar toggle functionality
 * - Clean mobile header with logo and menu button
 * - Enhanced desktop header with full controls
 * - Improved visual hierarchy and spacing
 * - Professional styling with gradients and shadows
 */

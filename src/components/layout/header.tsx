"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  User,
  Globe,
  Bell,
  Search,
  Settings,
  LogOut,
  UserCircle,
} from "lucide-react";

interface HeaderProps {
  user?: {
    name?: string;
    email?: string;
    role?: string;
  };
  onLanguageChange?: (lang: string) => void;
  currentLanguage?: string;
}

const Header: React.FC<HeaderProps> = ({
  user = {},
  onLanguageChange = () => {},
  currentLanguage = "",
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-profile")) setIsProfileOpen(false);
      if (!target.closest(".dropdown-notification"))
        setIsNotificationOpen(false);
      if (!target.closest(".dropdown-language")) setIsLanguageOpen(false);
    };
    if (isProfileOpen || isNotificationOpen || isLanguageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, isNotificationOpen, isLanguageOpen]);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

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
    <header className="bg-slate-800 text-white shadow-lg relative w-full">
      <div className="px-4 py-3 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
          {/* Logo and Title */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                <div className="w-5 h-5 bg-white rounded-full opacity-90"></div>
                <Image
                  src="/assets/logo.png"
                  alt="Saudi Customs Logo"
                  width={120}
                  height={40}
                  className="mb-1"
                />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-bold leading-tight">
                  هيئة الزكاة والضريبة والجمارك
                </h1>
                <p className="text-sm text-slate-300 font-medium">
                  Zakat, Tax, Customs Authority
                </p>
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end flex-wrap">
            {/* Search Button */}
            {/* <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button> */}

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
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === "warning"
                                ? "bg-yellow-500"
                                : notification.type === "info"
                                ? "bg-blue-500"
                                : "bg-green-500"
                            }`}
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
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative dropdown-language">
              <button
                className="flex items-center space-x-2 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">{currentLanguage}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Language Dropdown */}
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                      onClick={() => {
                        onLanguageChange(lang.name);
                        setIsLanguageOpen(false);
                      }}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative dropdown-profile">
              <button
                className="flex items-center space-x-2 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{user.name}</span>
                <ChevronDown className="w-4 h-4" />
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

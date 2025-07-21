"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useClientTime } from "@/hooks/useClientTime";
import {
  X,
  Search,
  RefreshCw,
  Eye,
  EyeOff,
  Anchor,
  Ship,
  Activity,
  MapPin,
  TrendingUp,
  Clock,
  Settings,
} from "lucide-react";
import { Port, Vessel } from "./InteractiveMap";

interface MapSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  ports: Port[];
  vessels: Vessel[];
  showPorts: boolean;
  showVessels: boolean;
  onTogglePorts: () => void;
  onToggleVessels: () => void;
  onRefresh: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isLoading?: boolean;
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  isOpen,
  onClose,
  ports,
  vessels,
  showPorts,
  showVessels,
  onTogglePorts,
  onToggleVessels,
  onRefresh,
  searchTerm,
  onSearchChange,
  isLoading = false,
}) => {
  const { isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<"stats" | "controls" | "list">(
    "stats"
  );
  const { time: currentTime } = useClientTime(isRTL ? "ar-SA" : "en-US", 1000);

  // Calculate statistics
  const activePorts = ports.filter((port) => port.status === "active").length;
  const activeVessels = vessels.filter(
    (vessel) => vessel.status === "active"
  ).length;
  const totalCapacity = ports.reduce((sum, port) => sum + port.capacity, 0);
  const totalVesselsInPorts = ports.reduce(
    (sum, port) => sum + port.vessels,
    0
  );
  const utilizationRate =
    totalCapacity > 0
      ? Math.round((totalVesselsInPorts / totalCapacity) * 100)
      : 0;

  const stats = [
    {
      title: isRTL ? "إجمالي الموانئ" : "Total Ports",
      value: ports.length,
      active: activePorts,
      icon: Anchor,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: isRTL ? "إجمالي السفن" : "Total Vessels",
      value: vessels.length,
      active: activeVessels,
      icon: Ship,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: isRTL ? "السعة الإجمالية" : "Total Capacity",
      value: totalCapacity,
      active: totalVesselsInPorts,
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: isRTL ? "معدل الاستغلال" : "Utilization Rate",
      value: `${utilizationRate}%`,
      active: null,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        absolute top-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${
          isOpen
            ? "translate-x-0"
            : isRTL
            ? "-translate-x-full"
            : "translate-x-full"
        }
        ${isRTL ? "left-0" : "right-0"}
        w-80 lg:w-96
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            {isRTL ? "مراقب المواقع" : "Location Monitor"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            {
              key: "stats",
              label: isRTL ? "إحصائيات" : "Statistics",
              icon: Activity,
            },
            {
              key: "controls",
              label: isRTL ? "تحكم" : "Controls",
              icon: Settings,
            },
            { key: "list", label: isRTL ? "قائمة" : "List", icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Statistics Tab */}
          {activeTab === "stats" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                <span>
                  {isRTL ? "آخر تحديث: " : "Last updated: "}
                  {currentTime || "Loading..."}
                </span>
              </div>

              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={`stat-${stat.title}-${index}`}
                    className={`${stat.bgColor} rounded-lg p-4 border border-gray-200`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {stat.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className={`text-xl font-bold ${stat.color}`}>
                            {stat.value}
                          </p>
                          {stat.active !== null && (
                            <div className="flex items-center gap-1">
                              <Activity className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-green-600 font-medium">
                                {stat.active}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Controls Tab */}
          {activeTab === "controls" && (
            <div className="space-y-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isRTL ? "البحث" : "Search"}
                </label>
                <div className="relative">
                  <Search
                    className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 ${
                      isRTL ? "right-3" : "left-3"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder={
                      isRTL
                        ? "البحث عن السفن أو الموانئ..."
                        : "Search vessels or ports..."
                    }
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={`w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isRTL ? "pr-10 pl-3 text-right" : "pl-10 pr-3 text-left"
                    }`}
                  />
                </div>
              </div>

              {/* Toggle Controls */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  {isRTL ? "إظهار/إخفاء" : "Show/Hide"}
                </label>

                <button
                  onClick={onTogglePorts}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    showPorts
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Anchor className="w-4 h-4" />
                    <span className="font-medium">
                      {isRTL ? "الموانئ" : "Ports"}
                    </span>
                  </div>
                  {showPorts ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={onToggleVessels}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    showVessels
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Ship className="w-4 h-4" />
                    <span className="font-medium">
                      {isRTL ? "السفن" : "Vessels"}
                    </span>
                  </div>
                  {showVessels ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Refresh Button */}
              <button
                onClick={onRefresh}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                <span className="font-medium text-gray-700">
                  {isRTL ? "تحديث البيانات" : "Refresh Data"}
                </span>
              </button>
            </div>
          )}

          {/* List Tab */}
          {activeTab === "list" && (
            <div className="space-y-4">
              {/* Ports List */}
              {showPorts && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Anchor className="w-4 h-4" />
                    {isRTL ? "الموانئ" : "Ports"} ({ports.length})
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {ports.slice(0, 5).map((port) => (
                      <div
                        key={port.id}
                        className="p-2 bg-gray-50 rounded-lg text-xs"
                      >
                        <div className="font-medium text-gray-900">
                          {isRTL ? port.name : port.nameEn}
                        </div>
                        <div className="text-gray-600">
                          {port.vessels}/{port.capacity} vessels
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vessels List */}
              {showVessels && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Ship className="w-4 h-4" />
                    {isRTL ? "السفن" : "Vessels"} ({vessels.length})
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {vessels.slice(0, 5).map((vessel) => (
                      <div
                        key={vessel.id}
                        className="p-2 bg-gray-50 rounded-lg text-xs"
                      >
                        <div className="font-medium text-gray-900">
                          {isRTL ? vessel.name : vessel.nameEn}
                        </div>
                        <div className="text-gray-600">
                          {vessel.speed} knots • {vessel.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MapSidebar;

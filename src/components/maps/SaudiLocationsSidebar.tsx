/**
 * SaudiLocationsSidebar Component
 *
 * A comprehensive sidebar interface specifically designed for monitoring Saudi Arabian
 * locations and vehicles. Features tabbed navigation, real-time statistics, layer controls,
 * and detailed location listings with full multilingual support.
 *
 * Features:
 * - Tabbed Interface: Statistics, Controls, and List tabs for organized content
 * - Real-time Statistics: Live statistics cards with color-coded categories
 * - Layer Controls: Toggle visibility of different location types
 * - Search Functionality: Search across all locations and vehicles
 * - Multilingual Support: Automatic Arabic/English content switching
 * - RTL Support: Proper right-to-left layout support
 * - Responsive Design: Mobile-friendly with backdrop overlay
 * - Live Time Display: Real-time clock with locale-specific formatting
 * - Animated Transitions: Smooth slide-in/out animations
 *
 * @example
 * ```tsx
 * <SaudiLocationsSidebar
 *   isOpen={sidebarOpen}
 *   onClose={() => setSidebarOpen(false)}
 *   airports={saudiLocations.airports}
 *   vehicles={saudiVehicles}
 *   showAirports={showAirports}
 *   showVehicles={showVehicles}
 *   onToggleAirports={() => setShowAirports(!showAirports)}
 *   onToggleVehicles={() => setShowVehicles(!showVehicles)}
 *   onRefresh={handleRefresh}
 *   searchTerm={searchTerm}
 *   onSearchChange={setSearchTerm}
 *   isLoading={isLoading}
 * />
 * ```
 *
 * @author Trip Tracker Team
 * @version 1.0.0
 * @since 2024
 */

"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useClientTime } from "@/hooks/useClientTime";
import {
  X,
  Search,
  RefreshCw,
  BarChart3,
  Settings,
  List,
  Clock,
  Plane,
  Anchor,
  Shield,
  MapPin,
  Car,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Airport,
  Seaport,
  PoliceStation,
  Checkpoint,
  Vehicle,
} from "./InteractiveMap";

interface SaudiLocationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;

  // Data
  airports: Airport[];
  seaports: Seaport[];
  policeStations: PoliceStation[];
  checkpoints: Checkpoint[];
  vehicles: Vehicle[];

  // Display toggles
  showAirports: boolean;
  showSeaports: boolean;
  showPoliceStations: boolean;
  showCheckpoints: boolean;
  showVehicles: boolean;

  // Toggle functions
  onToggleAirports: () => void;
  onToggleSeaports: () => void;
  onTogglePoliceStations: () => void;
  onToggleCheckpoints: () => void;
  onToggleVehicles: () => void;

  // Other functions
  onRefresh: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isLoading: boolean;
}

export default function SaudiLocationsSidebar({
  isOpen,
  onClose,
  airports,
  seaports,
  policeStations,
  checkpoints,
  vehicles,
  showAirports,
  showSeaports,
  showPoliceStations,
  showCheckpoints,
  showVehicles,
  onToggleAirports,
  onToggleSeaports,
  onTogglePoliceStations,
  onToggleCheckpoints,
  onToggleVehicles,
  onRefresh,
  searchTerm,
  onSearchChange,
  isLoading,
}: SaudiLocationsSidebarProps) {
  const { isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<"stats" | "controls" | "list">(
    "stats"
  );
  const { time: currentTime } = useClientTime(isRTL ? "ar-SA" : "en-US", 1000);

  // Calculate statistics
  const totalLocations =
    airports.length +
    seaports.length +
    policeStations.length +
    checkpoints.length;
  const activeVehicles = vehicles.filter(
    (v) => v.status === "moving" || v.status === "emergency"
  ).length;
  const emergencyVehicles = vehicles.filter(
    (v) => v.status === "emergency"
  ).length;

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
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              {isRTL ? "مراقبة المواقع السعودية" : "Saudi Locations Monitor"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={
                  isRTL ? "البحث في المواقع..." : "Search locations..."
                }
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              {
                id: "stats",
                icon: BarChart3,
                label: isRTL ? "الإحصائيات" : "Statistics",
              },
              {
                id: "controls",
                icon: Settings,
                label: isRTL ? "التحكم" : "Controls",
              },
              { id: "list", icon: List, label: isRTL ? "القائمة" : "List" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "stats" && (
              <div className="space-y-4">
                {/* Last Updated */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>
                    {isRTL ? "آخر تحديث: " : "Last updated: "}
                    {currentTime || "Loading..."}
                  </span>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Plane className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-blue-600 font-medium">
                        {isRTL ? "المطارات" : "Airports"}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-blue-700">
                      {airports.length}
                    </div>
                  </div>

                  <div className="bg-cyan-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Anchor className="w-4 h-4 text-cyan-600" />
                      <span className="text-xs text-cyan-600 font-medium">
                        {isRTL ? "الموانئ" : "Seaports"}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-cyan-700">
                      {seaports.length}
                    </div>
                  </div>

                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-red-600" />
                      <span className="text-xs text-red-600 font-medium">
                        {isRTL ? "مراكز الشرطة" : "Police"}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-red-700">
                      {policeStations.length}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span className="text-xs text-orange-600 font-medium">
                        {isRTL ? "نقاط التفتيش" : "Checkpoints"}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-orange-700">
                      {checkpoints.length}
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Car className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        {isRTL ? "المركبات النشطة" : "Active Vehicles"}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-green-700">
                      {activeVehicles}
                    </div>
                  </div>

                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Car className="w-4 h-4 text-red-600" />
                      <span className="text-xs text-red-600 font-medium">
                        {isRTL ? "حالات الطوارئ" : "Emergency"}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-red-700">
                      {emergencyVehicles}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2">
                    {isRTL ? "ملخص النظام" : "System Summary"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isRTL
                      ? `إجمالي ${totalLocations} موقع و ${vehicles.length} مركبة قيد المراقبة`
                      : `Total ${totalLocations} locations and ${vehicles.length} vehicles monitored`}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "controls" && (
              <div className="space-y-4">
                {/* Refresh Button */}
                <button
                  onClick={onRefresh}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                  />
                  {isLoading
                    ? isRTL
                      ? "جاري التحديث..."
                      : "Refreshing..."
                    : isRTL
                    ? "تحديث البيانات"
                    : "Refresh Data"}
                </button>

                {/* Display Controls */}
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-700">
                    {isRTL ? "عرض الطبقات" : "Display Layers"}
                  </h3>

                  {[
                    {
                      key: "airports",
                      label: isRTL ? "المطارات" : "Airports",
                      show: showAirports,
                      toggle: onToggleAirports,
                      icon: Plane,
                      color: "blue",
                    },
                    {
                      key: "seaports",
                      label: isRTL ? "الموانئ" : "Seaports",
                      show: showSeaports,
                      toggle: onToggleSeaports,
                      icon: Anchor,
                      color: "cyan",
                    },
                    {
                      key: "police",
                      label: isRTL ? "مراكز الشرطة" : "Police Stations",
                      show: showPoliceStations,
                      toggle: onTogglePoliceStations,
                      icon: Shield,
                      color: "red",
                    },
                    {
                      key: "checkpoints",
                      label: isRTL ? "نقاط التفتيش" : "Checkpoints",
                      show: showCheckpoints,
                      toggle: onToggleCheckpoints,
                      icon: MapPin,
                      color: "orange",
                    },
                    {
                      key: "vehicles",
                      label: isRTL ? "المركبات" : "Vehicles",
                      show: showVehicles,
                      toggle: onToggleVehicles,
                      icon: Car,
                      color: "green",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={`w-4 h-4 text-${item.color}-600`}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                      </div>
                      <button
                        onClick={item.toggle}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          item.show
                            ? `bg-${item.color}-100 text-${item.color}-700 hover:bg-${item.color}-200`
                            : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                        }`}
                      >
                        {item.show ? (
                          <Eye className="w-3 h-3" />
                        ) : (
                          <EyeOff className="w-3 h-3" />
                        )}
                        {item.show
                          ? isRTL
                            ? "مرئي"
                            : "Visible"
                          : isRTL
                          ? "مخفي"
                          : "Hidden"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "list" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  {isRTL
                    ? "قائمة تفصيلية بجميع المواقع والمركبات"
                    : "Detailed list of all locations and vehicles"}
                </p>
                {/* Add detailed list here if needed */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {airports.slice(0, 5).map((airport) => (
                    <div
                      key={airport.id}
                      className="p-2 bg-gray-50 rounded-lg text-xs"
                    >
                      <div className="font-medium text-gray-900">
                        {isRTL ? airport.name : airport.nameEn}
                      </div>
                      <div className="text-gray-600">
                        {airport.city} • {airport.type}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {seaports.slice(0, 5).map((seaport) => (
                    <div
                      key={seaport.id}
                      className="p-2 bg-gray-50 rounded-lg text-xs"
                    >
                      <div className="font-medium text-gray-900">
                        {isRTL ? seaport.name : seaport.nameEn}
                      </div>
                      <div className="text-gray-600">
                        {seaport.city} • {seaport.type}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {policeStations.slice(0, 5).map((station) => (
                    <div
                      key={station.id}
                      className="p-2 bg-gray-50 rounded-lg text-xs"
                    >
                      <div className="font-medium text-gray-900">
                        {isRTL ? station.name : station.nameEn}
                      </div>
                      <div className="text-gray-600">
                        {station.city} • {station.type}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {checkpoints.slice(0, 5).map((checkpoint) => (
                    <div
                      key={checkpoint.id}
                      className="p-2 bg-gray-50 rounded-lg text-xs"
                    >
                      <div className="font-medium text-gray-900">
                        {isRTL ? checkpoint.name : checkpoint.nameEn}
                      </div>
                      <div className="text-gray-600">
                        {checkpoint.highway} • {checkpoint.type}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {vehicles.slice(0, 5).map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="p-2 bg-gray-50 rounded-lg text-xs"
                    >
                      <div className="font-medium text-gray-900">
                        {isRTL ? vehicle.name : vehicle.nameEn}
                      </div>
                      <div className="text-gray-600">
                        {vehicle.type} • {vehicle.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useClientTime } from "@/hooks/useClientTime";
import { RefreshCw, Filter, Eye, EyeOff, Search } from "lucide-react";

interface MapControlsProps {
  showPorts: boolean;
  showVessels: boolean;
  onTogglePorts: () => void;
  onToggleVessels: () => void;
  onRefresh: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isLoading?: boolean;
}

const MapControls: React.FC<MapControlsProps> = ({
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
  const { time: currentTime } = useClientTime(isRTL ? "ar-SA" : "en-US", 60000);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search
              className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${
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
                isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
              }`}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Toggle Ports */}
          <button
            onClick={onTogglePorts}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
              showPorts
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {showPorts ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {isRTL ? "الموانئ" : "Ports"}
            </span>
          </button>

          {/* Toggle Vessels */}
          <button
            onClick={onToggleVessels}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
              showVessels
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {showVessels ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {isRTL ? "السفن" : "Vessels"}
            </span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            <span className="text-sm font-medium text-gray-700">
              {isRTL ? "تحديث" : "Refresh"}
            </span>
          </button>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">
              {isRTL ? "تصفية" : "Filter"}
            </span>
          </button>
        </div>
      </div>

      {/* Last Update Info */}
      <div
        className={`mt-3 pt-3 border-t border-gray-100 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <p className="text-xs text-gray-500">
          {isRTL ? "آخر تحديث: " : "Last updated: "}
          <span className="font-medium">{currentTime || "Loading..."}</span>
        </p>
      </div>
    </div>
  );
};

export default MapControls;

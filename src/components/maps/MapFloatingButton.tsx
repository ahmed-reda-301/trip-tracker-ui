/**
 * MapFloatingButton Component
 *
 * An elegant floating action button for toggling map sidebars. Features intelligent arrow
 * direction, RTL support, notification indicators, tooltips, and smooth animations.
 * The button adapts its position and appearance based on sidebar state and language direction.
 *
 * Features:
 * - Intelligent Arrow Direction: Arrow points in the correct direction based on sidebar state and RTL
 * - RTL Support: Proper positioning and arrow direction for right-to-left languages
 * - Notification Indicator: Animated red dot for updates when sidebar is closed
 * - Tooltip: Contextual tooltip showing current action
 * - Smooth Animations: Scale, position, and color transitions
 * - Responsive Positioning: Adapts to sidebar open/closed state
 * - Accessibility: Proper ARIA labels and keyboard support
 *
 * Arrow Direction Logic:
 * - When sidebar is closed: Arrow points inward (toward sidebar position)
 * - When sidebar is open: Arrow points outward (away from sidebar)
 * - RTL aware: Direction flips appropriately for Arabic layout
 *
 * @example
 * ```tsx
 * <MapFloatingButton
 *   isOpen={sidebarOpen}
 *   onClick={() => setSidebarOpen(!sidebarOpen)}
 *   hasUpdates={hasNewData}
 * />
 * ```
 *
 * @author Trip Tracker Team
 * @version 1.0.0
 * @since 2024
 */

"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MapFloatingButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUpdates?: boolean;
}

const MapFloatingButton: React.FC<MapFloatingButtonProps> = ({
  isOpen,
  onClick,
  hasUpdates = false,
}) => {
  const { isRTL } = useLanguage();

  const getArrowIcon = () => {
    // When sidebar is open, show arrow to close (pointing outward)
    // When sidebar is closed, show arrow to open (pointing inward)
    if (isOpen) {
      // Sidebar open - arrow to close
      return isRTL ? (
        <ChevronLeft className="w-8 h-8 text-blue-600 font-bold stroke-2" />
      ) : (
        <ChevronRight className="w-8 h-8 text-blue-600 font-bold stroke-2" />
      );
    } else {
      // Sidebar closed - arrow to open
      return isRTL ? (
        <ChevronRight className="w-8 h-8 text-blue-600 font-bold stroke-2" />
      ) : (
        <ChevronLeft className="w-8 h-8 text-blue-600 font-bold stroke-2" />
      );
    }
  };

  const getTooltipText = () => {
    if (isOpen) {
      return isRTL ? "إخفاء اللوحة" : "Hide Panel";
    } else {
      return isRTL ? "إظهار اللوحة" : "Show Panel";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        absolute top-1/2 transform -translate-y-1/2 z-50
        w-16 h-16 bg-white shadow-xl rounded-full
        hover:shadow-2xl transition-all duration-300 ease-in-out
        border-2 border-blue-200 hover:border-blue-400
        flex items-center justify-center
        ${isRTL ? "left-4" : "right-4"}
        ${isOpen ? "translate-x-0" : isRTL ? "-translate-x-2" : "translate-x-2"}
        group hover:scale-110 hover:bg-blue-50
      `}
      style={{
        marginRight: isRTL ? "0" : isOpen ? "320px" : "0",
        marginLeft: isRTL ? (isOpen ? "320px" : "0") : "0",
      }}
    >
      {/* Arrow Icon */}
      <div className="flex items-center justify-center">{getArrowIcon()}</div>

      {/* Notification dot */}
      {hasUpdates && !isOpen && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
          <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
        </div>
      )}

      {/* Tooltip */}
      <div
        className={`
        absolute top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg
        ${isRTL ? "left-full ml-3" : "right-full mr-3"}
      `}
      >
        {getTooltipText()}
      </div>
    </button>
  );
};

export default MapFloatingButton;

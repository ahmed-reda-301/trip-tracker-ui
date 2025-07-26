/**
 * FallbackMap Component
 *
 * A fallback map component that displays when Google Maps API key is not available.
 * Uses a simple iframe with OpenStreetMap or displays a static map placeholder.
 *
 * Features:
 * - Fallback when Google Maps API is not available
 * - Shows markers as overlays
 * - Responsive design
 * - Arabic/English support
 *
 */

"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Navigation } from "lucide-react";

export interface FallbackMapMarker {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  onClick?: () => void;
}

interface FallbackMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  height?: string;
  width?: string;
  markers?: FallbackMapMarker[];
  className?: string;
}

const FallbackMap: React.FC<FallbackMapProps> = ({
  center,
  zoom,
  height = "600px",
  width = "100%",
  markers = [],
  className = "",
}) => {
  const { isRTL } = useLanguage();

  return (
    <div
      className={`relative bg-gradient-to-br from-blue-50 to-green-50 ${className}`}
      style={{ height, width }}
    >
      {/* Map background with Saudi Arabia outline */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="text-center w-full max-w-4xl">
          {/* Saudi Arabia map outline */}
          <div className="w-full max-w-md h-64 mx-auto mb-6 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl border-2 border-green-300 flex items-center justify-center shadow-lg">
            <div className="text-green-600">
              <Navigation className="w-20 h-20 mx-auto mb-3" />
              <p className="text-lg font-bold">
                {isRTL ? "المملكة العربية السعودية" : "Saudi Arabia"}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {isRTL ? "نظام تتبع الرحلات" : "Trip Tracking System"}
              </p>
            </div>
          </div>

          {/* Markers list */}
          {markers.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-2xl mx-auto">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-3 text-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
                {isRTL ? "المواقع المتاحة" : "Available Locations"}
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                  {markers.length}
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                {markers.slice(0, 12).map((marker) => (
                  <button
                    key={marker.id}
                    onClick={marker.onClick}
                    className="text-left p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-200 hover:border-blue-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate font-medium">
                        {marker.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {markers.length > 12 && (
                <p className="text-sm text-gray-500 text-center mt-4 bg-gray-50 py-2 rounded-lg">
                  {isRTL
                    ? `و ${markers.length - 12} موقع آخر متاح...`
                    : `and ${markers.length - 12} more locations available...`}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
        <div className="flex items-center gap-3 text-sm">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Navigation className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-800">
              {isRTL ? "خريطة تفاعلية" : "Interactive Map"}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {isRTL
                ? "لتفعيل خرائط جوجل، يرجى إضافة مفتاح API"
                : "Add Google Maps API key for full features"}
            </div>
          </div>
        </div>
      </div>

      {/* Center coordinates display */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200">
        <div className="text-xs text-gray-600">
          <div className="font-semibold text-gray-800 mb-1">
            {isRTL ? "الإحداثيات:" : "Coordinates:"}
          </div>
          <div className="space-y-1">
            <div>
              {isRTL ? "خط العرض:" : "Lat:"}{" "}
              <span className="font-mono">{center.lat.toFixed(4)}</span>
            </div>
            <div>
              {isRTL ? "خط الطول:" : "Lng:"}{" "}
              <span className="font-mono">{center.lng.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackMap;

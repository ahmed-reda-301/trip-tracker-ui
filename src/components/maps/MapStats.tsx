"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Anchor, Ship, Activity, MapPin, TrendingUp } from "lucide-react";
import { Port, Vessel } from "./InteractiveMap";

interface MapStatsProps {
  ports: Port[];
  vessels: Vessel[];
}

const MapStats: React.FC<MapStatsProps> = ({ ports, vessels }) => {
  const { isRTL } = useLanguage();

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
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: isRTL ? "إجمالي السفن" : "Total Vessels",
      value: vessels.length,
      active: activeVessels,
      icon: Ship,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: isRTL ? "السعة الإجمالية" : "Total Capacity",
      value: totalCapacity,
      active: totalVesselsInPorts,
      icon: MapPin,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: isRTL ? "معدل الاستغلال" : "Utilization Rate",
      value: `${utilizationRate}%`,
      active: null,
      icon: TrendingUp,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={`stat-${stat.title}-${index}`}
            className={`${stat.bgColor} rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div className={`${isRTL ? "ml-3" : "mr-3"}`}>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <div className="flex items-center gap-2">
                  <p className={`text-2xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                  {stat.active !== null && (
                    <div className="flex items-center gap-1">
                      <Activity className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">
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
  );
};

export default MapStats;

"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import InteractiveMap, { Port, Vessel } from "@/components/maps/InteractiveMap";
import MapStats from "@/components/maps/MapStats";
import MapControls from "@/components/maps/MapControls";
import { Clock, AlertCircle } from "lucide-react";

// Import data
import portsData from "@/data/ports.json";
import vesselsData from "@/data/vessels.json";

export default function LocationMonitorPage() {
  const { t, isRTL } = useLanguage();

  // State
  const [ports, setPorts] = useState<Port[]>([]);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [filteredPorts, setFilteredPorts] = useState<Port[]>([]);
  const [filteredVessels, setFilteredVessels] = useState<Vessel[]>([]);
  const [showPorts, setShowPorts] = useState(true);
  const [showVessels, setShowVessels] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Load data on component mount
  useEffect(() => {
    setPorts(portsData as Port[]);
    setVessels(vesselsData as Vessel[]);
  }, []);

  // Filter data based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredPorts(ports);
      setFilteredVessels(vessels);
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    const filteredPortsResult = ports.filter(
      (port) =>
        port.name.toLowerCase().includes(searchLower) ||
        port.nameEn.toLowerCase().includes(searchLower) ||
        port.country.toLowerCase().includes(searchLower) ||
        port.countryAr.includes(searchTerm)
    );

    const filteredVesselsResult = vessels.filter(
      (vessel) =>
        vessel.name.toLowerCase().includes(searchLower) ||
        vessel.nameEn.toLowerCase().includes(searchLower) ||
        vessel.destination.toLowerCase().includes(searchLower) ||
        vessel.destinationEn.toLowerCase().includes(searchLower) ||
        vessel.flag.toLowerCase().includes(searchLower) ||
        vessel.flagAr.includes(searchTerm)
    );

    setFilteredPorts(filteredPortsResult);
    setFilteredVessels(filteredVesselsResult);
  }, [searchTerm, ports, vessels]);

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  // Handle port click
  const handlePortClick = (port: Port) => {
    console.log("Port clicked:", port);
    // You can add modal or sidebar logic here
  };

  // Handle vessel click
  const handleVesselClick = (vessel: Vessel) => {
    console.log("Vessel clicked:", vessel);
    // You can add modal or sidebar logic here
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className={`${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t("pages.locationMonitor.title")}
        </h1>
        <p className="text-gray-600 mb-4">
          {t("pages.locationMonitor.description")}
        </p>

        {/* Last Update */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>
            {t("pages.locationMonitor.lastUpdate")}:{" "}
            {lastUpdate.toLocaleString(isRTL ? "ar-SA" : "en-US")}
          </span>
        </div>
      </div>

      {/* Statistics */}
      <MapStats ports={filteredPorts} vessels={filteredVessels} />

      {/* Map Controls */}
      <MapControls
        showPorts={showPorts}
        showVessels={showVessels}
        onTogglePorts={() => setShowPorts(!showPorts)}
        onToggleVessels={() => setShowVessels(!showVessels)}
        onRefresh={handleRefresh}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={isLoading}
      />

      {/* Interactive Map */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <InteractiveMap
          ports={filteredPorts}
          vessels={filteredVessels}
          center={[24.7136, 46.6753]} // Saudi Arabia center
          zoom={6}
          height="600px"
          showPorts={showPorts}
          showVessels={showVessels}
          onPortClick={handlePortClick}
          onVesselClick={handleVesselClick}
        />
      </div>

      {/* Status Information */}
      {filteredPorts.length === 0 &&
        filteredVessels.length === 0 &&
        searchTerm && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800">
                {isRTL
                  ? `لم يتم العثور على نتائج للبحث: "${searchTerm}"`
                  : `No results found for: "${searchTerm}"`}
              </p>
            </div>
          </div>
        )}
    </div>
  );
}

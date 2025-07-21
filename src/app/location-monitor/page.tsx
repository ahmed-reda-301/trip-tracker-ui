"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import InteractiveMap, { Port, Vessel } from "@/components/maps/InteractiveMap";
import MapSidebar from "@/components/maps/MapSidebar";
import MapFloatingButton from "@/components/maps/MapFloatingButton";
import { AlertCircle } from "lucide-react";

// Import data
import portsData from "@/data/ports.json";
import vesselsData from "@/data/vessels.json";

export default function LocationMonitorPage() {
  const { isRTL } = useLanguage();

  // State
  const [ports, setPorts] = useState<Port[]>([]);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [filteredPorts, setFilteredPorts] = useState<Port[]>([]);
  const [filteredVessels, setFilteredVessels] = useState<Vessel[]>([]);
  const [showPorts, setShowPorts] = useState(true);
  const [showVessels, setShowVessels] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      // Refresh data logic here
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
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Map Container - Takes available space only */}
      <div className="relative flex-1 bg-gray-100 overflow-hidden">
        {/* Map */}
        <div
          className="absolute inset-0"
          onClick={() => {
            // Close sidebar when clicking on map
            if (sidebarOpen) {
              setSidebarOpen(false);
            }
          }}
        >
          <InteractiveMap
            ports={filteredPorts}
            vessels={filteredVessels}
            center={[24.7136, 46.6753]} // Saudi Arabia center
            zoom={6}
            height="calc(100vh)"
            showPorts={showPorts}
            showVessels={showVessels}
            onPortClick={handlePortClick}
            onVesselClick={handleVesselClick}
          />
        </div>

        {/* Floating Button - Over map only */}
        <MapFloatingButton
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          hasUpdates={false}
        />

        {/* Sidebar - Over map only */}
        <MapSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ports={filteredPorts}
          vessels={filteredVessels}
          showPorts={showPorts}
          showVessels={showVessels}
          onTogglePorts={() => setShowPorts(!showPorts)}
          onToggleVessels={() => setShowVessels(!showVessels)}
          onRefresh={handleRefresh}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isLoading={isLoading}
        />

        {/* No Results Overlay - Over map only */}
        {filteredPorts.length === 0 &&
          filteredVessels.length === 0 &&
          searchTerm && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <p className="text-yellow-800">
                    {isRTL
                      ? `لم يتم العثور على نتائج للبحث: "${searchTerm}"`
                      : `No results found for: "${searchTerm}"`}
                  </p>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

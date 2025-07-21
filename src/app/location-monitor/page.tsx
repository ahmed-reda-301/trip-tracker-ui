"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import InteractiveMap, {
  Airport,
  Seaport,
  PoliceStation,
  Checkpoint,
  Vehicle,
} from "@/components/maps/InteractiveMap";
import MapFloatingButton from "@/components/maps/MapFloatingButton";
import MapSidebar from "@/components/maps/MapSidebar";

// Import Saudi data
import saudiLocations from "@/data/saudi-locations.json";

export default function LocationMonitorPage() {
  const { isRTL } = useLanguage();

  // State for Saudi locations
  const [airports, setAirports] = useState<Airport[]>([]);
  const [seaports, setSeaports] = useState<Seaport[]>([]);
  const [policeStations, setPoliceStations] = useState<PoliceStation[]>([]);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  // Display toggles
  const showAirports = true;
  const showSeaports = true;
  const showPoliceStations = true;
  const showCheckpoints = true;
  const showVehicles = true;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load Saudi data on component mount
  useEffect(() => {
    setAirports(saudiLocations.airports as Airport[]);
    setSeaports(saudiLocations.seaports as Seaport[]);
    setPoliceStations(saudiLocations.police_stations as PoliceStation[]);
    setCheckpoints(saudiLocations.checkpoints as Checkpoint[]);

    // Sample vehicles data
    const sampleVehicles = [
      {
        id: "VEH_001",
        name: "شاحنة نقل البضائع - الرياض إلى جدة",
        nameEn: "Cargo Truck - Riyadh to Jeddah",
        coordinates: [24.2, 45.5],
        type: "cargo",
        status: "moving",
        speed: 85,
        heading: 270,
        destination: "ميناء جدة الإسلامي",
        destinationEn: "Jeddah Islamic Port",
        origin: "مطار الملك خالد الدولي",
        originEn: "King Khalid International Airport",
        plateNumber: "أ ب ج 1234",
        driver: "أحمد محمد",
        driverEn: "Ahmed Mohammed",
        cargo: "مواد غذائية",
        cargoEn: "Food Products",
      },
      {
        id: "VEH_002",
        name: "شاحنة صهريج - الدمام إلى الرياض",
        nameEn: "Tanker Truck - Dammam to Riyadh",
        coordinates: [26.2, 49.5],
        type: "tanker",
        status: "moving",
        speed: 90,
        heading: 225,
        destination: "مطار الملك خالد الدولي",
        destinationEn: "King Khalid International Airport",
        origin: "ميناء الملك عبدالعزيز",
        originEn: "King Abdulaziz Port",
        plateNumber: "د هـ و 5678",
        driver: "سالم علي",
        driverEn: "Salem Ali",
        cargo: "وقود",
        cargoEn: "Fuel",
      },
      {
        id: "VEH_003",
        name: "سيارة شرطة - الرياض",
        nameEn: "Police Car - Riyadh",
        coordinates: [24.7136, 46.6753],
        type: "police",
        status: "patrol",
        speed: 50,
        heading: 135,
        destination: "نقطة تفتيش طريق الرياض - جدة",
        destinationEn: "Riyadh-Jeddah Highway Checkpoint",
        origin: "مركز شرطة الملز",
        originEn: "Al-Malaz Police Station",
        plateNumber: "ق ر ش 3344",
        officer: "النقيب أحمد",
        officerEn: "Captain Ahmed",
      },
    ];

    setVehicles(sampleVehicles as Vehicle[]);
  }, []);

  // Event handlers for Saudi locations
  const handleAirportClick = (airport: Airport) => {
    console.log("Airport clicked:", airport);
    // You can add modal or sidebar logic here
  };

  const handleSeaportClick = (seaport: Seaport) => {
    console.log("Seaport clicked:", seaport);
    // You can add modal or sidebar logic here
  };

  const handlePoliceStationClick = (station: PoliceStation) => {
    console.log("Police station clicked:", station);
    // You can add modal or sidebar logic here
  };

  const handleCheckpointClick = (checkpoint: Checkpoint) => {
    console.log("Checkpoint clicked:", checkpoint);
    // You can add modal or sidebar logic here
  };

  const handleVehicleClick = (vehicle: Vehicle) => {
    console.log("Vehicle clicked:", vehicle);
    // You can add modal or sidebar logic here
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Map Container - Takes available space only */}
      <div
        className="relative w-full bg-gray-100 overflow-hidden"
        style={{ height: "calc(100vh - 180px)", minHeight: "500px" }}
      >
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
            // Saudi locations
            airports={airports}
            seaports={seaports}
            policeStations={policeStations}
            checkpoints={checkpoints}
            vehicles={vehicles}
            // Map settings
            center={[24.7136, 46.6753]} // Saudi Arabia center
            zoom={6}
            height="1000px"
            // Display toggles
            showAirports={showAirports}
            showSeaports={showSeaports}
            showPoliceStations={showPoliceStations}
            showCheckpoints={showCheckpoints}
            showVehicles={showVehicles}
            // Event handlers
            onAirportClick={handleAirportClick}
            onSeaportClick={handleSeaportClick}
            onPoliceStationClick={handlePoliceStationClick}
            onCheckpointClick={handleCheckpointClick}
            onVehicleClick={handleVehicleClick}
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
          ports={[]}
          vessels={[]}
          showPorts={false}
          showVessels={false}
          onTogglePorts={() => {}}
          onToggleVessels={() => {}}
          onRefresh={() => {}}
          searchTerm=""
          onSearchChange={() => {}}
          isLoading={false}
        />
      </div>
    </div>
  );
}

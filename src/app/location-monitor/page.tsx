"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import InteractiveMap, {
  Port,
  Vessel,
  Airport,
  Seaport,
  PoliceStation,
  Checkpoint,
  Vehicle,
} from "@/components/maps/InteractiveMap";
import MapSidebar from "@/components/maps/MapSidebar";
import MapFloatingButton from "@/components/maps/MapFloatingButton";
import { AlertCircle } from "lucide-react";

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

  // Filtered data
  const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
  const [filteredSeaports, setFilteredSeaports] = useState<Seaport[]>([]);
  const [filteredPoliceStations, setFilteredPoliceStations] = useState<
    PoliceStation[]
  >([]);
  const [filteredCheckpoints, setFilteredCheckpoints] = useState<Checkpoint[]>(
    []
  );
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  // Display toggles
  const [showAirports, setShowAirports] = useState(true);
  const [showSeaports, setShowSeaports] = useState(true);
  const [showPoliceStations, setShowPoliceStations] = useState(true);
  const [showCheckpoints, setShowCheckpoints] = useState(true);
  const [showVehicles, setShowVehicles] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  // Filter data based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredAirports(airports);
      setFilteredSeaports(seaports);
      setFilteredPoliceStations(policeStations);
      setFilteredCheckpoints(checkpoints);
      setFilteredVehicles(vehicles);
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    // Filter airports
    const filteredAirportsResult = airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(searchLower) ||
        airport.nameEn.toLowerCase().includes(searchLower) ||
        airport.city.toLowerCase().includes(searchLower) ||
        airport.cityEn.toLowerCase().includes(searchLower) ||
        airport.iata.toLowerCase().includes(searchLower) ||
        airport.icao.toLowerCase().includes(searchLower)
    );

    // Filter seaports
    const filteredSeaportsResult = seaports.filter(
      (seaport) =>
        seaport.name.toLowerCase().includes(searchLower) ||
        seaport.nameEn.toLowerCase().includes(searchLower) ||
        seaport.city.toLowerCase().includes(searchLower) ||
        seaport.cityEn.toLowerCase().includes(searchLower)
    );

    // Filter police stations
    const filteredPoliceStationsResult = policeStations.filter(
      (station) =>
        station.name.toLowerCase().includes(searchLower) ||
        station.nameEn.toLowerCase().includes(searchLower) ||
        station.city.toLowerCase().includes(searchLower) ||
        station.cityEn.toLowerCase().includes(searchLower)
    );

    // Filter checkpoints
    const filteredCheckpointsResult = checkpoints.filter(
      (checkpoint) =>
        checkpoint.name.toLowerCase().includes(searchLower) ||
        checkpoint.nameEn.toLowerCase().includes(searchLower) ||
        checkpoint.highway.toLowerCase().includes(searchLower) ||
        checkpoint.highwayEn.toLowerCase().includes(searchLower)
    );

    // Filter vehicles
    const filteredVehiclesResult = vehicles.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(searchLower) ||
        vehicle.nameEn.toLowerCase().includes(searchLower) ||
        vehicle.destination.toLowerCase().includes(searchLower) ||
        vehicle.destinationEn.toLowerCase().includes(searchLower) ||
        vehicle.origin.toLowerCase().includes(searchLower) ||
        vehicle.originEn.toLowerCase().includes(searchLower) ||
        vehicle.plateNumber.toLowerCase().includes(searchLower) ||
        (vehicle.driver &&
          vehicle.driver.toLowerCase().includes(searchLower)) ||
        (vehicle.driverEn &&
          vehicle.driverEn.toLowerCase().includes(searchLower))
    );

    setFilteredAirports(filteredAirportsResult);
    setFilteredSeaports(filteredSeaportsResult);
    setFilteredPoliceStations(filteredPoliceStationsResult);
    setFilteredCheckpoints(filteredCheckpointsResult);
    setFilteredVehicles(filteredVehiclesResult);
  }, [searchTerm, airports, seaports, policeStations, checkpoints, vehicles]);

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Refresh data logic here
      setIsLoading(false);
    }, 1000);
  };

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
            // Saudi locations
            airports={filteredAirports}
            seaports={filteredSeaports}
            policeStations={filteredPoliceStations}
            checkpoints={filteredCheckpoints}
            vehicles={filteredVehicles}
            // Map settings
            center={[24.7136, 46.6753]} // Saudi Arabia center
            zoom={6}
            height="100%"
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

        {/* Sidebar - Over map only - TODO: Update for Saudi data */}
        {/* <MapSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          // TODO: Update props for Saudi locations
          onRefresh={handleRefresh}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isLoading={isLoading}
        /> */}

        {/* No Results Overlay - Over map only */}
        {filteredAirports.length === 0 &&
          filteredSeaports.length === 0 &&
          filteredPoliceStations.length === 0 &&
          filteredCheckpoints.length === 0 &&
          filteredVehicles.length === 0 &&
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

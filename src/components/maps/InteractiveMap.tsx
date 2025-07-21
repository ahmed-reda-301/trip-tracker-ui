"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

// Import Saudi data
import saudiLocations from "@/data/saudi-locations.json";
import saudiVehicles from "@/data/saudi-vehicles.json";

// Dynamic import for Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Types for Saudi locations and vehicles
export interface Airport {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  city: string;
  cityEn: string;
  type: "international" | "domestic";
  status: string;
  iata: string;
  icao: string;
}

export interface Seaport {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  city: string;
  cityEn: string;
  type: string;
  status: string;
  capacity: number;
  vessels: number;
}

export interface PoliceStation {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  city: string;
  cityEn: string;
  type: string;
  status: string;
}

export interface Checkpoint {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  highway: string;
  highwayEn: string;
  type: string;
  status: string;
}

export interface Vehicle {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  type: string;
  status: string;
  speed: number;
  heading: number;
  destination: string;
  destinationEn: string;
  origin: string;
  originEn: string;
  plateNumber: string;
  driver?: string;
  driverEn?: string;
  officer?: string;
  officerEn?: string;
  cargo?: string;
  cargoEn?: string;
  passengers?: number;
  priority?: string;
}

// Legacy types for backward compatibility
export interface Port extends Seaport {
  country: string;
  countryAr: string;
}

export interface Vessel extends Vehicle {
  flag: string;
  flagAr: string;
  lastUpdate: string;
}

interface InteractiveMapProps {
  // Legacy props for backward compatibility
  ports?: Port[];
  vessels?: Vessel[];
  // New Saudi-specific props
  airports?: Airport[];
  seaports?: Seaport[];
  policeStations?: PoliceStation[];
  checkpoints?: Checkpoint[];
  vehicles?: Vehicle[];
  // Common props
  center?: [number, number];
  zoom?: number;
  height?: string;
  // Display toggles
  showPorts?: boolean;
  showVessels?: boolean;
  showAirports?: boolean;
  showSeaports?: boolean;
  showPoliceStations?: boolean;
  showCheckpoints?: boolean;
  showVehicles?: boolean;
  // Event handlers
  onPortClick?: (port: Port) => void;
  onVesselClick?: (vessel: Vessel) => void;
  onAirportClick?: (airport: Airport) => void;
  onSeaportClick?: (seaport: Seaport) => void;
  onPoliceStationClick?: (station: PoliceStation) => void;
  onCheckpointClick?: (checkpoint: Checkpoint) => void;
  onVehicleClick?: (vehicle: Vehicle) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  // Legacy props
  ports = [],
  vessels = [],
  // New Saudi props
  airports = [],
  seaports = [],
  policeStations = [],
  checkpoints = [],
  vehicles = [],
  // Common props
  center = [24.7136, 46.6753], // Riyadh coordinates as default
  zoom = 6,
  height = "600px",
  // Display toggles
  showPorts = true,
  showVessels = true,
  showAirports = true,
  showSeaports = true,
  showPoliceStations = true,
  showCheckpoints = true,
  showVehicles = true,
  // Event handlers
  onPortClick,
  onVesselClick,
  onAirportClick,
  onSeaportClick,
  onPoliceStationClick,
  onCheckpointClick,
  onVehicleClick,
}) => {
  const { isRTL } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Import Leaflet only on client side
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);

      // Fix for default markers
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });
    });
  }, []);

  // Custom icons
  const createPortIcon = (type: string, status: string) => {
    if (!L) return null;

    const color = status === "active" ? "#10b981" : "#ef4444";
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-port-icon",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  const createVesselIcon = (type: string, status: string, heading: number) => {
    if (!L) return null;

    const getTypeColor = (vesselType: string) => {
      switch (vesselType) {
        case "cargo":
          return "#3b82f6";
        case "tanker":
          return "#f59e0b";
        case "container":
          return "#8b5cf6";
        case "passenger":
          return "#06b6d4";
        case "fishing":
          return "#10b981";
        default:
          return "#6b7280";
      }
    };

    const color = getTypeColor(type);
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: 16px;
        height: 16px;
        border-radius: 2px;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transform: rotate(${heading}deg);
        position: relative;
      ">
        <div style="
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 8px solid ${color};
        "></div>
      </div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-vessel-icon",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  };

  // Saudi-specific icons
  const createAirportIcon = (
    type: "international" | "domestic",
    status: string
  ) => {
    if (!L) return null;

    const color = status === "active" ? "#3b82f6" : "#ef4444";
    const size = type === "international" ? 28 : 24;
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${type === "international" ? "14px" : "12px"};
        color: white;
        font-weight: bold;
      ">✈️</div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-airport-icon",
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  const createSeaportIcon = (type: string, status: string) => {
    if (!L) return null;

    const color = status === "active" ? "#10b981" : "#ef4444";
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        font-weight: bold;
      ">⚓</div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-seaport-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const createPoliceIcon = (type: string, status: string) => {
    if (!L) return null;

    const color = status === "active" ? "#1e40af" : "#ef4444";
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        color: white;
        font-weight: bold;
      ">🚔</div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-police-icon",
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
  };

  const createCheckpointIcon = (type: string, status: string) => {
    if (!L) return null;

    const color = status === "active" ? "#f59e0b" : "#ef4444";
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: white;
        font-weight: bold;
      ">🛑</div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-checkpoint-icon",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  const createVehicleIcon = (type: string, status: string, heading: number) => {
    if (!L) return null;

    const getVehicleIcon = (vehicleType: string) => {
      switch (vehicleType) {
        case "cargo":
        case "tanker":
        case "container":
          return "🚛";
        case "delivery":
          return "🚐";
        case "bus":
          return "🚌";
        case "emergency":
          return "🚑";
        case "police":
          return "🚔";
        default:
          return "🚗";
      }
    };

    const getVehicleColor = (vehicleType: string, vehicleStatus: string) => {
      if (vehicleStatus === "emergency") return "#dc2626";
      switch (vehicleType) {
        case "cargo":
        case "tanker":
        case "container":
          return "#059669";
        case "delivery":
          return "#3b82f6";
        case "bus":
          return "#7c3aed";
        case "emergency":
          return "#dc2626";
        case "police":
          return "#1e40af";
        default:
          return "#6b7280";
      }
    };

    const color = getVehicleColor(type, status);
    const icon = getVehicleIcon(type);
    const iconHtml = `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transform: rotate(${heading}deg);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      ">${icon}</div>
    `;

    return L.divIcon({
      html: iconHtml,
      className: "custom-vehicle-icon",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  if (!isClient) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height }}
      >
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>{isRTL ? "جاري تحميل الخريطة..." : "Loading map..."}</span>
        </div>
      </div>
    );
  }

  if (!L) {
    return (
      <div
        className="flex items-center justify-center bg-red-100 rounded-lg border border-red-300"
        style={{ height }}
      >
        <div className="flex items-center gap-2 text-red-600">
          <span>خطأ في تحميل الخريطة - Error loading map</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height, width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Port Markers */}
        {showPorts &&
          ports.map((port) => (
            <Marker
              key={`port-${port.id}`}
              position={port.coordinates}
              icon={createPortIcon(port.type, port.status)}
              eventHandlers={{
                click: () => onPortClick?.(port),
              }}
            >
              <Popup>
                <div className={`p-2 ${isRTL ? "text-right" : "text-left"}`}>
                  <h3 className="font-bold text-lg mb-2">
                    {isRTL ? port.name : port.nameEn}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Type:</strong> {port.type}
                    </p>
                    <p>
                      <strong>Status:</strong> {port.status}
                    </p>
                    <p>
                      <strong>Vessels:</strong> {port.vessels}/{port.capacity}
                    </p>
                    <p>
                      <strong>Country:</strong>{" "}
                      {isRTL ? port.countryAr : port.country}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Vessel Markers */}
        {showVessels &&
          vessels.map((vessel) => (
            <Marker
              key={`vessel-${vessel.id}`}
              position={vessel.coordinates}
              icon={createVesselIcon(
                vessel.type,
                vessel.status,
                vessel.heading
              )}
              eventHandlers={{
                click: () => onVesselClick?.(vessel),
              }}
            >
              <Popup>
                <div className={`p-2 ${isRTL ? "text-right" : "text-left"}`}>
                  <h3 className="font-bold text-lg mb-2">
                    {isRTL ? vessel.name : vessel.nameEn}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Type:</strong> {vessel.type}
                    </p>
                    <p>
                      <strong>Status:</strong> {vessel.status}
                    </p>
                    <p>
                      <strong>Speed:</strong> {vessel.speed} knots
                    </p>
                    <p>
                      <strong>Destination:</strong>{" "}
                      {isRTL ? vessel.destination : vessel.destinationEn}
                    </p>
                    <p>
                      <strong>Flag:</strong>{" "}
                      {isRTL ? vessel.flagAr : vessel.flag}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Airport Markers */}
        {showAirports &&
          airports.map((airport) => (
            <Marker
              key={`airport-${airport.id}`}
              position={airport.coordinates}
              icon={createAirportIcon(airport.type, airport.status)}
              eventHandlers={{
                click: () => onAirportClick?.(airport),
              }}
            >
              <Popup>
                <div className={`p-2 ${isRTL ? "text-right" : "text-left"}`}>
                  <h3 className="font-bold text-lg mb-2">
                    {isRTL ? airport.name : airport.nameEn}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>City:</strong>{" "}
                      {isRTL ? airport.city : airport.cityEn}
                    </p>
                    <p>
                      <strong>Type:</strong> {airport.type}
                    </p>
                    <p>
                      <strong>IATA:</strong> {airport.iata}
                    </p>
                    <p>
                      <strong>ICAO:</strong> {airport.icao}
                    </p>
                    <p>
                      <strong>Status:</strong> {airport.status}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Seaport Markers */}
        {showSeaports &&
          seaports.map((seaport) => (
            <Marker
              key={`seaport-${seaport.id}`}
              position={seaport.coordinates}
              icon={createSeaportIcon(seaport.type, seaport.status)}
              eventHandlers={{
                click: () => onSeaportClick?.(seaport),
              }}
            >
              <Popup>
                <div className={`p-2 ${isRTL ? "text-right" : "text-left"}`}>
                  <h3 className="font-bold text-lg mb-2">
                    {isRTL ? seaport.name : seaport.nameEn}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>City:</strong>{" "}
                      {isRTL ? seaport.city : seaport.cityEn}
                    </p>
                    <p>
                      <strong>Type:</strong> {seaport.type}
                    </p>
                    <p>
                      <strong>Capacity:</strong> {seaport.capacity}
                    </p>
                    <p>
                      <strong>Vessels:</strong> {seaport.vessels}
                    </p>
                    <p>
                      <strong>Status:</strong> {seaport.status}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Police Station Markers */}
        {showPoliceStations &&
          policeStations.map((station) => (
            <Marker
              key={`police-${station.id}`}
              position={station.coordinates}
              icon={createPoliceIcon(station.type, station.status)}
              eventHandlers={{
                click: () => onPoliceStationClick?.(station),
              }}
            >
              <Popup>
                <div className={`p-2 ${isRTL ? "text-right" : "text-left"}`}>
                  <h3 className="font-bold text-lg mb-2">
                    {isRTL ? station.name : station.nameEn}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>City:</strong>{" "}
                      {isRTL ? station.city : station.cityEn}
                    </p>
                    <p>
                      <strong>Type:</strong> {station.type}
                    </p>
                    <p>
                      <strong>Status:</strong> {station.status}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Checkpoint Markers */}
        {showCheckpoints &&
          checkpoints.map((checkpoint) => (
            <Marker
              key={`checkpoint-${checkpoint.id}`}
              position={checkpoint.coordinates}
              icon={createCheckpointIcon(checkpoint.type, checkpoint.status)}
              eventHandlers={{
                click: () => onCheckpointClick?.(checkpoint),
              }}
            >
              <Popup>
                <div className={`p-2 ${isRTL ? "text-right" : "text-left"}`}>
                  <h3 className="font-bold text-lg mb-2">
                    {isRTL ? checkpoint.name : checkpoint.nameEn}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Highway:</strong>{" "}
                      {isRTL ? checkpoint.highway : checkpoint.highwayEn}
                    </p>
                    <p>
                      <strong>Type:</strong> {checkpoint.type}
                    </p>
                    <p>
                      <strong>Status:</strong> {checkpoint.status}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Vehicle Markers */}
        {showVehicles &&
          vehicles.map((vehicle) => (
            <Marker
              key={`vehicle-${vehicle.id}`}
              position={vehicle.coordinates}
              icon={createVehicleIcon(
                vehicle.type,
                vehicle.status,
                vehicle.heading
              )}
              eventHandlers={{
                click: () => onVehicleClick?.(vehicle),
              }}
            >
              <Popup>
                <div className={`p-2 ${isRTL ? "text-right" : "text-left"}`}>
                  <h3 className="font-bold text-lg mb-2">
                    {isRTL ? vehicle.name : vehicle.nameEn}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Type:</strong> {vehicle.type}
                    </p>
                    <p>
                      <strong>Status:</strong> {vehicle.status}
                    </p>
                    <p>
                      <strong>Speed:</strong> {vehicle.speed} km/h
                    </p>
                    <p>
                      <strong>Plate:</strong> {vehicle.plateNumber}
                    </p>
                    <p>
                      <strong>Origin:</strong>{" "}
                      {isRTL ? vehicle.origin : vehicle.originEn}
                    </p>
                    <p>
                      <strong>Destination:</strong>{" "}
                      {isRTL ? vehicle.destination : vehicle.destinationEn}
                    </p>
                    {vehicle.driver && (
                      <p>
                        <strong>Driver:</strong>{" "}
                        {isRTL ? vehicle.driver : vehicle.driverEn}
                      </p>
                    )}
                    {vehicle.cargo && (
                      <p>
                        <strong>Cargo:</strong>{" "}
                        {isRTL ? vehicle.cargo : vehicle.cargoEn}
                      </p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;

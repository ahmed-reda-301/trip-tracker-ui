/**
 * InteractiveMap Component
 *
 * A comprehensive interactive map component built with Google Maps for real-time tracking
 * and monitoring of maritime and Saudi Arabian locations. Supports multiple data types,
 * custom markers, multilingual content, and real-time visualization.
 *
 * Features:
 * - Multi-layer Support: Airports, seaports, police stations, checkpoints, vehicles, ports, vessels
 * - Custom Markers: Unique icons for each data type with status-based styling
 * - Multilingual Popups: Automatic Arabic/English content switching
 * - RTL Support: Proper right-to-left layout support
 * - Real-time Updates: Support for live data updates
 * - Event Handling: Click handlers for all marker types
 * - Responsive Design: Works on all screen sizes
 *
 * @example
 * ```tsx
 * <InteractiveMap
 *   center={[24.7136, 46.6753]} // Riyadh coordinates
 *   zoom={6}
 *   height="100vh"
 *   airports={saudiLocations.airports}
 *   vehicles={saudiVehicles}
 *   showAirports={true}
 *   showVehicles={true}
 *   onAirportClick={(airport) => console.log('Airport clicked:', airport.name)}
 *   onVehicleClick={(vehicle) => console.log('Vehicle clicked:', vehicle.plateNumber)}
 * />
 * ```
 *
 */

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import GoogleMapWrapper, { GoogleMapMarker } from "./GoogleMapWrapper";

// Note: Saudi data can be imported when needed:
// import saudiLocations from "@/data/saudi-locations.json";
// import saudiVehicles from "@/data/saudi-vehicles.json";

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Create custom marker icons for different types
  const getMarkerIcon = (type: string, status: string) => {
    const baseUrl =
      "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=";
    const color = status === "active" ? "00FF00" : "FF0000";

    let symbol = "";
    switch (type) {
      case "airport":
      case "international":
      case "domestic":
        symbol = "A";
        break;
      case "seaport":
      case "port":
        symbol = "P";
        break;
      case "police":
      case "police_station":
        symbol = "S";
        break;
      case "checkpoint":
        symbol = "C";
        break;
      case "vehicle":
      case "truck":
      case "car":
        symbol = "V";
        break;
      case "vessel":
      case "ship":
        symbol = "B";
        break;
      default:
        symbol = "M";
    }

    return `${baseUrl}${symbol}|${color}`;
  };

  // Convert coordinates from [lat, lng] to {lat, lng} format for Google Maps
  const convertCoordinates = (
    coords: [number, number]
  ): { lat: number; lng: number } => ({
    lat: coords[0],
    lng: coords[1],
  });

  // Create markers array for Google Maps
  const createMarkersArray = useMemo(() => {
    const markers: GoogleMapMarker[] = [];

    // Add port markers
    if (showPorts) {
      ports.forEach((port) => {
        markers.push({
          id: `port-${port.id}`,
          position: convertCoordinates(port.coordinates),
          title: isRTL ? port.name : port.nameEn,
          icon: getMarkerIcon("port", port.status),
          onClick: () => onPortClick?.(port),
        });
      });
    }

    // Add vessel markers
    if (showVessels) {
      vessels.forEach((vessel) => {
        markers.push({
          id: `vessel-${vessel.id}`,
          position: convertCoordinates(vessel.coordinates),
          title: isRTL ? vessel.name : vessel.nameEn,
          icon: getMarkerIcon("vessel", vessel.status),
          onClick: () => onVesselClick?.(vessel),
        });
      });
    }

    // Add airport markers
    if (showAirports) {
      airports.forEach((airport) => {
        markers.push({
          id: `airport-${airport.id}`,
          position: convertCoordinates(airport.coordinates),
          title: isRTL ? airport.name : airport.nameEn,
          icon: getMarkerIcon("airport", airport.status),
          onClick: () => onAirportClick?.(airport),
        });
      });
    }

    // Add seaport markers
    if (showSeaports) {
      seaports.forEach((seaport) => {
        markers.push({
          id: `seaport-${seaport.id}`,
          position: convertCoordinates(seaport.coordinates),
          title: isRTL ? seaport.name : seaport.nameEn,
          icon: getMarkerIcon("seaport", seaport.status),
          onClick: () => onSeaportClick?.(seaport),
        });
      });
    }

    // Add police station markers
    if (showPoliceStations) {
      policeStations.forEach((station) => {
        markers.push({
          id: `police-${station.id}`,
          position: convertCoordinates(station.coordinates),
          title: isRTL ? station.name : station.nameEn,
          icon: getMarkerIcon("police", station.status),
          onClick: () => onPoliceStationClick?.(station),
        });
      });
    }

    // Add checkpoint markers
    if (showCheckpoints) {
      checkpoints.forEach((checkpoint) => {
        markers.push({
          id: `checkpoint-${checkpoint.id}`,
          position: convertCoordinates(checkpoint.coordinates),
          title: isRTL ? checkpoint.name : checkpoint.nameEn,
          icon: getMarkerIcon("checkpoint", checkpoint.status),
          onClick: () => onCheckpointClick?.(checkpoint),
        });
      });
    }

    // Add vehicle markers
    if (showVehicles) {
      vehicles.forEach((vehicle) => {
        markers.push({
          id: `vehicle-${vehicle.id}`,
          position: convertCoordinates(vehicle.coordinates),
          title: isRTL ? vehicle.name : vehicle.nameEn,
          icon: getMarkerIcon("vehicle", vehicle.status),
          onClick: () => onVehicleClick?.(vehicle),
        });
      });
    }

    return markers;
  }, [
    ports,
    vessels,
    airports,
    seaports,
    policeStations,
    checkpoints,
    vehicles,
    showPorts,
    showVessels,
    showAirports,
    showSeaports,
    showPoliceStations,
    showCheckpoints,
    showVehicles,
    isRTL,
    onPortClick,
    onVesselClick,
    onAirportClick,
    onSeaportClick,
    onPoliceStationClick,
    onCheckpointClick,
    onVehicleClick,
  ]);

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

  return (
    <GoogleMapWrapper
      center={convertCoordinates(center)}
      zoom={zoom}
      height={height}
      markers={createMarkersArray}
      className="rounded-lg overflow-hidden shadow-lg"
    />
  );
};

export default InteractiveMap;

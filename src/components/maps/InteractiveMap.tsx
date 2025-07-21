"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

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

// Types
export interface Port {
  id: number;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  type: string;
  status: string;
  vessels: number;
  capacity: number;
  country: string;
  countryAr: string;
}

export interface Vessel {
  id: number;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  type: string;
  status: string;
  speed: number;
  heading: number;
  destination: string;
  destinationEn: string;
  flag: string;
  flagAr: string;
  lastUpdate: string;
}

interface InteractiveMapProps {
  ports?: Port[];
  vessels?: Vessel[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showPorts?: boolean;
  showVessels?: boolean;
  onPortClick?: (port: Port) => void;
  onVesselClick?: (vessel: Vessel) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  ports = [],
  vessels = [],
  center = [24.7136, 46.6753], // Riyadh coordinates as default
  zoom = 6,
  height = "600px",
  showPorts = true,
  showVessels = true,
  onPortClick,
  onVesselClick,
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

  if (!isClient || !L) {
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
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;

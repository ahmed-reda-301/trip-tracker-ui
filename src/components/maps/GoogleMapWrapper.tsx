/**
 * GoogleMapWrapper Component
 *
 * A wrapper component for Google Maps API integration with React.
 * Provides a clean interface for rendering Google Maps with markers and custom styling.
 *
 * Features:
 * - Google Maps API integration
 * - Custom marker support
 * - Responsive design
 * - TypeScript support
 * - Error handling
 * - Loading states
 *
 * @example
 * ```tsx
 * <GoogleMapWrapper
 *   center={{ lat: 24.7136, lng: 46.6753 }}
 *   zoom={6}
 *   height="600px"
 *   markers={markers}
 *   onMarkerClick={handleMarkerClick}
 * />
 * ```
 */

"use client";

import React, { useCallback, useRef, useEffect } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Loader2 } from "lucide-react";
import FallbackMap, { FallbackMapMarker } from "./FallbackMap";

// Google Maps API key - should be set in environment variables
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export interface GoogleMapMarker {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  icon?: string;
  onClick?: () => void;
}

interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  height?: string;
  width?: string;
  markers?: GoogleMapMarker[];
  onMapClick?: (event: google.maps.MapMouseEvent) => void;
  className?: string;
}

interface MapComponentProps extends GoogleMapProps {
  // Additional props for the actual map component
}

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom,
  height = "600px",
  width = "100%",
  markers = [],
  onMapClick,
  className = "",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Initialize the map
  useEffect(() => {
    if (mapRef.current && !map.current) {
      map.current = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          // Custom map styling for better appearance
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
          },
        ],
      });

      // Add click listener if provided
      if (onMapClick) {
        map.current.addListener("click", onMapClick);
      }
    }
  }, [center, zoom, onMapClick]);

  // Update map center and zoom when props change
  useEffect(() => {
    if (map.current) {
      map.current.setCenter(center);
      map.current.setZoom(zoom);
    }
  }, [center, zoom]);

  // Update markers when markers prop changes
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach((markerData) => {
      const marker = new google.maps.Marker({
        position: markerData.position,
        map: map.current,
        title: markerData.title,
        icon: markerData.icon,
      });

      if (markerData.onClick) {
        marker.addListener("click", markerData.onClick);
      }

      markersRef.current.push(marker);
    });
  }, [markers]);

  return (
    <div
      ref={mapRef}
      style={{ height, width }}
      className={`rounded-lg overflow-hidden shadow-lg ${className}`}
    />
  );
};

const LoadingComponent: React.FC = () => (
  <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
    <div className="flex flex-col items-center gap-2">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      <p className="text-sm text-gray-600">Loading Google Maps...</p>
    </div>
  </div>
);

const ErrorComponent: React.FC<{ status: Status }> = ({ status }) => (
  <div className="flex items-center justify-center h-full bg-red-50 rounded-lg border border-red-200">
    <div className="text-center">
      <p className="text-red-600 font-medium">Failed to load Google Maps</p>
      <p className="text-sm text-red-500 mt-1">Status: {status}</p>
      <p className="text-xs text-gray-500 mt-2">
        Please check your API key and internet connection
      </p>
    </div>
  </div>
);

const GoogleMapWrapper: React.FC<GoogleMapProps> = (props) => {
  const render = useCallback(
    (status: Status) => {
      switch (status) {
        case Status.LOADING:
          return <LoadingComponent />;
        case Status.FAILURE:
          return <ErrorComponent status={status} />;
        case Status.SUCCESS:
          return <MapComponent {...props} />;
        default:
          return <LoadingComponent />;
      }
    },
    [props]
  );

  if (!GOOGLE_MAPS_API_KEY) {
    // Convert GoogleMapMarker to FallbackMapMarker
    const fallbackMarkers: FallbackMapMarker[] =
      props.markers?.map((marker) => ({
        id: marker.id,
        position: marker.position,
        title: marker.title,
        onClick: marker.onClick,
      })) || [];

    return (
      <FallbackMap
        center={props.center}
        zoom={props.zoom}
        height={props.height}
        width={props.width}
        markers={fallbackMarkers}
        className={props.className}
      />
    );
  }

  return (
    <Wrapper
      apiKey={GOOGLE_MAPS_API_KEY}
      render={render}
      libraries={["places"]}
    />
  );
};

export default GoogleMapWrapper;

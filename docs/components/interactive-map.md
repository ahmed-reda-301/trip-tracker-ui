# InteractiveMap Component Documentation

## Overview

The InteractiveMap component is the core mapping component of the Trip Tracker application. It provides a comprehensive interactive map built with Google Maps, supporting multiple data types, custom markers, multilingual content, and real-time visualization.

## File Location

**Path**: `/src/components/maps/InteractiveMap.tsx`

## Features

- **Multi-layer Support**: Airports, seaports, police stations, checkpoints, vehicles, ports, and vessels
- **Custom Markers**: Unique icons for each data type with status-based styling
- **Multilingual Popups**: Automatic Arabic/English content switching
- **RTL Support**: Proper right-to-left layout support
- **SSR Safe**: Dynamic imports to prevent server-side rendering issues
- **Real-time Updates**: Support for live data updates
- **Event Handling**: Click handlers for all marker types
- **Responsive Design**: Works on all screen sizes

## Component Interface

```typescript
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
```

## Data Type Interfaces

### Airport Interface

```typescript
interface Airport {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number]; // [latitude, longitude]
  city: string;
  cityEn: string;
  type: "international" | "domestic";
  status: string;
  iata: string; // Airport code
  icao: string; // International code
}
```

### Seaport Interface

```typescript
interface Seaport {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  city: string;
  cityEn: string;
  type: string;
  status: string;
  capacity: number;
  vessels: number; // Current vessel count
}
```

### Vehicle Interface

```typescript
interface Vehicle {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  type: string;
  status: string;
  speed: number; // km/h
  heading: number; // degrees (0-360)
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
```

### Police Station Interface

```typescript
interface PoliceStation {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  city: string;
  cityEn: string;
  type: string;
  status: string;
}
```

### Checkpoint Interface

```typescript
interface Checkpoint {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number];
  highway: string;
  highwayEn: string;
  type: string;
  status: string;
}
```

## Usage Examples

### 1. Basic Usage

```typescript
import InteractiveMap from "@/components/maps/InteractiveMap";
import saudiLocations from "@/data/saudi-locations.json";
import saudiVehicles from "@/data/saudi-vehicles.json";

function LocationMonitor() {
  return (
    <div className="h-screen">
      <InteractiveMap
        center={[24.7136, 46.6753]} // Riyadh coordinates
        zoom={6}
        height="100vh"
        airports={saudiLocations.airports}
        seaports={saudiLocations.seaports}
        vehicles={saudiVehicles}
      />
    </div>
  );
}
```

### 2. With Event Handlers

```typescript
function InteractiveMapWithHandlers() {
  const handleAirportClick = (airport: Airport) => {
    console.log("Airport clicked:", airport.name);
    // Show airport details modal
  };

  const handleVehicleClick = (vehicle: Vehicle) => {
    console.log("Vehicle clicked:", vehicle.plateNumber);
    // Show vehicle tracking details
  };

  return (
    <InteractiveMap
      airports={saudiLocations.airports}
      vehicles={saudiVehicles}
      onAirportClick={handleAirportClick}
      onVehicleClick={handleVehicleClick}
    />
  );
}
```

### 3. With Layer Controls

```typescript
function MapWithControls() {
  const [showAirports, setShowAirports] = useState(true);
  const [showVehicles, setShowVehicles] = useState(true);
  const [showPoliceStations, setShowPoliceStations] = useState(false);

  return (
    <div>
      {/* Layer Controls */}
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setShowAirports(!showAirports)}
          className={showAirports ? "bg-blue-500 text-white" : "bg-gray-200"}
        >
          Airports
        </button>
        <button
          onClick={() => setShowVehicles(!showVehicles)}
          className={showVehicles ? "bg-green-500 text-white" : "bg-gray-200"}
        >
          Vehicles
        </button>
        <button
          onClick={() => setShowPoliceStations(!showPoliceStations)}
          className={
            showPoliceStations ? "bg-red-500 text-white" : "bg-gray-200"
          }
        >
          Police Stations
        </button>
      </div>

      {/* Map */}
      <InteractiveMap
        airports={saudiLocations.airports}
        vehicles={saudiVehicles}
        policeStations={saudiLocations.policeStations}
        showAirports={showAirports}
        showVehicles={showVehicles}
        showPoliceStations={showPoliceStations}
      />
    </div>
  );
}
```

## Custom Icon System

The component includes a sophisticated custom icon system for different marker types:

### Airport Icons

- **International airports**: Larger blue circles with airplane emoji
- **Domestic airports**: Smaller blue circles with airplane emoji
- **Status-based colors**: Active (blue) vs Inactive (red)

### Vehicle Icons

- **Type-based emojis**: Different emojis for cargo trucks, buses, emergency vehicles, etc.
- **Directional rotation**: Icons rotate based on vehicle heading
- **Status-based colors**: Emergency (red), cargo (green), delivery (blue), etc.

### Seaport Icons

- **Anchor emoji**: Consistent anchor symbol for all seaports
- **Status-based colors**: Active (green) vs Inactive (red)

### Police Station Icons

- **Police car emoji**: Consistent police car symbol
- **Status-based colors**: Active (blue) vs Inactive (red)

### Checkpoint Icons

- **Stop sign emoji**: Consistent stop sign symbol
- **Status-based colors**: Active (orange) vs Inactive (red)

## Icon Creation Functions

```typescript
// Airport icon creation
const createAirportIcon = (
  type: "international" | "domestic",
  status: string
) => {
  const color = status === "active" ? "#3b82f6" : "#ef4444";
  const size = type === "international" ? 28 : 24;

  return L.divIcon({
    html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: ${
      type === "international" ? "14px" : "12px"
    }; color: white; font-weight: bold;">✈️</div>`,
    className: "custom-airport-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Vehicle icon with rotation
const createVehicleIcon = (type: string, status: string, heading: number) => {
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

  const color = getVehicleColor(type, status);
  const icon = getVehicleIcon(type);

  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); transform: rotate(${heading}deg); display: flex; align-items: center; justify-content: center; font-size: 12px;">${icon}</div>`,
    className: "custom-vehicle-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};
```

## Multilingual Popup System

The component automatically displays popup content in Arabic or English based on the current language setting:

```typescript
// Example popup content
<Popup>
  <div className={`p-2 ${isRTL ? "text-right" : "text-left"}`}>
    <h3 className="font-bold text-lg mb-2">
      {isRTL ? airport.name : airport.nameEn}
    </h3>
    <div className="space-y-1 text-sm">
      <p>
        <strong>City:</strong> {isRTL ? airport.city : airport.cityEn}
      </p>
      <p>
        <strong>Type:</strong> {airport.type}
      </p>
      <p>
        <strong>IATA:</strong> {airport.iata}
      </p>
      <p>
        <strong>Status:</strong> {airport.status}
      </p>
    </div>
  </div>
</Popup>
```

## SSR Compatibility

The component uses dynamic imports to prevent server-side rendering issues:

```typescript
// Dynamic imports for Leaflet components
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
```

## Loading States

The component includes proper loading states and error handling:

```typescript
// Loading state
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

// Error state
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
```

## Performance Considerations

### 1. Marker Optimization

- Custom HTML-based icons for better performance than image icons
- Efficient icon creation functions with caching
- Conditional rendering based on display toggles

### 2. Data Filtering

- Only render markers for visible layers
- Support for search filtering (when integrated with parent components)
- Efficient array operations for large datasets

### 3. Memory Management

- Proper cleanup of Leaflet instances
- Dynamic imports to reduce initial bundle size
- Efficient re-rendering with React keys

## Integration Examples

### With Real-time Updates

```typescript
function RealTimeMap() {
  const [vehicles, setVehicles] = useState(saudiVehicles);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => ({
          ...vehicle,
          coordinates: [
            vehicle.coordinates[0] + (Math.random() - 0.5) * 0.001,
            vehicle.coordinates[1] + (Math.random() - 0.5) * 0.001,
          ] as [number, number],
          heading: (vehicle.heading + Math.random() * 10 - 5) % 360,
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <InteractiveMap vehicles={vehicles} showVehicles={true} />;
}
```

### With Search Integration

```typescript
function SearchableMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState(saudiVehicles);

  useEffect(() => {
    const filtered = saudiVehicles.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVehicles(filtered);
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search vehicles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <InteractiveMap vehicles={filteredVehicles} showVehicles={true} />
    </div>
  );
}
```

## Best Practices

### 1. Data Management

- Always provide unique IDs for all data items
- Use consistent coordinate format [latitude, longitude]
- Implement proper error handling for invalid coordinates

### 2. Performance

- Use display toggles to control marker rendering
- Implement search filtering at the parent component level
- Consider marker clustering for large datasets

### 3. User Experience

- Provide loading states during data fetching
- Use meaningful popup content with proper formatting
- Implement proper error boundaries

### 4. Accessibility

- Ensure proper keyboard navigation
- Provide alternative text for screen readers
- Use high contrast colors for markers

## Troubleshooting

### Common Issues

1. **Map not loading**: Check if Leaflet CSS is imported in your application
2. **Markers not showing**: Verify coordinate format and data structure
3. **Icons not displaying**: Check icon creation functions and emoji support
4. **SSR errors**: Ensure dynamic imports are properly configured

### Debug Tips

```typescript
// Add debug logging for marker creation
const debugMarkerCreation = (type: string, data: any) => {
  console.log(`Creating ${type} marker:`, {
    id: data.id,
    coordinates: data.coordinates,
    status: data.status,
  });
};

// Monitor map events
const handleMapEvents = (map: any) => {
  map.on("click", (e: any) => {
    console.log("Map clicked at:", e.latlng);
  });

  map.on("zoomend", () => {
    console.log("Zoom level:", map.getZoom());
  });
};
```

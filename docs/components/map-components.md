# Map Components Documentation

## Overview

The Trip Tracker application includes a comprehensive map system built with **React Leaflet** for interactive mapping capabilities. The system supports multiple data types, custom markers, and real-time tracking visualization.

## Core Components

### 1. InteractiveMap Component

**Location**: `/src/components/maps/InteractiveMap.tsx`

The main map component that renders an interactive map with various data layers.

#### Props Interface

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

#### Basic Usage

```typescript
import InteractiveMap from '@/components/maps/InteractiveMap';
import saudiLocations from '@/data/saudi-locations.json';
import saudiVehicles from '@/data/saudi-vehicles.json';

function LocationMonitor() {
  return (
    <div className="h-screen">
      <InteractiveMap
        center={[24.7136, 46.6753]} // Riyadh coordinates
        zoom={6}
        height="100vh"
        airports={saudiLocations.airports}
        seaports={saudiLocations.seaports}
        policeStations={saudiLocations.policeStations}
        checkpoints={saudiLocations.checkpoints}
        vehicles={saudiVehicles}
        onAirportClick={(airport) => console.log('Airport clicked:', airport)}
        onVehicleClick={(vehicle) => console.log('Vehicle clicked:', vehicle)}
      />
    </div>
  );
}
```

#### Advanced Usage with State Management

```typescript
function AdvancedMapView() {
  const [selectedLayers, setSelectedLayers] = useState({
    airports: true,
    seaports: true,
    policeStations: false,
    checkpoints: true,
    vehicles: true,
  });

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item: any, type: string) => {
    setSelectedItem({ ...item, type });
  };

  return (
    <div className="flex h-screen">
      {/* Map */}
      <div className="flex-1">
        <InteractiveMap
          center={[24.7136, 46.6753]}
          zoom={6}
          height="100vh"
          showAirports={selectedLayers.airports}
          showSeaports={selectedLayers.seaports}
          showPoliceStations={selectedLayers.policeStations}
          showCheckpoints={selectedLayers.checkpoints}
          showVehicles={selectedLayers.vehicles}
          airports={saudiLocations.airports}
          seaports={saudiLocations.seaports}
          policeStations={saudiLocations.policeStations}
          checkpoints={saudiLocations.checkpoints}
          vehicles={saudiVehicles}
          onAirportClick={(airport) => handleItemClick(airport, 'airport')}
          onSeaportClick={(seaport) => handleItemClick(seaport, 'seaport')}
          onPoliceStationClick={(station) => handleItemClick(station, 'police')}
          onCheckpointClick={(checkpoint) => handleItemClick(checkpoint, 'checkpoint')}
          onVehicleClick={(vehicle) => handleItemClick(vehicle, 'vehicle')}
        />
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg">
        <LayerControls 
          layers={selectedLayers}
          onChange={setSelectedLayers}
        />
        {selectedItem && (
          <ItemDetails item={selectedItem} />
        )}
      </div>
    </div>
  );
}
```

## Data Types and Interfaces

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
  status: "active" | "inactive";
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
  status: "active" | "inactive";
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
  type: "cargo" | "tanker" | "container" | "delivery" | "bus" | "emergency" | "police";
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
  priority?: "high" | "medium" | "low";
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
  status: "active" | "inactive";
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
  status: "active" | "inactive";
}
```

## Custom Markers and Icons

### Icon Creation System

The map uses custom HTML-based icons for different marker types:

#### Airport Icons
```typescript
const createAirportIcon = (type: "international" | "domestic", status: string) => {
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
```

#### Vehicle Icons with Direction
```typescript
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
```

## Map Controls and Features

### Layer Toggle Controls
```typescript
function LayerControls({ 
  layers, 
  onChange 
}: { 
  layers: LayerState; 
  onChange: (layers: LayerState) => void; 
}) {
  const toggleLayer = (layerName: keyof LayerState) => {
    onChange({
      ...layers,
      [layerName]: !layers[layerName]
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="font-semibold mb-3">Map Layers</h3>
      <div className="space-y-2">
        {Object.entries(layers).map(([key, value]) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={value}
              onChange={() => toggleLayer(key as keyof LayerState)}
              className="rounded"
            />
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
```

### Real-time Updates
```typescript
function useRealTimeMap() {
  const [vehicles, setVehicles] = useState(saudiVehicles);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prevVehicles => 
        prevVehicles.map(vehicle => ({
          ...vehicle,
          coordinates: [
            vehicle.coordinates[0] + (Math.random() - 0.5) * 0.001,
            vehicle.coordinates[1] + (Math.random() - 0.5) * 0.001,
          ] as [number, number],
          heading: (vehicle.heading + Math.random() * 10 - 5) % 360,
          speed: Math.max(0, vehicle.speed + Math.random() * 10 - 5),
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return vehicles;
}
```

## Integration Examples

### With Search and Filtering
```typescript
function MapWithSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState(saudiVehicles);

  useEffect(() => {
    const filtered = saudiVehicles.filter(vehicle =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVehicles(filtered);
  }, [searchTerm]);

  return (
    <div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <InteractiveMap
        vehicles={filteredVehicles}
        height="calc(100vh - 80px)"
      />
    </div>
  );
}
```

### With Status Filtering
```typescript
function MapWithStatusFilter() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return saudiVehicles;
    return saudiVehicles.filter(vehicle => vehicle.status === statusFilter);
  }, [statusFilter]);

  return (
    <div>
      <div className="p-4">
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">All Vehicles</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="emergency">Emergency</option>
        </select>
      </div>
      <InteractiveMap
        vehicles={filteredData}
        height="calc(100vh - 80px)"
      />
    </div>
  );
}
```

## Performance Optimization

### Marker Clustering
```typescript
// For large datasets, implement marker clustering
import MarkerClusterGroup from 'react-leaflet-cluster';

function ClusteredMap({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <MapContainer>
      <TileLayer />
      <MarkerClusterGroup>
        {vehicles.map(vehicle => (
          <Marker
            key={vehicle.id}
            position={vehicle.coordinates}
            icon={createVehicleIcon(vehicle.type, vehicle.status, vehicle.heading)}
          >
            <Popup>
              <VehiclePopupContent vehicle={vehicle} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
```

### Viewport-based Rendering
```typescript
function useViewportFiltering(items: any[], map: any) {
  const [visibleItems, setVisibleItems] = useState(items);

  useEffect(() => {
    if (!map) return;

    const updateVisibleItems = () => {
      const bounds = map.getBounds();
      const filtered = items.filter(item => 
        bounds.contains(item.coordinates)
      );
      setVisibleItems(filtered);
    };

    map.on('moveend', updateVisibleItems);
    updateVisibleItems(); // Initial filter

    return () => {
      map.off('moveend', updateVisibleItems);
    };
  }, [map, items]);

  return visibleItems;
}
```

## Troubleshooting

### Common Issues

1. **Map not loading**: Ensure Leaflet CSS is imported
2. **Markers not showing**: Check coordinate format [lat, lng]
3. **Icons not displaying**: Verify icon creation functions
4. **Performance issues**: Implement clustering for large datasets

### Debug Tips

```typescript
// Add debug logging
const debugMap = (map: any) => {
  console.log('Map center:', map.getCenter());
  console.log('Map zoom:', map.getZoom());
  console.log('Map bounds:', map.getBounds());
};

// Monitor marker creation
const createDebugIcon = (type: string, data: any) => {
  console.log(`Creating ${type} icon for:`, data);
  return createVehicleIcon(data.type, data.status, data.heading);
};
```

## Best Practices

1. **Always use dynamic imports** for Leaflet to avoid SSR issues
2. **Implement proper loading states** while map initializes
3. **Use TypeScript interfaces** for all data types
4. **Optimize marker rendering** for large datasets
5. **Handle coordinate validation** before rendering markers
6. **Implement proper error boundaries** for map failures
7. **Use consistent icon sizing** across marker types
8. **Provide fallback content** when map fails to load

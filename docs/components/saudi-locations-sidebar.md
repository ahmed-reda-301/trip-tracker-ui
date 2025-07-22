# SaudiLocationsSidebar Component Documentation

## Overview

The SaudiLocationsSidebar component provides a comprehensive sidebar interface specifically designed for monitoring Saudi Arabian locations and vehicles. It features tabbed navigation, real-time statistics, layer controls, and detailed location listings with full multilingual support.

## File Location

**Path**: `/src/components/maps/SaudiLocationsSidebar.tsx`

## Features

- **Tabbed Interface**: Statistics, Controls, and List tabs for organized content
- **Real-time Statistics**: Live statistics cards with color-coded categories
- **Layer Controls**: Toggle visibility of different location types
- **Search Functionality**: Search across all locations and vehicles
- **Multilingual Support**: Automatic Arabic/English content switching
- **RTL Support**: Proper right-to-left layout support
- **Responsive Design**: Mobile-friendly with backdrop overlay
- **Live Time Display**: Real-time clock with locale-specific formatting
- **Animated Transitions**: Smooth slide-in/out animations

## Component Interface

```typescript
interface SaudiLocationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;

  // Data
  airports: Airport[];
  seaports: Seaport[];
  policeStations: PoliceStation[];
  checkpoints: Checkpoint[];
  vehicles: Vehicle[];

  // Display toggles
  showAirports: boolean;
  showSeaports: boolean;
  showPoliceStations: boolean;
  showCheckpoints: boolean;
  showVehicles: boolean;

  // Toggle functions
  onToggleAirports: () => void;
  onToggleSeaports: () => void;
  onTogglePoliceStations: () => void;
  onToggleCheckpoints: () => void;
  onToggleVehicles: () => void;

  // Other functions
  onRefresh: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isLoading: boolean;
}
```

## Tab Structure

### 1. Statistics Tab

Displays real-time statistics with color-coded cards:

- **Airports**: Blue cards showing total airport count
- **Seaports**: Cyan cards showing total seaport count
- **Police Stations**: Red cards showing police station count
- **Checkpoints**: Orange cards showing checkpoint count
- **Active Vehicles**: Green cards showing moving/emergency vehicles
- **Emergency Vehicles**: Red cards showing emergency status vehicles
- **System Summary**: Overall system statistics

### 2. Controls Tab

Provides interactive controls:

- **Refresh Button**: Updates all data with loading animation
- **Layer Toggles**: Individual visibility controls for each layer type
- **Visual Indicators**: Eye/EyeOff icons with color-coded states

### 3. List Tab

Shows detailed listings:

- **Categorized Lists**: Separate sections for each location type
- **Limited Display**: Shows first 5 items of each category with scrolling
- **Quick Info**: Name, city/highway, and type for each item

## Usage Examples

### 1. Basic Usage

```typescript
import SaudiLocationsSidebar from "@/components/maps/SaudiLocationsSidebar";
import saudiLocations from "@/data/saudi-locations.json";
import saudiVehicles from "@/data/saudi-vehicles.json";

function MapWithSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAirports, setShowAirports] = useState(true);
  const [showSeaports, setShowSeaports] = useState(true);
  const [showPoliceStations, setShowPoliceStations] = useState(true);
  const [showCheckpoints, setShowCheckpoints] = useState(true);
  const [showVehicles, setShowVehicles] = useState(true);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="relative h-screen">
      <SaudiLocationsSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        airports={saudiLocations.airports}
        seaports={saudiLocations.seaports}
        policeStations={saudiLocations.policeStations}
        checkpoints={saudiLocations.checkpoints}
        vehicles={saudiVehicles}
        showAirports={showAirports}
        showSeaports={showSeaports}
        showPoliceStations={showPoliceStations}
        showCheckpoints={showCheckpoints}
        showVehicles={showVehicles}
        onToggleAirports={() => setShowAirports(!showAirports)}
        onToggleSeaports={() => setShowSeaports(!showSeaports)}
        onTogglePoliceStations={() =>
          setShowPoliceStations(!showPoliceStations)
        }
        onToggleCheckpoints={() => setShowCheckpoints(!showCheckpoints)}
        onToggleVehicles={() => setShowVehicles(!showVehicles)}
        onRefresh={handleRefresh}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={isLoading}
      />
    </div>
  );
}
```

### 2. With State Management

```typescript
function AdvancedMapSidebar() {
  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    activeTab: "stats" as "stats" | "controls" | "list",
    searchTerm: "",
    isLoading: false,
    layers: {
      airports: true,
      seaports: true,
      policeStations: false,
      checkpoints: true,
      vehicles: true,
    },
  });

  const updateSidebarState = (updates: Partial<typeof sidebarState>) => {
    setSidebarState((prev) => ({ ...prev, ...updates }));
  };

  const toggleLayer = (layer: keyof typeof sidebarState.layers) => {
    setSidebarState((prev) => ({
      ...prev,
      layers: {
        ...prev.layers,
        [layer]: !prev.layers[layer],
      },
    }));
  };

  return (
    <SaudiLocationsSidebar
      isOpen={sidebarState.isOpen}
      onClose={() => updateSidebarState({ isOpen: false })}
      // ... other props
      showAirports={sidebarState.layers.airports}
      showSeaports={sidebarState.layers.seaports}
      showPoliceStations={sidebarState.layers.policeStations}
      showCheckpoints={sidebarState.layers.checkpoints}
      showVehicles={sidebarState.layers.vehicles}
      onToggleAirports={() => toggleLayer("airports")}
      onToggleSeaports={() => toggleLayer("seaports")}
      onTogglePoliceStations={() => toggleLayer("policeStations")}
      onToggleCheckpoints={() => toggleLayer("checkpoints")}
      onToggleVehicles={() => toggleLayer("vehicles")}
      searchTerm={sidebarState.searchTerm}
      onSearchChange={(term) => updateSidebarState({ searchTerm: term })}
      isLoading={sidebarState.isLoading}
    />
  );
}
```

### 3. With Custom Statistics

```typescript
function CustomStatsSidebar() {
  const [customStats, setCustomStats] = useState({
    totalLocations: 0,
    activeVehicles: 0,
    emergencyVehicles: 0,
    systemHealth: "good",
  });

  useEffect(() => {
    // Calculate custom statistics
    const totalLocations =
      saudiLocations.airports.length +
      saudiLocations.seaports.length +
      saudiLocations.policeStations.length +
      saudiLocations.checkpoints.length;

    const activeVehicles = saudiVehicles.filter(
      (v) => v.status === "moving" || v.status === "emergency"
    ).length;

    const emergencyVehicles = saudiVehicles.filter(
      (v) => v.status === "emergency"
    ).length;

    setCustomStats({
      totalLocations,
      activeVehicles,
      emergencyVehicles,
      systemHealth: emergencyVehicles > 5 ? "warning" : "good",
    });
  }, [saudiLocations, saudiVehicles]);

  return (
    <SaudiLocationsSidebar
    // ... standard props
    // Custom statistics will be calculated internally
    />
  );
}
```

## Statistics Calculation

The component automatically calculates various statistics:

```typescript
// Internal statistics calculation
const totalLocations =
  airports.length +
  seaports.length +
  policeStations.length +
  checkpoints.length;

const activeVehicles = vehicles.filter(
  (v) => v.status === "moving" || v.status === "emergency"
).length;

const emergencyVehicles = vehicles.filter(
  (v) => v.status === "emergency"
).length;
```

## Real-time Features

### Live Clock Display

```typescript
const { time: currentTime } = useClientTime(isRTL ? "ar-SA" : "en-US", 1000);

// Displays in sidebar header
<div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
  <Clock className="w-4 h-4" />
  <span>
    {isRTL ? "آخر تحديث: " : "Last updated: "}
    {currentTime || "Loading..."}
  </span>
</div>;
```

### Refresh Functionality

```typescript
const handleRefresh = async () => {
  setIsLoading(true);
  try {
    await onRefresh(); // Parent component handles actual refresh
  } finally {
    setIsLoading(false);
  }
};

// Refresh button with loading state
<button
  onClick={onRefresh}
  disabled={isLoading}
  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
>
  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
  {isLoading
    ? isRTL
      ? "جاري التحديث..."
      : "Refreshing..."
    : isRTL
    ? "تحديث البيانات"
    : "Refresh Data"}
</button>;
```

## Responsive Design

### Mobile Optimization

- **Backdrop Overlay**: Dark overlay on mobile devices
- **Touch-friendly**: Large touch targets for mobile interaction
- **Slide Animation**: Smooth slide-in/out transitions
- **Responsive Width**: Adapts to screen size (320px on mobile, 384px on desktop)

### RTL Support

- **Direction-aware Positioning**: Left positioning for RTL, right for LTR
- **Animation Direction**: Proper slide direction based on language
- **Text Alignment**: Automatic text alignment based on language direction

```typescript
// RTL-aware positioning and animation
className={`
  absolute top-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : isRTL ? "-translate-x-full" : "translate-x-full"}
  ${isRTL ? "left-0" : "right-0"}
  w-80 lg:w-96
`}
```

## Layer Control System

### Toggle Controls

Each layer type has individual toggle controls with:

- **Visual Indicators**: Eye/EyeOff icons
- **Color Coding**: Matches the layer's theme color
- **Status Text**: "Visible"/"Hidden" in appropriate language

```typescript
// Layer control configuration
const layerControls = [
  {
    key: "airports",
    label: isRTL ? "المطارات" : "Airports",
    show: showAirports,
    toggle: onToggleAirports,
    icon: Plane,
    color: "blue",
  },
  {
    key: "seaports",
    label: isRTL ? "الموانئ" : "Seaports",
    show: showSeaports,
    toggle: onToggleSeaports,
    icon: Anchor,
    color: "cyan",
  },
  // ... more controls
];
```

## Search Integration

### Search Input

- **Placeholder Text**: Localized placeholder text
- **Real-time Search**: Updates as user types
- **Icon Integration**: Search icon with proper RTL positioning

```typescript
<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
  <input
    type="text"
    placeholder={isRTL ? "البحث في المواقع..." : "Search locations..."}
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
  />
</div>
```

## Performance Optimization

### Efficient Rendering

- **Conditional Rendering**: Only renders visible content
- **Limited Lists**: Shows only first 5 items with scrolling
- **Memoized Calculations**: Statistics calculated efficiently

### Memory Management

- **Event Cleanup**: Proper cleanup of timers and event listeners
- **Optimized Re-renders**: Uses React keys for efficient updates

## Integration Patterns

### With Map Component

```typescript
function IntegratedMapSystem() {
  const [mapState, setMapState] = useState({
    sidebarOpen: false,
    selectedItem: null,
    searchTerm: "",
    layers: {
      airports: true,
      seaports: true,
      policeStations: true,
      checkpoints: true,
      vehicles: true,
    },
  });

  return (
    <div className="relative h-screen">
      <InteractiveMap
        airports={saudiLocations.airports}
        seaports={saudiLocations.seaports}
        policeStations={saudiLocations.policeStations}
        checkpoints={saudiLocations.checkpoints}
        vehicles={saudiVehicles}
        showAirports={mapState.layers.airports}
        showSeaports={mapState.layers.seaports}
        showPoliceStations={mapState.layers.policeStations}
        showCheckpoints={mapState.layers.checkpoints}
        showVehicles={mapState.layers.vehicles}
      />

      <SaudiLocationsSidebar
        isOpen={mapState.sidebarOpen}
        onClose={() => setMapState((prev) => ({ ...prev, sidebarOpen: false }))}
        // ... other props
      />
    </div>
  );
}
```

### With Data Fetching

```typescript
function DataDrivenSidebar() {
  const [data, setData] = useState({
    airports: [],
    seaports: [],
    policeStations: [],
    checkpoints: [],
    vehicles: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [airports, seaports, policeStations, checkpoints, vehicles] =
        await Promise.all([
          fetch("/api/airports").then((r) => r.json()),
          fetch("/api/seaports").then((r) => r.json()),
          fetch("/api/police-stations").then((r) => r.json()),
          fetch("/api/checkpoints").then((r) => r.json()),
          fetch("/api/vehicles").then((r) => r.json()),
        ]);

      setData({ airports, seaports, policeStations, checkpoints, vehicles });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SaudiLocationsSidebar
      // ... props
      airports={data.airports}
      seaports={data.seaports}
      policeStations={data.policeStations}
      checkpoints={data.checkpoints}
      vehicles={data.vehicles}
      onRefresh={fetchData}
      isLoading={isLoading}
    />
  );
}
```

## Best Practices

### 1. State Management

- Use centralized state for complex applications
- Implement proper loading states
- Handle errors gracefully

### 2. Performance

- Limit list rendering to prevent performance issues
- Use proper React keys for list items
- Implement search debouncing for large datasets

### 3. User Experience

- Provide clear visual feedback for all actions
- Use consistent color coding across the interface
- Implement proper accessibility features

### 4. Data Handling

- Validate data structure before rendering
- Handle empty states gracefully
- Implement proper error boundaries

## Troubleshooting

### Common Issues

1. **Sidebar not opening**: Check `isOpen` prop and CSS transforms
2. **Statistics not updating**: Verify data props are being passed correctly
3. **Search not working**: Ensure `onSearchChange` is properly connected
4. **RTL issues**: Check language context and CSS classes

### Debug Tips

```typescript
// Add debug logging
const debugSidebarState = () => {
  console.log("Sidebar State:", {
    isOpen,
    searchTerm,
    isLoading,
    dataLengths: {
      airports: airports.length,
      seaports: seaports.length,
      policeStations: policeStations.length,
      checkpoints: checkpoints.length,
      vehicles: vehicles.length,
    },
  });
};

// Monitor tab changes
const handleTabChange = (newTab: string) => {
  console.log("Tab changed to:", newTab);
  setActiveTab(newTab);
};
```

## Accessibility Features

### Keyboard Navigation

- Full keyboard support for all interactive elements
- Proper tab order throughout the interface
- Escape key to close sidebar

### Screen Reader Support

- Proper ARIA labels for all controls
- Semantic HTML structure
- Clear text descriptions for statistics

### Visual Accessibility

- High contrast colors for all text
- Clear visual indicators for interactive elements
- Consistent iconography throughout

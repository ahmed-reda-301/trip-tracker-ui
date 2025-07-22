# MapSidebar Component Documentation

## Overview

The MapSidebar component provides a comprehensive sidebar interface for maritime operations, featuring integrated statistics, detailed port and vessel listings, and interactive controls. It combines the MapStats component with scrollable lists and search functionality.

## File Location

**Path**: `/src/components/maps/MapSidebar.tsx`

## Features

- **Integrated Statistics**: Built-in MapStats component for key metrics
- **Detailed Listings**: Scrollable lists of ports and vessels with full details
- **Search Functionality**: Real-time search across ports and vessels
- **Multilingual Support**: Automatic Arabic/English content switching
- **RTL Support**: Proper right-to-left layout support
- **Responsive Design**: Mobile-friendly with backdrop overlay
- **Interactive Elements**: Clickable items with hover effects
- **Status Indicators**: Color-coded status badges for ports and vessels
- **Smooth Animations**: Slide-in/out transitions

## Component Interface

```typescript
interface MapSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  ports: Port[];
  vessels: Vessel[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onPortClick?: (port: Port) => void;
  onVesselClick?: (vessel: Vessel) => void;
}

interface Port {
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
  country: string;
  countryAr: string;
}

interface Vessel {
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
  flag: string;
  flagAr: string;
  lastUpdate: string;
}
```

## Usage Examples

### 1. Basic Usage

```typescript
import MapSidebar from "@/components/maps/MapSidebar";
import portsData from "@/data/ports.json";
import vesselsData from "@/data/vessels.json";

function MaritimeMap() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePortClick = (port: Port) => {
    console.log("Port clicked:", port.name);
    // Handle port selection (e.g., center map on port)
  };

  const handleVesselClick = (vessel: Vessel) => {
    console.log("Vessel clicked:", vessel.name);
    // Handle vessel selection (e.g., show vessel details)
  };

  return (
    <div className="relative h-screen">
      <button
        onClick={() => setSidebarOpen(true)}
        className="absolute top-4 right-4 z-10 bg-white p-2 rounded-lg shadow-lg"
      >
        Open Sidebar
      </button>

      <MapSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ports={portsData}
        vessels={vesselsData}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onPortClick={handlePortClick}
        onVesselClick={handleVesselClick}
      />
    </div>
  );
}
```

### 2. With Filtered Data

```typescript
function FilteredMapSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPorts = useMemo(() => {
    let filtered = portsData;

    if (statusFilter !== "all") {
      filtered = filtered.filter((port) => port.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (port) =>
          port.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          port.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          port.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          port.cityEn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, statusFilter]);

  const filteredVessels = useMemo(() => {
    let filtered = vesselsData;

    if (statusFilter !== "all") {
      filtered = filtered.filter((vessel) => vessel.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (vessel) =>
          vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vessel.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vessel.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, statusFilter]);

  return (
    <div className="relative h-screen">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white p-2 rounded-lg shadow-lg border"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <button
          onClick={() => setSidebarOpen(true)}
          className="bg-white p-2 rounded-lg shadow-lg"
        >
          Open Sidebar
        </button>
      </div>

      <MapSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ports={filteredPorts}
        vessels={filteredVessels}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}
```

### 3. With Real-time Updates

```typescript
function RealTimeMapSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({ ports: [], vessels: [] });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portsResponse, vesselsResponse] = await Promise.all([
          fetch("/api/ports"),
          fetch("/api/vessels"),
        ]);

        const ports = await portsResponse.json();
        const vessels = await vesselsResponse.json();

        setData({ ports, vessels });
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    // Initial load
    fetchData();

    // Set up real-time updates
    const interval = setInterval(fetchData, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen">
      <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded-lg shadow-lg">
        <div className="text-xs text-gray-500 mb-2">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
        <button onClick={() => setSidebarOpen(true)}>
          Open Sidebar ({data.ports.length + data.vessels.length} items)
        </button>
      </div>

      <MapSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ports={data.ports}
        vessels={data.vessels}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}
```

### 4. With Custom Actions

```typescript
function ActionableMapSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState(new Set());

  const handlePortClick = (port: Port) => {
    // Custom port action
    if (selectedItems.has(port.id)) {
      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(port.id);
        return newSet;
      });
    } else {
      setSelectedItems((prev) => new Set(prev).add(port.id));
    }
  };

  const handleVesselClick = (vessel: Vessel) => {
    // Custom vessel action
    showVesselDetails(vessel);
  };

  const showVesselDetails = (vessel: Vessel) => {
    // Show modal or navigate to vessel details
    console.log("Showing details for vessel:", vessel.name);
  };

  return (
    <div className="relative h-screen">
      <MapSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ports={portsData}
        vessels={vesselsData}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onPortClick={handlePortClick}
        onVesselClick={handleVesselClick}
      />

      {selectedItems.size > 0 && (
        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          <p>{selectedItems.size} ports selected</p>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Export Selected
          </button>
        </div>
      )}
    </div>
  );
}
```

## Component Structure

### Layout Sections

1. **Header Section**

   - Close button
   - Title
   - Search input

2. **Statistics Section**

   - Integrated MapStats component
   - Real-time metrics display

3. **Content Sections**
   - Ports list with details
   - Vessels list with details
   - Scrollable containers

### Visual Layout

```
┌─────────────────────────────────┐
│  [X]  Maritime Operations       │
│  ┌─────────────────────────────┐ │
│  │ 🔍 Search...                │ │
│  └─────────────────────────────┘ │
│                                 │
│  ┌─── Statistics Cards ────────┐ │
│  │ [⚓] [🚢] [📍] [📈]         │ │
│  └─────────────────────────────┘ │
│                                 │
│  📍 Ports (25)                  │
│  ┌─────────────────────────────┐ │
│  │ Port Name        [Active]   │ │
│  │ City, Country    Capacity   │ │
│  │ ─────────────────────────── │ │
│  │ ...more ports...            │ │
│  └─────────────────────────────┘ │
│                                 │
│  🚢 Vessels (42)                │
│  ┌─────────────────────────────┐ │
│  │ Vessel Name      [Moving]   │ │
│  │ Origin → Destination        │ │
│  │ ─────────────────────────── │ │
│  │ ...more vessels...          │ │
│  └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## Search Functionality

### Search Implementation

```typescript
// Search input with icon
<div className="relative mb-4">
  <Search
    className={`absolute ${
      isRTL ? "right-3" : "left-3"
    } top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4`}
  />
  <input
    type="text"
    placeholder={
      isRTL ? "البحث في الموانئ والسفن..." : "Search ports and vessels..."
    }
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
    className={`w-full ${
      isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
    } py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
  />
</div>
```

### Search Filtering

The search functionality filters both ports and vessels based on:

**For Ports:**

- Port name (Arabic and English)
- City name (Arabic and English)
- Country name (Arabic and English)
- Port type

**For Vessels:**

- Vessel name (Arabic and English)
- Plate number
- Origin and destination
- Flag country

## Status Indicators

### Port Status Badges

```typescript
const getPortStatusBadge = (status: string) => {
  const statusConfig = {
    active: {
      color: "bg-green-100 text-green-800",
      label: isRTL ? "نشط" : "Active",
    },
    inactive: {
      color: "bg-red-100 text-red-800",
      label: isRTL ? "غير نشط" : "Inactive",
    },
    maintenance: {
      color: "bg-yellow-100 text-yellow-800",
      label: isRTL ? "صيانة" : "Maintenance",
    },
  };

  const config = statusConfig[status] || statusConfig.inactive;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
};
```

### Vessel Status Badges

```typescript
const getVesselStatusBadge = (status: string) => {
  const statusConfig = {
    moving: {
      color: "bg-blue-100 text-blue-800",
      label: isRTL ? "متحرك" : "Moving",
    },
    docked: {
      color: "bg-gray-100 text-gray-800",
      label: isRTL ? "راسي" : "Docked",
    },
    loading: {
      color: "bg-orange-100 text-orange-800",
      label: isRTL ? "تحميل" : "Loading",
    },
    emergency: {
      color: "bg-red-100 text-red-800",
      label: isRTL ? "طوارئ" : "Emergency",
    },
  };

  const config = statusConfig[status] || statusConfig.docked;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
};
```

## Responsive Design

### Mobile Optimization

- **Backdrop Overlay**: Dark overlay on mobile devices for better focus
- **Touch-friendly**: Large touch targets for mobile interaction
- **Slide Animation**: Smooth slide-in/out transitions
- **Full Height**: Takes full screen height on mobile

### RTL Support

- **Direction-aware Positioning**: Right positioning for RTL, left for LTR
- **Search Icon Position**: Proper icon positioning based on text direction
- **Text Alignment**: Automatic alignment based on language

```typescript
// RTL-aware positioning
className={`
  absolute top-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
  ${isOpen ? "translate-x-0" : isRTL ? "-translate-x-full" : "translate-x-full"}
  ${isRTL ? "left-0" : "right-0"}
  w-80 lg:w-96
`}
```

## Performance Optimization

### Efficient Rendering

- **Virtualized Lists**: For large datasets, consider implementing virtualization
- **Memoized Components**: Statistics calculations are optimized
- **Conditional Rendering**: Only renders visible content

### Memory Management

- **Event Cleanup**: Proper cleanup of event listeners
- **Optimized Re-renders**: Uses React keys for efficient updates

## Integration Patterns

### With Map Component

```typescript
function IntegratedMapSystem() {
  const [mapState, setMapState] = useState({
    sidebarOpen: false,
    selectedPort: null,
    selectedVessel: null,
    searchTerm: "",
  });

  const handlePortClick = (port: Port) => {
    setMapState((prev) => ({ ...prev, selectedPort: port }));
    // Center map on selected port
    centerMapOnLocation(port.coordinates);
  };

  const handleVesselClick = (vessel: Vessel) => {
    setMapState((prev) => ({ ...prev, selectedVessel: vessel }));
    // Track selected vessel on map
    trackVesselOnMap(vessel);
  };

  return (
    <div className="relative h-screen">
      <InteractiveMap
        ports={portsData}
        vessels={vesselsData}
        selectedPort={mapState.selectedPort}
        selectedVessel={mapState.selectedVessel}
      />

      <MapSidebar
        isOpen={mapState.sidebarOpen}
        onClose={() => setMapState((prev) => ({ ...prev, sidebarOpen: false }))}
        ports={portsData}
        vessels={vesselsData}
        searchTerm={mapState.searchTerm}
        onSearchChange={(term) =>
          setMapState((prev) => ({ ...prev, searchTerm: term }))
        }
        onPortClick={handlePortClick}
        onVesselClick={handleVesselClick}
      />
    </div>
  );
}
```

## Best Practices

### 1. Data Validation

- Always validate data structure before rendering
- Handle empty arrays gracefully
- Provide fallback values for missing properties

### 2. Performance

- Implement search debouncing for large datasets
- Use proper React keys for list items
- Consider virtualization for very large lists

### 3. User Experience

- Provide clear visual feedback for all interactions
- Use consistent color coding throughout
- Implement proper loading and error states

### 4. Accessibility

- Ensure keyboard navigation works properly
- Provide proper ARIA labels for screen readers
- Use semantic HTML structure

## Troubleshooting

### Common Issues

1. **Sidebar not opening**: Check `isOpen` prop and CSS transforms
2. **Search not working**: Verify `onSearchChange` callback is connected
3. **Statistics not updating**: Ensure data props are being passed correctly
4. **RTL layout issues**: Check language context and CSS classes

### Debug Tips

```typescript
// Add debug logging
const debugSidebarData = (ports, vessels, searchTerm) => {
  console.log("MapSidebar Debug:", {
    portsCount: ports.length,
    vesselsCount: vessels.length,
    searchTerm,
    filteredPorts: ports.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).length,
  });
};

// Monitor click events
const handlePortClickDebug = (port: Port) => {
  console.log("Port clicked:", port.name, port.coordinates);
  onPortClick?.(port);
};
```

## Accessibility Features

### Keyboard Navigation

- Full keyboard support for all interactive elements
- Proper tab order throughout the interface
- Escape key to close sidebar

### Screen Reader Support

- Proper ARIA labels for all controls
- Semantic HTML structure with headings
- Clear descriptions for statistics and status indicators

### Visual Accessibility

- High contrast colors for all text and backgrounds
- Clear visual indicators for interactive elements
- Consistent iconography and color coding

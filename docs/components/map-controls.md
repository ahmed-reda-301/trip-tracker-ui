# MapControls Component Documentation

## Overview

The MapControls component provides a comprehensive control bar for maritime map operations. It features search functionality, layer toggles, refresh capabilities, and real-time status updates in a clean, responsive layout with full multilingual and RTL support.

## File Location

**Path**: `/src/components/maps/MapControls.tsx`

## Features

- **Search Functionality**: Real-time search input with icon and proper RTL support
- **Layer Toggle Controls**: Individual visibility controls for ports and vessels
- **Refresh Button**: Data refresh with loading animation
- **Filter Button**: Additional filtering capabilities (placeholder for future features)
- **Real-time Clock**: Live timestamp display with locale-specific formatting
- **Responsive Layout**: Adapts from vertical to horizontal layout on larger screens
- **Multilingual Support**: Automatic Arabic/English text switching
- **RTL Support**: Proper right-to-left layout support

## Component Interface

```typescript
interface MapControlsProps {
  showPorts: boolean;
  showVessels: boolean;
  onTogglePorts: () => void;
  onToggleVessels: () => void;
  onRefresh: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  isLoading?: boolean;
}
```

## Props Description

### Required Props

- **`showPorts`** (`boolean`): Whether ports layer is visible
- **`showVessels`** (`boolean`): Whether vessels layer is visible
- **`onTogglePorts`** (`() => void`): Callback to toggle ports visibility
- **`onToggleVessels`** (`() => void`): Callback to toggle vessels visibility
- **`onRefresh`** (`() => void`): Callback to refresh data
- **`searchTerm`** (`string`): Current search term
- **`onSearchChange`** (`(value: string) => void`): Callback when search term changes

### Optional Props

- **`isLoading`** (`boolean`, default: `false`): Whether data is currently loading

## Usage Examples

### 1. Basic Usage

```typescript
import MapControls from "@/components/maps/MapControls";

function MaritimeMapWithControls() {
  const [showPorts, setShowPorts] = useState(true);
  const [showVessels, setShowVessels] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simulate data refresh
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Data refreshed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <MapControls
        showPorts={showPorts}
        showVessels={showVessels}
        onTogglePorts={() => setShowPorts(!showPorts)}
        onToggleVessels={() => setShowVessels(!showVessels)}
        onRefresh={handleRefresh}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoading={isLoading}
      />

      {/* Map component would go here */}
      <div className="mt-4 h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <p>Map Component</p>
      </div>
    </div>
  );
}
```

### 2. With State Management

```typescript
function StateMangedMapControls() {
  const [mapState, setMapState] = useState({
    showPorts: true,
    showVessels: true,
    searchTerm: "",
    isLoading: false,
    lastRefresh: new Date(),
  });

  const updateMapState = (updates: Partial<typeof mapState>) => {
    setMapState((prev) => ({ ...prev, ...updates }));
  };

  const handleRefresh = async () => {
    updateMapState({ isLoading: true });

    try {
      // Fetch fresh data
      const response = await fetch("/api/maritime-data");
      const data = await response.json();

      // Update data in your state management system
      console.log("Fresh data:", data);

      updateMapState({ lastRefresh: new Date() });
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      updateMapState({ isLoading: false });
    }
  };

  return (
    <div>
      <MapControls
        showPorts={mapState.showPorts}
        showVessels={mapState.showVessels}
        onTogglePorts={() => updateMapState({ showPorts: !mapState.showPorts })}
        onToggleVessels={() =>
          updateMapState({ showVessels: !mapState.showVessels })
        }
        onRefresh={handleRefresh}
        searchTerm={mapState.searchTerm}
        onSearchChange={(term) => updateMapState({ searchTerm: term })}
        isLoading={mapState.isLoading}
      />

      <div className="mt-2 text-sm text-gray-500">
        Last refreshed: {mapState.lastRefresh.toLocaleTimeString()}
      </div>
    </div>
  );
}
```

### 3. With Search Debouncing

```typescript
function DebouncedMapControls() {
  const [showPorts, setShowPorts] = useState(true);
  const [showVessels, setShowVessels] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Perform search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("Searching for:", debouncedSearchTerm);
      // Perform actual search here
    }
  }, [debouncedSearchTerm]);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Refresh logic here
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <MapControls
      showPorts={showPorts}
      showVessels={showVessels}
      onTogglePorts={() => setShowPorts(!showPorts)}
      onToggleVessels={() => setShowVessels(!showVessels)}
      onRefresh={handleRefresh}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      isLoading={isLoading}
    />
  );
}
```

### 4. With Advanced Features

```typescript
function AdvancedMapControls() {
  const [controlsState, setControlsState] = useState({
    showPorts: true,
    showVessels: true,
    searchTerm: "",
    isLoading: false,
    autoRefresh: false,
    refreshInterval: 30000, // 30 seconds
  });

  // Auto-refresh functionality
  useEffect(() => {
    if (!controlsState.autoRefresh) return;

    const interval = setInterval(() => {
      handleRefresh();
    }, controlsState.refreshInterval);

    return () => clearInterval(interval);
  }, [controlsState.autoRefresh, controlsState.refreshInterval]);

  const handleRefresh = async () => {
    setControlsState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await fetch("/api/refresh-data", { method: "POST" });
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setControlsState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={controlsState.autoRefresh}
            onChange={(e) =>
              setControlsState((prev) => ({
                ...prev,
                autoRefresh: e.target.checked,
              }))
            }
          />
          Auto-refresh
        </label>

        {controlsState.autoRefresh && (
          <select
            value={controlsState.refreshInterval}
            onChange={(e) =>
              setControlsState((prev) => ({
                ...prev,
                refreshInterval: Number(e.target.value),
              }))
            }
            className="border rounded px-2 py-1"
          >
            <option value={10000}>10 seconds</option>
            <option value={30000}>30 seconds</option>
            <option value={60000}>1 minute</option>
            <option value={300000}>5 minutes</option>
          </select>
        )}
      </div>

      <MapControls
        showPorts={controlsState.showPorts}
        showVessels={controlsState.showVessels}
        onTogglePorts={() =>
          setControlsState((prev) => ({
            ...prev,
            showPorts: !prev.showPorts,
          }))
        }
        onToggleVessels={() =>
          setControlsState((prev) => ({
            ...prev,
            showVessels: !prev.showVessels,
          }))
        }
        onRefresh={handleRefresh}
        searchTerm={controlsState.searchTerm}
        onSearchChange={(term) =>
          setControlsState((prev) => ({
            ...prev,
            searchTerm: term,
          }))
        }
        isLoading={controlsState.isLoading}
      />
    </div>
  );
}
```

## Component Structure

### Layout Sections

1. **Search Section**

   - Search input with icon
   - RTL-aware icon positioning
   - Placeholder text localization

2. **Controls Section**

   - Layer toggle buttons
   - Refresh button with loading state
   - Filter button (placeholder)

3. **Status Section**
   - Last updated timestamp
   - Real-time clock display

### Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🔍 Search vessels or ports...    [Ports] [Vessels] [↻] [⚙] │
│  ─────────────────────────────────────────────────────────── │
│  Last updated: 2:30:45 PM                                   │
└─────────────────────────────────────────────────────────────┘
```

## Search Functionality

### Search Input Implementation

```typescript
<div className="relative">
  <Search
    className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${
      isRTL ? "right-3" : "left-3"
    }`}
  />
  <input
    type="text"
    placeholder={
      isRTL ? "البحث عن السفن أو الموانئ..." : "Search vessels or ports..."
    }
    value={searchTerm}
    onChange={(e) => onSearchChange(e.target.value)}
    className={`w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
      isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
    }`}
  />
</div>
```

### Search Features

- **Icon Integration**: Search icon positioned based on text direction
- **RTL Support**: Proper padding and text alignment for Arabic
- **Focus States**: Blue ring on focus for better UX
- **Placeholder Localization**: Context-appropriate placeholder text

## Toggle Controls

### Toggle Button Implementation

```typescript
// Ports toggle
<button
  onClick={onTogglePorts}
  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
    showPorts
      ? "bg-blue-50 border-blue-200 text-blue-700"
      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
  }`}
>
  {showPorts ? (
    <Eye className="w-4 h-4" />
  ) : (
    <EyeOff className="w-4 h-4" />
  )}
  <span className="text-sm font-medium">
    {isRTL ? "الموانئ" : "Ports"}
  </span>
</button>

// Vessels toggle
<button
  onClick={onToggleVessels}
  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
    showVessels
      ? "bg-green-50 border-green-200 text-green-700"
      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
  }`}
>
  {showVessels ? (
    <Eye className="w-4 h-4" />
  ) : (
    <EyeOff className="w-4 h-4" />
  )}
  <span className="text-sm font-medium">
    {isRTL ? "السفن" : "Vessels"}
  </span>
</button>
```

### Toggle Features

- **Visual State Indication**: Different colors for active/inactive states
- **Icon Feedback**: Eye/EyeOff icons show current visibility
- **Color Coding**: Blue for ports, green for vessels
- **Hover Effects**: Subtle hover states for better interaction

## Refresh Control

### Refresh Button Implementation

```typescript
<button
  onClick={onRefresh}
  disabled={isLoading}
  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
  <span className="text-sm font-medium text-gray-700">
    {isRTL ? "تحديث" : "Refresh"}
  </span>
</button>
```

### Refresh Features

- **Loading Animation**: Spinning icon during refresh
- **Disabled State**: Prevents multiple simultaneous refreshes
- **Visual Feedback**: Opacity change when disabled
- **Accessibility**: Proper disabled cursor

## Real-time Clock

### Clock Implementation

```typescript
const { time: currentTime } = useClientTime(isRTL ? "ar-SA" : "en-US", 60000);

// Display in status section
<div
  className={`mt-3 pt-3 border-t border-gray-100 ${
    isRTL ? "text-right" : "text-left"
  }`}
>
  <p className="text-xs text-gray-500">
    {isRTL ? "آخر تحديث: " : "Last updated: "}
    <span className="font-medium">{currentTime || "Loading..."}</span>
  </p>
</div>;
```

### Clock Features

- **Locale-specific Formatting**: Arabic or English time format
- **Auto-update**: Updates every minute
- **Fallback Display**: Shows "Loading..." while initializing
- **RTL Support**: Proper text alignment

## Responsive Design

### Layout Adaptation

```typescript
// Responsive flex layout
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
  {/* Search section - full width on mobile, constrained on desktop */}
  <div className="flex-1 max-w-md">{/* Search input */}</div>

  {/* Controls section - stacked on mobile, horizontal on desktop */}
  <div className="flex items-center gap-2">
    {/* Toggle and action buttons */}
  </div>
</div>
```

### Responsive Features

- **Mobile-first**: Vertical layout on small screens
- **Desktop Enhancement**: Horizontal layout on larger screens
- **Flexible Search**: Search input adapts to available space
- **Consistent Spacing**: Proper gaps maintained across breakpoints

## RTL Support

### Language-aware Styling

The component automatically adapts to right-to-left languages:

```typescript
// Search icon positioning
className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${
  isRTL ? "right-3" : "left-3"
}`}

// Input padding and text alignment
className={`w-full border border-gray-300 rounded-lg py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
  isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
}`}

// Status section alignment
className={`mt-3 pt-3 border-t border-gray-100 ${isRTL ? "text-right" : "text-left"}`}
```

### RTL Features

- **Icon Positioning**: Search icon moves to appropriate side
- **Text Alignment**: Input text aligns with reading direction
- **Padding Adjustment**: Proper spacing for icon and text
- **Status Alignment**: Last updated text aligns correctly

## Integration Patterns

### With Map Component

```typescript
function IntegratedMapSystem() {
  const [mapState, setMapState] = useState({
    showPorts: true,
    showVessels: true,
    searchTerm: "",
    isLoading: false,
    filteredData: { ports: [], vessels: [] },
  });

  const handleSearch = useCallback((term: string) => {
    setMapState((prev) => ({ ...prev, searchTerm: term }));

    // Filter data based on search term
    const filteredPorts = portsData.filter(
      (port) =>
        port.name.toLowerCase().includes(term.toLowerCase()) ||
        port.city.toLowerCase().includes(term.toLowerCase())
    );

    const filteredVessels = vesselsData.filter(
      (vessel) =>
        vessel.name.toLowerCase().includes(term.toLowerCase()) ||
        vessel.plateNumber.toLowerCase().includes(term.toLowerCase())
    );

    setMapState((prev) => ({
      ...prev,
      filteredData: { ports: filteredPorts, vessels: filteredVessels },
    }));
  }, []);

  const handleRefresh = async () => {
    setMapState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Refresh data
      await refreshMapData();
    } finally {
      setMapState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div>
      <MapControls
        showPorts={mapState.showPorts}
        showVessels={mapState.showVessels}
        onTogglePorts={() =>
          setMapState((prev) => ({
            ...prev,
            showPorts: !prev.showPorts,
          }))
        }
        onToggleVessels={() =>
          setMapState((prev) => ({
            ...prev,
            showVessels: !prev.showVessels,
          }))
        }
        onRefresh={handleRefresh}
        searchTerm={mapState.searchTerm}
        onSearchChange={handleSearch}
        isLoading={mapState.isLoading}
      />

      <InteractiveMap
        ports={mapState.filteredData.ports}
        vessels={mapState.filteredData.vessels}
        showPorts={mapState.showPorts}
        showVessels={mapState.showVessels}
      />
    </div>
  );
}
```

### With Context/Redux

```typescript
// Using React Context
const MapControlsWithContext = () => {
  const {
    showPorts,
    showVessels,
    searchTerm,
    isLoading,
    togglePorts,
    toggleVessels,
    setSearchTerm,
    refreshData,
  } = useMapContext();

  return (
    <MapControls
      showPorts={showPorts}
      showVessels={showVessels}
      onTogglePorts={togglePorts}
      onToggleVessels={toggleVessels}
      onRefresh={refreshData}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      isLoading={isLoading}
    />
  );
};

// Using Redux
const MapControlsWithRedux = () => {
  const dispatch = useDispatch();
  const { showPorts, showVessels, searchTerm, isLoading } = useSelector(
    (state: RootState) => state.map
  );

  return (
    <MapControls
      showPorts={showPorts}
      showVessels={showVessels}
      onTogglePorts={() => dispatch(togglePorts())}
      onToggleVessels={() => dispatch(toggleVessels())}
      onRefresh={() => dispatch(refreshMapData())}
      searchTerm={searchTerm}
      onSearchChange={(term) => dispatch(setSearchTerm(term))}
      isLoading={isLoading}
    />
  );
};
```

## Performance Optimization

### Search Debouncing

```typescript
function OptimizedMapControls() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Perform search only when debounced term changes
  useEffect(() => {
    if (debouncedTerm !== searchTerm) return;

    // Perform actual search
    performSearch(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <MapControls
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      // ... other props
    />
  );
}
```

### Memoization

```typescript
const MemoizedMapControls = React.memo(MapControls, (prevProps, nextProps) => {
  return (
    prevProps.showPorts === nextProps.showPorts &&
    prevProps.showVessels === nextProps.showVessels &&
    prevProps.searchTerm === nextProps.searchTerm &&
    prevProps.isLoading === nextProps.isLoading
  );
});
```

## Best Practices

### 1. State Management

- Use centralized state for complex applications
- Implement proper loading states
- Handle errors gracefully

### 2. Performance

- Debounce search input for better performance
- Use memoization for expensive operations
- Minimize unnecessary re-renders

### 3. User Experience

- Provide immediate visual feedback
- Use consistent color coding
- Implement proper accessibility features

### 4. Error Handling

- Handle network failures gracefully
- Provide user feedback for errors
- Implement retry mechanisms

## Troubleshooting

### Common Issues

1. **Search not working**: Check `onSearchChange` callback connection
2. **Toggles not updating**: Verify state management and callbacks
3. **Refresh button stuck**: Check loading state management
4. **RTL layout issues**: Verify language context setup

### Debug Tips

```typescript
// Add debug logging
const debugControlsState = (props: MapControlsProps) => {
  console.log("MapControls Debug:", {
    showPorts: props.showPorts,
    showVessels: props.showVessels,
    searchTerm: props.searchTerm,
    isLoading: props.isLoading,
  });
};

// Monitor search changes
const handleSearchDebug = (value: string) => {
  console.log("Search term changed:", value);
  onSearchChange(value);
};
```

## Accessibility Features

### Keyboard Navigation

- Full keyboard support for all controls
- Proper tab order throughout interface
- Enter and Space key support for buttons

### Screen Reader Support

- Proper ARIA labels for all controls
- Clear descriptions for toggle states
- Status announcements for loading states

### Visual Accessibility

- High contrast colors for all elements
- Clear visual indicators for active states
- Sufficient color contrast ratios

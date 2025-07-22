# MapStats Component Documentation

## Overview

The MapStats component provides a comprehensive statistics display for maritime operations, showing key metrics about ports and vessels in an attractive card-based layout. It automatically calculates utilization rates, active counts, and other important operational statistics.

## File Location

**Path**: `/src/components/maps/MapStats.tsx`

## Features

- **Automatic Calculations**: Real-time statistics computation from data
- **Responsive Grid Layout**: Adapts from 1 to 4 columns based on screen size
- **Color-coded Cards**: Each statistic type has its own color theme
- **Multilingual Support**: Automatic Arabic/English text switching
- **RTL Support**: Proper right-to-left layout support
- **Interactive Cards**: Hover effects and visual feedback
- **Icon Integration**: Meaningful icons for each statistic type

## Component Interface

```typescript
interface MapStatsProps {
  ports: Port[];
  vessels: Vessel[];
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

## Statistics Calculated

### 1. Total Ports
- **Count**: Total number of ports in the system
- **Active Count**: Number of ports with "active" status
- **Icon**: Anchor (⚓)
- **Color**: Blue theme

### 2. Total Vessels
- **Count**: Total number of vessels being tracked
- **Active Count**: Number of vessels with "active" status
- **Icon**: Ship (🚢)
- **Color**: Green theme

### 3. Total Capacity
- **Count**: Sum of all port capacities
- **Active Count**: Current number of vessels in all ports
- **Icon**: Map Pin (📍)
- **Color**: Purple theme

### 4. Utilization Rate
- **Percentage**: (Vessels in ports / Total capacity) × 100
- **No Active Count**: Shows percentage only
- **Icon**: Trending Up (📈)
- **Color**: Orange theme

## Usage Examples

### 1. Basic Usage

```typescript
import MapStats from '@/components/maps/MapStats';
import portsData from '@/data/ports.json';
import vesselsData from '@/data/vessels.json';

function MaritimeDashboard() {
  return (
    <div>
      <MapStats 
        ports={portsData} 
        vessels={vesselsData} 
      />
    </div>
  );
}
```

### 2. With Dynamic Data

```typescript
function DynamicMapStats() {
  const [ports, setPorts] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portsResponse, vesselsResponse] = await Promise.all([
          fetch('/api/ports'),
          fetch('/api/vessels')
        ]);
        
        const portsData = await portsResponse.json();
        const vesselsData = await vesselsResponse.json();
        
        setPorts(portsData);
        setVessels(vesselsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading statistics...</div>;
  }

  return <MapStats ports={ports} vessels={vessels} />;
}
```

### 3. With Real-time Updates

```typescript
function RealTimeMapStats() {
  const [data, setData] = useState({ ports: [], vessels: [] });

  useEffect(() => {
    // Initial data load
    loadData();

    // Set up real-time updates
    const interval = setInterval(() => {
      loadData();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/api/maritime-data');
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error('Failed to update data:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Maritime Statistics</h2>
        <button onClick={loadData} className="text-blue-600 hover:text-blue-800">
          Refresh
        </button>
      </div>
      <MapStats ports={data.ports} vessels={data.vessels} />
    </div>
  );
}
```

### 4. With Custom Styling

```typescript
function CustomStyledMapStats() {
  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-6 text-center">
        Maritime Operations Overview
      </h3>
      <MapStats ports={portsData} vessels={vesselsData} />
      <div className="mt-4 text-center text-sm text-gray-600">
        Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
}
```

## Statistics Calculation Logic

### Internal Calculations

```typescript
// Calculate statistics
const activePorts = ports.filter((port) => port.status === "active").length;
const activeVessels = vessels.filter((vessel) => vessel.status === "active").length;
const totalCapacity = ports.reduce((sum, port) => sum + port.capacity, 0);
const totalVesselsInPorts = ports.reduce((sum, port) => sum + port.vessels, 0);
const utilizationRate = totalCapacity > 0 
  ? Math.round((totalVesselsInPorts / totalCapacity) * 100) 
  : 0;
```

### Statistics Configuration

```typescript
const stats = [
  {
    title: isRTL ? "إجمالي الموانئ" : "Total Ports",
    value: ports.length,
    active: activePorts,
    icon: Anchor,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: isRTL ? "إجمالي السفن" : "Total Vessels",
    value: vessels.length,
    active: activeVessels,
    icon: Ship,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    title: isRTL ? "السعة الإجمالية" : "Total Capacity",
    value: totalCapacity,
    active: totalVesselsInPorts,
    icon: MapPin,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    title: isRTL ? "معدل الاستغلال" : "Utilization Rate",
    value: `${utilizationRate}%`,
    active: null, // No active count for percentage
    icon: TrendingUp,
    color: "bg-orange-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
];
```

## Card Structure

### Visual Layout

Each statistics card contains:

```
┌─────────────────────────────────┐
│  [ICON]           TITLE         │
│   🔵            Total Ports     │
│                                 │
│   VALUE         ACTIVE COUNT    │
│    25              ⚡ 18        │
└─────────────────────────────────┘
```

### HTML Structure

```typescript
<div className={`${stat.bgColor} rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow`}>
  <div className="flex items-center justify-between">
    <div className={`${isRTL ? "ml-3" : "mr-3"}`}>
      <div className={`${stat.color} p-2 rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
      <p className="text-sm font-medium text-gray-600 mb-1">
        {stat.title}
      </p>
      <div className="flex items-center gap-2">
        <p className={`text-2xl font-bold ${stat.textColor}`}>
          {stat.value}
        </p>
        {stat.active !== null && (
          <div className="flex items-center gap-1">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600 font-medium">
              {stat.active}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
```

## Responsive Design

### Grid Layout
- **Mobile (1 column)**: `grid-cols-1`
- **Tablet (2 columns)**: `md:grid-cols-2`
- **Desktop (4 columns)**: `lg:grid-cols-4`

### Card Spacing
- **Gap**: `gap-4` for consistent spacing
- **Margin**: `mb-6` bottom margin for separation from other content

### RTL Support
- **Icon Positioning**: `ml-3` for RTL, `mr-3` for LTR
- **Text Alignment**: `text-right` for RTL, `text-left` for LTR

## Integration Patterns

### With Dashboard Layout

```typescript
function MaritimeDashboard() {
  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Maritime Operations</h1>
        <p className="text-gray-600">Real-time port and vessel monitoring</p>
      </header>
      
      <MapStats ports={portsData} vessels={vesselsData} />
      
      <div className="mt-8">
        <InteractiveMap ports={portsData} vessels={vesselsData} />
      </div>
    </div>
  );
}
```

### With Filtering

```typescript
function FilterableMapStats() {
  const [filter, setFilter] = useState('all');
  
  const filteredPorts = useMemo(() => {
    if (filter === 'all') return portsData;
    return portsData.filter(port => port.status === filter);
  }, [filter]);
  
  const filteredVessels = useMemo(() => {
    if (filter === 'all') return vesselsData;
    return vesselsData.filter(vessel => vessel.status === filter);
  }, [filter]);

  return (
    <div>
      <div className="mb-4">
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
      </div>
      
      <MapStats ports={filteredPorts} vessels={filteredVessels} />
    </div>
  );
}
```

### With Loading States

```typescript
function LoadingMapStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return <MapStats ports={data.ports} vessels={data.vessels} />;
}
```

## Performance Considerations

### Efficient Calculations
- Statistics are calculated once per render
- Uses efficient array methods (filter, reduce)
- Memoization can be added for large datasets

### Optimized Rendering
- Minimal re-renders with proper React keys
- Efficient CSS classes for styling
- Hover effects use CSS transitions

## Best Practices

### 1. Data Validation
```typescript
function SafeMapStats({ ports = [], vessels = [] }) {
  // Validate data structure
  const validPorts = ports.filter(port => 
    port && typeof port.capacity === 'number' && typeof port.vessels === 'number'
  );
  
  const validVessels = vessels.filter(vessel => 
    vessel && vessel.status
  );

  return <MapStats ports={validPorts} vessels={validVessels} />;
}
```

### 2. Error Handling
```typescript
function ErrorBoundaryMapStats({ ports, vessels }) {
  try {
    return <MapStats ports={ports} vessels={vessels} />;
  } catch (error) {
    console.error('MapStats error:', error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Unable to load statistics</p>
      </div>
    );
  }
}
```

### 3. Accessibility
- Use semantic HTML structure
- Provide proper ARIA labels
- Ensure sufficient color contrast
- Support keyboard navigation

## Troubleshooting

### Common Issues

1. **Statistics showing 0**: Check data structure and status values
2. **Layout issues**: Verify grid classes and responsive breakpoints
3. **RTL problems**: Check language context and text alignment
4. **Performance issues**: Consider memoization for large datasets

### Debug Tips

```typescript
// Add debug logging
const debugStats = (ports, vessels) => {
  console.log('MapStats Debug:', {
    portsCount: ports.length,
    vesselsCount: vessels.length,
    activePorts: ports.filter(p => p.status === 'active').length,
    activeVessels: vessels.filter(v => v.status === 'active').length,
    totalCapacity: ports.reduce((sum, port) => sum + port.capacity, 0)
  });
};
```

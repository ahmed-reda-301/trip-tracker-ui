# Data Management Guide

## Overview

The Trip Tracker application uses JSON files as demo data sources to simulate API responses during development. This approach allows for rapid prototyping and testing without requiring a backend API, while maintaining the same data structure that will be used with the real API.

## Data Directory Structure

```
src/data/
├── alerts.json           # Alert/notification data
├── all-alerts.json       # Comprehensive alerts dataset
├── ports.json            # Port information
├── saudi-locations.json  # Saudi Arabia specific locations
├── saudi-vehicles.json   # Vehicle tracking data
├── trips.json            # Trip/shipment data
├── users.json            # User authentication data
└── vessels.json          # Vessel/ship information
```

## Data File Formats

### 1. Trips Data (`trips.json`)

```typescript
interface Trip {
  id: number;
  tripNumber: string;
  vesselId: number;
  vesselName: string;
  vesselNameEn: string;
  origin: string;
  originEn: string;
  destination: string;
  destinationEn: string;
  status: "in_transit" | "loading" | "completed" | "delayed" | "scheduled";
  priority: "high" | "medium" | "low";
  cargoType: string;
  cargoTypeEn: string;
  cargoWeight: string;
  cargoWeightEn: string;
  departureDate: string; // ISO date string
  estimatedArrival: string; // ISO date string
  actualArrival: string | null;
  progress: number; // 0-100
  distance: string;
  distanceEn: string;
  remainingDistance: string;
  remainingDistanceEn: string;
  assignedOfficer: string;
  assignedOfficerEn: string;
  customsStatus: "cleared" | "pending" | "inspection_required";
  alerts: Alert[];
  route: RoutePoint[];
}

interface Alert {
  type: "weather" | "delay" | "customs" | "security";
  message: string;
  messageEn: string;
  severity: "high" | "medium" | "low";
}

interface RoutePoint {
  port: string;
  eta: string; // ISO date string
  status: "completed" | "in_progress" | "pending" | "delayed" | "scheduled";
}
```

### 2. Users Data (`users.json`)

```typescript
interface User {
  id: number;
  username: string;
  password: string; // In real app, this would be hashed
  name: string;
  nameEn: string;
  email: string;
  department: string;
  departmentEn: string;
  role: "admin" | "officer" | "supervisor" | "viewer";
  permissions: string[];
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}
```

### 3. Alerts Data (`alerts.json`)

```typescript
interface AlertData {
  id: string;
  title: string;
  titleEn: string;
  message: string;
  messageEn: string;
  type: "warning" | "error" | "info" | "success";
  category: "security" | "system" | "reports" | "assignments";
  priority: "high" | "medium" | "low";
  status: "active" | "resolved" | "pending" | "acknowledged";
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  location?: string;
  vehicle?: string;
  responseTime?: number; // in minutes
}
```

### 4. Saudi Locations (`saudi-locations.json`)

```typescript
interface SaudiLocation {
  airports: Airport[];
  seaports: Seaport[];
  policeStations: PoliceStation[];
  checkpoints: Checkpoint[];
}

interface Airport {
  id: string;
  name: string;
  nameEn: string;
  coordinates: [number, number]; // [latitude, longitude]
  city: string;
  cityEn: string;
  type: "international" | "domestic";
  status: "active" | "inactive";
  iata: string;
  icao: string;
}

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
  vessels: number;
}
```

## Usage Patterns

### 1. Import and Use Data

```typescript
// Import JSON data
import tripsData from '@/data/trips.json';
import usersData from '@/data/users.json';
import alertsData from '@/data/alerts.json';

// Use in components
function TripsTable() {
  const [trips, setTrips] = useState(tripsData);
  
  return (
    <table>
      {trips.map(trip => (
        <tr key={trip.id}>
          <td>{trip.tripNumber}</td>
          <td>{trip.status}</td>
        </tr>
      ))}
    </table>
  );
}
```

### 2. Simulate API Calls

```typescript
// Create a service that mimics API behavior
class DataService {
  // Simulate network delay
  private delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all trips
  async getTrips(): Promise<Trip[]> {
    await this.delay();
    return tripsData;
  }

  // Get trip by ID
  async getTripById(id: number): Promise<Trip | null> {
    await this.delay();
    return tripsData.find(trip => trip.id === id) || null;
  }

  // Filter trips by status
  async getTripsByStatus(status: string): Promise<Trip[]> {
    await this.delay();
    return tripsData.filter(trip => trip.status === status);
  }

  // Update trip (simulate)
  async updateTrip(id: number, updates: Partial<Trip>): Promise<Trip> {
    await this.delay();
    const tripIndex = tripsData.findIndex(trip => trip.id === id);
    if (tripIndex === -1) {
      throw new Error('Trip not found');
    }
    
    const updatedTrip = { ...tripsData[tripIndex], ...updates };
    // In real app, this would persist to backend
    return updatedTrip;
  }
}

// Usage in components
function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const dataService = new DataService();
  
  useEffect(() => {
    dataService.getTrips()
      .then(setTrips)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  
  return { trips, loading, error };
}
```

### 3. Custom Hooks for Data Management

```typescript
// Generic data hook
function useData<T>(
  dataSource: T[], 
  filterFn?: (item: T) => boolean
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const filteredData = filterFn ? dataSource.filter(filterFn) : dataSource;
      setData(filteredData);
      setLoading(false);
    }, 300);
  }, [dataSource, filterFn]);
  
  return { data, loading, setData };
}

// Specific hooks
function useTrips(status?: string) {
  return useData(
    tripsData, 
    status ? (trip) => trip.status === status : undefined
  );
}

function useAlerts(priority?: string) {
  return useData(
    alertsData,
    priority ? (alert) => alert.priority === priority : undefined
  );
}
```

## Migration to Real API

### 1. Environment-based Data Source

```typescript
// config/dataSource.ts
const isDevelopment = process.env.NODE_ENV === 'development';
const useLocalData = process.env.NEXT_PUBLIC_USE_LOCAL_DATA === 'true';

export const DATA_SOURCE = {
  useLocal: isDevelopment || useLocalData,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
};
```

### 2. Abstracted Data Service

```typescript
// services/dataService.ts
import { DATA_SOURCE } from '@/config/dataSource';
import tripsData from '@/data/trips.json';

class DataService {
  private async fetchFromAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${DATA_SOURCE.apiBaseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }

  private async delay(ms: number = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getTrips(): Promise<Trip[]> {
    if (DATA_SOURCE.useLocal) {
      await this.delay(); // Simulate network delay
      return tripsData;
    }
    
    return this.fetchFromAPI<Trip[]>('/trips');
  }

  async getTripById(id: number): Promise<Trip | null> {
    if (DATA_SOURCE.useLocal) {
      await this.delay();
      return tripsData.find(trip => trip.id === id) || null;
    }
    
    return this.fetchFromAPI<Trip>(`/trips/${id}`);
  }
}

export default new DataService();
```

### 3. React Query Integration

```typescript
// hooks/useTripsQuery.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DataService from '@/services/dataService';

export function useTripsQuery() {
  return useQuery({
    queryKey: ['trips'],
    queryFn: () => DataService.getTrips(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTripQuery(id: number) {
  return useQuery({
    queryKey: ['trip', id],
    queryFn: () => DataService.getTripById(id),
    enabled: !!id,
  });
}

export function useUpdateTripMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Trip> }) =>
      DataService.updateTrip(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}
```

## Best Practices

### 1. Data Structure Consistency
- Keep JSON structure identical to expected API responses
- Use TypeScript interfaces to ensure type safety
- Include both Arabic and English fields for i18n support

### 2. Realistic Data
- Use realistic IDs, dates, and values
- Include edge cases (empty arrays, null values)
- Simulate various states and statuses

### 3. Performance Considerations
- Keep JSON files reasonably sized (< 1MB)
- Use pagination simulation for large datasets
- Implement proper loading states

### 4. Error Simulation
```typescript
// Simulate API errors
class DataService {
  private shouldSimulateError() {
    return Math.random() < 0.1; // 10% chance of error
  }

  async getTrips(): Promise<Trip[]> {
    await this.delay();
    
    if (this.shouldSimulateError()) {
      throw new Error('Network error: Unable to fetch trips');
    }
    
    return tripsData;
  }
}
```

### 5. Data Validation
```typescript
// Validate data structure
import { z } from 'zod';

const TripSchema = z.object({
  id: z.number(),
  tripNumber: z.string(),
  status: z.enum(['in_transit', 'loading', 'completed', 'delayed', 'scheduled']),
  // ... other fields
});

function validateTripsData() {
  try {
    tripsData.forEach(trip => TripSchema.parse(trip));
    console.log('✅ Trips data is valid');
  } catch (error) {
    console.error('❌ Invalid trips data:', error);
  }
}
```

## Testing with Mock Data

### 1. Jest Testing
```typescript
// __tests__/dataService.test.ts
import DataService from '@/services/dataService';

describe('DataService', () => {
  test('should return trips data', async () => {
    const trips = await DataService.getTrips();
    expect(trips).toHaveLength(8);
    expect(trips[0]).toHaveProperty('tripNumber');
  });

  test('should find trip by ID', async () => {
    const trip = await DataService.getTripById(1);
    expect(trip).toBeTruthy();
    expect(trip?.id).toBe(1);
  });
});
```

### 2. Storybook Integration
```typescript
// stories/TripsTable.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import TripsTable from '@/components/TripsTable';
import tripsData from '@/data/trips.json';

const meta: Meta<typeof TripsTable> = {
  title: 'Components/TripsTable',
  component: TripsTable,
};

export default meta;

export const Default: StoryObj<typeof TripsTable> = {
  args: {
    trips: tripsData,
  },
};

export const EmptyState: StoryObj<typeof TripsTable> = {
  args: {
    trips: [],
  },
};
```

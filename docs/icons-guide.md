# Icons Guide

## Overview

The Trip Tracker application uses **Lucide React** as the primary icon library. Lucide provides a comprehensive set of beautiful, customizable SVG icons that are optimized for React applications.

## Installation

Lucide React is already installed in the project:

```json
{
  "dependencies": {
    "lucide-react": "^0.525.0"
  }
}
```

## Basic Usage

### 1. Import Icons

```typescript
import {
  User,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  Home,
  MapPin,
  Truck,
  Ship,
  Plane,
} from "lucide-react";
```

### 2. Use in Components

```typescript
function MyComponent() {
  return (
    <div>
      <User className="w-5 h-5" />
      <Settings className="w-6 h-6 text-gray-600" />
      <Bell className="w-4 h-4 text-blue-500" />
    </div>
  );
}
```

## Icon Categories

### Navigation Icons

```typescript
import {
  Home, // Dashboard/Home
  Map, // Location Monitor
  Target, // Focused Trips
  Anchor, // Assigned Ports
  Settings, // Configuration
  AlertTriangle, // Suspicious Trips
  FileText, // Reports
  Bell, // Notifications
  Menu, // Mobile menu
  X, // Close
  ChevronDown, // Dropdown
  ChevronRight, // Next/Forward
  ChevronLeft, // Previous/Back
  ArrowLeft, // Back navigation
  ArrowRight, // Forward navigation
} from "lucide-react";
```

### Transportation Icons

```typescript
import {
  Truck, // Vehicles/Cargo
  Ship, // Vessels/Ships
  Plane, // Aircraft
  Car, // Cars
  Bus, // Buses
  Train, // Trains
  Bike, // Bicycles
  MapPin, // Location markers
  Navigation, // Direction/GPS
  Compass, // Navigation compass
  Route, // Routes
  Anchor, // Ports/Harbors
} from "lucide-react";
```

### User Interface Icons

```typescript
import {
  User, // User profile
  Users, // Multiple users
  Search, // Search functionality
  Filter, // Filtering
  SortAsc, // Sort ascending
  SortDesc, // Sort descending
  Eye, // View/Visibility
  EyeOff, // Hide/Invisible
  Edit, // Edit/Modify
  Trash2, // Delete
  Plus, // Add/Create
  Minus, // Remove/Subtract
  Check, // Confirm/Success
  X, // Cancel/Error
  Save, // Save action
  Download, // Download
  Upload, // Upload
  Share, // Share
  Copy, // Copy
  ExternalLink, // External link
} from "lucide-react";
```

### Status & Alert Icons

```typescript
import {
  CheckCircle, // Success
  XCircle, // Error
  AlertCircle, // Warning
  Info, // Information
  AlertTriangle, // Danger/Warning
  Clock, // Time/Pending
  Loader2, // Loading (with spin)
  Zap, // Active/Energy
  Shield, // Security
  Lock, // Locked/Secure
  Unlock, // Unlocked
  Key, // Authentication
  Wifi, // Connected
  WifiOff, // Disconnected
} from "lucide-react";
```

### Data & Analytics Icons

```typescript
import {
  BarChart3, // Bar charts
  LineChart, // Line charts
  PieChart, // Pie charts
  TrendingUp, // Increasing trend
  TrendingDown, // Decreasing trend
  Activity, // Activity/Pulse
  Database, // Database
  Server, // Server
  HardDrive, // Storage
  Cpu, // Processing
  Monitor, // Display/Screen
  Smartphone, // Mobile device
  Tablet, // Tablet device
} from "lucide-react";
```

## Styling Icons

### Size Classes

```typescript
// Tailwind CSS size classes
<Icon className="w-3 h-3" />   // 12px
<Icon className="w-4 h-4" />   // 16px
<Icon className="w-5 h-5" />   // 20px
<Icon className="w-6 h-6" />   // 24px
<Icon className="w-8 h-8" />   // 32px
<Icon className="w-10 h-10" /> // 40px
<Icon className="w-12 h-12" /> // 48px
```

### Color Classes

```typescript
// Text colors
<Icon className="text-gray-500" />
<Icon className="text-blue-600" />
<Icon className="text-green-500" />
<Icon className="text-red-500" />
<Icon className="text-yellow-500" />
<Icon className="text-purple-500" />

// With hover effects
<Icon className="text-gray-500 hover:text-blue-600" />
```

### Custom Styling

```typescript
// Inline styles
<Icon
  style={{
    width: '24px',
    height: '24px',
    color: '#3b82f6'
  }}
/>

// CSS classes
<Icon className="custom-icon-class" />
```

## Common Patterns

### Icon with Text

```typescript
function IconButton() {
  return (
    <button className="flex items-center gap-2">
      <Save className="w-4 h-4" />
      <span>Save</span>
    </button>
  );
}
```

### Loading State

```typescript
function LoadingButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Save className="w-4 h-4" />
      )}
      <span>Save</span>
    </button>
  );
}
```

### Status Indicators

```typescript
function StatusIcon({ status }: { status: string }) {
  const getIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "loading":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  return getIcon();
}
```

### RTL Support

```typescript
import { useLanguage } from "@/contexts/LanguageContext";

function DirectionalIcon() {
  const { isRTL } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {isRTL ? (
        <ChevronLeft className="w-4 h-4" />
      ) : (
        <ChevronRight className="w-4 h-4" />
      )}
      <span>Next</span>
    </div>
  );
}
```

## Icon Composition

### Icon Buttons

```typescript
function IconButton({
  icon: Icon,
  onClick,
  variant = "default",
  size = "md",
}: {
  icon: LucideIcon;
  onClick: () => void;
  variant?: "default" | "primary" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const variantClasses = {
    default: "text-gray-600 hover:text-gray-800",
    primary: "text-blue-600 hover:text-blue-800",
    danger: "text-red-600 hover:text-red-800",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${variantClasses[variant]}`}
    >
      <Icon className={sizeClasses[size]} />
    </button>
  );
}
```

### Icon with Badge

```typescript
function IconWithBadge({
  icon: Icon,
  count,
}: {
  icon: LucideIcon;
  count: number;
}) {
  return (
    <div className="relative">
      <Icon className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>
  );
}
```

## Best Practices

### 1. Consistent Sizing

- Use consistent icon sizes within the same context
- Follow the design system size guidelines
- Use Tailwind's size classes for consistency

### 2. Semantic Usage

- Choose icons that clearly represent their function
- Use standard conventions (e.g., trash for delete, pencil for edit)
- Provide alternative text for accessibility

### 3. Performance

- Import only the icons you need
- Use tree shaking to reduce bundle size
- Consider icon sprite sheets for large applications

### 4. Accessibility

```typescript
// Add aria-label for screen readers
<Icon className="w-5 h-5" aria-label="Save document" />

// Use with descriptive text
<button>
  <Save className="w-4 h-4" />
  <span className="sr-only">Save document</span>
</button>
```

### 5. Theming

```typescript
// Use CSS custom properties for theming
<Icon
  className="w-5 h-5"
  style={{ color: 'var(--icon-color)' }}
/>

// Or use Tailwind's theme colors
<Icon className="w-5 h-5 text-primary" />
```

## Custom Icons

If you need custom icons not available in Lucide:

### 1. SVG Components

```typescript
function CustomIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z" />
    </svg>
  );
}
```

### 2. Icon Library Extension

```typescript
// Create a custom icon library
export const CustomIcons = {
  CustomIcon,
  AnotherCustomIcon,
  // ... more custom icons
};

// Use like Lucide icons
import { CustomIcons } from "@/components/icons";
<CustomIcons.CustomIcon className="w-5 h-5" />;
```

## Troubleshooting

### Common Issues

- **Icon not displaying**: Check import statement and icon name
- **Size issues**: Ensure proper className or style attributes
- **Color not applying**: Verify text color classes or currentColor usage

### Performance Tips

- Import specific icons rather than the entire library
- Use consistent icon sizes to improve caching
- Consider using icon fonts for very large applications

## Resources

- [Lucide React Documentation](https://lucide.dev/guide/packages/lucide-react)
- [Icon Search](https://lucide.dev/icons/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

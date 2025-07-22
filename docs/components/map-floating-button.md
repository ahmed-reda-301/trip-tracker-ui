# MapFloatingButton Component Documentation

## Overview

The MapFloatingButton component provides an elegant floating action button for toggling map sidebars. It features intelligent arrow direction, RTL support, notification indicators, tooltips, and smooth animations. The button adapts its position and appearance based on sidebar state and language direction.

## File Location

**Path**: `/src/components/maps/MapFloatingButton.tsx`

## Features

- **Intelligent Arrow Direction**: Arrow points in the correct direction based on sidebar state and RTL
- **RTL Support**: Proper positioning and arrow direction for right-to-left languages
- **Notification Indicator**: Animated red dot for updates when sidebar is closed
- **Tooltip**: Contextual tooltip showing current action
- **Smooth Animations**: Scale, position, and color transitions
- **Responsive Positioning**: Adapts to sidebar open/closed state
- **Accessibility**: Proper ARIA labels and keyboard support

## Component Interface

```typescript
interface MapFloatingButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUpdates?: boolean;
}
```

## Props Description

### Required Props

- **`isOpen`** (`boolean`): Whether the sidebar is currently open
- **`onClick`** (`() => void`): Callback function when button is clicked

### Optional Props

- **`hasUpdates`** (`boolean`, default: `false`): Whether to show notification indicator

## Usage Examples

### 1. Basic Usage

```typescript
import MapFloatingButton from '@/components/maps/MapFloatingButton';

function MapWithFloatingButton() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen">
      {/* Map content */}
      <div className="w-full h-full bg-gray-200">
        Map goes here
      </div>

      {/* Floating Button */}
      <MapFloatingButton
        isOpen={sidebarOpen}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-lg">
          Sidebar content
        </div>
      )}
    </div>
  );
}
```

### 2. With Notification Indicator

```typescript
function MapWithNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasNewData, setHasNewData] = useState(false);

  useEffect(() => {
    // Simulate new data updates
    const interval = setInterval(() => {
      if (!sidebarOpen) {
        setHasNewData(true);
      }
    }, 30000); // Check for updates every 30 seconds

    return () => clearInterval(interval);
  }, [sidebarOpen]);

  const handleButtonClick = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      setHasNewData(false); // Clear notification when opening sidebar
    }
  };

  return (
    <div className="relative h-screen">
      <div className="w-full h-full bg-gray-200">
        Map content
      </div>

      <MapFloatingButton
        isOpen={sidebarOpen}
        onClick={handleButtonClick}
        hasUpdates={hasNewData}
      />
    </div>
  );
}
```

### 3. With Real-time Data Updates

```typescript
function RealTimeMapButton() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [hasUpdates, setHasUpdates] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await fetch('/api/last-update');
        const { timestamp } = await response.json();
        
        if (timestamp > lastUpdate && !sidebarOpen) {
          setHasUpdates(true);
        }
      } catch (error) {
        console.error('Failed to check for updates:', error);
      }
    };

    const interval = setInterval(checkForUpdates, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [lastUpdate, sidebarOpen]);

  const handleButtonClick = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      setHasUpdates(false);
      setLastUpdate(Date.now());
    }
  };

  return (
    <div className="relative h-screen">
      <MapFloatingButton
        isOpen={sidebarOpen}
        onClick={handleButtonClick}
        hasUpdates={hasUpdates}
      />
    </div>
  );
}
```

### 4. With Custom Positioning

```typescript
function CustomPositionedButton() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen">
      <div className="w-full h-full bg-gray-200">
        Map content
      </div>

      {/* Custom wrapper for different positioning */}
      <div className="absolute bottom-20 right-4">
        <MapFloatingButton
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          hasUpdates={false}
        />
      </div>
    </div>
  );
}
```

## Arrow Direction Logic

The component intelligently determines arrow direction based on sidebar state and language direction:

### Arrow Direction Rules

```typescript
const getArrowIcon = () => {
  // When sidebar is open, show arrow to close (pointing outward)
  // When sidebar is closed, show arrow to open (pointing inward)
  if (isOpen) {
    // Sidebar open - arrow to close
    return isRTL ? (
      <ChevronLeft className="w-8 h-8 text-blue-600 font-bold stroke-2" />
    ) : (
      <ChevronRight className="w-8 h-8 text-blue-600 font-bold stroke-2" />
    );
  } else {
    // Sidebar closed - arrow to open
    return isRTL ? (
      <ChevronRight className="w-8 h-8 text-blue-600 font-bold stroke-2" />
    ) : (
      <ChevronLeft className="w-8 h-8 text-blue-600 font-bold stroke-2" />
    );
  }
};
```

### Visual Arrow States

| Sidebar State | LTR Direction | RTL Direction |
|---------------|---------------|---------------|
| Closed        | ← (Left)      | → (Right)     |
| Open          | → (Right)     | ← (Left)      |

## Positioning System

### Dynamic Positioning

The button automatically adjusts its position based on sidebar state:

```typescript
// Position calculation
style={{
  marginRight: isRTL ? "0" : isOpen ? "320px" : "0",
  marginLeft: isRTL ? (isOpen ? "320px" : "0") : "0",
}}
```

### CSS Classes for Positioning

```typescript
className={`
  absolute top-1/2 transform -translate-y-1/2 z-50
  w-16 h-16 bg-white shadow-xl rounded-full
  hover:shadow-2xl transition-all duration-300 ease-in-out
  border-2 border-blue-200 hover:border-blue-400
  flex items-center justify-center
  ${isRTL ? "left-4" : "right-4"}
  ${isOpen ? "translate-x-0" : isRTL ? "-translate-x-2" : "translate-x-2"}
  group hover:scale-110 hover:bg-blue-50
`}
```

## Notification System

### Notification Indicator

When `hasUpdates` is true and sidebar is closed, shows animated notification dot:

```typescript
{hasUpdates && !isOpen && (
  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
    <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
  </div>
)}
```

### Notification Features

- **Double Animation**: Combines `animate-pulse` and `animate-ping` for attention
- **Conditional Display**: Only shows when sidebar is closed and updates are available
- **Proper Positioning**: Positioned at top-right corner of button
- **Red Color**: Uses red color to indicate importance

## Tooltip System

### Tooltip Implementation

```typescript
const getTooltipText = () => {
  if (isOpen) {
    return isRTL ? "إخفاء اللوحة" : "Hide Panel";
  } else {
    return isRTL ? "إظهار اللوحة" : "Show Panel";
  }
};

// Tooltip element
<div className={`
  absolute top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg
  ${isRTL ? "left-full ml-3" : "right-full mr-3"}
`}>
  {getTooltipText()}
</div>
```

### Tooltip Features

- **Context-aware Text**: Shows appropriate action based on current state
- **Multilingual**: Supports Arabic and English
- **RTL Positioning**: Proper positioning for both text directions
- **Smooth Animation**: Fade in/out with opacity transition
- **High Contrast**: Dark background with white text for readability

## Animation System

### Hover Animations

```css
/* Scale animation on hover */
hover:scale-110

/* Shadow enhancement */
hover:shadow-2xl

/* Background color change */
hover:bg-blue-50

/* Border color change */
hover:border-blue-400
```

### Transition Properties

```css
/* Smooth transitions for all properties */
transition-all duration-300 ease-in-out

/* Tooltip fade animation */
transition-opacity duration-200
```

### Position Animations

```css
/* Slide animation based on sidebar state */
${isOpen ? "translate-x-0" : isRTL ? "-translate-x-2" : "translate-x-2"}
```

## RTL Support

### Language-aware Positioning

- **LTR**: Button positioned on right side (`right-4`)
- **RTL**: Button positioned on left side (`left-4`)

### Direction-aware Margins

- **LTR**: Uses `marginRight` for sidebar offset
- **RTL**: Uses `marginLeft` for sidebar offset

### Tooltip Positioning

- **LTR**: Tooltip appears to the left of button (`right-full mr-3`)
- **RTL**: Tooltip appears to the right of button (`left-full ml-3`)

## Accessibility Features

### Keyboard Support

- Fully keyboard accessible with tab navigation
- Enter and Space key support for activation
- Proper focus indicators

### Screen Reader Support

```typescript
// Add ARIA attributes for better accessibility
<button
  onClick={onClick}
  aria-label={getTooltipText()}
  aria-expanded={isOpen}
  role="button"
  className="..."
>
```

### Visual Accessibility

- High contrast colors for visibility
- Large touch target (64x64px) for mobile
- Clear visual feedback on hover and focus

## Integration Patterns

### With Sidebar Components

```typescript
function IntegratedMapSystem() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasUpdates, setHasUpdates] = useState(false);

  return (
    <div className="relative h-screen">
      <InteractiveMap />
      
      <MapFloatingButton
        isOpen={sidebarOpen}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        hasUpdates={hasUpdates}
      />
      
      <MapSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        // ... other props
      />
    </div>
  );
}
```

### With Multiple Sidebars

```typescript
function MultiSidebarMap() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="relative h-screen">
      <InteractiveMap />
      
      {/* Left sidebar button */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <MapFloatingButton
          isOpen={leftSidebarOpen}
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
        />
      </div>
      
      {/* Right sidebar button */}
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <MapFloatingButton
          isOpen={rightSidebarOpen}
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
        />
      </div>
    </div>
  );
}
```

## Best Practices

### 1. State Management
- Always sync button state with actual sidebar state
- Clear notifications when sidebar is opened
- Handle edge cases gracefully

### 2. Performance
- Use CSS transitions instead of JavaScript animations
- Minimize re-renders with proper state management
- Optimize notification checking intervals

### 3. User Experience
- Provide clear visual feedback for all interactions
- Use consistent animation timing
- Ensure button is always accessible

### 4. Accessibility
- Include proper ARIA labels
- Support keyboard navigation
- Maintain sufficient color contrast

## Troubleshooting

### Common Issues

1. **Button not visible**: Check z-index and positioning
2. **Arrow pointing wrong direction**: Verify RTL context and sidebar state
3. **Tooltip not showing**: Check hover states and CSS classes
4. **Notification not appearing**: Verify `hasUpdates` prop and sidebar state

### Debug Tips

```typescript
// Add debug logging
const debugButtonState = () => {
  console.log('MapFloatingButton Debug:', {
    isOpen,
    hasUpdates,
    isRTL,
    tooltipText: getTooltipText()
  });
};

// Monitor click events
const handleClickDebug = () => {
  console.log('Button clicked, current state:', isOpen);
  onClick();
};
```

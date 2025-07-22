# UnderConstruction Component Documentation

## Overview

The UnderConstruction component provides a consistent, professional way to display "under construction" or "coming soon" messages for pages that are not yet implemented. It supports multilingual content and customizable icons.

## File Location

**Path**: `/src/components/common/UnderConstruction.tsx`

## Component Interface

```typescript
interface UnderConstructionProps {
  title: string;
  icon: LucideIcon;
  description?: string;
}
```

## Features

- **Customizable Icon**: Accept any Lucide React icon
- **Multilingual Support**: Automatic Arabic/English text switching
- **RTL Support**: Proper right-to-left layout support
- **Responsive Design**: Works on all screen sizes
- **Professional Styling**: Consistent with application design system
- **Accessibility**: Proper semantic structure and contrast

## Usage Examples

### 1. Basic Usage

```typescript
import UnderConstruction from '@/components/common/UnderConstruction';
import { Settings } from 'lucide-react';

function ConfigurationPage() {
  return (
    <UnderConstruction
      title="Configuration"
      icon={Settings}
      description="System configuration and settings management"
    />
  );
}
```

### 2. Different Icons for Different Pages

```typescript
import UnderConstruction from '@/components/common/UnderConstruction';
import { 
  BarChart3, 
  Users, 
  Shield, 
  Bell,
  FileText,
  Map
} from 'lucide-react';

// Reports page
function ReportsPage() {
  return (
    <UnderConstruction
      title="Reports & Analytics"
      icon={BarChart3}
      description="Comprehensive reporting and data analytics dashboard"
    />
  );
}

// User management page
function UsersPage() {
  return (
    <UnderConstruction
      title="User Management"
      icon={Users}
      description="Manage user accounts, roles, and permissions"
    />
  );
}

// Security page
function SecurityPage() {
  return (
    <UnderConstruction
      title="Security Center"
      icon={Shield}
      description="Security settings and monitoring tools"
    />
  );
}

// Notifications page
function NotificationsPage() {
  return (
    <UnderConstruction
      title="Notification Center"
      icon={Bell}
      description="Manage alerts, notifications, and communication preferences"
    />
  );
}
```

### 3. With Custom Styling

```typescript
import UnderConstruction from '@/components/common/UnderConstruction';
import { Wrench } from 'lucide-react';

function MaintenancePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <UnderConstruction
        title="System Maintenance"
        icon={Wrench}
        description="We're currently performing system maintenance to improve your experience"
      />
    </div>
  );
}
```

### 4. Multilingual Content

```typescript
import UnderConstruction from '@/components/common/UnderConstruction';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar } from 'lucide-react';

function SchedulePage() {
  const { isRTL } = useLanguage();
  
  const title = isRTL ? "جدولة الرحلات" : "Trip Scheduling";
  const description = isRTL 
    ? "نظام إدارة وجدولة الرحلات والشحنات"
    : "Trip and shipment scheduling management system";

  return (
    <UnderConstruction
      title={title}
      icon={Calendar}
      description={description}
    />
  );
}
```

### 5. Integration with Page Layout

```typescript
import UnderConstruction from '@/components/common/UnderConstruction';
import { useLanguage } from '@/contexts/LanguageContext';
import { Activity } from 'lucide-react';

function MonitoringPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {t('pages.monitoring.title')}
          </h1>
        </div>
      </header>

      {/* Under Construction Content */}
      <UnderConstruction
        title={t('pages.monitoring.title')}
        icon={Activity}
        description={t('pages.monitoring.description')}
      />
    </div>
  );
}
```

## Component Structure

### Visual Layout

The component renders with the following structure:

```
┌─────────────────────────────────────┐
│                                     │
│              [ICON]                 │
│                                     │
│              TITLE                  │
│                                     │
│            Description              │
│                                     │
│    ┌─────────────────────────┐      │
│    │ ⚠️ Page Under Construction │      │
│    └─────────────────────────┘      │
│                                     │
│        Additional Info Text         │
│                                     │
└─────────────────────────────────────┘
```

### HTML Structure

```html
<div class="flex flex-col items-center justify-center min-h-[60vh] p-8">
  <div class="text-center max-w-md">
    <!-- Icon Container -->
    <div class="mb-6">
      <div class="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
        <Icon class="w-12 h-12 text-blue-600" />
      </div>
    </div>

    <!-- Title -->
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Title</h1>

    <!-- Description -->
    <p class="text-gray-600 mb-8 leading-relaxed">Description</p>

    <!-- Under Construction Notice -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div class="flex items-center justify-center">
        <div class="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
          <span class="text-yellow-800 text-sm font-bold">!</span>
        </div>
        <p class="text-yellow-800 font-medium">Page Under Construction</p>
      </div>
    </div>

    <!-- Additional Info -->
    <p class="text-sm text-gray-500">Additional development information</p>
  </div>
</div>
```

## Styling and Theming

### Default Styling

The component uses a consistent color scheme:

- **Icon Background**: `bg-blue-100` with `text-blue-600` icon
- **Title**: `text-gray-800` with `text-3xl font-bold`
- **Description**: `text-gray-600` with `leading-relaxed`
- **Warning Box**: `bg-yellow-50` with `border-yellow-200`
- **Warning Icon**: `bg-yellow-400` with `text-yellow-800`

### Custom Themes

```typescript
// Create themed variants
const themes = {
  default: {
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    warningBg: 'bg-yellow-50',
    warningBorder: 'border-yellow-200'
  },
  maintenance: {
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    warningBg: 'bg-orange-50',
    warningBorder: 'border-orange-200'
  },
  coming_soon: {
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    warningBg: 'bg-green-50',
    warningBorder: 'border-green-200'
  }
};

// Enhanced component with themes
interface ThemedUnderConstructionProps extends UnderConstructionProps {
  theme?: keyof typeof themes;
}

function ThemedUnderConstruction({ 
  theme = 'default', 
  ...props 
}: ThemedUnderConstructionProps) {
  const themeStyles = themes[theme];
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className={`w-24 h-24 mx-auto ${themeStyles.iconBg} rounded-full flex items-center justify-center`}>
            <props.icon className={`w-12 h-12 ${themeStyles.iconColor}`} />
          </div>
        </div>
        {/* Rest of component */}
      </div>
    </div>
  );
}
```

## Integration Patterns

### 1. Route-based Usage

```typescript
// In your routing system
import { lazy } from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Settings, Users, BarChart3 } from 'lucide-react';

const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('@/pages/Dashboard'))
  },
  {
    path: '/configuration',
    component: () => (
      <UnderConstruction
        title="Configuration"
        icon={Settings}
        description="System configuration and settings"
      />
    )
  },
  {
    path: '/users',
    component: () => (
      <UnderConstruction
        title="User Management"
        icon={Users}
        description="User accounts and permissions"
      />
    )
  },
  {
    path: '/analytics',
    component: () => (
      <UnderConstruction
        title="Analytics Dashboard"
        icon={BarChart3}
        description="Data analytics and insights"
      />
    )
  }
];
```

### 2. Conditional Rendering

```typescript
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Shield } from 'lucide-react';

function SecurityPage() {
  const isSecurityFeatureEnabled = useFeatureFlag('security_module');

  if (!isSecurityFeatureEnabled) {
    return (
      <UnderConstruction
        title="Security Center"
        icon={Shield}
        description="Advanced security features and monitoring"
      />
    );
  }

  return <SecurityDashboard />;
}
```

### 3. With Loading States

```typescript
import { useState, useEffect } from 'react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Database } from 'lucide-react';

function DataPage() {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if feature is ready
    checkFeatureReadiness()
      .then(setIsReady)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isReady) {
    return (
      <UnderConstruction
        title="Data Management"
        icon={Database}
        description="Data management features are being prepared"
      />
    );
  }

  return <DataDashboard />;
}
```

### 4. With Progress Indicators

```typescript
import UnderConstruction from '@/components/common/UnderConstruction';
import { Rocket } from 'lucide-react';

function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <UnderConstruction
        title="Advanced Analytics"
        icon={Rocket}
        description="Powerful analytics and reporting tools"
      />
      
      {/* Progress indicator */}
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold mb-4">Development Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>UI Design</span>
              <span className="text-green-600">✓ Complete</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Backend API</span>
              <span className="text-yellow-600">⏳ In Progress</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Testing</span>
              <span className="text-gray-400">⏸️ Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Accessibility Features

### Screen Reader Support
- Proper heading hierarchy with `<h1>` for title
- Descriptive text content
- Semantic HTML structure

### Keyboard Navigation
- Focusable elements where appropriate
- Proper tab order
- Skip links if needed

### Visual Accessibility
- High contrast colors
- Readable font sizes
- Clear visual hierarchy

## Best Practices

### 1. Icon Selection
- Choose icons that clearly represent the page functionality
- Use consistent icon style throughout the application
- Consider cultural appropriateness for international users

### 2. Content Guidelines
- Keep titles concise and descriptive
- Provide helpful descriptions that explain what the page will contain
- Use consistent tone and language

### 3. User Experience
- Set proper expectations about when features will be available
- Provide alternative ways to access similar functionality if available
- Consider adding contact information for urgent needs

### 4. Development Workflow
```typescript
// Create a registry of under construction pages
export const underConstructionPages = {
  '/analytics': {
    title: 'Analytics Dashboard',
    icon: BarChart3,
    description: 'Advanced analytics and reporting',
    estimatedCompletion: '2024-Q2'
  },
  '/users': {
    title: 'User Management',
    icon: Users,
    description: 'User accounts and permissions',
    estimatedCompletion: '2024-Q1'
  }
};

// Use in routing
function createUnderConstructionRoute(path: string) {
  const config = underConstructionPages[path];
  return () => (
    <UnderConstruction
      title={config.title}
      icon={config.icon}
      description={config.description}
    />
  );
}
```

## Testing

### Unit Tests
```typescript
import { render, screen } from '@testing-library/react';
import UnderConstruction from '@/components/common/UnderConstruction';
import { Settings } from 'lucide-react';

test('renders title and description', () => {
  render(
    <UnderConstruction
      title="Test Page"
      icon={Settings}
      description="Test description"
    />
  );

  expect(screen.getByText('Test Page')).toBeInTheDocument();
  expect(screen.getByText('Test description')).toBeInTheDocument();
  expect(screen.getByText(/Page Under Construction/i)).toBeInTheDocument();
});

test('renders with RTL support', () => {
  // Mock language context
  render(
    <LanguageProvider>
      <UnderConstruction
        title="اختبار"
        icon={Settings}
        description="وصف الاختبار"
      />
    </LanguageProvider>
  );

  const container = screen.getByText('اختبار').closest('div');
  expect(container).toHaveClass('rtl');
});
```

### Visual Testing
```typescript
// Storybook stories
export default {
  title: 'Components/UnderConstruction',
  component: UnderConstruction,
};

export const Default = {
  args: {
    title: 'Configuration',
    icon: Settings,
    description: 'System configuration and settings'
  }
};

export const WithLongDescription = {
  args: {
    title: 'Advanced Analytics',
    icon: BarChart3,
    description: 'Comprehensive analytics dashboard with real-time data visualization, custom reports, and advanced filtering capabilities'
  }
};
```

## Troubleshooting

### Common Issues

1. **Icon not displaying**: Ensure the icon is properly imported from lucide-react
2. **Layout issues**: Check parent container constraints and CSS conflicts
3. **Text overflow**: Verify content length and responsive design
4. **RTL problems**: Test with Arabic content and verify language context

### Debug Tips

```typescript
// Add debug information
function DebugUnderConstruction(props: UnderConstructionProps) {
  console.log('UnderConstruction props:', props);
  
  return (
    <div>
      <div className="fixed top-4 right-4 bg-black text-white p-2 text-xs rounded">
        Debug: {props.title}
      </div>
      <UnderConstruction {...props} />
    </div>
  );
}
```

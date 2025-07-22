# Alert Components Documentation

This document provides comprehensive documentation for all alert-related components created for the Trip Tracker UI application.

## Overview

The alert components system consists of several reusable components designed to work together to create a comprehensive alert management interface. All components support RTL/LTR layouts, multiple languages, and follow accessibility best practices.

## Components

### 1. StatisticsCard Component

**Location:** `src/components/ui/statistics-card.tsx`

A reusable card component for displaying statistical information with icons, values, and labels.

#### Features

- Responsive design with mobile-first approach
- RTL/LTR layout support
- Multiple color variants (default, success, warning, danger, info)
- Icon support with proper sizing
- Hover effects and smooth transitions
- Accessibility compliant with proper ARIA labels

#### Props Interface

```typescript
interface StatisticsCardProps {
  value: string | number; // The main value to display
  label: string; // The label/title for the statistic
  icon?: LucideIcon; // Optional icon to display
  variant?: "default" | "success" | "warning" | "danger" | "info";
  subtitle?: string; // Optional subtitle or description
  className?: string; // Custom CSS classes
  onClick?: () => void; // Click handler for the card
  clickable?: boolean; // Whether the card is clickable
}
```

#### Usage Example

```tsx
import { StatisticsCard } from "@/components/ui/statistics-card";
import { AlertTriangle } from "lucide-react";

<StatisticsCard
  value={25}
  label="Critical Alerts"
  icon={AlertTriangle}
  variant="danger"
  subtitle="Requires immediate attention"
  clickable={true}
  onClick={() => console.log("Card clicked")}
/>;
```

#### StatisticsCardsGrid Component

A container component for displaying multiple statistics cards in a responsive grid layout.

```tsx
interface StatisticsCardsGridProps {
  cards: StatisticsCardProps[]; // Array of statistics card data
  className?: string; // Custom CSS classes
  columns?: {
    // Number of columns for different screen sizes
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}
```

### 2. AlertBadge Component

**Location:** `src/components/ui/alert-badge.tsx`

A reusable badge component for displaying alert status, priority levels, and other categorical information.

#### Features

- Multiple predefined alert types (critical, warning, info, success, resolved)
- Custom color variants
- Icon support with automatic sizing
- RTL/LTR layout support
- Accessibility compliant with proper ARIA labels
- Hover effects and smooth transitions
- Size variants (sm, md, lg)

#### Props Interface

```typescript
interface AlertBadgeProps {
  type?: AlertType; // The type of alert
  text: string; // Custom text to display
  icon?: LucideIcon; // Custom icon (overrides default)
  size?: BadgeSize; // Size variant
  className?: string; // Custom CSS classes
  showIcon?: boolean; // Whether to show the icon
  variant?: "default" | "outline" | "solid";
  onClick?: () => void; // Click handler
  clickable?: boolean; // Whether the badge is clickable
}

type AlertType =
  | "critical"
  | "warning"
  | "info"
  | "success"
  | "resolved"
  | "pending";
type BadgeSize = "sm" | "md" | "lg";
```

#### Usage Examples

```tsx
import { AlertBadge, AlertPriorityBadge, AlertStatusBadge } from "@/components/ui/alert-badge";

// Basic alert badge
<AlertBadge type="critical" text="Critical" size="md" />

// Priority badge
<AlertPriorityBadge priority="high" size="sm" />

// Status badge
<AlertStatusBadge status="active" size="md" />
```

#### Specialized Badge Components

**AlertPriorityBadge**

```typescript
interface AlertPriorityBadgeProps {
  priority: "high" | "medium" | "low";
  className?: string;
  size?: BadgeSize;
  showIcon?: boolean;
}
```

**AlertStatusBadge**

```typescript
interface AlertStatusBadgeProps {
  status: "active" | "resolved" | "pending" | "acknowledged";
  className?: string;
  size?: BadgeSize;
  showIcon?: boolean;
}
```

### 3. DataTable Component

**Location:** `src/components/ui/data-table.tsx`

A comprehensive, reusable data table component with advanced features.

#### Features

- Column sorting (ascending/descending)
- Global search and column-specific filtering
- Pagination with customizable page sizes
- Responsive design with horizontal scrolling
- RTL/LTR layout support
- Row selection (single/multiple)
- Custom cell renderers
- Loading and empty states
- Accessibility compliant with ARIA labels
- Export functionality

#### Props Interface

```typescript
interface DataTableProps<T = any> {
  data: T[]; // Array of data to display
  columns: TableColumn<T>[]; // Column definitions
  loading?: boolean; // Loading state
  emptyMessage?: string; // Empty state message
  searchable?: boolean; // Whether to show search
  searchPlaceholder?: string; // Search placeholder text
  paginated?: boolean; // Whether to show pagination
  pageSizeOptions?: number[]; // Items per page options
  defaultPageSize?: number; // Default page size
  selectable?: boolean; // Whether rows are selectable
  selectionMode?: "single" | "multiple";
  selectedRows?: string[]; // Selected row keys
  onSelectionChange?: (selectedKeys: string[]) => void;
  onRowClick?: (row: T, index: number) => void;
  className?: string; // Custom CSS classes
  getRowKey?: (row: T, index: number) => string;
}
```

#### Column Definition

```typescript
interface TableColumn<T = any> {
  key: string; // Unique identifier for the column
  label: string; // Column header label
  sortable?: boolean; // Whether the column is sortable
  filterable?: boolean; // Whether the column is filterable
  render?: (value: any, row: T, index: number) => ReactNode;
  width?: string; // Column width (CSS value)
  align?: "left" | "center" | "right";
  hideOnMobile?: boolean; // Whether to hide on mobile
}
```

#### Usage Example

```tsx
import { DataTable, TableColumn } from "@/components/ui/data-table";

const columns: TableColumn<AlertData>[] = [
  {
    key: "type",
    label: "Alert Type",
    sortable: true,
    render: (value) => <AlertBadge type={value} text={value} />,
  },
  {
    key: "title",
    label: "Title",
    sortable: true,
  },
  {
    key: "timestamp",
    label: "Time",
    sortable: true,
    render: (value) => new Date(value).toLocaleString(),
  },
];

<DataTable
  data={alertsData}
  columns={columns}
  searchable={true}
  paginated={true}
  defaultPageSize={10}
  selectable={true}
  selectionMode="multiple"
  onSelectionChange={(keys) => console.log("Selected:", keys)}
/>;
```

### 4. AlertActions Component

**Location:** `src/components/ui/alert-actions.tsx`

A reusable component for displaying action buttons related to alerts.

#### Features

- Multiple action button layouts (horizontal, vertical, dropdown)
- Customizable action sets based on alert status
- Icon support with proper sizing
- RTL/LTR layout support
- Accessibility compliant with proper ARIA labels
- Loading states for async actions
- Confirmation dialogs for destructive actions
- Keyboard navigation support

#### Props Interface

```typescript
interface AlertActionsProps {
  actions: AlertAction[]; // Array of actions to display
  layout?: "horizontal" | "vertical" | "dropdown";
  size?: "sm" | "md" | "lg"; // Size of the action buttons
  showLabels?: boolean; // Whether to show labels on buttons
  maxVisibleActions?: number; // Max actions before using dropdown
  className?: string; // Custom CSS classes
  alertData?: any; // Alert data for context
}

interface AlertAction {
  key: string; // Unique identifier
  label: string; // Action label
  icon: LucideIcon; // Action icon
  onClick: () => void | Promise<void>;
  variant?: "default" | "outline" | "ghost" | "destructive";
  disabled?: boolean; // Whether the action is disabled
  loading?: boolean; // Whether the action is loading
  requiresConfirmation?: boolean; // Whether requires confirmation
  confirmationMessage?: string; // Confirmation message
  show?: boolean; // Whether to show the action
}
```

#### Usage Examples

```tsx
import { AlertActions, QuickAlertActions, createAlertActions } from "@/components/ui/alert-actions";

// Using predefined actions
const actions = createAlertActions(alertData, {
  onView: () => console.log("View"),
  onResolve: () => console.log("Resolve"),
  onDelete: () => console.log("Delete")
});

<AlertActions
  actions={actions}
  layout="horizontal"
  size="sm"
  showLabels={true}
/>

// Quick actions component
<QuickAlertActions
  alertData={alertData}
  onView={() => handleView()}
  onResolve={() => handleResolve()}
  layout="dropdown"
/>
```

### 5. PageHeader Component

**Location:** `src/components/ui/page-header.tsx`

A reusable page header component that displays page title, subtitle, current date/time, and action buttons.

#### Features

- Responsive design with mobile-first approach
- RTL/LTR layout support
- Real-time date/time display with auto-refresh
- Customizable action buttons
- Breadcrumb integration
- Loading states
- Multiple layout variants
- Accessibility compliant with proper ARIA labels

#### Props Interface

```typescript
interface PageHeaderProps {
  title: string; // Page title
  subtitle?: string; // Optional subtitle or description
  showDate?: boolean; // Whether to show current date
  showTime?: boolean; // Whether to show current time
  autoRefreshTime?: boolean; // Whether to auto-refresh time
  refreshInterval?: number; // Time refresh interval in seconds
  actions?: ReactNode; // Action buttons to display
  loading?: boolean; // Whether the page is loading
  className?: string; // Custom CSS classes
  variant?: "default" | "compact" | "centered";
  background?: "white" | "gray" | "transparent";
}
```

#### Usage Examples

```tsx
import { PageHeader, PageHeaderWithRefresh, SimplePageHeader } from "@/components/ui/page-header";

// Basic page header
<PageHeader
  title="All Alerts"
  subtitle="System-wide alerts and notifications management"
  showDate={true}
  showTime={true}
  actions={<Button>Export</Button>}
/>

// Page header with refresh
<PageHeaderWithRefresh
  title="All Alerts"
  subtitle="System-wide alerts and notifications management"
  onRefresh={handleRefresh}
  refreshing={isRefreshing}
  additionalActions={<Button>Export</Button>}
/>

// Simple page header
<SimplePageHeader
  title="All Alerts"
  subtitle="System-wide alerts and notifications management"
/>
```

## Integration Example: AllAlertsPage

The `AllAlertsPage` component demonstrates how all these components work together:

```tsx
export default function AllAlertsPage() {
  const { t, language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);

  // Statistics data
  const statisticsData = [
    {
      value: activeAlertsCount,
      label: t("reportsPages.allAlerts.criticalAlerts"),
      icon: AlertTriangle,
      variant: "danger" as const,
    },
    // ... more statistics
  ];

  // Table columns
  const columns: TableColumn<AlertData>[] = [
    {
      key: "type",
      label: t("reportsPages.allAlerts.alertType"),
      sortable: true,
      render: (value) => <AlertBadge type={value} text={value} size="sm" />,
    },
    // ... more columns
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeaderWithRefresh
        title={t("reportsPages.allAlerts.title")}
        subtitle={t("reportsPages.allAlerts.description")}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        additionalActions={headerActions}
      />

      {/* Statistics Cards */}
      <StatisticsCardsGrid cards={statisticsData} />

      {/* Alerts Table */}
      <div className="bg-white rounded-lg shadow">
        <DataTable
          data={sampleAlerts}
          columns={columns}
          searchable={true}
          paginated={true}
          defaultPageSize={10}
        />
      </div>
    </div>
  );
}
```

## Best Practices

1. **Accessibility**: All components include proper ARIA labels and keyboard navigation support
2. **Internationalization**: Components support RTL/LTR layouts and use translation keys
3. **Responsive Design**: Mobile-first approach with appropriate breakpoints
4. **Performance**: Memoized calculations and efficient re-rendering
5. **Type Safety**: Full TypeScript support with comprehensive interfaces
6. **Reusability**: Components are designed to be reusable across different pages
7. **Consistency**: Consistent styling and behavior patterns across all components

## Styling

All components use Tailwind CSS for styling and follow the design system established in the project. Custom CSS classes can be added via the `className` prop on all components.

## Testing

Components should be tested with:

- Unit tests for individual component functionality
- Integration tests for component interactions
- Accessibility tests using tools like axe-core
- Visual regression tests for UI consistency
- RTL/LTR layout tests for internationalization

## Future Enhancements

Potential improvements for the alert components system:

- Real-time updates via WebSocket connections
- Advanced filtering and search capabilities
- Bulk actions for multiple alerts
- Alert templates and automation rules
- Integration with external notification systems
- Advanced analytics and reporting features

## Component Architecture

```
src/components/ui/
├── statistics-card.tsx      # Statistics display cards
├── alert-badge.tsx         # Alert status and priority badges
├── data-table.tsx          # Comprehensive data table
├── alert-actions.tsx       # Alert action buttons
└── page-header.tsx         # Page header with date/time

src/app/reports/all-alerts/
└── page.tsx               # Main AllAlertsPage implementation
```

## Dependencies

The alert components system relies on the following dependencies:

- React 18+
- Next.js 15+
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Custom translation system (`@/contexts/LanguageContext`)
- Utility functions (`@/lib/utils`)

## Quick Start

1. Import the required components:

```tsx
import { StatisticsCardsGrid } from "@/components/ui/statistics-card";
import { DataTable } from "@/components/ui/data-table";
import { AlertBadge } from "@/components/ui/alert-badge";
```

2. Define your data structure:

```tsx
interface AlertData {
  id: string;
  type: "critical" | "warning" | "info";
  status: "active" | "resolved" | "pending";
  title: string;
  // ... other properties
}
```

3. Create your page:

```tsx
export default function MyAlertsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <StatisticsCardsGrid cards={statisticsData} />
      <DataTable data={alertsData} columns={columns} />
    </div>
  );
}
```

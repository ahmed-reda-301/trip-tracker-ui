# UI Components Library

This directory contains reusable UI components for the Trip Tracker application. All components are designed with accessibility, internationalization, and responsive design in mind.

## Components Overview

### Alert Management Components

#### 1. StatisticsCard (`statistics-card.tsx`)
Displays statistical information in card format with icons and color variants.

**Key Features:**
- Multiple color variants (default, success, warning, danger, info)
- RTL/LTR support
- Clickable cards with hover effects
- Responsive grid layout with `StatisticsCardsGrid`

**Usage:**
```tsx
import { StatisticsCard, StatisticsCardsGrid } from "@/components/ui/statistics-card";

<StatisticsCard
  value={42}
  label="Active Alerts"
  icon={AlertTriangle}
  variant="danger"
/>
```

#### 2. AlertBadge (`alert-badge.tsx`)
Displays alert status, priority, and type information as styled badges.

**Key Features:**
- Predefined alert types (critical, warning, info, success, resolved, pending)
- Size variants (sm, md, lg)
- Specialized components: `AlertPriorityBadge`, `AlertStatusBadge`
- Icon support with automatic sizing

**Usage:**
```tsx
import { AlertBadge, AlertPriorityBadge } from "@/components/ui/alert-badge";

<AlertBadge type="critical" text="Critical Alert" size="md" />
<AlertPriorityBadge priority="high" />
```

#### 3. DataTable (`data-table.tsx`)
Comprehensive data table with sorting, filtering, pagination, and selection.

**Key Features:**
- Column sorting (ascending/descending)
- Global search and filtering
- Pagination with customizable page sizes
- Row selection (single/multiple)
- Custom cell renderers
- Responsive design with mobile support

**Usage:**
```tsx
import { DataTable, TableColumn } from "@/components/ui/data-table";

const columns: TableColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "status", label: "Status", render: (value) => <Badge>{value}</Badge> }
];

<DataTable
  data={data}
  columns={columns}
  searchable={true}
  paginated={true}
/>
```

#### 4. AlertActions (`alert-actions.tsx`)
Action buttons for alert management (view, edit, resolve, delete, etc.).

**Key Features:**
- Multiple layouts (horizontal, vertical, dropdown)
- Predefined action sets with `createAlertActions`
- Confirmation dialogs for destructive actions
- Loading states for async operations
- Quick actions component for common use cases

**Usage:**
```tsx
import { AlertActions, QuickAlertActions } from "@/components/ui/alert-actions";

<QuickAlertActions
  alertData={alert}
  onView={() => handleView()}
  onResolve={() => handleResolve()}
  layout="horizontal"
/>
```

#### 5. PageHeader (`page-header.tsx`)
Page header with title, subtitle, date/time, and action buttons.

**Key Features:**
- Real-time date/time display with auto-refresh
- Multiple layout variants (default, compact, centered)
- Background variants (white, gray, transparent)
- Specialized components: `PageHeaderWithRefresh`, `SimplePageHeader`

**Usage:**
```tsx
import { PageHeaderWithRefresh } from "@/components/ui/page-header";

<PageHeaderWithRefresh
  title="All Alerts"
  subtitle="System-wide alert management"
  onRefresh={handleRefresh}
  refreshing={isRefreshing}
/>
```

### Base Components

#### Button (`button.tsx`)
Base button component with multiple variants and sizes (from shadcn/ui).

**Usage:**
```tsx
import { Button } from "@/components/ui/button";

<Button variant="outline" size="sm">
  Click me
</Button>
```

## Design Principles

### 1. Accessibility First
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

### 2. Internationalization (i18n)
- RTL/LTR layout support
- Translation key integration
- Locale-aware formatting (dates, numbers)
- Font switching based on language

### 3. Responsive Design
- Mobile-first approach
- Flexible grid systems
- Adaptive layouts
- Touch-friendly interactions

### 4. Type Safety
- Full TypeScript support
- Comprehensive prop interfaces
- Generic type support where applicable
- Strict type checking

### 5. Performance
- Memoized calculations
- Efficient re-rendering
- Lazy loading where appropriate
- Optimized bundle size

## Styling System

All components use Tailwind CSS with a consistent design system:

### Color Palette
- **Primary**: Blue variants for main actions
- **Success**: Green variants for positive states
- **Warning**: Yellow/Orange variants for caution
- **Danger**: Red variants for critical states
- **Info**: Blue variants for informational content
- **Gray**: Neutral variants for secondary content

### Typography
- **Headings**: Font weights 600-700
- **Body**: Font weight 400-500
- **Captions**: Font weight 400, smaller sizes
- **RTL Support**: Cairo font for Arabic, Roboto for English

### Spacing
- Consistent spacing scale (4px base unit)
- Responsive spacing with Tailwind breakpoints
- Proper component padding and margins

## Component Patterns

### 1. Compound Components
Components that work together as a system:
```tsx
<StatisticsCardsGrid cards={[
  { value: 10, label: "Active", variant: "danger" },
  { value: 5, label: "Resolved", variant: "success" }
]} />
```

### 2. Render Props
Flexible rendering with custom functions:
```tsx
<DataTable
  columns={[{
    key: "status",
    render: (value, row) => <AlertBadge type={value} />
  }]}
/>
```

### 3. Specialized Variants
Pre-configured components for common use cases:
```tsx
<QuickAlertActions />      // vs <AlertActions />
<SimplePageHeader />       // vs <PageHeader />
<AlertPriorityBadge />     // vs <AlertBadge />
```

## Testing Guidelines

### Unit Testing
- Test component rendering with different props
- Test event handlers and callbacks
- Test accessibility features
- Test responsive behavior

### Integration Testing
- Test component interactions
- Test data flow between components
- Test translation integration
- Test theme switching

### Visual Testing
- Screenshot testing for UI consistency
- Cross-browser compatibility
- RTL/LTR layout verification
- Mobile responsiveness

## Usage Examples

### Complete Alert Management Page
```tsx
export default function AlertsPage() {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState([]);

  const statisticsData = [
    { value: alerts.filter(a => a.status === 'active').length, label: 'Active', variant: 'danger' },
    { value: alerts.filter(a => a.status === 'resolved').length, label: 'Resolved', variant: 'success' }
  ];

  const columns = [
    { key: 'type', label: 'Type', render: (value) => <AlertBadge type={value} /> },
    { key: 'priority', label: 'Priority', render: (value) => <AlertPriorityBadge priority={value} /> },
    { key: 'actions', label: 'Actions', render: (_, row) => 
      <QuickAlertActions alertData={row} onView={handleView} onResolve={handleResolve} />
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeaderWithRefresh
        title={t('alerts.title')}
        onRefresh={fetchAlerts}
      />
      
      <StatisticsCardsGrid cards={statisticsData} />
      
      <DataTable
        data={alerts}
        columns={columns}
        searchable={true}
        paginated={true}
      />
    </div>
  );
}
```

## Contributing

When adding new components:

1. Follow the established patterns and conventions
2. Include comprehensive TypeScript interfaces
3. Add proper documentation and examples
4. Ensure accessibility compliance
5. Test with both RTL and LTR layouts
6. Include unit tests
7. Update this README with component information

## Dependencies

- React 18+
- Next.js 15+
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- class-variance-authority (styling)
- @radix-ui/react-slot (composition)

For detailed component documentation, see `docs/components/alerts-components.md`.

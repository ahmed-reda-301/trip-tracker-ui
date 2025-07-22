# Trip Tracker UI - Document Layout

## Project Overview

The Trip Tracker UI is a modern, responsive web application built with Next.js 15, React 19, and TypeScript. It provides a comprehensive interface for tracking and monitoring trips with support for multiple languages (Arabic/English) and RTL/LTR layouts.

## Architecture Overview

```
trip-tracker-ui/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # Reusable UI Components
│   ├── contexts/              # React Context Providers
│   ├── lib/                   # Utility Functions & Configurations
│   └── types/                 # TypeScript Type Definitions
├── docs/                      # Project Documentation
├── public/                    # Static Assets
└── configuration files        # Package.json, tailwind.config, etc.
```

## Directory Structure

### `/src/app/` - Application Routes
- **`layout.tsx`** - Root layout with font providers and global providers
- **`page.tsx`** - Home page component
- **`globals.css`** - Global styles and CSS variables
- **Route folders** - Individual page components and layouts

### `/src/components/` - Component Library

#### `/layout/` - Layout Components
- **`header.tsx`** - Main application header
  - User profile dropdown
  - Notification bell
  - Language toggle
  - Responsive sidebar toggle

- **`navigation.tsx`** - Navigation system
  - Horizontal navigation (desktop)
  - Sidebar navigation (mobile)
  - Dropdown menus for nested items
  - RTL/LTR support

- **`breadcrumb.tsx`** - Breadcrumb navigation
  - Dynamic breadcrumb generation
  - Localized labels
  - Navigation integration

- **`footer.tsx`** - Application footer
  - Company branding
  - Responsive design

#### `/providers/` - Context Providers
- **`FontProvider.tsx`** - Dynamic font switching
  - Cairo font for Arabic content
  - Roboto font for English content
  - Automatic language detection

#### `/shared/` - Shared Components
- **`LanguageToggle.tsx`** - Language switching component
  - Globe icon with language indicator
  - Smooth transitions
  - Persistent language storage

#### `/ui/` - UI Components
- Reusable UI components
- Form elements
- Interactive components

### `/src/contexts/` - React Contexts
- **`LanguageContext.tsx`** - Language management
  - Language state management
  - Translation utilities
  - RTL/LTR direction handling
  - Persistent storage

### `/src/lib/` - Utility Libraries
- **`translations.ts`** - Translation system
  - Multi-language support
  - Direction utilities
  - Text alignment helpers

### `/src/types/` - TypeScript Definitions
- Type definitions for components
- API response types
- Configuration interfaces

## Component Hierarchy

```
RootLayout
├── LanguageProvider
│   └── FontProvider
│       ├── Header
│       │   ├── LanguageToggle
│       │   └── UserProfile Dropdown
│       ├── Navigation
│       │   ├── Desktop Navigation
│       │   └── Mobile Sidebar
│       ├── Breadcrumb
│       ├── Page Content
│       └── Footer
```

## Key Features

### 1. Internationalization (i18n)
- **Languages**: Arabic (ar) and English (en)
- **RTL Support**: Complete right-to-left layout support
- **Font Switching**: Automatic font switching based on language
- **Persistent Storage**: Language preference saved in localStorage

### 2. Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: Tailwind CSS responsive breakpoints
- **Adaptive Navigation**: Horizontal nav on desktop, sidebar on mobile

### 3. Typography System
- **English Font**: Roboto (Google Fonts)
- **Arabic Font**: Cairo (Google Fonts)
- **Font Weights**: 400, 500, 600, 700
- **Dynamic Loading**: Fonts loaded based on current language

### 4. Color System
- **CSS Variables**: Centralized color management
- **Theme Support**: Light/dark theme ready
- **Brand Colors**: Custom color palette for navigation and headers

## File Naming Conventions

### Components
- **PascalCase**: `ComponentName.tsx`
- **Descriptive Names**: Clear, descriptive component names
- **Folder Structure**: Organized by feature/type

### Utilities
- **camelCase**: `utilityFunction.ts`
- **Descriptive Names**: Clear purpose indication

### Types
- **PascalCase**: `TypeName.ts`
- **Interface Prefix**: `I` prefix for interfaces (optional)

## Code Organization Principles

### 1. Separation of Concerns
- Layout components handle structure
- UI components handle presentation
- Contexts handle state management
- Utilities handle business logic

### 2. Reusability
- Components designed for reuse
- Props-based customization
- Composition over inheritance

### 3. Type Safety
- TypeScript throughout the application
- Strict type checking
- Interface definitions for all props

### 4. Performance
- Next.js optimizations
- Font preloading
- Component lazy loading where appropriate

## Development Workflow

### 1. Component Development
1. Create component in appropriate folder
2. Add TypeScript interfaces
3. Implement component logic
4. Add documentation comments
5. Export from index file

### 2. Styling
1. Use Tailwind CSS classes
2. Custom CSS variables for themes
3. Responsive design considerations
4. RTL/LTR layout support

### 3. Testing
1. Component unit tests
2. Integration tests for complex flows
3. Accessibility testing
4. Cross-browser testing

## Best Practices

### 1. Component Design
- Single responsibility principle
- Props validation with TypeScript
- Default props where appropriate
- Comprehensive documentation

### 2. State Management
- Context for global state
- Local state for component-specific data
- Immutable state updates
- Performance optimization

### 3. Accessibility
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

### 4. Performance
- Code splitting
- Image optimization
- Font optimization
- Bundle size monitoring

## Future Considerations

### 1. Scalability
- Component library expansion
- Additional language support
- Theme system enhancement
- Performance monitoring

### 2. Maintenance
- Regular dependency updates
- Code quality monitoring
- Documentation updates
- Testing coverage improvement

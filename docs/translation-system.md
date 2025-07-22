# Translation System Documentation

## Overview

The Trip Tracker application uses a comprehensive internationalization (i18n) system supporting English and Arabic with RTL (Right-to-Left) support. The system is built with React Context and provides seamless language switching capabilities.

## Architecture

### Core Files

1. **`/src/lib/translations.ts`** - Translation dictionary and utility functions
2. **`/src/contexts/LanguageContext.tsx`** - React Context for language management
3. **`/src/contexts/AuthContext.tsx`** - Authentication with language support

## Translation Dictionary Structure

### Language Types
```typescript
export type Language = "en" | "ar";

export interface TranslationDictionary {
  navigation: { /* Navigation items */ };
  reports: { /* Reports submenu */ };
  header: { /* Header UI elements */ };
  breadcrumb: { /* Breadcrumb navigation */ };
  notifications: { /* Notification system */ };
  common: { /* Common UI elements */ };
  footer: { /* Footer content */ };
  pages: { /* Page-specific content */ };
  reportsPages: { /* Reports pages content */ };
  alerts: { /* Alert messages */ };
}
```

### Key Sections

#### Navigation
```typescript
navigation: {
  locationMonitor: string;
  focusedTrips: string;
  assignedPorts: string;
  dashboard: string;
  configuration: string;
  suspiciousTrips: string;
  reports: string;
  notifications: string;
}
```

#### Common UI Elements
```typescript
common: {
  search: string;
  filter: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  view: string;
  loading: string;
  error: string;
  success: string;
  // ... more common elements
}
```

## Usage Guide

### 1. Basic Translation Hook

```typescript
import { useTranslation } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('pages.dashboard.title')}</h1>
      <button>{t('common.save')}</button>
    </div>
  );
}
```

### 2. Full Language Context

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { 
    language, 
    setLanguage, 
    t, 
    direction, 
    textAlign, 
    flexDirection, 
    isRTL 
  } = useLanguage();
  
  return (
    <div 
      className={`${isRTL ? 'rtl' : 'ltr'}`}
      style={{ textAlign, direction }}
    >
      <h1>{t('common.appName')}</h1>
      <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
        {t('header.switchLanguage')}
      </button>
    </div>
  );
}
```

### 3. Direction and RTL Support

```typescript
import { useDirection } from '@/contexts/LanguageContext';

function MyComponent() {
  const { direction, textAlign, flexDirection, isRTL } = useDirection();
  
  return (
    <div 
      className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
      style={{ direction }}
    >
      <span className={`${isRTL ? 'mr-2' : 'ml-2'}`}>
        Content with proper spacing
      </span>
    </div>
  );
}
```

## Utility Functions

### Translation Function
```typescript
export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split(".");
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
```

### Direction Utilities
```typescript
// Get text direction
export const getDirection = (language: Language): "rtl" | "ltr" => {
  return language === "ar" ? "rtl" : "ltr";
};

// Get text alignment
export const getTextAlign = (language: Language): "right" | "left" => {
  return language === "ar" ? "right" : "left";
};

// Get flex direction
export const getFlexDirection = (language: Language): "row" | "row-reverse" => {
  return language === "ar" ? "row-reverse" : "row";
};
```

## Implementation Steps

### 1. Setup Language Provider

```typescript
// In your main layout or app component
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
```

### 2. Add New Translations

To add new translations, edit `/src/lib/translations.ts`:

```typescript
// Add to the interface
export interface TranslationDictionary {
  // ... existing sections
  myNewSection: {
    title: string;
    description: string;
  };
}

// Add to both language objects
export const translations: Record<Language, TranslationDictionary> = {
  en: {
    // ... existing translations
    myNewSection: {
      title: "My New Title",
      description: "My new description"
    }
  },
  ar: {
    // ... existing translations
    myNewSection: {
      title: "عنواني الجديد",
      description: "وصفي الجديد"
    }
  }
};
```

### 3. Use in Components

```typescript
function MyNewComponent() {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      <h1>{t('myNewSection.title')}</h1>
      <p>{t('myNewSection.description')}</p>
    </div>
  );
}
```

## Best Practices

### 1. Consistent Key Naming
- Use dot notation for nested keys: `section.subsection.key`
- Use camelCase for key names
- Group related translations logically

### 2. RTL Considerations
- Always check `isRTL` for conditional styling
- Use appropriate margins/padding: `mr-2` vs `ml-2`
- Consider text alignment and flex direction

### 3. Fallback Handling
- The system returns the key if translation is missing
- Always provide both English and Arabic translations
- Test with both languages during development

### 4. Performance
- Translations are loaded once and cached
- Language preference is persisted in localStorage
- Context updates trigger re-renders only when language changes

## Common Patterns

### Conditional Text with Icons
```typescript
<button className="flex items-center gap-2">
  <Icon className="w-4 h-4" />
  <span>{t('common.save')}</span>
</button>
```

### RTL-aware Spacing
```typescript
<div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
  <Icon />
  <span>{t('common.text')}</span>
</div>
```

### Language-specific Content
```typescript
{isRTL ? (
  <div className="text-right font-arabic">
    {t('content.arabic')}
  </div>
) : (
  <div className="text-left font-english">
    {t('content.english')}
  </div>
)}
```

## Troubleshooting

### Common Issues

1. **Missing Translations**: Check console for missing keys
2. **RTL Layout Issues**: Verify direction and text-align styles
3. **Persistence Issues**: Check localStorage for saved language
4. **Context Errors**: Ensure component is wrapped in LanguageProvider

### Debug Tips

```typescript
// Log current language state
const { language, direction, isRTL } = useLanguage();
console.log({ language, direction, isRTL });

// Check if translation exists
const translation = t('some.key');
console.log('Translation:', translation);
```

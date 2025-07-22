# LogoutButton Component Documentation

## Overview

The LogoutButton component provides a flexible, multilingual logout functionality with confirmation dialog. It integrates seamlessly with the authentication system and supports multiple display variants.

## File Location

**Path**: `/src/components/auth/LogoutButton.tsx`

## Component Interface

```typescript
interface LogoutButtonProps {
  variant?: "button" | "dropdown" | "icon";
  className?: string;
  forceShow?: boolean; // Show button even when user is not authenticated
}
```

## Features

- **Multiple Variants**: Button, dropdown item, or icon-only display
- **Multilingual Support**: Automatic Arabic/English text switching
- **Confirmation Dialog**: Prevents accidental logouts
- **User Information Display**: Shows current user details in confirmation
- **Conditional Rendering**: Only shows when user is authenticated (unless forced)
- **RTL Support**: Proper right-to-left layout support

## Usage Examples

### 1. Basic Button Variant

```typescript
import LogoutButton from '@/components/auth/LogoutButton';

function Header() {
  return (
    <div className="flex items-center gap-4">
      <span>Welcome, User!</span>
      <LogoutButton variant="button" />
    </div>
  );
}
```

### 2. Dropdown Menu Item

```typescript
import LogoutButton from '@/components/auth/LogoutButton';

function UserDropdown() {
  return (
    <div className="dropdown-menu">
      <a href="/profile" className="dropdown-item">Profile</a>
      <a href="/settings" className="dropdown-item">Settings</a>
      <div className="dropdown-divider"></div>
      <LogoutButton variant="dropdown" />
    </div>
  );
}
```

### 3. Icon-Only Button

```typescript
import LogoutButton from '@/components/auth/LogoutButton';

function CompactHeader() {
  return (
    <div className="flex items-center gap-2">
      <button className="p-2">
        <BellIcon className="w-5 h-5" />
      </button>
      <LogoutButton variant="icon" />
    </div>
  );
}
```

### 4. Custom Styling

```typescript
import LogoutButton from '@/components/auth/LogoutButton';

function CustomLogout() {
  return (
    <LogoutButton 
      variant="button"
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
    />
  );
}
```

### 5. Force Show (Development/Testing)

```typescript
import LogoutButton from '@/components/auth/LogoutButton';

function DevTools() {
  return (
    <div className="dev-panel">
      <h3>Development Tools</h3>
      <LogoutButton 
        variant="button"
        forceShow={true}
        className="bg-gray-600 text-white"
      />
    </div>
  );
}
```

## Component Variants

### Button Variant
- **Appearance**: Full button with icon and text
- **Use Case**: Primary logout action in headers or toolbars
- **Styling**: Red text with hover effects

```typescript
// Rendered output
<button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
  <LogOut className="w-4 h-4" />
  {isRTL ? "تسجيل الخروج" : "Logout"}
</button>
```

### Dropdown Variant
- **Appearance**: Full-width dropdown item
- **Use Case**: Inside dropdown menus or navigation panels
- **Styling**: Consistent with dropdown item styling

```typescript
// Rendered output
<button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
  <LogOut className="w-4 h-4" />
  <span>{isRTL ? "تسجيل الخروج" : "Logout"}</span>
</button>
```

### Icon Variant
- **Appearance**: Icon-only button with tooltip
- **Use Case**: Compact interfaces or mobile layouts
- **Styling**: Minimal with hover effects

```typescript
// Rendered output
<button 
  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
  title={isRTL ? "تسجيل الخروج" : "Logout"}
>
  <LogOut className="w-5 h-5" />
</button>
```

## Confirmation Dialog

The component includes a comprehensive confirmation dialog with:

### Dialog Features
- **User Information Display**: Shows current user's name and department
- **Bilingual Content**: Automatic language switching
- **Contextual Messages**: Different messages for authenticated vs non-authenticated users
- **Action Buttons**: Cancel and confirm options

### Dialog Structure

```typescript
// Confirmation modal content
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
    {/* Header with icon and title */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-5 h-5 text-red-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {user ? "Confirm Logout" : "Go to Login"}
        </h3>
        <p className="text-sm text-gray-600">
          {user ? "Are you sure you want to logout?" : "Do you want to go to the login page?"}
        </p>
      </div>
    </div>

    {/* User info (if authenticated) */}
    {user && (
      <div className="bg-gray-50 rounded-lg p-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.department}</p>
          </div>
        </div>
      </div>
    )}

    {/* Action buttons */}
    <div className="flex gap-3">
      <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
        Cancel
      </button>
      <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
        {user ? "Logout" : "Go"}
      </button>
    </div>
  </div>
</div>
```

## Integration Examples

### With Navigation Bar

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LogoutButton from '@/components/auth/LogoutButton';

function NavigationBar() {
  const { user, isAuthenticated } = useAuth();
  const { t, isRTL } = useLanguage();

  return (
    <nav className={`flex items-center justify-between p-4 bg-white shadow ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">{t('common.appName')}</h1>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-600">
              {t('header.welcome')}, {isRTL ? user?.name : user?.nameEn}
            </span>
            <LogoutButton variant="button" />
          </>
        ) : (
          <a href="/login" className="text-blue-600 hover:text-blue-800">
            {t('header.signIn')}
          </a>
        )}
      </div>
    </nav>
  );
}
```

### With User Profile Dropdown

```typescript
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LogoutButton from '@/components/auth/LogoutButton';

function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
      >
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold">
            {user?.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1">
          <div className="px-4 py-2 border-b">
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
          
          <a href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50">
            Profile Settings
          </a>
          <a href="/preferences" className="block px-4 py-2 text-sm hover:bg-gray-50">
            Preferences
          </a>
          
          <div className="border-t">
            <LogoutButton variant="dropdown" />
          </div>
        </div>
      )}
    </div>
  );
}
```

### With Mobile Menu

```typescript
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LogoutButton from '@/components/auth/LogoutButton';

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
          <div className="p-4 space-y-2">
            <a href="/dashboard" className="block py-2 text-gray-700">Dashboard</a>
            <a href="/trips" className="block py-2 text-gray-700">Trips</a>
            <a href="/reports" className="block py-2 text-gray-700">Reports</a>
            
            <div className="pt-2 border-t">
              <LogoutButton 
                variant="button" 
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Customization Options

### Custom Confirmation Dialog

```typescript
// Create a custom logout button with custom confirmation
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

function CustomLogoutButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { logout, user } = useAuth();

  const handleLogout = () => {
    // Custom logout logic
    console.log('User logged out:', user?.username);
    logout();
  };

  return (
    <>
      <button 
        onClick={() => setShowConfirm(true)}
        className="custom-logout-button"
      >
        Sign Out
      </button>

      {showConfirm && (
        <CustomConfirmationDialog
          onConfirm={handleLogout}
          onCancel={() => setShowConfirm(false)}
          user={user}
        />
      )}
    </>
  );
}
```

### Themed Variants

```typescript
// Create themed logout buttons
const logoutThemes = {
  danger: "bg-red-600 hover:bg-red-700 text-white",
  outline: "border border-red-600 text-red-600 hover:bg-red-50",
  ghost: "text-red-600 hover:bg-red-50",
  minimal: "text-gray-600 hover:text-red-600"
};

function ThemedLogoutButton({ theme = 'danger' }: { theme?: keyof typeof logoutThemes }) {
  return (
    <LogoutButton 
      variant="button"
      className={logoutThemes[theme]}
    />
  );
}
```

## Accessibility Features

The LogoutButton component includes several accessibility features:

### Keyboard Navigation
- Full keyboard support with Tab and Enter keys
- Proper focus management in confirmation dialog
- Escape key to close confirmation dialog

### Screen Reader Support
- Proper ARIA labels and descriptions
- Semantic HTML structure
- Clear action descriptions

### Visual Indicators
- Clear hover and focus states
- High contrast colors for visibility
- Consistent iconography

## Best Practices

### 1. Placement Guidelines
- Place in consistent locations (top-right corner, user menu)
- Use appropriate variant for context (icon for compact spaces)
- Ensure easy access but prevent accidental clicks

### 2. User Experience
- Always show confirmation dialog for logout actions
- Display user information in confirmation
- Provide clear visual feedback for actions

### 3. Security Considerations
- Clear all user data on logout
- Redirect to appropriate page after logout
- Handle logout errors gracefully

### 4. Testing
```typescript
// Test logout functionality
import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from '@/components/auth/LogoutButton';

test('shows confirmation dialog on click', () => {
  render(<LogoutButton variant="button" />);
  
  const button = screen.getByRole('button');
  fireEvent.click(button);
  
  expect(screen.getByText('Confirm Logout')).toBeInTheDocument();
});

test('calls logout on confirmation', () => {
  const mockLogout = jest.fn();
  // Mock useAuth hook
  
  render(<LogoutButton variant="button" />);
  
  fireEvent.click(screen.getByRole('button'));
  fireEvent.click(screen.getByText('Logout'));
  
  expect(mockLogout).toHaveBeenCalled();
});
```

## Troubleshooting

### Common Issues

1. **Button not showing**: Check if user is authenticated (unless forceShow is true)
2. **Confirmation not appearing**: Verify state management and event handlers
3. **Styling issues**: Check className prop and CSS conflicts
4. **Language not switching**: Ensure LanguageContext is properly set up

### Debug Tips

```typescript
// Add debug logging
const LogoutButtonDebug = (props: LogoutButtonProps) => {
  const { user, isAuthenticated } = useAuth();
  
  console.log('LogoutButton Debug:', {
    user: user?.username,
    isAuthenticated,
    variant: props.variant,
    forceShow: props.forceShow
  });
  
  return <LogoutButton {...props} />;
};
```

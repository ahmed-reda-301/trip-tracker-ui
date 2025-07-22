# AuthContext Documentation

## Overview

The AuthContext provides a comprehensive authentication system for the Trip Tracker application. It manages user authentication state, login/logout functionality, and provides authentication utilities throughout the application.

## File Location

**Path**: `/src/contexts/AuthContext.tsx`

## Architecture

### Core Interfaces

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => void;
  checkAuth: () => void;
}

interface User {
  id: number;
  username: string;
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

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
  token?: string;
}
```

### Dependencies

The AuthContext integrates with:
- **AuthService**: Handles authentication logic and API calls
- **localStorage**: Persists authentication state
- **React Context**: Provides state management across components

## Implementation Details

### Context Provider Setup

```typescript
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authService = AuthService.getInstance();

  // Authentication check on mount
  const checkAuth = useCallback(() => {
    try {
      const currentUser = authService.getCurrentUser();
      const isAuth = authService.isAuthenticated();

      if (isAuth && currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  // Auto-check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Login function
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<LoginResponse> => {
      setIsLoading(true);
      try {
        const response = await authService.login(credentials);
        if (response.success && response.user) {
          setUser(response.user);
        }
        return response;
      } finally {
        setIsLoading(false);
      }
    },
    [authService]
  );

  // Logout function
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, [authService]);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      checkAuth,
    }),
    [user, isLoading, login, logout, checkAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

## Usage Guide

### 1. Setup AuthProvider

Wrap your application with the AuthProvider:

```typescript
// In your main layout or app component
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 2. Using the useAuth Hook

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login, 
    logout, 
    checkAuth 
  } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Department: {user?.department}</p>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3. Login Component Implementation

```typescript
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(credentials);
      
      if (response.success) {
        router.push('/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials(prev => ({
            ...prev,
            username: e.target.value
          }))}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({
            ...prev,
            password: e.target.value
          }))}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### 4. Protected Route Component

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermissions?: string[];
}

function ProtectedRoute({ 
  children, 
  requiredRole,
  requiredPermissions = []
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user && requiredRole && user.role !== requiredRole) {
      router.push('/unauthorized');
      return;
    }

    if (user && requiredPermissions.length > 0) {
      const hasPermissions = requiredPermissions.every(permission =>
        user.permissions.includes(permission)
      );
      
      if (!hasPermissions) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [user, isAuthenticated, isLoading, requiredRole, requiredPermissions, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}

// Usage
function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Admin content here</div>
    </ProtectedRoute>
  );
}

function ReportsPage() {
  return (
    <ProtectedRoute requiredPermissions={['view_reports', 'export_data']}>
      <div>Reports content here</div>
    </ProtectedRoute>
  );
}
```

### 5. User Profile Component

```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

function UserProfile() {
  const { user } = useAuth();
  const { isRTL } = useLanguage();

  if (!user) return null;

  return (
    <div className={`p-4 bg-white rounded-lg shadow ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-lg">
            {(isRTL ? user.name : user.nameEn).charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            {isRTL ? user.name : user.nameEn}
          </h3>
          <p className="text-gray-600">
            {isRTL ? user.department : user.departmentEn}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Role:</span>
          <span className="capitalize">{user.role}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={user.isActive ? 'text-green-600' : 'text-red-600'}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        {user.lastLogin && (
          <div className="flex justify-between">
            <span className="text-gray-600">Last Login:</span>
            <span>{new Date(user.lastLogin).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 6. Role-based Component Rendering

```typescript
import { useAuth } from '@/contexts/AuthContext';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

function RoleGuard({ children, allowedRoles, fallback = null }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Usage
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <RoleGuard allowedRoles={['admin', 'supervisor']}>
        <AdminPanel />
      </RoleGuard>

      <RoleGuard 
        allowedRoles={['admin']} 
        fallback={<div>Admin access required</div>}
      >
        <SystemSettings />
      </RoleGuard>
    </div>
  );
}
```

### 7. Permission-based Access Control

```typescript
function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    permissions: user?.permissions || []
  };
}

// Usage
function ReportsSection() {
  const { hasPermission } = usePermissions();

  return (
    <div>
      <h2>Reports</h2>
      
      {hasPermission('view_reports') && (
        <button>View Reports</button>
      )}
      
      {hasPermission('export_data') && (
        <button>Export Data</button>
      )}
      
      {hasPermission('delete_reports') && (
        <button className="text-red-600">Delete Reports</button>
      )}
    </div>
  );
}
```

## Integration with Other Systems

### With Language Context

```typescript
function AuthenticatedHeader() {
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();

  return (
    <header className={`flex items-center justify-between p-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <div>
        <h1>{t('header.welcome')}, {isRTL ? user?.name : user?.nameEn}!</h1>
      </div>
      <button onClick={logout} className="text-red-600">
        {t('header.signOut')}
      </button>
    </header>
  );
}
```

### With Router Guards

```typescript
// middleware.ts (Next.js 13+)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isProtectedPage = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};
```

## Error Handling

### Authentication Errors

```typescript
function useAuthErrorHandler() {
  const { logout } = useAuth();

  const handleAuthError = (error: any) => {
    if (error.status === 401 || error.message === 'Token expired') {
      logout();
      return;
    }

    // Handle other auth errors
    console.error('Authentication error:', error);
  };

  return { handleAuthError };
}
```

### Token Refresh

```typescript
// In AuthContext
const refreshToken = useCallback(async () => {
  try {
    const response = await authService.refreshToken();
    if (response.success && response.user) {
      setUser(response.user);
      return true;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    logout();
  }
  return false;
}, [authService, logout]);

// Auto-refresh token before expiration
useEffect(() => {
  if (!user) return;

  const interval = setInterval(() => {
    refreshToken();
  }, 15 * 60 * 1000); // Refresh every 15 minutes

  return () => clearInterval(interval);
}, [user, refreshToken]);
```

## Best Practices

### 1. Security Considerations
- Never store sensitive data in localStorage
- Implement proper token expiration handling
- Use HTTPS in production
- Validate user permissions on both client and server

### 2. Performance Optimization
- Use useMemo and useCallback to prevent unnecessary re-renders
- Implement proper loading states
- Cache user data appropriately

### 3. Error Handling
- Provide clear error messages
- Handle network failures gracefully
- Implement retry mechanisms for failed requests

### 4. Testing
```typescript
// Mock AuthContext for testing
export const mockAuthContext = {
  user: {
    id: 1,
    username: 'testuser',
    name: 'Test User',
    nameEn: 'Test User',
    role: 'admin',
    permissions: ['view_reports', 'export_data']
  },
  isAuthenticated: true,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  checkAuth: jest.fn()
};

// Test wrapper
function TestAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={mockAuthContext}>
      {children}
    </AuthContext.Provider>
  );
}
```

## Troubleshooting

### Common Issues

1. **Context not found error**: Ensure component is wrapped in AuthProvider
2. **Infinite re-renders**: Check useCallback and useMemo dependencies
3. **Token persistence issues**: Verify localStorage is available
4. **Permission checks failing**: Ensure user object has permissions array

### Debug Tips

```typescript
// Add debug logging
const debugAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  console.log('Auth Debug:', { user, isAuthenticated, isLoading });
};

// Monitor auth state changes
useEffect(() => {
  console.log('Auth state changed:', { user, isAuthenticated });
}, [user, isAuthenticated]);
```

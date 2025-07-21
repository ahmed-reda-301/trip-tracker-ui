import usersData from '@/data/users.json';

export interface User {
  id: string;
  username: string;
  name: string;
  nameEn: string;
  role: string;
  department: string;
  departmentEn: string;
  email: string;
  lastLogin: string | null;
  isActive: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message: string;
  messageEn: string;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {
    // Load user from localStorage if exists
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const { username, password } = credentials;

    // Validate input
    if (!username || !password) {
      return {
        success: false,
        message: 'يرجى إدخال اسم المستخدم وكلمة المرور',
        messageEn: 'Please enter username and password'
      };
    }

    // Find user
    const user = usersData.users.find(u => u.username === username);

    if (!user) {
      return {
        success: false,
        message: 'اسم المستخدم غير صحيح',
        messageEn: 'Invalid username'
      };
    }

    if (!user.isActive) {
      return {
        success: false,
        message: 'الحساب غير مفعل، يرجى التواصل مع المدير',
        messageEn: 'Account is inactive, please contact administrator'
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        message: 'كلمة المرور غير صحيحة',
        messageEn: 'Invalid password'
      };
    }

    // Update last login
    const userWithLogin: User = {
      ...user,
      lastLogin: new Date().toISOString()
    };

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(userWithLogin));
      localStorage.setItem('authToken', `token_${user.id}_${Date.now()}`);
    }

    this.currentUser = userWithLogin;

    return {
      success: true,
      user: userWithLogin,
      message: 'تم تسجيل الدخول بنجاح',
      messageEn: 'Login successful'
    };
  }

  public logout(): void {
    this.currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    }
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    return !!(token && user && this.currentUser);
  }

  public getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  }
}

export default AuthService;

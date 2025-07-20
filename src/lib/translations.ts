/**
 * Translation Dictionary for Trip Tracker Application
 * 
 * Comprehensive translation system supporting English and Arabic
 * with RTL support and cultural adaptations.
 * 
 * @author Trip Tracker Team
 * @version 1.0.0
 */

export type Language = 'en' | 'ar';

export interface TranslationDictionary {
  // Navigation & Menu
  navigation: {
    locationMonitor: string;
    focusedTrips: string;
    assignedPorts: string;
    dashboard: string;
    configuration: string;
    suspiciousTrips: string;
    reports: string;
    notifications: string;
  };
  
  // Reports submenu
  reports: {
    tripPanel: string;
    allAlerts: string;
    alertPanel: string;
    employees: string;
    assignPorts: string;
    focusedTrips: string;
    completedTrips: string;
  };
  
  // Header & User Interface
  header: {
    welcome: string;
    profile: string;
    settings: string;
    signOut: string;
    notifications: string;
    viewAllNotifications: string;
    language: string;
    switchLanguage: string;
  };
  
  // Breadcrumb
  breadcrumb: {
    home: string;
    locationMonitor: string;
    focusedTrips: string;
    assignedPorts: string;
    dashboard: string;
    configuration: string;
    suspiciousTrips: string;
    reports: string;
    notifications: string;
  };
  
  // Notifications Page
  notifications: {
    title: string;
    unreadCount: string;
    markAllAsRead: string;
    searchPlaceholder: string;
    filterAll: string;
    filterUnread: string;
    filterRead: string;
    noNotifications: string;
    noNotificationsDesc: string;
    adjustSearch: string;
    allCaughtUp: string;
    markAsRead: string;
    deleteNotification: string;
    priority: {
      high: string;
      medium: string;
      low: string;
    };
    categories: {
      security: string;
      system: string;
      reports: string;
      assignments: string;
    };
    types: {
      warning: string;
      error: string;
      info: string;
      success: string;
    };
    timeAgo: {
      minutesAgo: string;
      hourAgo: string;
      hoursAgo: string;
      dayAgo: string;
      daysAgo: string;
    };
  };
  
  // Common UI Elements
  common: {
    search: string;
    filter: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    view: string;
    close: string;
    open: string;
    loading: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    yes: string;
    no: string;
    confirm: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    reset: string;
  };
  
  // Footer
  footer: {
    poweredBy: string;
    companyName: string;
  };
  
  // Sample notification messages
  sampleNotifications: {
    suspiciousTrip: {
      title: string;
      message: string;
    };
    systemMaintenance: {
      title: string;
      message: string;
    };
    monthlyReport: {
      title: string;
      message: string;
    };
    portAssignment: {
      title: string;
      message: string;
    };
    securityAlert: {
      title: string;
      message: string;
    };
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    navigation: {
      locationMonitor: 'Location Monitor',
      focusedTrips: 'Focused Trips',
      assignedPorts: 'Assigned Ports',
      dashboard: 'Dashboard',
      configuration: 'Configuration',
      suspiciousTrips: 'Suspicious Trips',
      reports: 'Reports',
      notifications: 'Notifications',
    },
    reports: {
      tripPanel: 'Trip Panel',
      allAlerts: 'All Alerts',
      alertPanel: 'Alert Panel',
      employees: 'Employees',
      assignPorts: 'Assign Ports',
      focusedTrips: 'Focused Trips',
      completedTrips: 'Completed Trips',
    },
    header: {
      welcome: 'Welcome',
      profile: 'My Profile',
      settings: 'Settings',
      signOut: 'Sign Out',
      notifications: 'Notifications',
      viewAllNotifications: 'View all notifications',
      language: 'Language',
      switchLanguage: 'Switch to Arabic',
    },
    breadcrumb: {
      home: 'Home',
      locationMonitor: 'Location Monitor',
      focusedTrips: 'Focused Trips',
      assignedPorts: 'Assigned Ports',
      dashboard: 'Dashboard',
      configuration: 'Configuration',
      suspiciousTrips: 'Suspicious Trips',
      reports: 'Reports',
      notifications: 'Notifications',
    },
    notifications: {
      title: 'Notifications',
      unreadCount: 'unread notification',
      markAllAsRead: 'Mark all as read',
      searchPlaceholder: 'Search notifications...',
      filterAll: 'All',
      filterUnread: 'Unread',
      filterRead: 'Read',
      noNotifications: 'No notifications found',
      noNotificationsDesc: 'Try adjusting your search terms',
      adjustSearch: 'Try adjusting your search terms',
      allCaughtUp: "You're all caught up!",
      markAsRead: 'Mark as read',
      deleteNotification: 'Delete notification',
      priority: {
        high: 'High',
        medium: 'Medium',
        low: 'Low',
      },
      categories: {
        security: 'Security',
        system: 'System',
        reports: 'Reports',
        assignments: 'Assignments',
      },
      types: {
        warning: 'Warning',
        error: 'Error',
        info: 'Information',
        success: 'Success',
      },
      timeAgo: {
        minutesAgo: 'minutes ago',
        hourAgo: 'hour ago',
        hoursAgo: 'hours ago',
        dayAgo: 'day ago',
        daysAgo: 'days ago',
      },
    },
    common: {
      search: 'Search',
      filter: 'Filter',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      close: 'Close',
      open: 'Open',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      yes: 'Yes',
      no: 'No',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      reset: 'Reset',
    },
    footer: {
      poweredBy: 'Powered by',
      companyName: 'Laplacesoftware',
    },
    sampleNotifications: {
      suspiciousTrip: {
        title: 'New suspicious trip detected',
        message: 'A suspicious trip has been detected on Route 15 with unusual cargo patterns. Immediate attention required.',
      },
      systemMaintenance: {
        title: 'System maintenance scheduled',
        message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM. Some services may be temporarily unavailable.',
      },
      monthlyReport: {
        title: 'Monthly report ready',
        message: 'Your monthly customs report for November 2024 is now available for download in the reports section.',
      },
      portAssignment: {
        title: 'Port assignment updated',
        message: 'Your port assignments have been updated. Please review the new assignments in your dashboard.',
      },
      securityAlert: {
        title: 'Critical alert: Unauthorized access attempt',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100. Security protocols have been activated.',
      },
    },
  },
  ar: {
    navigation: {
      locationMonitor: 'مراقب المواقع',
      focusedTrips: 'الرحلات المركزة',
      assignedPorts: 'الموانئ المخصصة',
      dashboard: 'لوحة التحكم',
      configuration: 'الإعدادات',
      suspiciousTrips: 'الرحلات المشبوهة',
      reports: 'التقارير',
      notifications: 'الإشعارات',
    },
    reports: {
      tripPanel: 'لوحة الرحلات',
      allAlerts: 'جميع التنبيهات',
      alertPanel: 'لوحة التنبيهات',
      employees: 'الموظفون',
      assignPorts: 'تخصيص الموانئ',
      focusedTrips: 'الرحلات المركزة',
      completedTrips: 'الرحلات المكتملة',
    },
    header: {
      welcome: 'مرحباً',
      profile: 'ملفي الشخصي',
      settings: 'الإعدادات',
      signOut: 'تسجيل الخروج',
      notifications: 'الإشعارات',
      viewAllNotifications: 'عرض جميع الإشعارات',
      language: 'اللغة',
      switchLanguage: 'التبديل إلى الإنجليزية',
    },
    breadcrumb: {
      home: 'الرئيسية',
      locationMonitor: 'مراقب المواقع',
      focusedTrips: 'الرحلات المركزة',
      assignedPorts: 'الموانئ المخصصة',
      dashboard: 'لوحة التحكم',
      configuration: 'الإعدادات',
      suspiciousTrips: 'الرحلات المشبوهة',
      reports: 'التقارير',
      notifications: 'الإشعارات',
    },
    notifications: {
      title: 'الإشعارات',
      unreadCount: 'إشعار غير مقروء',
      markAllAsRead: 'تحديد الكل كمقروء',
      searchPlaceholder: 'البحث في الإشعارات...',
      filterAll: 'الكل',
      filterUnread: 'غير مقروء',
      filterRead: 'مقروء',
      noNotifications: 'لم يتم العثور على إشعارات',
      noNotificationsDesc: 'حاول تعديل مصطلحات البحث',
      adjustSearch: 'حاول تعديل مصطلحات البحث',
      allCaughtUp: 'أنت محدث بكل شيء!',
      markAsRead: 'تحديد كمقروء',
      deleteNotification: 'حذف الإشعار',
      priority: {
        high: 'عالية',
        medium: 'متوسطة',
        low: 'منخفضة',
      },
      categories: {
        security: 'الأمان',
        system: 'النظام',
        reports: 'التقارير',
        assignments: 'المهام',
      },
      types: {
        warning: 'تحذير',
        error: 'خطأ',
        info: 'معلومات',
        success: 'نجح',
      },
      timeAgo: {
        minutesAgo: 'دقائق مضت',
        hourAgo: 'ساعة مضت',
        hoursAgo: 'ساعات مضت',
        dayAgo: 'يوم مضى',
        daysAgo: 'أيام مضت',
      },
    },
    common: {
      search: 'بحث',
      filter: 'تصفية',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      view: 'عرض',
      close: 'إغلاق',
      open: 'فتح',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      warning: 'تحذير',
      info: 'معلومات',
      yes: 'نعم',
      no: 'لا',
      confirm: 'تأكيد',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      submit: 'إرسال',
      reset: 'إعادة تعيين',
    },
    footer: {
      poweredBy: 'مدعوم من',
      companyName: 'لابلاس سوفتوير',
    },
    sampleNotifications: {
      suspiciousTrip: {
        title: 'تم اكتشاف رحلة مشبوهة جديدة',
        message: 'تم اكتشاف رحلة مشبوهة على الطريق 15 مع أنماط شحن غير عادية. مطلوب اهتمام فوري.',
      },
      systemMaintenance: {
        title: 'صيانة النظام مجدولة',
        message: 'ستحدث الصيانة المجدولة الليلة من الساعة 2:00 صباحاً إلى 4:00 صباحاً. قد تكون بعض الخدمات غير متاحة مؤقتاً.',
      },
      monthlyReport: {
        title: 'التقرير الشهري جاهز',
        message: 'تقرير الجمارك الشهري لشهر نوفمبر 2024 متاح الآن للتحميل في قسم التقارير.',
      },
      portAssignment: {
        title: 'تم تحديث تخصيص الميناء',
        message: 'تم تحديث تخصيصات الموانئ الخاصة بك. يرجى مراجعة التخصيصات الجديدة في لوحة التحكم.',
      },
      securityAlert: {
        title: 'تنبيه حرج: محاولة وصول غير مصرح بها',
        message: 'تم اكتشاف محاولات تسجيل دخول فاشلة متعددة من IP 192.168.1.100. تم تفعيل بروتوكولات الأمان.',
      },
    },
  },
};

/**
 * Get translation for a specific key
 */
export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

/**
 * Get direction for language (RTL for Arabic, LTR for English)
 */
export const getDirection = (language: Language): 'rtl' | 'ltr' => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

/**
 * Get text alignment for language
 */
export const getTextAlign = (language: Language): 'right' | 'left' => {
  return language === 'ar' ? 'right' : 'left';
};

/**
 * Get flex direction for language (reverse for Arabic)
 */
export const getFlexDirection = (language: Language): 'row' | 'row-reverse' => {
  return language === 'ar' ? 'row-reverse' : 'row';
};

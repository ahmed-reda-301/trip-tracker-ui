/**
 * Translation Dictionary for Trip Tracker Application
 *
 * Comprehensive translation system supporting English and Arabic
 * with RTL support and cultural adaptations.
 *
 */

export type Language = "en" | "ar";

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
    appName: string;
    closeSidebar: string;
    share: string;
    actionsLabel: string;
    confirmAction: string;
    location: string;
    vehicle: string;
    assignedTo: string;
    id: string;
    responseTime: string;
    minutes: string;
    export: {
      defaultFilename: string;
      exportToExcel: string;
      exporting: string;
      exportSuccess: string;
      exportError: string;
    };
    priority: {
      high: string;
      medium: string;
      low: string;
    };
    status: {
      active: string;
      resolved: string;
      pending: string;
      acknowledged: string;
    };
    actions: {
      resolve: string;
      acknowledge: string;
      export: string;
      refresh: string;
    };
  };

  // Footer
  footer: {
    poweredBy: string;
    companyName: string;
    allRightsReserved: string;
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

  // Page Content
  pages: {
    locationMonitor: {
      title: string;
      description: string;
      noData: string;
      loading: string;
      realTimeTracking: string;
      vesselCount: string;
      activeVessels: string;
      lastUpdate: string;
      refreshData: string;
      viewDetails: string;
      coordinates: string;
      status: string;
      speed: string;
      destination: string;
    };
    dashboard: {
      title: string;
      description: string;
      welcomeMessage: string;
      statistics: string;
      overview: string;
      quickActions: string;
      recentActivity: string;
      systemHealth: string;
      totalTrips: string;
      completedTrips: string;
      pendingTrips: string;
      alerts: string;
      performance: string;
      efficiency: string;
    };
    focusedTrips: {
      title: string;
      description: string;
      totalTrips: string;
      activeTrips: string;
      highPriority: string;
      mediumPriority: string;
      lowPriority: string;
      tripDetails: string;
      assignedOfficer: string;
      estimatedArrival: string;
      cargoType: string;
      origin: string;
      trackTrip: string;
      updateStatus: string;
    };
    assignedPorts: {
      title: string;
      description: string;
      totalPorts: string;
      activePorts: string;
      portName: string;
      portCode: string;
      capacity: string;
      currentLoad: string;
      availability: string;
      managePort: string;
      viewSchedule: string;
      portOperations: string;
    };
    configuration: {
      title: string;
      description: string;
      settings: string;
      preferences: string;
      systemSettings: string;
      userPreferences: string;
      notifications: string;
      security: string;
      backup: string;
      maintenance: string;
      updates: string;
      support: string;
      documentation: string;
      about: string;
    };
    suspiciousTrips: {
      title: string;
      description: string;
      alertLevel: string;
      investigate: string;
      riskLevel: string;
      flaggedTrips: string;
      investigationStatus: string;
      assignInvestigator: string;
      reviewEvidence: string;
      generateReport: string;
      escalate: string;
      resolve: string;
      archive: string;
    };
  };

  // Reports Pages Content
  reportsPages: {
    tripPanel: {
      title: string;
      description: string;
      totalTrips: string;
      activeTrips: string;
      completedTrips: string;
      pendingTrips: string;
      tripStatus: string;
      viewTrip: string;
      editTrip: string;
      deleteTrip: string;
    };
    allAlerts: {
      title: string;
      description: string;
      criticalAlerts: string;
      warningAlerts: string;
      infoAlerts: string;
      resolvedAlerts: string;
      alertType: string;
      alertTitle: string;
      alertTime: string;
      resolveAlert: string;
    };
    alertPanel: {
      title: string;
      description: string;
      activeAlerts: string;
      alertHistory: string;
      alertSettings: string;
      escalationRules: string;
      responseTime: string;
      acknowledgeAlert: string;
    };
    employees: {
      title: string;
      description: string;
      totalEmployees: string;
      activeEmployees: string;
      employeeRoles: string;
      assignments: string;
      performance: string;
      addEmployee: string;
      editEmployee: string;
    };
    assignPorts: {
      title: string;
      description: string;
      availablePorts: string;
      assignedPorts: string;
      portCapacity: string;
      assignmentHistory: string;
      assignPort: string;
      unassignPort: string;
    };
    completedTrips: {
      title: string;
      description: string;
      completionRate: string;
      averageDuration: string;
      successfulTrips: string;
      tripAnalytics: string;
      exportData: string;
      viewReport: string;
    };
  };

  // Alerts
  alerts: {
    confirmResolve: string;
    confirmDelete: string;
    confirmAcknowledge: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    navigation: {
      locationMonitor: "Location Monitor",
      focusedTrips: "Focused Trips",
      assignedPorts: "Assigned Ports",
      dashboard: "Dashboard",
      configuration: "Configuration",
      suspiciousTrips: "Suspicious Trips",
      reports: "Reports",
      notifications: "Notifications",
    },
    reports: {
      tripPanel: "Trip Panel",
      allAlerts: "All Alerts",
      alertPanel: "Alert Panel",
      employees: "Employees",
      assignPorts: "Assign Ports",
      focusedTrips: "Focused Trips",
      completedTrips: "Completed Trips",
    },
    header: {
      welcome: "Welcome",
      profile: "My Profile",
      settings: "Settings",
      signOut: "Sign Out",
      notifications: "Notifications",
      viewAllNotifications: "View all notifications",
      language: "Language",
      switchLanguage: "Switch to Arabic",
    },
    breadcrumb: {
      home: "Home",
      locationMonitor: "Location Monitor",
      focusedTrips: "Focused Trips",
      assignedPorts: "Assigned Ports",
      dashboard: "Dashboard",
      configuration: "Configuration",
      suspiciousTrips: "Suspicious Trips",
      notifications: "Notifications",
      reports: "Reports",
    },
    notifications: {
      title: "Notifications",
      unreadCount: "unread notification",
      markAllAsRead: "Mark all as read",
      searchPlaceholder: "Search notifications...",
      filterAll: "All",
      filterUnread: "Unread",
      filterRead: "Read",
      noNotifications: "No notifications found",
      noNotificationsDesc: "Try adjusting your search terms",
      adjustSearch: "Try adjusting your search terms",
      allCaughtUp: "You're all caught up!",
      markAsRead: "Mark as read",
      deleteNotification: "Delete notification",
      priority: {
        high: "High",
        medium: "Medium",
        low: "Low",
      },
      categories: {
        security: "Security",
        system: "System",
        reports: "Reports",
        assignments: "Assignments",
      },
      types: {
        warning: "Warning",
        error: "Error",
        info: "Information",
        success: "Success",
      },
      timeAgo: {
        minutesAgo: "minutes ago",
        hourAgo: "hour ago",
        hoursAgo: "hours ago",
        dayAgo: "day ago",
        daysAgo: "days ago",
      },
    },
    common: {
      search: "Search",
      filter: "Filter",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      close: "Close",
      open: "Open",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Information",
      yes: "Yes",
      no: "No",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      reset: "Reset",
      appName: "Trip Tracker",
      closeSidebar: "Close sidebar",
      share: "Share",
      actionsLabel: "Actions",
      confirmAction: "Are you sure you want to perform this action?",
      location: "Location",
      vehicle: "Vehicle",
      assignedTo: "Assigned To",
      id: "ID",
      responseTime: "Response Time",
      minutes: "min",
      export: {
        defaultFilename: "data_export",
        exportToExcel: "Export to Excel",
        exporting: "Exporting...",
        exportSuccess: "Export completed successfully",
        exportError: "Export failed",
      },
      priority: {
        high: "High",
        medium: "Medium",
        low: "Low",
      },
      status: {
        active: "Active",
        resolved: "Resolved",
        pending: "Pending",
        acknowledged: "Acknowledged",
      },
      actions: {
        resolve: "Resolve",
        acknowledge: "Acknowledge",
        export: "Export",
        refresh: "Refresh",
      },
      table: {
        noDataFound: "No data found",
        showing: "Showing",
        to: "to",
        of: "of",
        results: "results",
        page: "Page",
      },
    },
    footer: {
      poweredBy: "Powered by",
      companyName: "Laplacesoftware",
      allRightsReserved: "All rights reserved © 2025",
    },
    sampleNotifications: {
      suspiciousTrip: {
        title: "New suspicious trip detected",
        message:
          "A suspicious trip has been detected on Route 15 with unusual cargo patterns. Immediate attention required.",
      },
      systemMaintenance: {
        title: "System maintenance scheduled",
        message:
          "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM. Some services may be temporarily unavailable.",
      },
      monthlyReport: {
        title: "Monthly report ready",
        message:
          "Your monthly customs report for November 2024 is now available for download in the reports section.",
      },
      portAssignment: {
        title: "Port assignment updated",
        message:
          "Your port assignments have been updated. Please review the new assignments in your dashboard.",
      },
      securityAlert: {
        title: "Critical alert: Unauthorized access attempt",
        message:
          "Multiple failed login attempts detected from IP 192.168.1.100. Security protocols have been activated.",
      },
    },
    pages: {
      locationMonitor: {
        title: "Location Monitor",
        description:
          "Real-time tracking and monitoring of vessel locations and movements",
        noData: "No location data available",
        loading: "Loading location data...",
        realTimeTracking: "Real-time Tracking",
        vesselCount: "Vessel Count",
        activeVessels: "Active Vessels",
        lastUpdate: "Last Update",
        refreshData: "Refresh Data",
        viewDetails: "View Details",
        coordinates: "Coordinates",
        status: "Status",
        speed: "Speed",
        destination: "Destination",
      },
      dashboard: {
        title: "Dashboard",
        description:
          "Overview of system statistics and key performance indicators",
        welcomeMessage: "Welcome to Trip Tracker Dashboard",
        statistics: "System Statistics",
        overview: "Overview",
        quickActions: "Quick Actions",
        recentActivity: "Recent Activity",
        systemHealth: "System Health",
        totalTrips: "Total Trips",
        completedTrips: "Completed Trips",
        pendingTrips: "Pending Trips",
        alerts: "Alerts",
        performance: "Performance",
        efficiency: "Efficiency",
      },
      focusedTrips: {
        title: "Focused Trips",
        description:
          "Monitor and track high-priority trips requiring special attention",
        totalTrips: "Total Trips",
        activeTrips: "Active Trips",
        highPriority: "High Priority",
        mediumPriority: "Medium Priority",
        lowPriority: "Low Priority",
        tripDetails: "Trip Details",
        assignedOfficer: "Assigned Officer",
        estimatedArrival: "Estimated Arrival",
        cargoType: "Cargo Type",
        origin: "Origin",
        trackTrip: "Track Trip",
        updateStatus: "Update Status",
      },
      assignedPorts: {
        title: "Assigned Ports",
        description: "Manage and monitor ports assigned to your jurisdiction",
        totalPorts: "Total Ports",
        activePorts: "Active Ports",
        portName: "Port Name",
        portCode: "Port Code",
        capacity: "Capacity",
        currentLoad: "Current Load",
        availability: "Availability",
        managePort: "Manage Port",
        viewSchedule: "View Schedule",
        portOperations: "Port Operations",
      },
      configuration: {
        title: "Configuration",
        description: "System settings and configuration management",
        settings: "System Settings",
        preferences: "User Preferences",
        systemSettings: "System Settings",
        userPreferences: "User Preferences",
        notifications: "Notifications",
        security: "Security",
        backup: "Backup",
        maintenance: "Maintenance",
        updates: "Updates",
        support: "Support",
        documentation: "Documentation",
        about: "About",
      },
      suspiciousTrips: {
        title: "Suspicious Trips",
        description: "Monitor and investigate trips flagged as suspicious",
        alertLevel: "Alert Level",
        investigate: "Investigate",
        riskLevel: "Risk Level",
        flaggedTrips: "Flagged Trips",
        investigationStatus: "Investigation Status",
        assignInvestigator: "Assign Investigator",
        reviewEvidence: "Review Evidence",
        generateReport: "Generate Report",
        escalate: "Escalate",
        resolve: "Resolve",
        archive: "Archive",
      },
    },

    // Reports Pages Content
    reportsPages: {
      tripPanel: {
        title: "Trip Panel",
        description: "Comprehensive trip management and monitoring dashboard",
        totalTrips: "Total Trips",
        activeTrips: "Active Trips",
        completedTrips: "Completed Trips",
        pendingTrips: "Pending Trips",
        tripStatus: "Trip Status",
        viewTrip: "View Trip",
        editTrip: "Edit Trip",
        deleteTrip: "Delete Trip",
      },
      allAlerts: {
        title: "All Alerts",
        description: "System-wide alerts and notifications management",
        criticalAlerts: "Critical Alerts",
        warningAlerts: "Warning Alerts",
        infoAlerts: "Info Alerts",
        resolvedAlerts: "Resolved Alerts",
        alertType: "Alert Type",
        alertTitle: "Alert Title",
        alertTime: "Alert Time",
        resolveAlert: "Resolve Alert",
      },
      alertPanel: {
        title: "Alert Panel",
        description: "Advanced alert monitoring and response system",
        activeAlerts: "Active Alerts",
        alertHistory: "Alert History",
        alertSettings: "Alert Settings",
        escalationRules: "Escalation Rules",
        responseTime: "Response Time",
        acknowledgeAlert: "Acknowledge Alert",
      },
      employees: {
        title: "Employees",
        description: "Employee management and assignment system",
        totalEmployees: "Total Employees",
        activeEmployees: "Active Employees",
        employeeRoles: "Employee Roles",
        assignments: "Assignments",
        performance: "Performance",
        addEmployee: "Add Employee",
        editEmployee: "Edit Employee",
      },
      assignPorts: {
        title: "Assign Ports",
        description: "Port assignment and management system",
        availablePorts: "Available Ports",
        assignedPorts: "Assigned Ports",
        portCapacity: "Port Capacity",
        assignmentHistory: "Assignment History",
        assignPort: "Assign Port",
        unassignPort: "Unassign Port",
      },
      completedTrips: {
        title: "Completed Trips",
        description: "Archive and analysis of completed trips",
        completionRate: "Completion Rate",
        averageDuration: "Average Duration",
        successfulTrips: "Successful Trips",
        tripAnalytics: "Trip Analytics",
        exportData: "Export Data",
        viewReport: "View Report",
      },
      focusedTrips: {
        title: "Focused Trips",
        description: "Monitoring and tracking of high-priority trips",
        totalTrips: "Total Trips",
        activeTrips: "Active Trips",
        highPriority: "High Priority",
        mediumPriority: "Medium Priority",
        lowPriority: "Low Priority",
        tripDetails: "Trip Details",
        assignedOfficer: "Assigned Officer",
        estimatedArrival: "Estimated Arrival",
        cargoType: "Cargo Type",
        origin: "Origin",
        trackTrip: "Track Trip",
        updateStatus: "Update Status",
      },
    },

    alerts: {
      confirmResolve: "Are you sure you want to resolve this alert?",
      confirmDelete:
        "Are you sure you want to delete this alert? This action cannot be undone.",
      confirmAcknowledge: "Are you sure you want to acknowledge this alert?",
    },
  },
  ar: {
    navigation: {
      locationMonitor: "مراقب المواقع",
      focusedTrips: "الرحلات المركزة",
      assignedPorts: "الموانئ المخصصة",
      dashboard: "لوحة التحكم",
      configuration: "الإعدادات",
      suspiciousTrips: "الرحلات المشبوهة",
      reports: "التقارير",
      notifications: "الإشعارات",
    },
    reports: {
      tripPanel: "لوحة الرحلات",
      allAlerts: "جميع التنبيهات",
      alertPanel: "لوحة التنبيهات",
      employees: "الموظفون",
      assignPorts: "تخصيص الموانئ",
      focusedTrips: "الرحلات المركزة",
      completedTrips: "الرحلات المكتملة",
    },
    header: {
      welcome: "مرحباً",
      profile: "ملفي الشخصي",
      settings: "الإعدادات",
      signOut: "تسجيل الخروج",
      notifications: "الإشعارات",
      viewAllNotifications: "عرض جميع الإشعارات",
      language: "اللغة",
      switchLanguage: "التبديل إلى الإنجليزية",
    },
    breadcrumb: {
      home: "الرئيسية",
      locationMonitor: "مراقب المواقع",
      focusedTrips: "الرحلات المركزة",
      assignedPorts: "الموانئ المخصصة",
      dashboard: "لوحة التحكم",
      configuration: "الإعدادات",
      suspiciousTrips: "الرحلات المشبوهة",
      notifications: "الإشعارات",
      reports: "التقارير",
    },
    notifications: {
      title: "الإشعارات",
      unreadCount: "إشعار غير مقروء",
      markAllAsRead: "تحديد الكل كمقروء",
      searchPlaceholder: "البحث في الإشعارات...",
      filterAll: "الكل",
      filterUnread: "غير مقروء",
      filterRead: "مقروء",
      noNotifications: "لم يتم العثور على إشعارات",
      noNotificationsDesc: "حاول تعديل مصطلحات البحث",
      adjustSearch: "حاول تعديل مصطلحات البحث",
      allCaughtUp: "أنت محدث بكل شيء!",
      markAsRead: "تحديد كمقروء",
      deleteNotification: "حذف الإشعار",
      priority: {
        high: "عالية",
        medium: "متوسطة",
        low: "منخفضة",
      },
      categories: {
        security: "الأمان",
        system: "النظام",
        reports: "التقارير",
        assignments: "المهام",
      },
      types: {
        warning: "تحذير",
        error: "خطأ",
        info: "معلومات",
        success: "نجح",
      },
      timeAgo: {
        minutesAgo: "دقائق مضت",
        hourAgo: "ساعة مضت",
        hoursAgo: "ساعات مضت",
        dayAgo: "يوم مضى",
        daysAgo: "أيام مضت",
      },
    },
    common: {
      search: "بحث",
      filter: "تصفية",
      save: "حفظ",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      view: "عرض",
      close: "إغلاق",
      open: "فتح",
      loading: "جاري التحميل...",
      error: "خطأ",
      success: "نجح",
      warning: "تحذير",
      info: "معلومات",
      yes: "نعم",
      no: "لا",
      confirm: "تأكيد",
      back: "رجوع",
      next: "التالي",
      previous: "السابق",
      submit: "إرسال",
      reset: "إعادة تعيين",
      appName: "متتبع الرحلات",
      closeSidebar: "إغلاق الشريط الجانبي",
      share: "مشاركة",
      actionsLabel: "الإجراءات",
      confirmAction: "هل أنت متأكد من أنك تريد تنفيذ هذا الإجراء؟",
      location: "الموقع",
      vehicle: "المركبة",
      assignedTo: "مُكلف إلى",
      id: "الرقم",
      responseTime: "وقت الاستجابة",
      minutes: "دقيقة",
      export: {
        defaultFilename: "تصدير_البيانات",
        exportToExcel: "تصدير إلى Excel",
        exporting: "جاري التصدير...",
        exportSuccess: "تم التصدير بنجاح",
        exportError: "فشل في التصدير",
      },
      priority: {
        high: "عالية",
        medium: "متوسطة",
        low: "منخفضة",
      },
      status: {
        active: "نشط",
        resolved: "محلول",
        pending: "معلق",
        acknowledged: "مؤكد",
      },
      actions: {
        resolve: "حل",
        acknowledge: "تأكيد",
        export: "تصدير",
        refresh: "تحديث",
      },
      table: {
        noDataFound: "لم يتم العثور على بيانات",
        showing: "عرض",
        to: "إلى",
        of: "من",
        results: "نتائج",
        page: "صفحة",
      },
    },
    footer: {
      poweredBy: "مدعوم من",
      companyName: "لابلاس سوفتوير",
      allRightsReserved: "كل الحقوق محفوظة © 2025",
    },
    sampleNotifications: {
      suspiciousTrip: {
        title: "تم اكتشاف رحلة مشبوهة جديدة",
        message:
          "تم اكتشاف رحلة مشبوهة على الطريق 15 مع أنماط شحن غير عادية. مطلوب اهتمام فوري.",
      },
      systemMaintenance: {
        title: "صيانة النظام مجدولة",
        message:
          "ستحدث الصيانة المجدولة الليلة من الساعة 2:00 صباحاً إلى 4:00 صباحاً. قد تكون بعض الخدمات غير متاحة مؤقتاً.",
      },
      monthlyReport: {
        title: "التقرير الشهري جاهز",
        message:
          "تقرير الجمارك الشهري لشهر نوفمبر 2024 متاح الآن للتحميل في قسم التقارير.",
      },
      portAssignment: {
        title: "تم تحديث تخصيص الميناء",
        message:
          "تم تحديث تخصيصات الموانئ الخاصة بك. يرجى مراجعة التخصيصات الجديدة في لوحة التحكم.",
      },
      securityAlert: {
        title: "تنبيه حرج: محاولة وصول غير مصرح بها",
        message:
          "تم اكتشاف محاولات تسجيل دخول فاشلة متعددة من IP 192.168.1.100. تم تفعيل بروتوكولات الأمان.",
      },
    },
    pages: {
      locationMonitor: {
        title: "مراقب المواقع",
        description: "تتبع ومراقبة مواقع وحركات السفن في الوقت الفعلي",
        noData: "لا توجد بيانات موقع متاحة",
        loading: "جاري تحميل بيانات الموقع...",
        realTimeTracking: "التتبع في الوقت الفعلي",
        vesselCount: "عدد السفن",
        activeVessels: "السفن النشطة",
        lastUpdate: "آخر تحديث",
        refreshData: "تحديث البيانات",
        viewDetails: "عرض التفاصيل",
        coordinates: "الإحداثيات",
        status: "الحالة",
        speed: "السرعة",
        destination: "الوجهة",
      },
      dashboard: {
        title: "لوحة التحكم",
        description: "نظرة عامة على إحصائيات النظام ومؤشرات الأداء الرئيسية",
        welcomeMessage: "مرحباً بك في لوحة تحكم متتبع الرحلات",
        statistics: "إحصائيات النظام",
        overview: "نظرة عامة",
        quickActions: "إجراءات سريعة",
        recentActivity: "النشاط الأخير",
        systemHealth: "صحة النظام",
        totalTrips: "إجمالي الرحلات",
        completedTrips: "الرحلات المكتملة",
        pendingTrips: "الرحلات المعلقة",
        alerts: "التنبيهات",
        performance: "الأداء",
        efficiency: "الكفاءة",
      },
      focusedTrips: {
        title: "الرحلات المركزة",
        description:
          "مراقبة وتتبع الرحلات عالية الأولوية التي تتطلب اهتماماً خاصاً",
        totalTrips: "إجمالي الرحلات",
        activeTrips: "الرحلات النشطة",
        highPriority: "أولوية عالية",
        mediumPriority: "أولوية متوسطة",
        lowPriority: "أولوية منخفضة",
        tripDetails: "تفاصيل الرحلة",
        assignedOfficer: "الضابط المكلف",
        estimatedArrival: "الوصول المتوقع",
        cargoType: "نوع البضائع",
        origin: "المنشأ",
        trackTrip: "تتبع الرحلة",
        updateStatus: "تحديث الحالة",
      },
      assignedPorts: {
        title: "الموانئ المخصصة",
        description: "إدارة ومراقبة الموانئ المخصصة لاختصاصك",
        totalPorts: "إجمالي الموانئ",
        activePorts: "الموانئ النشطة",
        portName: "اسم الميناء",
        portCode: "رمز الميناء",
        capacity: "السعة",
        currentLoad: "الحمولة الحالية",
        availability: "التوفر",
        managePort: "إدارة الميناء",
        viewSchedule: "عرض الجدول",
        portOperations: "عمليات الميناء",
      },
      configuration: {
        title: "الإعدادات",
        description: "إعدادات النظام وإدارة التكوين",
        settings: "إعدادات النظام",
        preferences: "تفضيلات المستخدم",
        systemSettings: "إعدادات النظام",
        userPreferences: "تفضيلات المستخدم",
        notifications: "الإشعارات",
        security: "الأمان",
        backup: "النسخ الاحتياطي",
        maintenance: "الصيانة",
        updates: "التحديثات",
        support: "الدعم",
        documentation: "التوثيق",
        about: "حول",
      },
      suspiciousTrips: {
        title: "الرحلات المشبوهة",
        description: "مراقبة والتحقيق في الرحلات المصنفة كمشبوهة",
        alertLevel: "مستوى التنبيه",
        investigate: "تحقيق",
        riskLevel: "مستوى المخاطر",
        flaggedTrips: "الرحلات المعلمة",
        investigationStatus: "حالة التحقيق",
        assignInvestigator: "تعيين محقق",
        reviewEvidence: "مراجعة الأدلة",
        generateReport: "إنشاء تقرير",
        escalate: "تصعيد",
        resolve: "حل",
        archive: "أرشفة",
      },
    },

    // Reports Pages Content
    reportsPages: {
      tripPanel: {
        title: "لوحة الرحلات",
        description: "لوحة تحكم شاملة لإدارة ومراقبة الرحلات",
        totalTrips: "إجمالي الرحلات",
        activeTrips: "الرحلات النشطة",
        completedTrips: "الرحلات المكتملة",
        pendingTrips: "الرحلات المعلقة",
        tripStatus: "حالة الرحلة",
        viewTrip: "عرض الرحلة",
        editTrip: "تعديل الرحلة",
        deleteTrip: "حذف الرحلة",
      },
      allAlerts: {
        title: "جميع التنبيهات",
        description: "إدارة التنبيهات والإشعارات على مستوى النظام",
        criticalAlerts: "التنبيهات الحرجة",
        warningAlerts: "تنبيهات التحذير",
        infoAlerts: "التنبيهات الإعلامية",
        resolvedAlerts: "التنبيهات المحلولة",
        alertType: "نوع التنبيه",
        alertTitle: "عنوان التنبيه",
        alertTime: "وقت التنبيه",
        resolveAlert: "حل التنبيه",
      },
      alertPanel: {
        title: "لوحة التنبيهات",
        description: "نظام متقدم لمراقبة التنبيهات والاستجابة",
        activeAlerts: "التنبيهات النشطة",
        alertHistory: "تاريخ التنبيهات",
        alertSettings: "إعدادات التنبيهات",
        escalationRules: "قواعد التصعيد",
        responseTime: "وقت الاستجابة",
        acknowledgeAlert: "إقرار التنبيه",
      },
      employees: {
        title: "الموظفون",
        description: "نظام إدارة الموظفين والتكليفات",
        totalEmployees: "إجمالي الموظفين",
        activeEmployees: "الموظفون النشطون",
        employeeRoles: "أدوار الموظفين",
        assignments: "التكليفات",
        performance: "الأداء",
        addEmployee: "إضافة موظف",
        editEmployee: "تعديل الموظف",
      },
      assignPorts: {
        title: "تخصيص الموانئ",
        description: "نظام تخصيص وإدارة الموانئ",
        availablePorts: "الموانئ المتاحة",
        assignedPorts: "الموانئ المخصصة",
        portCapacity: "سعة الميناء",
        assignmentHistory: "تاريخ التخصيص",
        assignPort: "تخصيص ميناء",
        unassignPort: "إلغاء تخصيص الميناء",
      },
      completedTrips: {
        title: "الرحلات المكتملة",
        description: "أرشيف وتحليل الرحلات المكتملة",
        completionRate: "معدل الإنجاز",
        averageDuration: "متوسط المدة",
        successfulTrips: "الرحلات الناجحة",
        tripAnalytics: "تحليلات الرحلات",
        exportData: "تصدير البيانات",
        viewReport: "عرض التقرير",
      },
      focusedTrips: {
        title: "الرحلات المركزة",
        description: "تتبع وتتبع الرحلات عالية الأولوية التي تتطلب اهتمام خاص",
        totalTrips: "إجمالي الرحلات",
        activeTrips: "الرحلات النشطة",
        highPriority: "أولوية عالية",
        mediumPriority: "أولوية متوسطة",
        lowPriority: "أولوية منخفضة",
        tripDetails: "تفاصيل الرحلة",
        assignedOfficer: "الضابط المكلف",
        estimatedArrival: "الوصول المتوقع",
        cargoType: "نوع البضائع",
        origin: "المنشأ",
        trackTrip: "تتبع الرحلة",
        updateStatus: "تحديث الحالة",
      },
    },

    alerts: {
      confirmResolve: "هل أنت متأكد من أنك تريد حل هذا التنبيه؟",
      confirmDelete:
        "هل أنت متأكد من أنك تريد حذف هذا التنبيه؟ لا يمكن التراجع عن هذا الإجراء.",
      confirmAcknowledge: "هل أنت متأكد من أنك تريد تأكيد هذا التنبيه؟",
    },
  },
};

/**
 * Get translation for a specific key
 */
export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split(".");
  let value: any = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};

/**
 * Get direction for language (RTL for Arabic, LTR for English)
 */
export const getDirection = (language: Language): "rtl" | "ltr" => {
  return language === "ar" ? "rtl" : "ltr";
};

/**
 * Get text alignment for language
 */
export const getTextAlign = (language: Language): "right" | "left" => {
  return language === "ar" ? "right" : "left";
};

/**
 * Get flex direction for language (reverse for Arabic)
 */
export const getFlexDirection = (language: Language): "row" | "row-reverse" => {
  return language === "ar" ? "row-reverse" : "row";
};

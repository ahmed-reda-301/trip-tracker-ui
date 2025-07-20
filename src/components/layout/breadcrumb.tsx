"use client";
// components/Breadcrumb.jsx
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Home,
  ChevronRight,
  ChevronLeft,
  LucideIcon,
  MapPin,
  FileText,
  Route,
  AlertTriangle,
  Users,
  Anchor,
  Database,
  BarChart3,
  Settings,
  Bell,
} from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items = [], onNavigate }) => {
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();
  const [currentItems, setCurrentItems] = useState<BreadcrumbItem[]>([]);
  // Report items mapping
  const reportItems: Record<string, { title: string; icon: LucideIcon }> = {
    "trip-panel": { title: t("reports.tripPanel"), icon: Route },
    "all-alerts": { title: t("reports.allAlerts"), icon: AlertTriangle },
    "alert-panel": { title: t("reports.alertPanel"), icon: AlertTriangle },
    "employees": { title: t("reports.employees"), icon: Users },
    "assign-ports": { title: t("reports.assignPorts"), icon: Anchor },
    "focused-trips": { title: t("reports.focusedTrips"), icon: Route },
    "completed-trips": { title: t("reports.completedTrips"), icon: Database },
  };
  useEffect(() => {
    if (pathname.startsWith("/reports/")) {
      // Extract report key from URL
      const reportKey = pathname.split("/").pop();
      const reportInfo = reportKey ? reportItems[reportKey] : null;

      if (reportInfo) {
        setCurrentItems([
          {
            label: t("breadcrumb.home"),
            href: "/",
            icon: Home,
          },
          {
            label: t("breadcrumb.reports"),
            href: "#",
            icon: FileText,
          },
          {
            label: reportInfo.title,
            icon: reportInfo.icon,
          },
        ]);
      } else {
        setCurrentItems([
          {
            label: t("breadcrumb.home"),
            href: "/",
            icon: Home,
          },
          {
            label: t("breadcrumb.reports"),
            icon: FileText,
          },
        ]);
      }
    } else if (pathname === "/" || pathname === "/location-monitor") {
      setCurrentItems([
        {
          label: t("breadcrumb.home"),
          href: "/",
          icon: Home,
        },
        {
          label: t("breadcrumb.locationMonitor"),
          icon: MapPin,
        },
      ]);
    } else if (pathname === "/focused-trips") {
      setCurrentItems([
        {
          label: t("breadcrumb.home"),
          href: "/",
          icon: Home,
        },
        {
          label: t("breadcrumb.focusedTrips"),
          icon: Route,
        },
      ]);
    } else if (pathname === "/assigned-ports") {
      setCurrentItems([
        {
          label: t("breadcrumb.home"),
          href: "/",
          icon: Home,
        },
        {
          label: t("breadcrumb.assignedPorts"),
          icon: Anchor,
        },
      ]);
    } else if (pathname === "/dashboard") {
      setCurrentItems([
        {
          label: t("breadcrumb.home"),
          href: "/",
          icon: Home,
        },
        {
          label: t("breadcrumb.dashboard"),
          icon: BarChart3,
        },
      ]);
    } else if (pathname === "/configuration") {
      setCurrentItems([
        {
          label: t("breadcrumb.home"),
          href: "/",
          icon: Home,
        },
        {
          label: t("breadcrumb.configuration"),
          icon: Settings,
        },
      ]);
    } else if (pathname === "/suspicious-trips") {
      setCurrentItems([
        {
          label: t("breadcrumb.home"),
          href: "/",
          icon: Home,
        },
        {
          label: t("breadcrumb.suspiciousTrips"),
          icon: AlertTriangle,
        },
      ]);
    } else if (pathname === "/notifications") {
      setCurrentItems([
        {
          label: t("breadcrumb.home"),
          href: "/",
          icon: Home,
        },
        {
          label: t("breadcrumb.notifications"),
          icon: Bell,
        },
      ]);
    } else {
      // Default to Location Monitor
      setCurrentItems([
        {
          label: t("breadcrumb.home"),
          href: "/",
          icon: Home,
        },
        {
          label: t("breadcrumb.locationMonitor"),
          icon: MapPin,
        },
      ]);
    }
  }, [pathname, t]);

  const finalItems = items.length > 0 ? items : currentItems;

  return (
    <div className="bg-gradient-to-r from-[#0895D3] to-[#60B460] text-white px-4 py-1 shadow-sm">
      <div className="flex items-center space-x-2 text-sm">
        {finalItems.map((item, index) => {
          const ItemIcon = item.icon;
          return (
            <React.Fragment key={item.href || item.label}>
              {/* Show icon if available */}
              {ItemIcon && <ItemIcon className="w-4 h-4 mr-1" />}
              {item.href ? (
                <button
                  onClick={() =>
                    onNavigate && item.href && onNavigate(item.href)
                  }
                  className="hover:text-teal-100 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className={`${
                    index === finalItems.length - 1 ? "font-medium" : ""
                  }`}
                >
                  {item.label}
                </span>
              )}
              {index < finalItems.length - 1 &&
                (isRTL ? (
                  <ChevronLeft className="w-4 h-4 opacity-70 mx-2" />
                ) : (
                  <ChevronRight className="w-4 h-4 opacity-70 mx-2" />
                ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;

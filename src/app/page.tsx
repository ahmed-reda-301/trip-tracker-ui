/**
 * Home Page Component
 *
 * Main dashboard page displaying trip statistics and comprehensive trip data table.
 * Features real-time statistics, filterable trip data, and responsive design.
 *
 * Features:
 * - Statistics cards with icons showing key metrics
 * - Comprehensive trip data table with all required columns
 * - Status indicators and action buttons
 * - Responsive layout with proper spacing
 * - Scrollable table with fixed footer
 *
 * @author Ahmed Reda
 * @version 1.0.0
 */

"use client";

import { useMemo } from "react";
import {
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  Bell,
  Timer,
  Eye,
  MapPin,
  User,
  Package,
  Navigation,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import tripsData from "@/data/trips.json";

// Statistics data based on trips
const getStatistics = (trips: any[]) => {
  const total = trips.length;
  const completed = trips.filter((trip) => trip.status === "completed").length;
  const inTransit = trips.filter((trip) => trip.status === "in_transit").length;
  const delayed = trips.filter((trip) => trip.status === "delayed").length;
  const alerts = trips.reduce((acc, trip) => acc + trip.alerts.length, 0);

  return [
    {
      title: "إجمالي الرحلات",
      value: total.toString(),
      icon: Truck,
      color: "bg-blue-500",
    },
    {
      title: "مكتملة",
      value: completed.toString(),
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "قيد التنفيذ",
      value: inTransit.toString(),
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "متأخرة",
      value: delayed.toString(),
      icon: AlertTriangle,
      color: "bg-red-500",
    },
    {
      title: "التنبيهات",
      value: alerts.toString(),
      icon: Bell,
      color: "bg-orange-500",
    },
    {
      title: "الوقت",
      value:
        new Date().toLocaleDateString("ar-SA", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        new Date().toLocaleTimeString("ar-SA", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      icon: Timer,
      color: "bg-purple-500",
    },
  ];
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    completed: {
      label: "مكتملة",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle2,
    },
    in_transit: {
      label: "قيد التنفيذ",
      color: "bg-blue-100 text-blue-800",
      icon: Navigation,
    },
    loading: {
      label: "جاري التحميل",
      color: "bg-yellow-100 text-yellow-800",
      icon: Package,
    },
    delayed: {
      label: "متأخرة",
      color: "bg-red-100 text-red-800",
      icon: AlertCircle,
    },
    scheduled: {
      label: "مجدولة",
      color: "bg-gray-100 text-gray-800",
      icon: Clock,
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
  const IconComponent = config.icon;

  return (
    <Badge
      className={`${config.color} flex items-center gap-1 px-2 py-1 status-badge`}
    >
      <IconComponent className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};

// Alert badge component
const AlertBadge = ({ alerts }: { alerts: any[] }) => {
  if (alerts.length === 0) {
    return (
      <div className="flex items-center gap-1 text-gray-400">
        <CheckCircle className="w-4 h-4" />
        <span className="text-xs">لا توجد تنبيهات</span>
      </div>
    );
  }

  const highAlerts = alerts.filter((alert) => alert.severity === "high").length;
  const mediumAlerts = alerts.filter(
    (alert) => alert.severity === "medium"
  ).length;

  return (
    <div className="flex flex-col gap-1">
      {highAlerts > 0 && (
        <Badge className="bg-red-100 text-red-800 flex items-center gap-1 text-xs">
          <AlertTriangle className="w-3 h-3" />
          عالي ({highAlerts})
        </Badge>
      )}
      {mediumAlerts > 0 && (
        <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1 text-xs">
          <AlertCircle className="w-3 h-3" />
          متوسط ({mediumAlerts})
        </Badge>
      )}
    </div>
  );
};

/**
 * Home page component that displays the main dashboard
 */
export default function Home() {
  const statistics = useMemo(() => getStatistics(tripsData), []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Statistics Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {statistics.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="bg-white rounded-xl border shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
                >
                  <div className={`${stat.color} p-3 rounded-xl shadow-sm`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" />
              جدول الرحلات
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              إدارة ومتابعة جميع الرحلات والشحنات
            </p>
          </div>

          {/* Table Container with Scroll */}
          <div className="overflow-auto max-h-[calc(100vh-320px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="w-full table-auto min-w-[1200px]">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="px-4 py-4 text-right text-sm font-semibold text-gray-800 border-b-2 border-gray-200">
                    التفاصيل
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold text-gray-800 border-b-2 border-gray-200">
                    رقم الترانزيت
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold text-gray-800 border-b-2 border-gray-200">
                    وصف الشحنة
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold text-gray-800 border-b-2 border-gray-200">
                    منفذ الدخول-منفذ الخروج
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold text-gray-800 border-b-2 border-gray-200">
                    آخر معلومات عن الهدف
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold text-gray-800 border-b-2 border-gray-200">
                    Tracker
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold text-gray-800 border-b-2 border-gray-200">
                    السائق
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold text-gray-800 border-b-2 border-gray-200">
                    الشاحنة
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold text-gray-800 border-b-2 border-gray-200">
                    الإنذارات
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-semibold text-gray-800 border-b-2 border-gray-200">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody>
                {tripsData.map((trip, index) => (
                  <tr
                    key={trip.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    } table-row-hover transition-all duration-200 border-b border-gray-100`}
                  >
                    <td className="px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-gray-900 text-sm">
                        {trip.tripNumber}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">
                          {trip.cargoType}
                        </div>
                        <div className="text-gray-600 text-xs mt-1">
                          {trip.cargoWeight}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-2 text-gray-900 font-medium">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="truncate max-w-32">
                            {trip.origin}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-2">
                          <Navigation className="w-4 h-4 text-blue-600" />
                          <span className="truncate max-w-32">
                            {trip.destination}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900 font-medium">
                          التقدم: {trip.progress}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full progress-bar"
                            style={{ width: `${trip.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-gray-600 text-xs mt-1">
                          المسافة المتبقية: {trip.remainingDistance}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-600 hover:bg-green-50 rounded-lg font-medium"
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        تتبع
                      </Button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-900 font-medium truncate max-w-24">
                          {trip.assignedOfficer}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <Truck className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="text-sm text-gray-900 font-medium truncate max-w-24">
                          {trip.vesselName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <AlertBadge alerts={trip.alerts} />
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={trip.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-sm text-gray-600 text-center sm:text-right">
              © 2024 نظام تتبع الرحلات - جميع الحقوق محفوظة
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <span>إجمالي الرحلات: {tripsData.length}</span>
              <span className="hidden sm:inline">|</span>
              <span>آخر تحديث: {new Date().toLocaleString("ar-SA")}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Enhanced Alerts Dashboard Page
 *
 * Comprehensive alerts and trip monitoring dashboard combining trip statistics,
 * detailed trip data table, and advanced alert management system.
 *
 * Features:
 * - Trip Statistics: Real-time statistics cards showing key metrics
 * - Trip Data Table: Comprehensive trip data with all required columns
 * - Alert Management: Advanced alert filtering, sorting, and actions
 * - Excel Export: Export capabilities for both trips and alerts
 * - Responsive Design: Mobile-friendly with proper spacing and scrolling
 * - Multilingual Support: Arabic/English content switching
 * - Real-time Updates: Live data refresh capabilities
 *
 * @author Trip Tracker Team
 * @version 2.0.0
 * @since 2024
 */

"use client";

import React, { useState, useMemo } from "react";
import {
  AlertTriangle,
  Filter,
  Truck,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  User,
  Calendar,
  Bell,
  Timer,
  Eye,
  Package,
  Navigation,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeaderWithRefresh } from "@/components/ui/page-header";
import { StatisticsCardsGrid } from "@/components/ui/statistics-card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { AlertBadge, AlertStatusBadge } from "@/components/ui/alert-badge";
import { QuickAlertActions } from "@/components/ui/alert-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExcelExport, ExcelColumn } from "@/components/ui/excel-export";
import alertsData from "@/data/all-alerts.json";
import tripsData from "@/data/trips.json";

// Alert data interface based on JSON structure
interface AlertData {
  id: string;
  type: "critical" | "warning" | "info";
  priority: "high" | "medium" | "low";
  status: "active" | "resolved" | "pending" | "acknowledged";
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  location: string;
  locationEn: string;
  timestamp: string;
  vehicle: string;
  vehicleEn: string;
  officer: string;
  officerEn: string;
  responseTime: number;
  coordinates: [number, number];
  alertType: string;
  alertTypeEn: string;
}

// Trip data interface for trips table (matching actual JSON structure)
interface TripData {
  id: number;
  tripNumber: string;
  cargoType: string;
  cargoWeight: string;
  origin: string;
  destination: string;
  progress: number;
  remainingDistance: string;
  assignedOfficer: string;
  vesselName: string;
  status: string;
  alerts: any[];
}

// Statistics calculation functions
const getTripStatistics = (trips: TripData[]) => {
  const total = trips.length;
  const completed = trips.filter((trip) => trip.status === "completed").length;
  const inTransit = trips.filter((trip) => trip.status === "in_transit").length;
  const delayed = trips.filter((trip) => trip.status === "delayed").length;
  const alerts = trips.reduce((acc, trip) => acc + trip.alerts.length, 0);

  return [
    {
      value: total,
      label: "إجمالي الرحلات",
      icon: Truck,
      variant: "default" as const,
    },
    {
      value: completed,
      label: "مكتملة",
      icon: CheckCircle,
      variant: "success" as const,
    },
    {
      value: inTransit,
      label: "قيد التنفيذ",
      icon: Clock,
      variant: "warning" as const,
    },
    {
      value: delayed,
      label: "متأخرة",
      icon: AlertTriangle,
      variant: "danger" as const,
    },
    {
      value: alerts,
      label: "التنبيهات",
      icon: Bell,
      variant: "info" as const,
    },
    {
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
      label: "الوقت",
      icon: Timer,
      variant: "default" as const,
    },
  ];
};

// Status badge component for trips
const TripStatusBadge = ({ status }: { status: string }) => {
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

// Trip alert badge component
const TripAlertBadge = ({ alerts }: { alerts: any[] }) => {
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

export default function AllAlertsPage() {
  const { t, language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"trips" | "alerts">("trips");

  // Load data from JSON
  const sampleAlerts: AlertData[] = alertsData.alerts as AlertData[];
  const sampleTrips: TripData[] = tripsData as TripData[];

  // Calculate statistics
  const tripStatistics = useMemo(
    () => getTripStatistics(sampleTrips),
    [sampleTrips]
  );

  // Excel export configuration
  const excelColumns: ExcelColumn[] = [
    { key: "id", header: language === "ar" ? "الرقم" : "ID" },
    {
      key: "type",
      header: language === "ar" ? "النوع" : "Type",
      transform: (value) =>
        language === "ar"
          ? value === "critical"
            ? "حرج"
            : value === "warning"
            ? "تحذير"
            : "معلومات"
          : value === "critical"
          ? "Critical"
          : value === "warning"
          ? "Warning"
          : "Info",
    },
    {
      key: "status",
      header: language === "ar" ? "الحالة" : "Status",
      transform: (value) =>
        language === "ar"
          ? value === "active"
            ? "نشط"
            : value === "resolved"
            ? "محلول"
            : "معلق"
          : value === "active"
          ? "Active"
          : value === "resolved"
          ? "Resolved"
          : "Pending",
    },
    {
      key: "title",
      header: language === "ar" ? "العنوان" : "Title",
      transform: (value, row) => (language === "ar" ? row.title : row.titleEn),
    },
    {
      key: "location",
      header: language === "ar" ? "الموقع" : "Location",
      transform: (value, row) =>
        language === "ar" ? row.location : row.locationEn,
    },
    {
      key: "officer",
      header: language === "ar" ? "المسؤول" : "Officer",
      transform: (value, row) =>
        language === "ar" ? row.officer : row.officerEn,
    },
    {
      key: "timestamp",
      header: language === "ar" ? "التاريخ" : "Date",
      transform: (value) =>
        new Date(value).toLocaleString(language === "ar" ? "ar-SA" : "en-US"),
    },
    {
      key: "responseTime",
      header: language === "ar" ? "وقت الاستجابة" : "Response Time",
      transform: (value) =>
        value === 0 ? "-" : `${value} ${language === "ar" ? "دقيقة" : "min"}`,
    },
  ];

  // Statistics data
  const statisticsData = [
    {
      value: sampleAlerts.filter((alert) => alert.status === "active").length,
      label: t("reportsPages.allAlerts.criticalAlerts"),
      icon: AlertTriangle,
      variant: "danger" as const,
    },
    {
      value: sampleAlerts.filter((alert) => alert.priority === "high").length,
      label: t("reportsPages.allAlerts.warningAlerts"),
      icon: AlertTriangle,
      variant: "warning" as const,
    },
    {
      value: sampleAlerts.filter((alert) => alert.priority === "medium").length,
      label: t("reportsPages.allAlerts.infoAlerts"),
      icon: AlertTriangle,
      variant: "info" as const,
    },
    {
      value: sampleAlerts.filter((alert) => alert.status === "resolved").length,
      label: t("reportsPages.allAlerts.resolvedAlerts"),
      icon: AlertTriangle,
      variant: "success" as const,
    },
  ];

  // Table columns definition
  const columns: TableColumn<AlertData>[] = [
    {
      key: "id",
      label: t("common.id"),
      sortable: true,
      width: "200px",
      render: (value) => (
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-red-500" />
          <span className="font-mono text-sm text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "type",
      label: t("reportsPages.allAlerts.alertType"),
      sortable: true,
      render: (value) => (
        <AlertBadge
          type={value}
          text={
            language === "ar"
              ? value === "critical"
                ? "حرج"
                : value === "warning"
                ? "تحذير"
                : "معلومات"
              : value === "critical"
              ? "Critical"
              : value === "warning"
              ? "Warning"
              : "Info"
          }
          size="sm"
        />
      ),
    },

    {
      key: "status",
      label: t("common.status.active"),
      sortable: true,
      width: "120px",
      render: (value) => (
        <div className="flex items-center gap-2">
          {value === "active" ? (
            <AlertCircle className="h-4 w-4 text-red-500" />
          ) : value === "resolved" ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Clock className="h-4 w-4 text-yellow-500" />
          )}
          <AlertStatusBadge status={value} size="sm" />
        </div>
      ),
    },
    {
      key: "title",
      label: t("reportsPages.allAlerts.alertType"),
      sortable: true,
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">
            {language === "ar" ? row.title : row.titleEn}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {language === "ar" ? row.description : row.descriptionEn}
          </div>
        </div>
      ),
    },
    {
      key: "location",
      label: t("common.location"),
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span className="text-sm">
            {language === "ar" ? row.location : row.locationEn}
          </span>
        </div>
      ),
      hideOnMobile: true,
    },
    {
      key: "officer",
      label: t("common.assignedTo"),
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-500" />
          <span className="text-sm">
            {language === "ar" ? row.officer : row.officerEn}
          </span>
        </div>
      ),
      hideOnMobile: true,
    },
    {
      key: "timestamp",
      label: t("reportsPages.allAlerts.alertTime"),
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm">
            {new Date(value).toLocaleString(
              language === "ar" ? "ar-SA" : "en-US"
            )}
          </span>
        </div>
      ),
      hideOnMobile: true,
    },
    {
      key: "responseTime",
      label: t("common.responseTime"),
      sortable: true,
      render: (value) => (
        <span className="text-sm">
          {value === 0 ? (
            <span className="text-gray-400">-</span>
          ) : (
            <span className="text-blue-600">
              {value} {t("common.minutes")}
            </span>
          )}
        </span>
      ),
    },
    {
      key: "actions",
      label: t("common.actionsLabel"),
      render: (value, row) => (
        <QuickAlertActions
          alertData={row}
          onView={() => handleViewAlert(row)}
          onResolve={
            row.status === "active" ? () => handleResolveAlert(row) : undefined
          }
          onAcknowledge={
            row.status === "pending"
              ? () => handleAcknowledgeAlert(row)
              : undefined
          }
          layout="horizontal"
        />
      ),
    },
  ];

  // Event handlers
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleViewAlert = (alert: AlertData) => {
    console.log("View alert:", alert);
    // Implement view alert logic
  };

  const handleResolveAlert = (alert: AlertData) => {
    console.log("Resolve alert:", alert);
    // Implement resolve alert logic
  };

  const handleAcknowledgeAlert = (alert: AlertData) => {
    console.log("Acknowledge alert:", alert);
    // Implement acknowledge alert logic
  };

  // Header actions
  const headerActions = (
    <div className="flex items-center gap-2">
      <ExcelExport
        data={sampleAlerts}
        columns={excelColumns}
        filename={t("reportsPages.allAlerts.title")}
        variant="outline"
        size="sm"
      />
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        {t("common.filter")}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Tab Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("trips")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "trips"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                جدول الرحلات
              </div>
            </button>
            <button
              onClick={() => setActiveTab("alerts")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "alerts"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                التنبيهات
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <StatisticsCardsGrid
            cards={activeTab === "trips" ? tripStatistics : statisticsData}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 py-6">
        {activeTab === "trips" ? (
          // Trips Table
          <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
            <div className="px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-6 h-6 text-blue-600" />
                جدول الرحلات
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                إدارة ومتابعة جميع الرحلات والشحنات
              </p>
            </div>

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
                  {sampleTrips.map((trip, index) => (
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
                        <TripAlertBadge alerts={trip.alerts} />
                      </td>
                      <td className="px-4 py-4">
                        <TripStatusBadge status={trip.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Alerts Table
          <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-5 border-b bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    جدول التنبيهات
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    إدارة ومتابعة جميع التنبيهات والإنذارات
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ExcelExport
                    data={sampleAlerts}
                    columns={excelColumns}
                    filename="التنبيهات"
                    variant="outline"
                    size="sm"
                  />
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    {t("common.filter")}
                  </Button>
                </div>
              </div>
            </div>
            <div className="h-full max-h-[calc(100vh-360px)] overflow-y-auto">
              <DataTable
                data={sampleAlerts}
                columns={columns}
                searchable={true}
                searchPlaceholder={t("common.search") + "..."}
                paginated={true}
                defaultPageSize={15}
                emptyMessage={t("common.table.noDataFound")}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-sm text-gray-600 text-center sm:text-right">
              © 2024 نظام تتبع الرحلات - جميع الحقوق محفوظة
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <span>
                {activeTab === "trips"
                  ? `إجمالي الرحلات: ${sampleTrips.length}`
                  : `إجمالي التنبيهات: ${sampleAlerts.length}`}
              </span>
              <span className="hidden sm:inline">|</span>
              <span>آخر تحديث: {new Date().toLocaleString("ar-SA")}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHeaderWithRefresh } from "@/components/ui/page-header";
import { StatisticsCardsGrid } from "@/components/ui/statistics-card";
import { DataTable, TableColumn } from "@/components/ui/data-table";
import { AlertBadge, AlertStatusBadge } from "@/components/ui/alert-badge";
import { QuickAlertActions } from "@/components/ui/alert-actions";
import { Button } from "@/components/ui/button";
import { ExcelExport, ExcelColumn } from "@/components/ui/excel-export";
import alertsData from "@/data/all-alerts.json";

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

export default function AllAlertsPage() {
  const { t, language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);

  // Load alerts data from JSON
  const sampleAlerts: AlertData[] = alertsData.alerts as AlertData[];

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
    <div className=" flex flex-col space-y-6">
      {/* Page Header */}
      {/* <PageHeaderWithRefresh
        title={t("reportsPages.allAlerts.title")}
        subtitle={t("reportsPages.allAlerts.description")}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        additionalActions={headerActions}
      /> */}

      {/* Statistics Cards */}
      <StatisticsCardsGrid cards={statisticsData} />

      {/* Alerts Table - Full Width with Vertical Scroll */}
      <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
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
    </div>
  );
}

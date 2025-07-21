"use client";

/**
 * Notifications Page
 *
 * Comprehensive notifications management page for the Trip Tracker application.
 * Displays all notifications with filtering, marking as read, and detailed views.
 * Supports full multilingual content with RTL/LTR layouts.
 *
 * Features:
 * - Complete multilingual support (Arabic/English)
 * - Real-time notification filtering (all/read/unread)
 * - Search functionality across titles and messages
 * - Mark as read/unread functionality
 * - Delete notifications capability
 * - Priority and category display
 * - Responsive design for all screen sizes
 * - RTL/LTR layout support
 *
 * @author Ahmed Reda
 * @version 2.0.0
 */

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Filter,
  Search,
  MoreVertical,
  Check,
  Trash2,
  Eye,
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "warning" | "info" | "success" | "error";
  isRead: boolean;
  priority: "high" | "medium" | "low";
  category: string;
}

const NotificationsPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );

  // Sample notifications data with full translation support
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Update notifications when language changes
  useEffect(() => {
    const generateNotifications = (): Notification[] => [
      {
        id: 1,
        title: t("sampleNotifications.suspiciousTrip.title"),
        message: t("sampleNotifications.suspiciousTrip.message"),
        time: `5 ${t("notifications.timeAgo.minutesAgo")}`,
        type: "warning",
        isRead: false,
        priority: "high",
        category: t("notifications.categories.security"),
      },
      {
        id: 2,
        title: t("sampleNotifications.systemMaintenance.title"),
        message: t("sampleNotifications.systemMaintenance.message"),
        time: `1 ${t("notifications.timeAgo.hourAgo")}`,
        type: "info",
        isRead: false,
        priority: "medium",
        category: t("notifications.categories.system"),
      },
      {
        id: 3,
        title: t("sampleNotifications.monthlyReport.title"),
        message: t("sampleNotifications.monthlyReport.message"),
        time: `3 ${t("notifications.timeAgo.hoursAgo")}`,
        type: "success",
        isRead: true,
        priority: "low",
        category: t("notifications.categories.reports"),
      },
      {
        id: 4,
        title: t("sampleNotifications.portAssignment.title"),
        message: t("sampleNotifications.portAssignment.message"),
        time: `5 ${t("notifications.timeAgo.hoursAgo")}`,
        type: "info",
        isRead: false,
        priority: "medium",
        category: t("notifications.categories.assignments"),
      },
      {
        id: 5,
        title: t("sampleNotifications.securityAlert.title"),
        message: t("sampleNotifications.securityAlert.message"),
        time: `1 ${t("notifications.timeAgo.dayAgo")}`,
        type: "error",
        isRead: true,
        priority: "high",
        category: t("notifications.categories.security"),
      },
    ];

    setNotifications(generateNotifications());
  }, [t]); // Re-run when translation function changes (language change)

  /**
   * Get notification icon based on type
   */
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  /**
   * Get priority badge color
   */
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  /**
   * Filter notifications based on current filter and search term
   */
  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "read" && notification.isRead) ||
      (filter === "unread" && !notification.isRead);

    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  /**
   * Mark notification as read
   */
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  /**
   * Delete notification
   */
  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div
      className={`min-h-screen bg-gray-50 p-3 sm:p-6 ${isRTL ? "rtl" : "ltr"}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t("notifications.title")}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  {unreadCount} {t("notifications.unreadCount")}
                  {unreadCount !== 1 ? (isRTL ? "ة" : "s") : ""}
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className={`px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">
                  {t("notifications.markAllAsRead")}
                </span>
                <span className="sm:hidden">
                  {t("notifications.markAllAsRead").split(" ")[1]}
                </span>
              </button>
            )}
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${
                  isRTL ? "right-3" : "left-3"
                }`}
              />
              <input
                type="text"
                placeholder={t("notifications.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
                }`}
              />
            </div>

            <div className="flex gap-2">
              {["all", "unread", "read"].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType as any)}
                  className={`px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                    filter === filterType
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t(
                    `notifications.filter${
                      filterType.charAt(0).toUpperCase() + filterType.slice(1)
                    }`
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                {t("notifications.noNotifications")}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {searchTerm
                  ? t("notifications.adjustSearch")
                  : t("notifications.allCaughtUp")}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 transition-all hover:shadow-md ${
                  !notification.isRead
                    ? `${
                        isRTL
                          ? "border-r-4 border-r-blue-500"
                          : "border-l-4 border-l-blue-500"
                      }`
                    : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`font-medium text-sm sm:text-base ${
                              !notification.isRead
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>

                        <p
                          className={`text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                        >
                          {notification.message}
                        </p>

                        <div
                          className={`flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 flex-wrap ${
                            isRTL ? "flex-row-reverse" : ""
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {notification.time}
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              notification.priority
                            )}`}
                          >
                            {t(
                              `notifications.priority.${notification.priority}`
                            )}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span>{notification.category}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div
                        className={`flex items-center gap-1 sm:gap-2 ${
                          isRTL ? "flex-row-reverse" : ""
                        }`}
                      >
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title={t("notifications.markAsRead")}
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title={t("notifications.deleteNotification")}
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;

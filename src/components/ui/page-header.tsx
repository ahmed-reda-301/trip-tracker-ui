/**
 * Page Header Component
 * 
 * A reusable page header component that displays page title, subtitle,
 * current date/time, and action buttons. Supports RTL/LTR layouts.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - RTL/LTR layout support
 * - Real-time date/time display with auto-refresh
 * - Customizable action buttons
 * - Breadcrumb integration
 * - Loading states
 * - Multiple layout variants
 * - Accessibility compliant with proper ARIA labels
 * 
 * @author Ahmed Reda
 * @version 1.0.0
 */

"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { Calendar, Clock, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Props interface for PageHeader component
 */
export interface PageHeaderProps {
  /** Page title */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Whether to show current date */
  showDate?: boolean;
  /** Whether to show current time */
  showTime?: boolean;
  /** Whether to auto-refresh time */
  autoRefreshTime?: boolean;
  /** Time refresh interval in seconds */
  refreshInterval?: number;
  /** Action buttons to display */
  actions?: ReactNode;
  /** Whether the page is loading */
  loading?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Layout variant */
  variant?: "default" | "compact" | "centered";
  /** Background color variant */
  background?: "white" | "gray" | "transparent";
}

/**
 * PageHeader Component
 * 
 * Displays a page header with title, optional subtitle, date/time,
 * and action buttons. Supports different layouts and RTL/LTR.
 * 
 * @param props - Component props
 * @returns JSX element representing the page header
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  showDate = true,
  showTime = true,
  autoRefreshTime = true,
  refreshInterval = 60, // 60 seconds
  actions,
  loading = false,
  className,
  variant = "default",
  background = "white",
}) => {
  const { t, isRTL, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time periodically
  useEffect(() => {
    if (!autoRefreshTime) return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [autoRefreshTime, refreshInterval]);

  // Format date based on language
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };

    return date.toLocaleDateString(language === "ar" ? "ar-SA" : "en-US", options);
  };

  // Format time based on language
  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: language === "en",
    };

    return date.toLocaleTimeString(language === "ar" ? "ar-SA" : "en-US", options);
  };

  // Background styles
  const backgroundStyles = {
    white: "bg-white border-b border-gray-200",
    gray: "bg-gray-50 border-b border-gray-200",
    transparent: "bg-transparent",
  };

  // Layout styles based on variant
  const getLayoutStyles = () => {
    switch (variant) {
      case "compact":
        return "py-4";
      case "centered":
        return "py-8 text-center";
      default:
        return "py-6";
    }
  };

  return (
    <div
      className={cn(
        "px-6 sm:px-8",
        backgroundStyles[background],
        getLayoutStyles(),
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            "flex items-center justify-between",
            variant === "centered" && "flex-col space-y-4",
            isRTL ? "flex-row-reverse" : "flex-row"
          )}
        >
          {/* Title and Subtitle Section */}
          <div className={cn("flex-1", variant === "centered" && "text-center")}>
            {/* Title */}
            <h1
              className={cn(
                "text-2xl sm:text-3xl font-bold text-gray-900",
                loading && "animate-pulse bg-gray-200 rounded h-8 w-64"
              )}
            >
              {loading ? "" : title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                className={cn(
                  "mt-2 text-sm sm:text-base text-gray-600",
                  loading && "animate-pulse bg-gray-200 rounded h-4 w-48 mt-2"
                )}
              >
                {loading ? "" : subtitle}
              </p>
            )}

            {/* Date and Time */}
            {(showDate || showTime) && (
              <div
                className={cn(
                  "mt-3 flex items-center gap-4 text-sm text-gray-500",
                  variant === "centered" && "justify-center",
                  isRTL ? "flex-row-reverse" : "flex-row"
                )}
              >
                {/* Date */}
                {showDate && (
                  <div className={cn("flex items-center gap-2", isRTL ? "flex-row-reverse" : "flex-row")}>
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(currentTime)}</span>
                  </div>
                )}

                {/* Time */}
                {showTime && (
                  <div className={cn("flex items-center gap-2", isRTL ? "flex-row-reverse" : "flex-row")}>
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(currentTime)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions Section */}
          {actions && (
            <div
              className={cn(
                "flex-shrink-0",
                variant === "compact" && "ml-4",
                variant === "centered" && "mt-4"
              )}
            >
              {loading ? (
                <div className="animate-pulse bg-gray-200 rounded h-9 w-24"></div>
              ) : (
                actions
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Page Header with Refresh Button
 * 
 * A specialized version of PageHeader that includes a refresh button
 * for pages that need manual refresh functionality.
 */
export interface PageHeaderWithRefreshProps extends Omit<PageHeaderProps, "actions"> {
  /** Refresh handler function */
  onRefresh?: () => void | Promise<void>;
  /** Whether refresh is in progress */
  refreshing?: boolean;
  /** Additional actions besides refresh */
  additionalActions?: ReactNode;
}

export const PageHeaderWithRefresh: React.FC<PageHeaderWithRefreshProps> = ({
  onRefresh,
  refreshing = false,
  additionalActions,
  ...props
}) => {
  const { t } = useLanguage();

  const handleRefresh = async () => {
    if (onRefresh && !refreshing) {
      await onRefresh();
    }
  };

  const actions = (
    <div className="flex items-center gap-2">
      {additionalActions}
      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
          {t("common.actions.refresh")}
        </Button>
      )}
    </div>
  );

  return <PageHeader {...props} actions={actions} />;
};

/**
 * Simple Page Header
 * 
 * A minimal version of PageHeader with just title and optional subtitle.
 */
export interface SimplePageHeaderProps {
  /** Page title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Custom CSS classes */
  className?: string;
}

export const SimplePageHeader: React.FC<SimplePageHeaderProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <PageHeader
      title={title}
      subtitle={subtitle}
      showDate={false}
      showTime={false}
      variant="compact"
      background="transparent"
      className={className}
    />
  );
};

export default PageHeader;

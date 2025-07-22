/**
 * Alert Badge Component
 *
 * A reusable badge component for displaying alert status, priority levels,
 * and other categorical information with appropriate colors and icons.
 *
 * Features:
 * - Multiple predefined alert types (critical, warning, info, success, resolved)
 * - Custom color variants
 * - Icon support with automatic sizing
 * - RTL/LTR layout support
 * - Accessibility compliant with proper ARIA labels
 * - Hover effects and smooth transitions
 * - Size variants (sm, md, lg)
 *
 * @author Ahmed Reda
 * @version 1.0.0
 */

"use client";

import React from "react";
import {
  LucideIcon,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

/**
 * Alert type definitions with predefined styles and icons
 */
export type AlertType =
  | "critical"
  | "warning"
  | "info"
  | "success"
  | "resolved"
  | "pending";

/**
 * Badge size variants
 */
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Props interface for AlertBadge component
 */
export interface AlertBadgeProps {
  /** The type of alert (determines color and icon) */
  type?: AlertType;
  /** Custom text to display in the badge */
  text: string;
  /** Custom icon (overrides default type icon) */
  icon?: LucideIcon;
  /** Size variant */
  size?: BadgeSize;
  /** Custom CSS classes */
  className?: string;
  /** Whether to show the icon */
  showIcon?: boolean;
  /** Custom color variant (overrides type colors) */
  variant?: "default" | "outline" | "solid";
  /** Click handler */
  onClick?: () => void;
  /** Whether the badge is clickable */
  clickable?: boolean;
}

/**
 * Predefined alert type configurations
 */
const alertTypeConfig: Record<
  AlertType,
  { icon: LucideIcon; colors: Record<string, string> }
> = {
  critical: {
    icon: AlertTriangle,
    colors: {
      solid: "bg-red-500 text-white border-red-500",
      outline: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
      default: "bg-red-100 text-red-800 border-red-200",
    },
  },
  warning: {
    icon: AlertCircle,
    colors: {
      solid: "bg-yellow-500 text-white border-yellow-500",
      outline:
        "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
      default: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
  },
  info: {
    icon: Info,
    colors: {
      solid: "bg-blue-500 text-white border-blue-500",
      outline: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
      default: "bg-blue-100 text-blue-800 border-blue-200",
    },
  },
  success: {
    icon: CheckCircle,
    colors: {
      solid: "bg-green-500 text-white border-green-500",
      outline: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
      default: "bg-green-100 text-green-800 border-green-200",
    },
  },
  resolved: {
    icon: CheckCircle,
    colors: {
      solid: "bg-gray-500 text-white border-gray-500",
      outline: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
      default: "bg-gray-100 text-gray-800 border-gray-200",
    },
  },
  pending: {
    icon: Clock,
    colors: {
      solid: "bg-orange-500 text-white border-orange-500",
      outline:
        "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
      default: "bg-orange-100 text-orange-800 border-orange-200",
    },
  },
};

/**
 * Size configurations
 */
const sizeConfig: Record<
  BadgeSize,
  { padding: string; text: string; icon: string }
> = {
  sm: {
    padding: "px-2 py-1",
    text: "text-xs",
    icon: "w-3 h-3",
  },
  md: {
    padding: "px-3 py-1.5",
    text: "text-sm",
    icon: "w-4 h-4",
  },
  lg: {
    padding: "px-4 py-2",
    text: "text-base",
    icon: "w-5 h-5",
  },
};

/**
 * AlertBadge Component
 *
 * Displays alert status or categorical information in a badge format
 * with appropriate colors, icons, and styling based on the alert type.
 *
 * @param props - Component props
 * @returns JSX element representing the alert badge
 */
export const AlertBadge: React.FC<AlertBadgeProps> = ({
  type = "info",
  text,
  icon: CustomIcon,
  size = "md",
  className,
  showIcon = true,
  variant = "default",
  onClick,
  clickable = false,
}) => {
  const { isRTL } = useLanguage();

  const config = alertTypeConfig[type];
  const sizeStyles = sizeConfig[size];
  const Icon = CustomIcon || config.icon;
  const colorStyles = config.colors[variant];

  return (
    <span
      className={cn(
        // Base styles
        "inline-flex items-center font-medium rounded-full border transition-all duration-200",
        // Size styles
        sizeStyles.padding,
        sizeStyles.text,
        // Color styles
        colorStyles,
        // Clickable styles
        clickable && "cursor-pointer hover:shadow-sm",
        // RTL support
        isRTL ? "flex-row-reverse" : "flex-row",
        // Custom classes
        className
      )}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {/* Icon */}
      {showIcon && Icon && (
        <Icon className={cn(sizeStyles.icon, isRTL ? "ml-1.5" : "mr-1.5")} />
      )}

      {/* Text */}
      <span>{text}</span>
    </span>
  );
};

/**
 * Alert Priority Badge Component
 *
 * A specialized badge component for displaying alert priority levels
 * with predefined styling and icons.
 */
export interface AlertPriorityBadgeProps {
  /** Priority level */
  priority: "high" | "medium" | "low";
  /** Custom CSS classes */
  className?: string;
  /** Size variant */
  size?: BadgeSize;
  /** Whether to show the icon */
  showIcon?: boolean;
}

export const AlertPriorityBadge: React.FC<AlertPriorityBadgeProps> = ({
  priority,
  className,
  size = "md",
  showIcon = true,
}) => {
  const { t } = useLanguage();

  const priorityConfig = {
    high: { type: "critical" as AlertType, text: t("common.priority.high") },
    medium: { type: "warning" as AlertType, text: t("common.priority.medium") },
    low: { type: "info" as AlertType, text: t("common.priority.low") },
  };

  const config = priorityConfig[priority];

  return (
    <AlertBadge
      type={config.type}
      text={config.text}
      size={size}
      showIcon={showIcon}
      className={className}
    />
  );
};

/**
 * Alert Status Badge Component
 *
 * A specialized badge component for displaying alert status
 * with predefined styling and appropriate colors.
 */
export interface AlertStatusBadgeProps {
  /** Alert status */
  status: "active" | "resolved" | "pending" | "acknowledged";
  /** Custom CSS classes */
  className?: string;
  /** Size variant */
  size?: BadgeSize;
  /** Whether to show the icon */
  showIcon?: boolean;
}

export const AlertStatusBadge: React.FC<AlertStatusBadgeProps> = ({
  status,
  className,
  size = "md",
  showIcon = true,
}) => {
  const { t } = useLanguage();

  const statusConfig = {
    active: { type: "critical" as AlertType, text: t("common.status.active") },
    resolved: {
      type: "resolved" as AlertType,
      text: t("common.status.resolved"),
    },
    pending: { type: "pending" as AlertType, text: t("common.status.pending") },
    acknowledged: {
      type: "info" as AlertType,
      text: t("common.status.acknowledged"),
    },
  };

  const config = statusConfig[status];

  // Fallback if status is not found
  if (!config) {
    return (
      <AlertBadge
        type="info"
        text={status}
        size={size}
        showIcon={showIcon}
        className={className}
      />
    );
  }

  return (
    <AlertBadge
      type={config.type}
      text={config.text}
      size={size}
      showIcon={showIcon}
      className={className}
    />
  );
};

export default AlertBadge;

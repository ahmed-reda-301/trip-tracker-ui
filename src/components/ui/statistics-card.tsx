/**
 * Statistics Card Component
 * 
 * A reusable card component for displaying statistical information with icons,
 * values, and labels. Supports RTL/LTR layouts and multiple color variants.
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - RTL/LTR layout support
 * - Multiple color variants (default, success, warning, danger, info)
 * - Icon support with proper sizing
 * - Hover effects and smooth transitions
 * - Accessibility compliant with proper ARIA labels
 * 
 * @author Ahmed Reda
 * @version 1.0.0
 */

"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

/**
 * Props interface for StatisticsCard component
 */
export interface StatisticsCardProps {
  /** The main value to display (number or string) */
  value: string | number;
  /** The label/title for the statistic */
  label: string;
  /** Optional icon to display */
  icon?: LucideIcon;
  /** Color variant for the card */
  variant?: "default" | "success" | "warning" | "danger" | "info";
  /** Optional subtitle or description */
  subtitle?: string;
  /** Custom CSS classes */
  className?: string;
  /** Click handler for the card */
  onClick?: () => void;
  /** Whether the card is clickable */
  clickable?: boolean;
}

/**
 * Variant styles mapping for different card types
 */
const variantStyles = {
  default: {
    card: "bg-white border-gray-200 hover:border-gray-300",
    icon: "bg-blue-100 text-blue-600",
    value: "text-gray-900",
    label: "text-gray-600",
  },
  success: {
    card: "bg-white border-green-200 hover:border-green-300",
    icon: "bg-green-100 text-green-600",
    value: "text-gray-900",
    label: "text-gray-600",
  },
  warning: {
    card: "bg-white border-yellow-200 hover:border-yellow-300",
    icon: "bg-yellow-100 text-yellow-600",
    value: "text-gray-900",
    label: "text-gray-600",
  },
  danger: {
    card: "bg-white border-red-200 hover:border-red-300",
    icon: "bg-red-100 text-red-600",
    value: "text-gray-900",
    label: "text-gray-600",
  },
  info: {
    card: "bg-white border-blue-200 hover:border-blue-300",
    icon: "bg-blue-100 text-blue-600",
    value: "text-gray-900",
    label: "text-gray-600",
  },
};

/**
 * StatisticsCard Component
 * 
 * Displays statistical information in a card format with optional icon,
 * value, label, and subtitle. Supports different color variants and
 * RTL/LTR layouts.
 * 
 * @param props - Component props
 * @returns JSX element representing the statistics card
 */
export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  value,
  label,
  icon: Icon,
  variant = "default",
  subtitle,
  className,
  onClick,
  clickable = false,
}) => {
  const { isRTL } = useLanguage();
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        // Base styles
        "border rounded-lg p-6 transition-all duration-200 shadow-sm",
        // Variant styles
        styles.card,
        // Clickable styles
        clickable && "cursor-pointer hover:shadow-md",
        // RTL support
        isRTL ? "text-right" : "text-left",
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
      <div className={cn("flex items-center", isRTL ? "flex-row-reverse" : "flex-row")}>
        {/* Icon */}
        {Icon && (
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-lg",
              styles.icon,
              isRTL ? "ml-4" : "mr-4"
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {/* Value */}
          <div className={cn("text-2xl font-bold", styles.value)}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>

          {/* Label */}
          <div className={cn("text-sm font-medium", styles.label)}>
            {label}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div className="text-xs text-gray-500 mt-1">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Statistics Cards Grid Component
 * 
 * A container component for displaying multiple statistics cards in a grid layout.
 * Automatically handles responsive breakpoints and RTL/LTR layouts.
 * 
 * @param props - Component props
 * @returns JSX element representing the statistics cards grid
 */
export interface StatisticsCardsGridProps {
  /** Array of statistics card data */
  cards: StatisticsCardProps[];
  /** Custom CSS classes */
  className?: string;
  /** Number of columns for different screen sizes */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export const StatisticsCardsGrid: React.FC<StatisticsCardsGridProps> = ({
  cards,
  className,
  columns = { sm: 1, md: 2, lg: 4, xl: 4 },
}) => {
  const gridCols = {
    [`grid-cols-${columns.sm || 1}`]: true,
    [`md:grid-cols-${columns.md || 2}`]: true,
    [`lg:grid-cols-${columns.lg || 4}`]: true,
    [`xl:grid-cols-${columns.xl || 4}`]: true,
  };

  return (
    <div
      className={cn(
        "grid gap-6",
        // Responsive grid columns
        "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4",
        className
      )}
    >
      {cards.map((card, index) => (
        <StatisticsCard key={index} {...card} />
      ))}
    </div>
  );
};

export default StatisticsCard;

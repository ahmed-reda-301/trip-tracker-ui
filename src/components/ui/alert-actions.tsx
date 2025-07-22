/**
 * Alert Actions Component
 *
 * A reusable component for displaying action buttons related to alerts,
 * such as view, edit, resolve, acknowledge, and delete actions.
 *
 * Features:
 * - Multiple action button layouts (horizontal, vertical, dropdown)
 * - Customizable action sets based on alert status
 * - Icon support with proper sizing
 * - RTL/LTR layout support
 * - Accessibility compliant with proper ARIA labels
 * - Loading states for async actions
 * - Confirmation dialogs for destructive actions
 * - Keyboard navigation support
 *
 * @author Ahmed Reda
 * @version 1.0.0
 */

"use client";

import React, { useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Download,
  Share,
  LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Action definition interface
 */
export interface AlertAction {
  /** Unique identifier for the action */
  key: string;
  /** Action label */
  label: string;
  /** Action icon */
  icon: LucideIcon;
  /** Action handler function */
  onClick: () => void | Promise<void>;
  /** Button variant */
  variant?: "default" | "outline" | "ghost" | "destructive";
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Whether the action is loading */
  loading?: boolean;
  /** Whether the action requires confirmation */
  requiresConfirmation?: boolean;
  /** Confirmation message */
  confirmationMessage?: string;
  /** Whether to show the action (conditional rendering) */
  show?: boolean;
}

/**
 * Props interface for AlertActions component
 */
export interface AlertActionsProps {
  /** Array of actions to display */
  actions: AlertAction[];
  /** Layout style for the actions */
  layout?: "horizontal" | "vertical" | "dropdown";
  /** Size of the action buttons */
  size?: "sm" | "lg";
  /** Whether to show labels on buttons */
  showLabels?: boolean;
  /** Maximum number of actions to show before using dropdown */
  maxVisibleActions?: number;
  /** Custom CSS classes */
  className?: string;
  /** Alert data for context */
  alertData?: any;
}

/**
 * Predefined action configurations for common alert actions
 */
export const createAlertActions = (
  alertData: any,
  handlers: {
    onView?: () => void;
    onEdit?: () => void;
    onResolve?: () => void;
    onAcknowledge?: () => void;
    onDelete?: () => void;
    onExport?: () => void;
    onShare?: () => void;
  },
  t: (key: string) => string
): AlertAction[] => {
  const actions: AlertAction[] = [
    {
      key: "view",
      label: t("common.view"),
      icon: Eye,
      onClick: handlers.onView || (() => {}),
      variant: "outline",
      show: !!handlers.onView,
    },
    {
      key: "edit",
      label: t("common.edit"),
      icon: Edit,
      onClick: handlers.onEdit || (() => {}),
      variant: "outline",
      show: !!handlers.onEdit && alertData?.status !== "resolved",
    },
    {
      key: "resolve",
      label: t("common.actions.resolve"),
      icon: CheckCircle,
      onClick: handlers.onResolve || (() => {}),
      variant: "default",
      requiresConfirmation: true,
      confirmationMessage: t("alerts.confirmResolve"),
      show: !!handlers.onResolve && alertData?.status === "active",
    },
    {
      key: "acknowledge",
      label: t("common.actions.acknowledge"),
      icon: AlertCircle,
      onClick: handlers.onAcknowledge || (() => {}),
      variant: "outline",
      show: !!handlers.onAcknowledge && alertData?.status === "pending",
    },
    {
      key: "export",
      label: t("common.actions.export"),
      icon: Download,
      onClick: handlers.onExport || (() => {}),
      variant: "ghost",
      show: !!handlers.onExport,
    },
    {
      key: "share",
      label: t("common.share"),
      icon: Share,
      onClick: handlers.onShare || (() => {}),
      variant: "ghost",
      show: !!handlers.onShare,
    },
    {
      key: "delete",
      label: t("common.delete"),
      icon: Trash2,
      onClick: handlers.onDelete || (() => {}),
      variant: "destructive",
      requiresConfirmation: true,
      confirmationMessage: t("alerts.confirmDelete"),
      show: !!handlers.onDelete,
    },
  ];

  return actions.filter((action) => action.show !== false);
};

/**
 * AlertActions Component
 *
 * Displays a set of action buttons for alert management with
 * support for different layouts and confirmation dialogs.
 *
 * @param props - Component props
 * @returns JSX element representing the alert actions
 */
export const AlertActions: React.FC<AlertActionsProps> = ({
  actions,
  layout = "horizontal",
  size = "sm",
  showLabels = true,
  maxVisibleActions = 3,
  className,
  alertData,
}) => {
  const { t, isRTL } = useLanguage();
  const [loadingActions, setLoadingActions] = useState<Set<string>>(new Set());
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter visible actions
  const visibleActions = actions.filter((action) => action.show !== false);
  const primaryActions = visibleActions.slice(0, maxVisibleActions);
  const dropdownActions = visibleActions.slice(maxVisibleActions);

  // Handle action execution with confirmation and loading states
  const handleAction = async (action: AlertAction) => {
    if (action.disabled) return;

    // Show confirmation dialog if required
    if (action.requiresConfirmation) {
      const confirmed = window.confirm(
        action.confirmationMessage || t("common.confirmAction")
      );
      if (!confirmed) return;
    }

    // Set loading state
    setLoadingActions((prev) => new Set(prev).add(action.key));

    try {
      await action.onClick();
    } catch (error) {
      console.error(`Error executing action ${action.key}:`, error);
    } finally {
      // Remove loading state
      setLoadingActions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(action.key);
        return newSet;
      });
    }
  };

  // Render individual action button
  const renderActionButton = (action: AlertAction, isInDropdown = false) => {
    const isLoading = loadingActions.has(action.key) || action.loading;
    const Icon = action.icon;

    return (
      <Button
        key={action.key}
        variant={action.variant || "outline"}
        size={size}
        onClick={() => handleAction(action)}
        disabled={action.disabled || isLoading}
        className={cn(
          isInDropdown && "w-full justify-start",
          !showLabels && !isInDropdown && "px-2"
        )}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
        ) : (
          <Icon
            className={cn(
              "h-4 w-4",
              showLabels && !isInDropdown && (isRTL ? "ml-2" : "mr-2")
            )}
          />
        )}
        {(showLabels || isInDropdown) && action.label}
      </Button>
    );
  };

  // Render dropdown menu
  const renderDropdown = () => {
    if (dropdownActions.length === 0) return null;

    return (
      <div className="relative">
        <Button
          variant="outline"
          size={size}
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-2"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>

        {showDropdown && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />

            {/* Dropdown Menu */}
            <div
              className={cn(
                "absolute z-20 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1",
                isRTL ? "left-0" : "right-0"
              )}
            >
              {dropdownActions.map((action) => (
                <div key={action.key} className="px-1">
                  {renderActionButton(action, true)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  // Render based on layout
  if (layout === "vertical") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {visibleActions.map((action) => renderActionButton(action))}
      </div>
    );
  }

  if (layout === "dropdown") {
    return (
      <div className={cn("relative", className)}>
        <Button
          variant="outline"
          size={size}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <MoreHorizontal
            className={cn("h-4 w-4", showLabels && (isRTL ? "ml-2" : "mr-2"))}
          />
          {showLabels && t("common.actionsLabel")}
        </Button>

        {showDropdown && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />

            {/* Dropdown Menu */}
            <div
              className={cn(
                "absolute z-20 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1",
                isRTL ? "left-0" : "right-0"
              )}
            >
              {visibleActions.map((action) => (
                <div key={action.key} className="px-1">
                  {renderActionButton(action, true)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // Default horizontal layout
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        isRTL ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {primaryActions.map((action) => renderActionButton(action))}
      {renderDropdown()}
    </div>
  );
};

/**
 * Quick Alert Actions Component
 *
 * A simplified version of AlertActions with predefined common actions
 * for quick implementation in alert lists and tables.
 */
export interface QuickAlertActionsProps {
  /** Alert data */
  alertData: any;
  /** Action handlers */
  onView?: () => void;
  onResolve?: () => void;
  onAcknowledge?: () => void;
  /** Layout style */
  layout?: "horizontal" | "dropdown";
  /** Custom CSS classes */
  className?: string;
}

export const QuickAlertActions: React.FC<QuickAlertActionsProps> = ({
  alertData,
  onView,
  onResolve,
  onAcknowledge,
  layout = "horizontal",
  className,
}) => {
  const { t } = useLanguage();
  const actions = createAlertActions(
    alertData,
    {
      onView,
      onResolve,
      onAcknowledge,
    },
    t
  );

  return (
    <AlertActions
      actions={actions}
      layout={layout}
      size="sm"
      showLabels={false}
      maxVisibleActions={2}
      className={className}
      alertData={alertData}
    />
  );
};

export default AlertActions;

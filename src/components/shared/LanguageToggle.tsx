"use client";

/**
 * Language Toggle Component
 * 
 * Shared component for language switching functionality.
 * Used in both header (desktop) and sidebar (mobile) layouts.
 * 
 * @author Trip Tracker Team
 * @version 1.0.0
 */

import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageToggleProps {
  /** Additional CSS classes */
  className?: string;
  /** Button variant style */
  variant?: "header" | "sidebar";
  /** Callback when language changes */
  onLanguageChange?: (lang: string) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = "",
  variant = "header",
  onLanguageChange,
}) => {
  const { language, setLanguage, t, isRTL } = useLanguage();

  /**
   * Toggle language between English and Arabic
   */
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    onLanguageChange?.(newLanguage === "en" ? "EN" : "AR");
  };

  // Base styles for different variants
  const baseStyles = {
    header: `flex items-center space-x-2 hover:bg-slate-700 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
      isRTL ? "flex-row-reverse space-x-reverse" : ""
    }`,
    sidebar: `flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all ${
      isRTL ? "flex-row-reverse" : ""
    }`,
  };

  return (
    <button
      className={`${baseStyles[variant]} ${className}`}
      onClick={toggleLanguage}
      title={t("header.switchLanguage")}
      aria-label={t("header.switchLanguage")}
    >
      <Globe className="w-4 h-4 text-gray-600" />
      <span className={`font-medium text-sm ${variant === "header" ? "text-white" : "text-gray-700"}`}>
        {language === "en" ? "ع" : "🇺🇸 EN"}
      </span>
    </button>
  );
};

export default LanguageToggle;

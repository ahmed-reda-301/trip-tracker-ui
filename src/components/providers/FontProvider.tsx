/**
 * FontProvider Component
 * 
 * Provides dynamic font switching based on the current language.
 * Uses Cairo font for Arabic content and Roboto for English content.
 * 
 * @author Ahmed Reda
 * @version 1.0.0
 */

"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FontProviderProps {
  /** Child components to be wrapped with font styling */
  children: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * FontProvider component that applies appropriate font based on current language
 * 
 * @param props - The component props
 * @returns JSX element with appropriate font styling
 */
const FontProvider: React.FC<FontProviderProps> = ({ 
  children, 
  className = "" 
}) => {
  const { language } = useLanguage();
  
  // Determine font class based on current language
  const fontClass = language === "ar" ? "font-cairo" : "font-roboto";
  
  return (
    <div className={`${fontClass} ${className}`}>
      {children}
    </div>
  );
};

export default FontProvider;

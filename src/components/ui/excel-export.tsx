/**
 * Excel Export Component
 * 
 * A reusable component for exporting table data to Excel files.
 * Supports custom column mapping, data transformation, and Arabic/English content.
 * 
 * Features:
 * - Export any data array to Excel format
 * - Custom column headers and data mapping
 * - RTL/LTR support for Arabic and English
 * - Automatic file naming with timestamps
 * - Loading states and error handling
 * - Customizable styling and button variants
 * 
 * @author Ahmed Reda
 * @version 1.0.0
 */

"use client";

import React, { useState } from "react";
import { Download, FileSpreadsheet, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Column mapping interface for Excel export
 */
export interface ExcelColumn {
  /** Data key to extract from each row */
  key: string;
  /** Column header in Excel file */
  header: string;
  /** Optional data transformer function */
  transform?: (value: any, row: any) => string | number;
  /** Column width in Excel (optional) */
  width?: number;
}

/**
 * Props interface for ExcelExport component
 */
export interface ExcelExportProps {
  /** Data array to export */
  data: any[];
  /** Column mapping configuration */
  columns: ExcelColumn[];
  /** Base filename (without extension) */
  filename?: string;
  /** Sheet name in Excel file */
  sheetName?: string;
  /** Button text override */
  buttonText?: string;
  /** Button variant */
  variant?: "default" | "outline" | "ghost" | "secondary";
  /** Button size */
  size?: "sm" | "lg";
  /** Custom CSS classes */
  className?: string;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Success callback */
  onExportSuccess?: (filename: string) => void;
  /** Error callback */
  onExportError?: (error: Error) => void;
}

/**
 * Utility function to convert data to CSV format
 */
const convertToCSV = (data: any[], columns: ExcelColumn[]): string => {
  // Create headers
  const headers = columns.map(col => col.header);
  const csvHeaders = headers.join(',');

  // Create rows
  const csvRows = data.map(row => {
    return columns.map(col => {
      let value = row[col.key];
      
      // Apply transformation if provided
      if (col.transform) {
        value = col.transform(value, row);
      }

      // Handle different data types
      if (value === null || value === undefined) {
        return '';
      }

      // Convert to string and escape commas/quotes
      const stringValue = String(value);
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    }).join(',');
  });

  return [csvHeaders, ...csvRows].join('\n');
};

/**
 * Utility function to download CSV as Excel file
 */
const downloadCSVAsExcel = (csvContent: string, filename: string): void => {
  // Add BOM for proper UTF-8 encoding (especially for Arabic text)
  const BOM = '\uFEFF';
  const csvWithBOM = BOM + csvContent;
  
  // Create blob with proper MIME type for Excel
  const blob = new Blob([csvWithBOM], { 
    type: 'application/vnd.ms-excel;charset=utf-8' 
  });
  
  // Create download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up
  URL.revokeObjectURL(url);
};

/**
 * ExcelExport Component
 * 
 * Renders a button that exports table data to Excel format when clicked.
 * Handles data transformation, CSV generation, and file download.
 * 
 * @param props - Component props
 * @returns JSX element representing the export button
 */
export const ExcelExport: React.FC<ExcelExportProps> = ({
  data,
  columns,
  filename,
  sheetName = "Sheet1",
  buttonText,
  variant = "outline",
  size = "sm",
  className,
  showIcon = true,
  disabled = false,
  onExportSuccess,
  onExportError,
}) => {
  const { t, language } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);

  // Generate filename with timestamp
  const generateFilename = (): string => {
    const baseFilename = filename || t("common.export.defaultFilename");
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    return `${baseFilename}_${timestamp}.csv`;
  };

  // Handle export action
  const handleExport = async (): Promise<void> => {
    if (disabled || isExporting || data.length === 0) {
      return;
    }

    setIsExporting(true);

    try {
      // Convert data to CSV
      const csvContent = convertToCSV(data, columns);
      
      // Generate filename
      const exportFilename = generateFilename();
      
      // Download file
      downloadCSVAsExcel(csvContent, exportFilename);
      
      // Success callback
      onExportSuccess?.(exportFilename);
      
    } catch (error) {
      console.error('Export failed:', error);
      onExportError?.(error as Error);
    } finally {
      setIsExporting(false);
    }
  };

  // Button text
  const getButtonText = (): string => {
    if (buttonText) return buttonText;
    if (isExporting) return t("common.export.exporting");
    return t("common.export.exportToExcel");
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleExport}
      disabled={disabled || isExporting || data.length === 0}
      className={cn("flex items-center gap-2", className)}
    >
      {/* Icon */}
      {showIcon && (
        <>
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FileSpreadsheet className="h-4 w-4" />
          )}
        </>
      )}
      
      {/* Button Text */}
      <span>{getButtonText()}</span>
    </Button>
  );
};

/**
 * Quick Excel Export Hook
 * 
 * A custom hook that provides a simple export function for quick usage.
 */
export const useExcelExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToExcel = async (
    data: any[],
    columns: ExcelColumn[],
    filename?: string
  ): Promise<void> => {
    setIsExporting(true);
    
    try {
      const csvContent = convertToCSV(data, columns);
      const exportFilename = filename || `export_${Date.now()}.csv`;
      downloadCSVAsExcel(csvContent, exportFilename);
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToExcel, isExporting };
};

export default ExcelExport;

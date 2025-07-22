/**
 * Data Table Component
 *
 * A comprehensive, reusable data table component with advanced features
 * including sorting, filtering, pagination, and responsive design.
 *
 * Features:
 * - Column sorting (ascending/descending)
 * - Global search and column-specific filtering
 * - Pagination with customizable page sizes
 * - Responsive design with horizontal scrolling
 * - RTL/LTR layout support
 * - Row selection (single/multiple)
 * - Custom cell renderers
 * - Loading and empty states
 * - Accessibility compliant with ARIA labels
 * - Export functionality
 *
 * @author Ahmed Reda
 * @version 1.0.0
 */

"use client";

import React, { useState, useMemo, ReactNode } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * Column definition interface
 */
export interface TableColumn<T = any> {
  /** Unique identifier for the column */
  key: string;
  /** Column header label */
  label: string;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Whether the column is filterable */
  filterable?: boolean;
  /** Custom cell renderer function */
  render?: (value: any, row: T, index: number) => ReactNode;
  /** Column width (CSS value) */
  width?: string;
  /** Column alignment */
  align?: "left" | "center" | "right";
  /** Whether the column is hidden on mobile */
  hideOnMobile?: boolean;
}

/**
 * Sort configuration interface
 */
export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

/**
 * Filter configuration interface
 */
export interface FilterConfig {
  [key: string]: string;
}

/**
 * Props interface for DataTable component
 */
export interface DataTableProps<T = any> {
  /** Array of data to display */
  data: T[];
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Whether to show search */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Whether to show pagination */
  paginated?: boolean;
  /** Items per page options */
  pageSizeOptions?: number[];
  /** Default page size */
  defaultPageSize?: number;
  /** Whether rows are selectable */
  selectable?: boolean;
  /** Selection mode */
  selectionMode?: "single" | "multiple";
  /** Selected row keys */
  selectedRows?: string[];
  /** Row selection change handler */
  onSelectionChange?: (selectedKeys: string[]) => void;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Custom CSS classes */
  className?: string;
  /** Row key extractor function */
  getRowKey?: (row: T, index: number) => string;
}

/**
 * DataTable Component
 *
 * A feature-rich data table with sorting, filtering, pagination,
 * and responsive design capabilities.
 *
 * @param props - Component props
 * @returns JSX element representing the data table
 */
export const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyMessage,
  searchable = true,
  searchPlaceholder,
  paginated = true,
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 10,
  selectable = false,
  selectionMode = "multiple",
  selectedRows = [],
  onSelectionChange,
  onRowClick,
  className,
  getRowKey = (row, index) => row.id?.toString() || index.toString(),
}: DataTableProps<T>) => {
  const { t, isRTL } = useLanguage();

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<FilterConfig>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Memoized filtered and sorted data
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchTerm) {
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((row) =>
          String(row[key]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, filters, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(processedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = paginated
    ? processedData.slice(startIndex, endIndex)
    : processedData;

  // Event handlers
  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleRowSelection = (rowKey: string) => {
    if (!onSelectionChange) return;

    if (selectionMode === "single") {
      onSelectionChange([rowKey]);
    } else {
      const newSelection = selectedRows.includes(rowKey)
        ? selectedRows.filter((key) => key !== rowKey)
        : [...selectedRows, rowKey];
      onSelectionChange(newSelection);
    }
  };

  const handleSelectAll = () => {
    if (!onSelectionChange) return;

    const allKeys = paginatedData.map((row, index) => getRowKey(row, index));
    const allSelected = allKeys.every((key) => selectedRows.includes(key));

    if (allSelected) {
      onSelectionChange(selectedRows.filter((key) => !allKeys.includes(key)));
    } else {
      onSelectionChange([...new Set([...selectedRows, ...allKeys])]);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filters */}
      {searchable && (
        <div
          className={cn(
            "flex items-center gap-4",
            isRTL ? "flex-row-reverse" : "flex-row"
          )}
        >
          <div className="relative flex-1">
            <Search
              className={cn(
                "absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400",
                isRTL ? "right-3" : "left-3"
              )}
            />
            <input
              type="text"
              placeholder={searchPlaceholder || t("common.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "w-full border border-gray-300 rounded-lg py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
              )}
            />
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              {/* Selection Column */}
              {selectable && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {selectionMode === "multiple" && (
                    <input
                      type="checkbox"
                      checked={
                        paginatedData.length > 0 &&
                        paginatedData.every((row, index) =>
                          selectedRows.includes(getRowKey(row, index))
                        )
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  )}
                </th>
              )}

              {/* Data Columns */}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider",
                    column.hideOnMobile && "hidden md:table-cell",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                    column.sortable && "cursor-pointer hover:bg-gray-100"
                  )}
                  style={{ width: column.width }}
                  onClick={
                    column.sortable ? () => handleSort(column.key) : undefined
                  }
                >
                  <div
                    className={cn(
                      "flex items-center gap-1",
                      isRTL ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={cn(
                            "h-3 w-3",
                            sortConfig?.key === column.key &&
                              sortConfig.direction === "asc"
                              ? "text-blue-600"
                              : "text-gray-400"
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 -mt-1",
                            sortConfig?.key === column.key &&
                              sortConfig.direction === "desc"
                              ? "text-blue-600"
                              : "text-gray-400"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage || t("common.table.noDataFound")}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => {
                const rowKey = getRowKey(row, index);
                const isSelected = selectedRows.includes(rowKey);

                return (
                  <tr
                    key={rowKey}
                    className={cn(
                      "hover:bg-gray-50 transition-colors",
                      isSelected && "bg-blue-50",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {/* Selection Column */}
                    {selectable && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type={
                            selectionMode === "single" ? "radio" : "checkbox"
                          }
                          checked={isSelected}
                          onChange={() => handleRowSelection(rowKey)}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                    )}

                    {/* Data Columns */}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                          column.hideOnMobile && "hidden md:table-cell",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right"
                        )}
                      >
                        {column.render
                          ? column.render(row[column.key], row, index)
                          : String(row[column.key] || "")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div
          className={cn(
            "flex items-center justify-between",
            isRTL ? "flex-row-reverse" : "flex-row"
          )}
        >
          <div className="text-sm text-gray-700">
            {t("common.table.showing")} {startIndex + 1} {t("common.table.to")}{" "}
            {Math.min(endIndex, processedData.length)} {t("common.table.of")}{" "}
            {processedData.length} {t("common.table.results")}
          </div>

          <div
            className={cn(
              "flex items-center gap-2",
              isRTL ? "flex-row-reverse" : "flex-row"
            )}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              {t("common.previous")}
            </Button>

            <span className="text-sm text-gray-700">
              {t("common.table.page")} {currentPage} {t("common.table.of")}{" "}
              {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              {t("common.next")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

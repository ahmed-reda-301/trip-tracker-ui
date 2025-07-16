"use client";
// components/Breadcrumb.jsx
import React from "react";
import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items = [], onNavigate }) => {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-3 shadow-sm">
      <div className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <React.Fragment key={item.href || item.label}>
            {index === 0 && <Home className="w-4 h-4 mr-1" />}
            {item.href ? (
              <button
                onClick={() => onNavigate && item.href && onNavigate(item.href)}
                className="hover:text-teal-100 transition-colors font-medium"
              >
                {item.label}
              </button>
            ) : (
              <span
                className={`${index === items.length - 1 ? "font-medium" : ""}`}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className="w-4 h-4 opacity-70" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;

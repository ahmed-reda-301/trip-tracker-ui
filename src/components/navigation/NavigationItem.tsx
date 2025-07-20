"use client";

import React from "react";
import { LucideIcon, ChevronDown } from "lucide-react";

interface DropdownItem {
  key: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

interface NavigationItemProps {
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  isDropdownOpen?: boolean;
  onClick: () => void;
  onDropdownItemClick?: (itemKey: string) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  icon: Icon,
  isActive,
  hasDropdown = false,
  dropdownItems = [],
  isDropdownOpen = false,
  onClick,
  onDropdownItemClick,
}) => {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`
          flex items-center space-x-2 px-4 py-3 font-medium whitespace-nowrap transition-all duration-200 min-w-fit
          ${
            isActive
              ? "bg-[rgb(5,148,211)] text-white"
              : "bg-white text-black hover:bg-[#61B34F] hover:text-white"
          }
        `}
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
        {hasDropdown && (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      {hasDropdown && isDropdownOpen && (
        <div className="dropdown-menu bg-white shadow-xl border border-gray-200 py-1 rounded-sm">
          {dropdownItems.map((dropdownItem) => {
            const DropdownIcon = dropdownItem.icon;
            return (
              <button
                key={dropdownItem.key}
                onClick={() => onDropdownItemClick?.(dropdownItem.key)}
                className="w-full px-3 py-1.5 text-left text-gray-700 hover:bg-[rgb(5,148,211)] hover:text-white transition-colors flex items-center text-sm whitespace-nowrap"
                style={{ minWidth: "150px" }}
              >
                <DropdownIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{dropdownItem.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavigationItem;

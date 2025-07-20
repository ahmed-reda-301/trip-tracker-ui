/**
 * Footer Component
 *
 * Application footer with company branding and copyright information.
 * Supports multilingual content with automatic translation based on current language.
 *
 * Features:
 * - Gradient background with brand colors
 * - Responsive design with centered content
 * - Multilingual support (Arabic/English)
 * - Company branding and copyright notice
 *
 * @author Ahmed Reda
 * @version 1.0.0
 */

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Footer component that displays company information and copyright
 *
 * @returns JSX element containing the application footer
 */
const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-r from-[#0895D3] to-[#60B460] text-white text-center py-1 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm font-medium">
          {t("footer.poweredBy")} {t("footer.companyName")} |{" "}
          {t("footer.allRightsReserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

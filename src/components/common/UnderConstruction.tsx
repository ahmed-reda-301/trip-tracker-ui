"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface UnderConstructionProps {
  title: string;
  icon: LucideIcon;
  description?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  title,
  icon: Icon,
  description,
}) => {
  const { isRTL } = useLanguage();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[60vh] p-8 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <Icon className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>

        {/* Under Construction Message */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div
            className={`flex items-center justify-center ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center ${
                isRTL ? "ml-3" : "mr-3"
              }`}
            >
              <span className="text-yellow-800 text-sm font-bold">!</span>
            </div>
            <p className="text-yellow-800 font-medium">
              {isRTL ? "الصفحة قيد الإنشاء" : "Page Under Construction"}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500">
          {isRTL
            ? "نحن نعمل على تطوير هذه الصفحة لنوفر لك أفضل تجربة"
            : "We are working on developing this page to provide you with the best experience"}
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;

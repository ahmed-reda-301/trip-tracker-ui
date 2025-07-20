"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function AlertPanelPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("reportsPages.alertPanel.title")}
      icon={AlertTriangle}
      description={t("reportsPages.alertPanel.description")}
    />
  );
}

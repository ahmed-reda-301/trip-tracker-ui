"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function AllAlertsPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("reportsPages.allAlerts.title")}
      icon={AlertTriangle}
      description={t("reportsPages.allAlerts.description")}
    />
  );
}

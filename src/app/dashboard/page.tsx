"use client";

import React from "react";
import { BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("pages.dashboard.title")}
      icon={BarChart3}
      description={t("pages.dashboard.description")}
    />
  );
}

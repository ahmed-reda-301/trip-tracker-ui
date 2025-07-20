"use client";

import React from "react";
import { Route } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function TripPanelPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("reportsPages.tripPanel.title")}
      icon={Route}
      description={t("reportsPages.tripPanel.description")}
    />
  );
}

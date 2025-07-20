"use client";

import React from "react";
import { Route } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function FocusedTripsReportsPage() {
  const { t } = useLanguage();
  return (
    <UnderConstruction
      title={t("reportsPages.focusedTrips.title")}
      icon={Route}
      description={t("reportsPages.focusedTrips.description")}
    />
  );
}

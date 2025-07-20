"use client";

import React from "react";
import { Database } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function CompletedTripsPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("reportsPages.completedTrips.title")}
      icon={Database}
      description={t("reportsPages.completedTrips.description")}
    />
  );
}

"use client";

import React from "react";
import { Route } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function FocusedTripsPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("pages.focusedTrips.title")}
      icon={Route}
      description={t("pages.focusedTrips.description")}
    />
  );
}

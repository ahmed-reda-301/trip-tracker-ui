"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function SuspiciousTripsPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("pages.suspiciousTrips.title")}
      icon={AlertTriangle}
      description={t("pages.suspiciousTrips.description")}
    />
  );
}

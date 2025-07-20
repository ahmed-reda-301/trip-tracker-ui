"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function LocationMonitorPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("pages.locationMonitor.title")}
      icon={MapPin}
      description={t("pages.locationMonitor.description")}
    />
  );
}

"use client";

import React from "react";
import { Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function ConfigurationPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("pages.configuration.title")}
      icon={Settings}
      description={t("pages.configuration.description")}
    />
  );
}

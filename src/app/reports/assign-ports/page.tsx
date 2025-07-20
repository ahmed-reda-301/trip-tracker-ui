"use client";

import React from "react";
import { Anchor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function AssignPortsPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("reportsPages.assignPorts.title")}
      icon={Anchor}
      description={t("reportsPages.assignPorts.description")}
    />
  );
}

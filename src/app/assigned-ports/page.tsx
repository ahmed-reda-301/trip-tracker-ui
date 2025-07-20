"use client";

import React from "react";
import { Anchor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function AssignedPortsPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("pages.assignedPorts.title")}
      icon={Anchor}
      description={t("pages.assignedPorts.description")}
    />
  );
}

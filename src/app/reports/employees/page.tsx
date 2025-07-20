"use client";

import React from "react";
import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function EmployeesPage() {
  const { t } = useLanguage();

  return (
    <UnderConstruction
      title={t("reportsPages.employees.title")}
      icon={Users}
      description={t("reportsPages.employees.description")}
    />
  );
}

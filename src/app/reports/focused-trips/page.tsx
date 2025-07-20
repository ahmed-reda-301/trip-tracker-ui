import React from "react";
import { Route } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function FocusedTripsReportsPage() {
  return (
    <UnderConstruction
      title="Focused Trips"
      icon={Route}
      description="تقارير الرحلات المركزة والمتابعة الخاصة"
    />
  );
}

import React from "react";
import { Database } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function CompletedTripsPage() {
  return (
    <UnderConstruction
      title="Completed Trips"
      icon={Database}
      description="تقارير الرحلات المكتملة والمنجزة"
    />
  );
}

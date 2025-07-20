"use client";

import React from "react";
import { Route } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function FocusedTripsReportsPage() {
  return (
    <UnderConstruction
      title="Reports / Focused Trips"
      icon={Route}
      description="Focused trip reports and special monitoring"
    />
  );
}

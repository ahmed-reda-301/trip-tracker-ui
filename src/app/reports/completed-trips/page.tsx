"use client";

import React from "react";
import { Database } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function CompletedTripsPage() {
  return (
    <UnderConstruction
      title="Reports / Completed Trips"
      icon={Database}
      description="Completed and finished trip reports"
    />
  );
}

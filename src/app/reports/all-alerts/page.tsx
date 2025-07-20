"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function AllAlertsPage() {
  return (
    <UnderConstruction
      title="Reports / All Alerts"
      icon={AlertTriangle}
      description="All alerts and notifications in the system"
    />
  );
}

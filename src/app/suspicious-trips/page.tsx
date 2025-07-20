"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function SuspiciousTripsPage() {
  return (
    <UnderConstruction
      title="Suspicious Trips"
      icon={AlertTriangle}
      description="Suspicious trips and security analysis of shipments"
    />
  );
}

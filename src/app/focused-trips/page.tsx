"use client";

import React from "react";
import { Route } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function FocusedTripsPage() {
  return (
    <UnderConstruction
      title="Focused Trips"
      icon={Route}
      description="Focused trips and special monitoring of important shipments"
    />
  );
}

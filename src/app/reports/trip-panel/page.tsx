"use client";

import React from "react";
import { Route } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function TripPanelPage() {
  return (
    <UnderConstruction
      title="Reports / Trip Panel"
      icon={Route}
      description="Trip management panel and shipment status tracking"
    />
  );
}

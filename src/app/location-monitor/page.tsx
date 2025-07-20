"use client";

import React from "react";
import { MapPin } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function LocationMonitorPage() {
  return (
    <UnderConstruction
      title="Location Monitor"
      icon={MapPin}
      description="Location monitoring and geographical tracking of shipments and trips"
    />
  );
}

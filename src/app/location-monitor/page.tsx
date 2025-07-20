import React from "react";
import { MapPin } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function LocationMonitorPage() {
  return (
    <UnderConstruction
      title="Location Monitor"
      icon={MapPin}
      description="مراقبة المواقع والتتبع الجغرافي للشحنات والرحلات"
    />
  );
}

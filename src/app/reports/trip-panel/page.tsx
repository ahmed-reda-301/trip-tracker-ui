import React from "react";
import { Route } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function TripPanelPage() {
  return (
    <UnderConstruction
      title="Trip Panel"
      icon={Route}
      description="لوحة إدارة الرحلات ومتابعة حالة الشحنات"
    />
  );
}

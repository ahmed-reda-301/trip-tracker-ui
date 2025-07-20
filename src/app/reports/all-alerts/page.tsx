import React from "react";
import { AlertTriangle } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function AllAlertsPage() {
  return (
    <UnderConstruction
      title="All Alerts"
      icon={AlertTriangle}
      description="جميع التنبيهات والإشعارات في النظام"
    />
  );
}

import React from "react";
import { AlertTriangle } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function AlertPanelPage() {
  return (
    <UnderConstruction
      title="Alert Panel"
      icon={AlertTriangle}
      description="لوحة إدارة التنبيهات والتحكم في الإشعارات"
    />
  );
}

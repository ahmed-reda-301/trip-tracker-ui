import React from "react";
import { BarChart3 } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function DashboardPage() {
  return (
    <UnderConstruction
      title="Dashboard"
      icon={BarChart3}
      description="لوحة التحكم الرئيسية والإحصائيات العامة"
    />
  );
}

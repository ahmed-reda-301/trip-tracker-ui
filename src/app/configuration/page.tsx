import React from "react";
import { Settings } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function ConfigurationPage() {
  return (
    <UnderConstruction
      title="Configuration"
      icon={Settings}
      description="إعدادات النظام والتكوين العام"
    />
  );
}

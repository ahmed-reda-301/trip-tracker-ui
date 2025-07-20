"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function AlertPanelPage() {
  return (
    <UnderConstruction
      title="Reports / Alert Panel"
      icon={AlertTriangle}
      description="Alert management panel and notification control"
    />
  );
}

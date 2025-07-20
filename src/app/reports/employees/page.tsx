"use client";

import React from "react";
import { Users } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function EmployeesPage() {
  return (
    <UnderConstruction
      title="Reports / Employees"
      icon={Users}
      description="Employee and user management in the system"
    />
  );
}

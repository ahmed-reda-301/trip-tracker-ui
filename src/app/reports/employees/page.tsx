import React from "react";
import { Users } from "lucide-react";
import UnderConstruction from "@/components/common/UnderConstruction";

export default function EmployeesPage() {
  return (
    <UnderConstruction
      title="Employees"
      icon={Users}
      description="إدارة الموظفين والمستخدمين في النظام"
    />
  );
}

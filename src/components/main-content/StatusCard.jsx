// components/StatusCard.jsx
import React from "react";
import {
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const typeConfig = {
  info: {
    containerClasses: "bg-blue-50 border-blue-200 text-blue-800",
    iconClasses: "text-blue-600",
    icon: Info,
  },
  warning: {
    containerClasses: "bg-yellow-50 border-yellow-200 text-yellow-800",
    iconClasses: "text-yellow-600",
    icon: AlertTriangle,
  },
  success: {
    containerClasses: "bg-green-50 border-green-200 text-green-800",
    iconClasses: "text-green-600",
    icon: CheckCircle,
  },
  error: {
    containerClasses: "bg-red-50 border-red-200 text-red-800",
    iconClasses: "text-red-600",
    icon: XCircle,
  },
  notice: {
    containerClasses: "bg-purple-50 border-purple-200 text-purple-800",
    iconClasses: "text-purple-600",
    icon: AlertCircle,
  },
};

const StatusCard = ({ title, content, type = "info" }) => {
  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div
      className={`rounded-lg border p-6 shadow-sm transition-all duration-200 hover:shadow-md ${config.containerClasses}`}
    >
      <div className="flex items-start space-x-3">
        <div className={`flex-shrink-0 mt-0.5 ${config.iconClasses}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          <div className="text-sm leading-relaxed">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;

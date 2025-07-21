"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LogOut, User, AlertTriangle } from "lucide-react";

interface LogoutButtonProps {
  variant?: "button" | "dropdown" | "icon";
  className?: string;
  forceShow?: boolean; // Show button even when user is not authenticated
}

export default function LogoutButton({
  variant = "button",
  className = "",
  forceShow = false,
}: LogoutButtonProps) {
  const { user, logout } = useAuth();
  const { isRTL } = useLanguage();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(false);
    logout();
  };

  // Show logout button only when user is authenticated, unless forceShow is true
  if (!user && !forceShow) return null;

  const buttonContent = {
    button: (
      <button
        onClick={() => setShowConfirm(true)}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ${className}`}
      >
        <LogOut className="w-4 h-4" />
        {isRTL ? "تسجيل الخروج" : "Logout"}
      </button>
    ),
    dropdown: (
      <button
        onClick={() => setShowConfirm(true)}
        className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors ${className}`}
      >
        <LogOut className="w-4 h-4" />
        <span>{isRTL ? "تسجيل الخروج" : "Logout"}</span>
      </button>
    ),
    icon: (
      <button
        onClick={() => setShowConfirm(true)}
        className={`p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors ${className}`}
        title={isRTL ? "تسجيل الخروج" : "Logout"}
      >
        <LogOut className="w-5 h-5" />
      </button>
    ),
  };

  return (
    <>
      {buttonContent[variant]}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {(() => {
                    if (user) {
                      return isRTL ? "تأكيد تسجيل الخروج" : "Confirm Logout";
                    } else {
                      return isRTL ? "الانتقال لتسجيل الدخول" : "Go to Login";
                    }
                  })()}
                </h3>
                <p className="text-sm text-gray-600">
                  {(() => {
                    if (user) {
                      return isRTL
                        ? "هل أنت متأكد من رغبتك في تسجيل الخروج؟"
                        : "Are you sure you want to logout?";
                    } else {
                      return isRTL
                        ? "هل تريد الانتقال إلى صفحة تسجيل الدخول؟"
                        : "Do you want to go to the login page?";
                    }
                  })()}
                </p>
              </div>
            </div>

            {/* User Info */}
            {user && (
              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {isRTL ? user.name : user.nameEn}
                    </p>
                    <p className="text-sm text-gray-600">
                      {isRTL ? user.department : user.departmentEn}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {isRTL ? "إلغاء" : "Cancel"}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {(() => {
                  if (user) {
                    return isRTL ? "تسجيل الخروج" : "Logout";
                  } else {
                    return isRTL ? "انتقال" : "Go";
                  }
                })()}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

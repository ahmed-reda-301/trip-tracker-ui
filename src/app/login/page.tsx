"use client";

import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LanguageToggle from "@/components/shared/LanguageToggle";

export default function LoginPage() {
  const { isRTL } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  // No automatic redirect - let user manually navigate

  const validateForm = () => {
    const errors: { username?: string; password?: string } = {};

    if (!formData.username.trim()) {
      errors.username = "اسم المستخدم مطلوب";
    } else if (formData.username.length < 3) {
      errors.username = "اسم المستخدم يجب أن يكون 3 أحرف على الأقل";
    }

    if (!formData.password.trim()) {
      errors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear general error
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({
        username: formData.username.trim(),
        password: formData.password,
      });

      if (response.success) {
        setSuccess(response.message);
        // Redirect after successful login
        setTimeout(() => {
          router.replace("/location-monitor");
        }, 1000);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex flex-col bg-gray-50">
      {/* Header - Matching the image exactly */}
      <div
        className="text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--zatca-primary-start), var(--zatca-primary-end))`,
        }}
      >
        {/* Top Bar with Language Toggle */}
        <div className="container mx-auto px-4 pt-4">
          <div className="flex items-center justify-center">
            {/* Language Toggle */}
            <LanguageToggle
              variant="header"
              className="bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Logo and Title Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Logo */}
            <div className="relative group">
              <Image
                src="/assets/Saudi-Customs-Logo-new_3.svg"
                alt={isRTL ? "شعار الجمارك السعودية" : "Saudi Customs Logo"}
                width={420}
                height={20}
                className="object-contain transition-all duration-500 ease-in-out transform group-hover:scale-110 group-hover:brightness-110 group-hover:drop-shadow-lg cursor-pointer"
                priority
              />
            </div>

            {/* Title */}
            {/* <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">
                {isRTL
                  ? "هيئة الزكاة والضريبة والجمارك"
                  : "Zakat, Tax and Customs Authority"}
              </h1>
              <p className="text-lg text-blue-100 opacity-90">
                {isRTL ? "المملكة العربية السعودية" : "Kingdom of Saudi Arabia"}
              </p>
            </div> */}
            {/* Subtitle Section */}
            <div className="container mx-auto px-4">
              <p className="text-center text-white text-lg">
                {isRTL
                  ? "مرحباً بك في نظام تتبع الرحلات الخاص بهيئة الزكاة والضريبة والجمارك"
                  : "Welcome to ZATCA Trip Tracking System"}
              </p>
            </div>
          </div>
        </div>

        {/* Subtitle Section */}
        {/* <div className="bg-black bg-opacity-20 py-4">
          <div className="container mx-auto px-4">
            <p className="text-center text-white text-lg">
              {isRTL
                ? "مرحباً بك في نظام تتبع الرحلات الخاص بهيئة الزكاة والضريبة والجمارك"
                : "Welcome to ZATCA Trip Tracking System"}
            </p>
          </div>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-0 px-4 mt-7">
        <div className="w-full max-w-lg">
          {/* Login Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Form Header */}
            <div className="mb-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {isRTL ? "تسجيل دخول آمن" : "Secure Login"}
                </h2>
                <p className="text-gray-600">
                  {isRTL
                    ? "الرجاء إدخال بيانات الدخول الخاصة بك"
                    : "Please enter your login credentials"}
                </p>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Username Field */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`block w-full pr-10 pl-3 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-right ${
                      fieldErrors.username
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder={isRTL ? "اسم المستخدم" : "Username"}
                    required
                  />
                </div>
                {fieldErrors.username && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {fieldErrors.username}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full pr-10 pl-12 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-right ${
                      fieldErrors.password
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
                    placeholder={isRTL ? "كلمة المرور" : "Password"}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 left-0 pl-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className={`${
                    isRTL ? "mr-2" : "ml-2"
                  } block text-sm text-gray-700`}
                >
                  {isRTL ? "تذكرني" : "Remember me"}
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || success !== ""}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    {isRTL ? "جاري تسجيل الدخول..." : "Signing in..."}
                  </div>
                ) : success ? (
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isRTL ? "تم بنجاح" : "Success"}
                  </div>
                ) : isRTL ? (
                  "تسجيل الدخول"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              >
                {isRTL ? "نسيت كلمة المرور؟" : "Forgot your password?"}
              </a>
            </div>

            {/* Demo Users Info */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-3 text-center">
                {isRTL
                  ? "حسابات تجريبية للاختبار"
                  : "Demo Accounts for Testing"}
              </h4>
              <div className="space-y-2 text-xs text-blue-800">
                <div className="flex justify-between">
                  <span>{isRTL ? "مدير النظام:" : "System Admin:"}</span>
                  <span>admin / admin123</span>
                </div>
                <div className="flex justify-between">
                  <span>{isRTL ? "مشغل النظام:" : "System Operator:"}</span>
                  <span>operator / operator123</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {isRTL ? "مشرف العمليات:" : "Operations Supervisor:"}
                  </span>
                  <span>supervisor / supervisor123</span>
                </div>
              </div>
              <p className="text-xs text-blue-600 text-center mt-3">
                {isRTL
                  ? "للحصول على المساعدة، يرجى التواصل مع قسم الدعم التقني"
                  : "For assistance, please contact technical support"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

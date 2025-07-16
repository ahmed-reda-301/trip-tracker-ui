"use client";

import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import Breadcrumb from "@/components/breadcrumb";
import MainContent from "@/components/main-content";
import Footer from "@/components/footer";
import React, { useState } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export default function RootLayout() {
  const [activeTab, setActiveTab] = useState<string>("location-monitor");

  // عناصر breadcrumb حسب التبويب الحالي
  const breadcrumbMap: Record<
    string,
    Array<{ label: string; href?: string }>
  > = {
    "location-monitor": [
      { label: "Home", href: "/" },
      { label: "Location Monitor" },
    ],
    "focused-trips": [{ label: "Home", href: "/" }, { label: "Focused Trips" }],
    "assigned-ports": [
      { label: "Home", href: "/" },
      { label: "Assigned Ports" },
    ],
    dashboard: [{ label: "Home", href: "/" }, { label: "Dashboard" }],
    default: [
      { label: "Home", href: "/" },
      { label: "Page Under Development" },
    ],
  };

  const breadcrumbItems = breadcrumbMap[activeTab] || breadcrumbMap.default;

  // دالة التنقل عند الضغط على رابط في breadcrumb
  const handleNavigate = (href: string) => {
    // استخدم اسم التبويب من الرابط
    if (href === "/") setActiveTab("dashboard");
    else if (href === "/dashboard") setActiveTab("dashboard");
    else if (href.toLowerCase().includes("location"))
      setActiveTab("location-monitor");
    else if (href.toLowerCase().includes("focused"))
      setActiveTab("focused-trips");
    else if (href.toLowerCase().includes("assigned"))
      setActiveTab("assigned-ports");
    // يمكنك إضافة المزيد حسب الحاجة
  };

  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <Breadcrumb items={breadcrumbItems} onNavigate={handleNavigate} />
        <MainContent activeTab={activeTab} onTabChange={setActiveTab} />
        <Footer />
      </body>
    </html>
  );
}

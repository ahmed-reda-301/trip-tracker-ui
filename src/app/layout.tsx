"use client";

import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import Breadcrumb from "@/components/layout/breadcrumb";
import MainContent from "@/components/main-content";
import Footer from "@/components/layout/footer";
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

  // Breadcrumb items based on current tab
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

  // Navigation handler for breadcrumb links
  const handleNavigate = (href: string) => {
    // Use tab name from link
    if (href === "/") setActiveTab("dashboard");
    else if (href === "/dashboard") setActiveTab("dashboard");
    else if (href.toLowerCase().includes("location"))
      setActiveTab("location-monitor");
    else if (href.toLowerCase().includes("focused"))
      setActiveTab("focused-trips");
    else if (href.toLowerCase().includes("assigned"))
      setActiveTab("assigned-ports");
    // Add more as needed
  };

  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <Breadcrumb items={breadcrumbItems} onNavigate={handleNavigate} />
          <main className="flex-1">
            <MainContent activeTab={activeTab} />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

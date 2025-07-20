"use client";

import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import Breadcrumb from "@/components/layout/breadcrumb";
import Footer from "@/components/layout/footer";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("location-monitor");
  const [selectedReportItem, setSelectedReportItem] = useState<string>("");

  // Update active tab based on current pathname
  useEffect(() => {
    if (pathname === "/" || pathname === "/location-monitor") {
      setActiveTab("location-monitor");
    } else if (pathname === "/focused-trips") {
      setActiveTab("focused-trips");
    } else if (pathname === "/assigned-ports") {
      setActiveTab("assigned-ports");
    } else if (pathname === "/dashboard") {
      setActiveTab("dashboard");
    } else if (pathname === "/configuration") {
      setActiveTab("configuration");
    } else if (pathname === "/suspicious-trips") {
      setActiveTab("suspicious-trips");
    } else if (pathname.startsWith("/reports/")) {
      // Set active tab to reports when in reports section
      setActiveTab("reports");
      // Extract report key from URL
      const reportKey = pathname.split("/").pop();
      if (reportKey) {
        setSelectedReportItem(reportKey);
      }
    } else {
      // Default to location-monitor for unknown paths
      setActiveTab("location-monitor");
    }
  }, [pathname]);

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
          <Navigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedReportItem={selectedReportItem}
            onReportItemChange={setSelectedReportItem}
          />
          <Breadcrumb onNavigate={handleNavigate} />
          <div className="flex-1 bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">{children}</div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

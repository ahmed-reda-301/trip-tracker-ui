/**
 * Root Layout Component
 *
 * Main layout wrapper for the Trip Tracker application.
 * Provides global providers, font management, and layout structure.
 *
 * Features:
 * - Font providers for Arabic (Cairo) and English (Roboto)
 * - Language context provider for multilingual support
 * - Global layout structure with header, navigation, and footer
 * - Responsive design with mobile sidebar support
 * - State management for navigation and UI interactions
 */

"use client";

import { Roboto, Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import Breadcrumb from "@/components/layout/breadcrumb";
import Footer from "@/components/layout/footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import FontProvider from "@/components/providers/FontProvider";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// English font (Roboto)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
  variable: "--font-roboto",
});

// Arabic font (Cairo)
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  preload: true,
  variable: "--font-cairo",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("location-monitor");
  const [selectedReportItem, setSelectedReportItem] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

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

  // Check if current page should not show main layout
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${cairo.variable}`}>
        <LanguageProvider>
          <AuthProvider>
            <FontProvider>
              {isLoginPage ? (
                // Login page without main layout
                children
              ) : (
                // Main application layout
                <div className="flex flex-col min-h-screen">
                  <Header
                    onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
                    isSidebarOpen={sidebarOpen}
                  />
                  <Navigation
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onReportItemChange={setSelectedReportItem}
                    sidebarOpen={sidebarOpen}
                    onSidebarChange={setSidebarOpen}
                  />
                  <Breadcrumb onNavigate={handleNavigate} />
                  <div
                    className={`flex-1 ${
                      pathname === "/location-monitor"
                        ? "bg-gray-100"
                        : "bg-gray-50 p-8"
                    }`}
                  >
                    {pathname === "/location-monitor" ? (
                      children
                    ) : (
                      <div className="max-w-6xl mx-auto">{children}</div>
                    )}
                  </div>
                  <Footer />
                </div>
              )}
            </FontProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

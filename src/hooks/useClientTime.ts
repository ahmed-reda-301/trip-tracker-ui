"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to handle client-side time display
 * Prevents hydration mismatch by only showing time after client-side hydration
 */
export const useClientTime = (locale?: string, updateInterval: number = 60000) => {
  const [time, setTime] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const updateTime = () => {
      setTime(new Date().toLocaleString(locale || "en-US"));
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, updateInterval);

    return () => clearInterval(interval);
  }, [locale, updateInterval]);

  return {
    time: isClient ? time : "",
    isClient
  };
};

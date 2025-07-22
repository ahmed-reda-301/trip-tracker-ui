"use client";

/**
 * Language Context for Trip Tracker Application
 * 
 * Provides language state management and translation utilities
 * with RTL support and persistent storage.
 * 
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, getTranslation, getDirection, getTextAlign, getFlexDirection } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  direction: 'rtl' | 'ltr';
  textAlign: 'right' | 'left';
  flexDirection: 'row' | 'row-reverse';
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('trip-tracker-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Update document direction and save to localStorage when language changes
  useEffect(() => {
    const direction = getDirection(language);
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    localStorage.setItem('trip-tracker-language', language);
    
    // Update body class for RTL styling
    if (language === 'ar') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  const direction = getDirection(language);
  const textAlign = getTextAlign(language);
  const flexDirection = getFlexDirection(language);
  const isRTL = language === 'ar';

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    direction,
    textAlign,
    flexDirection,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/**
 * Hook for getting translation function only
 */
export const useTranslation = () => {
  const { t } = useLanguage();
  return { t };
};

/**
 * Hook for getting RTL/LTR utilities
 */
export const useDirection = () => {
  const { direction, textAlign, flexDirection, isRTL } = useLanguage();
  return { direction, textAlign, flexDirection, isRTL };
};

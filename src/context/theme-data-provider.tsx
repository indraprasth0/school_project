"use client";

import setGlobalColorTheme from "@/lib/theme-colors";
import { useTheme, ThemeProviderProps } from "next-themes";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams
);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const [themeColor, setThemeColor] = useState<ThemeColors | null>(null); // Default `null`
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ✅ Ensure localStorage is only accessed on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(localStorage.getItem("themeColor"), "window");      
      const savedColor = (localStorage.getItem("themeColor") as ThemeColors) || "Zinc"; // Default Zinc
      setThemeColor(savedColor);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && themeColor) {
      // console.log("setItem", themeColor);
      
      localStorage.setItem("themeColor", themeColor);
      setGlobalColorTheme(theme as "light" | "dark", themeColor);
    }
  }, [themeColor, theme, mounted]);

  if (!mounted || themeColor === null) return null; // Prevent Hydration issues

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
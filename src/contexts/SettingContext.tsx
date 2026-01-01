"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useTheme, type ThemeProviderProps } from "@primer/react";

export type Setting = {
  colorMode: ThemeProviderProps["colorMode"];
  filter: {
    showEmpty: boolean;
    showPrerelease: boolean;
    showDraft: boolean;
  };
};

type SettingContextType = {
  settings: Setting;
  saveSettings: (partial: Partial<Setting>) => void;
  toggleTheme: () => void;
};

const DEFAULT_SETTING: Setting = {
  colorMode: "auto",
  filter: {
    showEmpty: true,
    showPrerelease: true,
    showDraft: true,
  },
};

const SettingContext = createContext<SettingContextType | null>(null);
const STORAGE_KEY = "gh-stats-settings";

export function SettingProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Setting>(DEFAULT_SETTING);
  const [isLoaded, setIsLoaded] = useState(false);
  const { resolvedColorMode, setColorMode } = useTheme();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings((prev) => ({ ...prev, ...parsed }));
        setColorMode(parsed.colorMode ?? "auto");
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
      setColorMode("auto");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  }, [settings, isLoaded]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;

      if (!event.newValue) {
        setSettings(DEFAULT_SETTING);
        return;
      }

      try {
        const parsed = JSON.parse(event.newValue);
        setSettings((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    };

    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const saveSettings = useCallback((partial: Partial<Setting>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleTheme = () => {
    const nextMode = resolvedColorMode == "day" ? "night" : "day";
    setSettings((prev) => ({ ...prev, colorMode: nextMode }));
    setColorMode(nextMode);
  };

  return <SettingContext.Provider value={{ settings, toggleTheme, saveSettings }}>{children}</SettingContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingProvider");
  }

  return context;
}

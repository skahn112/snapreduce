"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "button";
}

export function ThemeToggle({ className = "", variant = "icon" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial theme from html tag or localStorage or system
    const isDark =
      document.documentElement.classList.contains("dark") ||
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // During SSR / initial mount, render a placeholder with fixed dimensions to prevent layout shift
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-500 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 ${className}`}
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800/80 ${className}`}
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      >
        <span className="flex items-center gap-2">
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 rotate-0" />
          ) : (
            <Moon className="h-4 w-4 text-slate-600 transition-transform duration-300" />
          )}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </span>
        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
          {theme === "dark" ? "Switch" : "Switch"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/90 bg-white/80 p-2 text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-brand-400 hover:bg-brand-50/50 hover:text-brand-600 hover:shadow active:scale-95 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-brand-500/50 dark:hover:bg-slate-800 dark:hover:text-amber-300 ${className}`}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className="relative h-4 w-4 overflow-hidden">
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-amber-400 transition-all duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="h-4 w-4 text-slate-700 transition-all duration-300 rotate-0 scale-100 group-hover:text-brand-600" />
        )}
      </div>
    </button>
  );
}

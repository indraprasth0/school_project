"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useThemeContext } from "@/context/theme-data-provider";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const availableThemeColors = [
  { name: "Zinc", light: "bg-zinc-500", dark: "bg-zinc-700" },
  { name: "Neutral", light: "bg-neutral-500", dark: "bg-neutral-700" },
  { name: "Slate", light: "bg-slate-500", dark: "bg-slate-700" },
  { name: "Gray", light: "bg-gray-500", dark: "bg-gray-700" },
  { name: "Stone", light: "bg-stone-500", dark: "bg-stone-700" },
  { name: "Yellow", light: "bg-yellow-500", dark: "bg-yellow-700" },
  { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
  { name: "Red", light: "bg-red-500", dark: "bg-red-700" },
  { name: "Rose", light: "bg-rose-600", dark: "bg-rose-700" },
  { name: "Blue", light: "bg-blue-600", dark: "bg-blue-700" },
  { name: "Violet", light: "bg-violet-500", dark: "bg-violet-700" },
  { name: "Pink", light: "bg-pink-500", dark: "bg-pink-700" },
  { name: "Fuchsia", light: "bg-fuchsia-500", dark: "bg-fuchsia-700" },
  { name: "Purple", light: "bg-purple-500", dark: "bg-purple-700" },
  { name: "Indigo", light: "bg-indigo-500", dark: "bg-indigo-700" },
  { name: "Sky", light: "bg-sky-500", dark: "bg-sky-700" },
  { name: "Cyan", light: "bg-cyan-500", dark: "bg-cyan-700" },
  { name: "Teal", light: "bg-teal-500", dark: "bg-teal-700" },
  { name: "Emerald", light: "bg-emerald-500", dark: "bg-emerald-700" },
  { name: "Lime", light: "bg-lime-500", dark: "bg-lime-700" },
  { name: "Amber", light: "bg-amber-500", dark: "bg-amber-700" },
  { name: "Green", light: "bg-green-500", dark: "bg-green-700" },
];

export function ThemeColorToggle() {
  const { themeColor, setThemeColor } = useThemeContext();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme ?? "light" : theme;

  const handleColorChange = (value: string) => {
    if (isThemeColor(value)) {
      setThemeColor(value);
    }
  };

  const isThemeColor = (value: string): value is ThemeColors => {
    return availableThemeColors.some((c) => c.name === value);
  };

  React.useEffect(() => {
    if (!themeColor) return;

    const selectedColor = availableThemeColors.find((color) => color.name === themeColor);
    if (selectedColor) {
      const appliedTheme = currentTheme ?? "light";
      document.documentElement.style.setProperty(
        "--theme-primary",
        appliedTheme === "dark" ? selectedColor.dark : selectedColor.light
      );
    }
  }, [themeColor, currentTheme]);

  if (!mounted) return <div className="w-[40px] h-[40px]" />;

  const selectedColor = availableThemeColors.find((color) => color.name === themeColor);
  const colorClass = selectedColor
    ? currentTheme === "dark"
      ? selectedColor.dark
      : selectedColor.light
    : "bg-transparent";

  return (
    <div
      className="w-[35px] h-[35px] bg-p800 dark:bg-p500 transition-all rounded-md
      overflow-visible duration-300 ease-in-out hover:bg-black/10 hover:dark:bg-white/10 
      cursor-pointer flex items-center justify-center shadow border-none outline-none"
    >
      {/* Color circle preview */}
      <div
        className={cn(
          "absolute w-[12px] h-[12px] rounded-full pointer-events-none",
          colorClass
        )}
      />
      <Select
        onValueChange={handleColorChange}
        defaultValue={themeColor ?? undefined}
      >
        <SelectTrigger
          className="w-[35px] h-[35px] bg-p800 dark:bg-p500 transition-all rounded-md
      overflow-visible duration-300 ease-in-out hover:bg-black/10 hover:dark:bg-white/10 
      cursor-pointer flex items-center justify-center shadow border-none outline-none"         
        >
          <div
            className={cn(
              "rounded-full w-[15px] h-[15px]",
              currentTheme === "dark"
                ? availableThemeColors.find((c) => c.name === themeColor)?.dark
                : availableThemeColors.find((c) => c.name === themeColor)?.light
            )}
          />
        </SelectTrigger>

        <SelectContent>
          <div className="grid grid-cols-4 gap-2 p-1 pt-3">
            {availableThemeColors.map(({ name, light, dark }) => (
              <SelectItem key={name} value={name} className="flex justify-center">
                <div className="relative group">
                  <div
                    className={cn(
                      "rounded-full w-[15px] h-[15px] cursor-pointer transition duration-200 ease-in-out",
                      currentTheme === "dark" ? dark : light
                    )}
                  />
                  <span className="absolute left-1/2 -translate-x-1/2 -top-7 hidden group-hover:block bg-black text-white px-2 py-1 rounded text-xs">
                    {name}
                  </span>
                </div>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
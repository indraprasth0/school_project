// "use client";

// import * as React from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";


// export function ThemeModeToggle() {
//   const { setTheme, theme, systemTheme } = useTheme();
//   const [mounted, setMounted] = React.useState(false);
//   const [appliedTheme, setAppliedTheme] = React.useState<string | undefined>();

//   React.useEffect(() => {
//     setMounted(true);    
//     setAppliedTheme(theme === "system" ? systemTheme : theme);    
//   }, [theme, systemTheme]);

//   const handleThemeChange = () => {
//     const newTheme = appliedTheme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     setAppliedTheme(newTheme);

//     // Ensure background color updates correctly
//     setTimeout(() => {
//       document.documentElement.classList.remove("dark", "light");
//       document.documentElement.classList.add(newTheme);
//     }, 10); // Short delay to allow correct transition
//   };

//   if (!mounted) {
//     return <div className="h-[1.2rem] w-[1.2rem]" />;
//   }

//   return (
//     <div className="w-[40px] bg-white dark:bg-black rounded-md transition-all overflow-visible duration-300 ease-in-out hover:bg-black/10 hover:dark:bg-white/10 cursor-pointer flex items-center justify-center shadow" onClick={handleThemeChange} >
//       {appliedTheme === "dark" ? (
//         <Sun className="h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100 " />
//       ) : (
//         <Moon className="h-[1.2rem] w-[1.2rem] transition-all -rotate-90 scale-100" />
//       )}
//       <span className="sr-only">Toggle theme</span>
//     </div>
//   );
// }


"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeModeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [appliedTheme, setAppliedTheme] = React.useState<string | undefined>();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const resolvedTheme = theme === "system" ? systemTheme ?? "light" : theme;
    setAppliedTheme(resolvedTheme);
  }, [theme, systemTheme, mounted]);

  const handleThemeChange = () => {
    const newTheme = appliedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setAppliedTheme(newTheme);
  };

  if (!mounted) {
    return <div className="h-[1.2rem] w-[1.2rem]" />;
  }

  return (
    <div
      className="w-[40px] h-[40px] bg-white dark:bg-black rounded-md transition-all 
      overflow-visible duration-300 ease-in-out hover:bg-black/10 hover:dark:bg-white/10 
      cursor-pointer flex items-center justify-center shadow border-none outline-none"
      onClick={handleThemeChange}
      role="button"
      aria-label="Toggle Theme"
    >
      {appliedTheme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-black dark:text-white transition-all rotate-0 scale-100" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-black dark:text-white transition-all -rotate-90 scale-100" />
      )}
    </div>
  );
}

import themes from "./themes-colors";

export default function setGlobalColorTheme(
  themeMode: "light" | "dark",
  color: ThemeColors,
) {
  const theme = themes[color][themeMode] as {
    [key: string]: string,
  }

  for (const key in theme) {    
    document.documentElement.style.setProperty(`--${key}`, theme[key]);
  }
}


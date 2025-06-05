type ThemeColors = "Zinc" | "Neutral" | "Slate" | "Stone" |  "Gray" | "Yellow"| "Rose" | "Blue" | "Green" | "Orange" | "Red" | "Violet" | "Pink" | "Fuchsia" | "Purple" | "Indigo" | "Sky" | "Cyan"  | "Teal" | "Emerald" | "Lime" | "Amber" ;

interface ThemeColorStateParams {
    themeColor: ThemeColors | null;  // Null Allow 
    setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors | null>>; // Null Allow 
}

// Example usage of ThemeColorStateParams
const exampleThemeColorState: ThemeColorStateParams = {
    themeColor: "Blue",
    setThemeColor: () => {}
};

// Using exampleThemeColorState to avoid the unused variable error
console.log(exampleThemeColorState);
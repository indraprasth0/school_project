// "use client";

// import "./loading.css";
// import Link from "next/link";
// import { useTheme } from 'next-themes';
// import { useThemeContext } from "@/context/theme-data-provider"; // Theme Hook Import
// import themes from "@/lib/themes-colors";


// interface LoadingProps {
//   zoom?: number; // Optional zoom prop  
// }

// const Loading: React.FC<LoadingProps> = ({ zoom = 1}) => {
//   const { theme } = useTheme();
//   const { themeColor } = useThemeContext();

//   const isDarkMode = theme === 'dark';

//   const myTheme = themes[themeColor ?? "Blue"]; // Ensure theme exists  
//   const txtColor = isDarkMode ? `hsl(${myTheme.dark.p800})` : `hsl(${myTheme.light.p800})`;

//   return (
//     <>
//     <div className="loading-container" style={{ transform: `scale(${zoom})` }}>
//     <div className="book" style={{ '--color': txtColor } as React.CSSProperties}>
//         <div className="inner">
//           <div className="left"></div>
//           <div className="middle"></div>
//           <div className="right"></div>
//         </div>
//         <ul>
//           {Array.from({ length: 18 }).map((_, index) => (
//             <li key={index}></li>
//           ))}
//         </ul>
//       </div>
//     </div>

//       <Link
//         className="dribbble"
//         href="https://dribbble.com/shots/7199149-Book-Loader"
//         target="_blank"
//         rel="noopener noreferrer"
//       >        
//       </Link>
//     </>
//   );
// };

// export default Loading;



"use client";

import "./loading.css";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useThemeContext } from "@/context/theme-data-provider"; // Theme Hook Import
import themes from "@/lib/themes-colors";
import { useState, useEffect } from "react";

interface LoadingProps {
  zoom?: number; // Optional zoom prop  
}

const Loading: React.FC<LoadingProps> = ({ zoom = 1 }) => {
  const { theme } = useTheme();
  const { themeColor } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering before the theme is loaded
  if (!mounted) {
    return <div className="opacity-0">Wait...</div>;
  }

  const isDarkMode = theme === "dark";
  const myTheme = themes[themeColor ?? "Blue"];
  const txtColor = isDarkMode ? `hsl(${myTheme.dark.p800})` : `hsl(${myTheme.light.p800})`;

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="loading-container" style={{ transform: `scale(${zoom})` }}>
          <div className="book" style={{ "--color": txtColor } as React.CSSProperties}>
            <div className="inner">
              <div className="left"></div>
              <div className="middle"></div>
              <div className="right"></div>
            </div>
            <ul>
              {Array.from({ length: 18 }).map((_, index) => (
                <li key={index}></li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          className="dribbble"
          href="https://dribbble.com/shots/7199149-Book-Loader"
          target="_blank"
          rel="noopener noreferrer"
        ></Link>
      </div>
    </>
  );
};

export default Loading;

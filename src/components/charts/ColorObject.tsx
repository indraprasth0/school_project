const themeColorsObject = {
    Zinc: { 
      light: { chart1: '#71717A', chart2: '#A1A1AA', chart3: '#D4D4D8', chart4: '#E4E4E7', chart5: '#F4F4F5' }, 
      dark: { chart1: '#3F3F46', chart2: '#52525B', chart3: '#71717A', chart4: '#A1A1AA', chart5: '#D4D4D8' } 
    },
    Neutral: { 
      light: { chart1: '#737373', chart2: '#A3A3A3', chart3: '#D4D4D4', chart4: '#E5E5E5', chart5: '#F5F5F5' }, 
      dark: { chart1: '#404040', chart2: '#575757', chart3: '#737373', chart4: '#A3A3A3', chart5: '#D4D4D4' } 
    },
    Slate: { 
      light: { chart1: '#64748B', chart2: '#94A3B8', chart3: '#CBD5E1', chart4: '#E2E8F0', chart5: '#F1F5F9' }, 
      dark: { chart1: '#334155', chart2: '#475569', chart3: '#64748B', chart4: '#94A3B8', chart5: '#CBD5E1' } 
    },
    Gray: { 
      light: { chart1: '#6B7280', chart2: '#9CA3AF', chart3: '#D1D5DB', chart4: '#E5E7EB', chart5: '#F3F4F6' }, 
      dark: { chart1: '#374151', chart2: '#4B5563', chart3: '#6B7280', chart4: '#9CA3AF', chart5: '#D1D5DB' } 
    },
    Stone: { 
      light: { chart1: '#78716C', chart2: '#A8A29E', chart3: '#D6D3D1', chart4: '#E7E5E4', chart5: '#F5F5F4' }, 
      dark: { chart1: '#44403C', chart2: '#57534E', chart3: '#78716C', chart4: '#A8A29E', chart5: '#D6D3D1' } 
    },
    Yellow: { 
      light: { chart1: '#FACC15', chart2: '#FDE047', chart3: '#FEF08A', chart4: '#FEF9C3', chart5: '#FEFCE8' }, 
      dark: { chart1: '#A16207', chart2: '#EAB308', chart3: '#FACC15', chart4: '#FDE047', chart5: '#FEF08A' } 
    },
    Orange: { 
      light: { chart1: '#EA580C', chart2: '#F97316', chart3: '#FDBA74', chart4: '#FED7AA', chart5: '#FFEDD5' }, 
      dark: { chart1: '#9A3412', chart2: '#C2410C', chart3: '#EA580C', chart4: '#F97316', chart5: '#FDBA74' } 
    },
    Red: { 
      light: { chart1: '#DC2626', chart2: '#EF4444', chart3: '#F87171', chart4: '#FCA5A5', chart5: '#FEE2E2' }, 
      dark: { chart1: '#7F1D1D', chart2: '#991B1B', chart3: '#DC2626', chart4: '#EF4444', chart5: '#F87171' } 
    },
    Rose: { 
      light: { chart1: '#E11D48', chart2: '#FB7185', chart3: '#FDA4AF', chart4: '#FECDD3', chart5: '#FFE4E6' }, 
      dark: { chart1: '#881337', chart2: '#BE185D', chart3: '#E11D48', chart4: '#FB7185', chart5: '#FDA4AF' } 
    },
    Blue: { 
      light: { chart1: '#2563EB', chart2: '#3B82F6', chart3: '#60A5FA', chart4: '#93C5FD', chart5: '#DBEAFE' }, 
      dark: { chart1: '#1E40AF', chart2: '#1D4ED8', chart3: '#2563EB', chart4: '#3B82F6', chart5: '#60A5FA' } 
    },
    Violet: { 
      light: { chart1: '#7C3AED', chart2: '#A78BFA', chart3: '#C4B5FD', chart4: '#DDD6FE', chart5: '#EDE9FE' }, 
      dark: { chart1: '#5B21B6', chart2: '#6D28D9', chart3: '#7C3AED', chart4: '#A78BFA', chart5: '#C4B5FD' } 
    },
    Green: { 
      light: { chart1: '#059669', chart2: '#10B981', chart3: '#34D399', chart4: '#6EE7B7', chart5: '#D1FAE5' }, 
      dark: { chart1: '#065F46', chart2: '#047857', chart3: '#059669', chart4: '#10B981', chart5: '#34D399' } 
    },
    Pink: {
    light: { chart1: "#EC4899", chart2: "#F472B6", chart3: "#F9A8D4", chart4: "#FBCFE8", chart5: "#FCE7F3" },
    dark: { chart1: "#9D174D", chart2: "#BE185D", chart3: "#EC4899", chart4: "#F472B6", chart5: "#F9A8D4" }
  },
  Fuchsia: {
    light: { chart1: "#C026D3", chart2: "#D946EF", chart3: "#E879F9", chart4: "#F0ABFC", chart5: "#FAE8FF" },
    dark: { chart1: "#86198F", chart2: "#A21CAF", chart3: "#C026D3", chart4: "#D946EF", chart5: "#E879F9" }
  },
  Purple: {
    light: { chart1: "#9333EA", chart2: "#A855F7", chart3: "#C084FC", chart4: "#D8B4FE", chart5: "#EDE9FE" },
    dark: { chart1: "#581C87", chart2: "#6B21A8", chart3: "#9333EA", chart4: "#A855F7", chart5: "#C084FC" }
  },
  Indigo: {
    light: { chart1: "#4F46E5", chart2: "#6366F1", chart3: "#818CF8", chart4: "#A5B4FC", chart5: "#E0E7FF" },
    dark: { chart1: "#312E81", chart2: "#3730A3", chart3: "#4F46E5", chart4: "#6366F1", chart5: "#818CF8" }
  },
  Sky: {
    light: { chart1: "#0284C7", chart2: "#0EA5E9", chart3: "#38BDF8", chart4: "#7DD3FC", chart5: "#E0F2FE" },
    dark: { chart1: "#075985", chart2: "#0369A1", chart3: "#0284C7", chart4: "#0EA5E9", chart5: "#38BDF8" }
  },
  Cyan: {
    light: { chart1: "#0891B2", chart2: "#06B6D4", chart3: "#22D3EE", chart4: "#67E8F9", chart5: "#CFFAFE" },
    dark: { chart1: "#155E75", chart2: "#0E7490", chart3: "#0891B2", chart4: "#06B6D4", chart5: "#22D3EE" }
  },
  Teal: {
    light: { chart1: "#0D9488", chart2: "#14B8A6", chart3: "#2DD4BF", chart4: "#5EEAD4", chart5: "#CCFBF1" },
    dark: { chart1: "#115E59", chart2: "#0F766E", chart3: "#0D9488", chart4: "#14B8A6", chart5: "#2DD4BF" }
  },
  Emerald: {
    light: { chart1: "#059669", chart2: "#10B981", chart3: "#34D399", chart4: "#6EE7B7", chart5: "#D1FAE5" },
    dark: { chart1: "#065F46", chart2: "#047857", chart3: "#059669", chart4: "#10B981", chart5: "#34D399" }
  },
  Lime: {
    light: { chart1: "#65A30D", chart2: "#84CC16", chart3: "#A3E635", chart4: "#D9F99D", chart5: "#ECFCCB" },
    dark: { chart1: "#365314", chart2: "#3F6212", chart3: "#65A30D", chart4: "#84CC16", chart5: "#A3E635" }
  },
  Amber: {
    light: { chart1: "#D97706", chart2: "#F59E0B", chart3: "#FBBF24", chart4: "#FDE68A", chart5: "#FEF3C7" },
    dark: { chart1: "#92400E", chart2: "#B45309", chart3: "#D97706", chart4: "#F59E0B", chart5: "#FBBF24" }
  }
  };
  
  export default themeColorsObject;
  
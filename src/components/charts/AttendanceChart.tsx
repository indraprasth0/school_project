"use client";

import Image from "next/image";
import { useTheme } from 'next-themes';
import { useThemeContext } from "@/context/theme-data-provider"; // Theme Hook Import
import themeColorsObject from './ColorObject';

import { 
  BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

const data = [
  { name: "Mon", Present: 40, absent: 24 },
  { name: "Tue", Present: 30, absent: 13 },
  { name: "Wed", Present: 20, absent: 98 },
  { name: "Thu", Present: 27, absent: 39 },
  { name: "Fri", Present: 18, absent: 48 },
  { name: "Sat", Present: 23, absent: 38 },
];

const AttendanceChart = () => {
    const { theme } = useTheme();
  const { themeColor } = useThemeContext(); // 🌙 Get Theme Data

  const isDarkMode = theme === 'dark';

  // 🎨 Dynamic Colors from themeColorsObject
  const cTheme = themeColorsObject[themeColor ?? "Blue"]; // Default "Blue"
  const presentColor = isDarkMode ? cTheme.dark.chart1 : cTheme.light.chart1;
  const absentColor = isDarkMode ? cTheme.dark.chart3  : cTheme.light.chart3 ;
  const gridColor = isDarkMode ? "#444" : "#add";
  const tickColor = isDarkMode ? "#bbb" : "#d1d5db";

  return (
    <div className={`w-full h-full p-6 rounded-xl shadow-md ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Attendance</h1>
        <Image src={isDarkMode ? "/more.png" : "/moreDark.png"} alt="more" width={20} height={20} />
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: tickColor }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: tickColor }} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
          <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "15px", paddingBottom: "30px" }} />
          
          {/* 🎨 Dynamic Colors */}
          <Bar dataKey="absent" fill={absentColor} legendType="circle" radius={[10, 10, 0, 0]} activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Present" fill={presentColor} legendType="circle" radius={[10, 10, 0, 0]} activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;

"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useThemeContext } from "@/context/theme-data-provider"; // Theme Hook Import
import themeColorsObject from "./ColorObject";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "Apr", income: 2780, expense: 3908 },
  { name: "May", income: 1890, expense: 4800 },
  { name: "Jun", income: 2390, expense: 3800 },
  { name: "Jul", income: 3490, expense: 4300 },
  { name: "Aug", income: 3490, expense: 4300 },
  { name: "Sep", income: 3490, expense: 4300 },
  { name: "Oct", income: 3490, expense: 4300 },
  { name: "Nov", income: 3490, expense: 4300 },
  { name: "Dec", income: 3490, expense: 4300 },
];

const FinanceChart = () => {
  const { theme } = useTheme();
  const { themeColor } = useThemeContext(); // Get Theme Data
  
  const isDarkMode = theme === "dark";
  
  // 🎨 Dynamic Colors from themeColorsObject
  const cTheme = themeColorsObject[themeColor ?? 'Zinc' ]   || themeColorsObject["Blue"];
  const incomeColor = isDarkMode ? cTheme.dark.chart1 : cTheme.light.chart1;
  const expenseColor = isDarkMode ? cTheme.dark.chart3  : cTheme.light.chart3 ;
  const gridColor = isDarkMode ? "#444" : "#add";
  const tickColor = isDarkMode ? "#bbb" : "#d1d5db";
  
  return (
    <div className={`w-full h-full p-6 rounded-xl shadow-md ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Finance</h1>
        <Image src={isDarkMode ? "/more.png" : "/moreDark.png"} alt="more" width={20} height={20} />
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: tickColor }} tickLine={false} tickMargin={10} />
          <YAxis axisLine={false} tick={{ fill: tickColor }} tickLine={false} tickMargin={10} />
          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
          <Legend align="center" verticalAlign="top" wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }} />
          
          {/* 🎨 Dynamic Colors */}
          <Line type="monotone" dataKey="expense" stroke={expenseColor} strokeWidth={5} />
          <Line type="monotone" dataKey="income" stroke={incomeColor} strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;

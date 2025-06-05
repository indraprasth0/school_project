"use client"

import React from 'react';
import { PieChart, Pie,  ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';
import { useThemeContext } from "@/context/theme-data-provider"; // Theme Hook Import
import themes from '@/lib/themes-colors'
import Image from 'next/image';
// import themeColorsObject from './charts/ColorObject'





const Performance = () => {
    const { theme } = useTheme();
    const { themeColor } = useThemeContext();

    const isDarkMode = theme === 'dark';

    const myTheme = themes[themeColor ?? "Blue"]; // Default "Blue"
    //   const cTheme = themeColorsObject[themeColor ?? "Blue"]; // Default "Blue"
    //   const presentColor = isDarkMode ? cTheme.dark.chart1 : cTheme.light.chart1;
    //   const absentColor = isDarkMode ? cTheme.dark.chart3 : cTheme.light.chart5;
    
    const bgColor = isDarkMode ? `hsl(${myTheme.dark.p700})` : `hsl(${myTheme.light.p700})`;
    const btnColor = isDarkMode ? `hsl(${myTheme.dark.p400})` : `hsl(${myTheme.light.p400})`;

    const data = [
        { name: 'Group A', value: 92, fill: bgColor },
        { name: 'Group B', value: 8, fill: btnColor },
    ];


    return (
        <div className={`h-80 p-4 rounded-md shadow-md transition-all relative bg-p200`}>
            {/* Title */}
            <div className='flex justify-between items-center'>
                <h1 className="text-xl font-semibold text-p600">Performance</h1>                
                <Image src={isDarkMode ? "/more.png" : "/moreDark.png"} alt="more" width={20} height={20} />
            </div>
            {/* Charts 70}
            {/* <div cla3sName='relative w-full h-[720%]'> */}
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart >
                        <Pie
                            dataKey="value"
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            cx="50%"
                            cy="50%"
                            // outerRadius={70}
                            innerRadius={70}
                            className='shadow-lg'
                            fill="#8884d8"
                            // label
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h1 className="text-3xl font-semibold">9.2</h1>
                    <p className="text-sm text-p900">of 10 max LTS</p>
                </div>
                <h2 className="font-semibold absolute bottom-16 left-0 right-0 m-auto text-center">1st Semester - 2nd Semester</h2>
            {/* </div> */}
        </div>
    );
}


export default Performance;

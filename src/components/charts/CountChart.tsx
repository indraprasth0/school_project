'use client';

import Image from 'next/image';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';
import { useThemeContext } from '@/context/theme-data-provider';
import themeColorsObject from './ColorObject';


const CountCharts = () => {
  const { theme } = useTheme();
  const { themeColor } = useThemeContext();

  const isDarkMode = theme === 'dark';

  const selectedColors = themeColorsObject[themeColor ?? 'Zinc'] || themeColorsObject.Zinc;
  const colors = isDarkMode ? selectedColors.dark : selectedColors.light;

  
  const data = [
    { name: 'Total', count: 100, fill: isDarkMode ? '#1f2937' : '#fff' },
    { name: 'Girls', count: 45, fill: colors.chart1 },
    { name: 'Boys', count: 55, fill: colors.chart3  },
  ];

  return (
    <div className={`w-full h-full p-4 rounded-xl shadow-md transition-all ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Title */}
      <div className='flex justify-between items-center'>
        <h1 className={`${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'} font-semibold`}>Students</h1>
        <Image src={isDarkMode ? "/more.png" : "/moreDark.png"} alt="more" width={20} height={20} />
      </div>

      {/* Charts */}
      <div className='relative w-full h-[75%]'>
        <ResponsiveContainer>
          <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data} >
            <RadialBar  background={{ fill: isDarkMode ? '#111827' : '#e4e4e7' }} dataKey="count" stroke='none' strokeWidth={0}/>
          </RadialBarChart>
        </ResponsiveContainer>
        <Image src="/maleFemale.png" alt="mf" width={50} height={50} className="absolute border-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="rounded-full w-5 h-5" style={{ backgroundColor: colors.chart3  }} />
          <h1 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-bold`}>1234</h1>
          <h2 className="text-sm text-gray-400">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-full w-5 h-5" style={{ backgroundColor: colors.chart1 }} />
          <h1 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-bold`}>1234</h1>
          <h2 className="text-sm text-gray-400">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountCharts;

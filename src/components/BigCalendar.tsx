"use client"

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { calendarEvents } from '@/lib/data'
import { useState } from 'react'
import { useTheme } from 'next-themes';
import { useThemeContext } from "@/context/theme-data-provider"; // Theme Hook Import
import themeColorsObject from './charts/ColorObject'
import themes from '@/lib/themes-colors'




const localizer = momentLocalizer(moment)

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK)
  const { theme } = useTheme();
  const { themeColor } = useThemeContext();

  const isDarkMode = theme === 'dark';

  const myTheme = themes[themeColor ?? "Blue"]; // Default "Blue"
  const cTheme = themeColorsObject[themeColor ?? "Blue"]; // Default "Blue"
  const presentColor = isDarkMode ? cTheme.dark.chart1 : cTheme.light.chart1;
  const absentColor = isDarkMode ? cTheme.dark.chart3 : cTheme.light.chart5;
  const bgColor = `hsl(${myTheme.light.p50})`;
  const btnColor = isDarkMode ? `hsl(${myTheme.dark.p800})` : `hsl(${myTheme.light.p50})`;

  


  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView)
  }
  return (
    <>

      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]}
        view={view}
        style={{ height: "98%" }}
        onView={handleOnChangeView}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 18, 0, 0)}
        className='rbc-calendar rounded-md text-p950 dark:text-p50 p-4'
      />
      <style jsx global>{`
              .rbc-calendar .rbc-current-time-indicator  {
                background-color: ${presentColor} !important;
                height: 2px;
              }
              
              .rbc-calendar .rbc-today  {
                background-color: ${absentColor} !important;
              }
              
              .rbc-calendar .rbc-timeslot-group  {
                background-color: ${bgColor} !important;                
              }
              
              .rbc-calendar .rbc-toolbar button.rbc-active  {
                background-color: ${btnColor} !important;
              }
            `}</style>
    </>
  )
}

export default BigCalendar

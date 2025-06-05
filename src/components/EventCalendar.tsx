"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTheme } from "next-themes";
import { useThemeContext } from "@/context/theme-data-provider"; // Theme Hook Import
import themes from "@/lib/themes-colors";
import Image from "next/image";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const events = [
  {
    id: 1,
    title: "Mathematics Quiz",
    time: "10:00 AM - 11:30 AM",
    description: "Chapter 4 & 5 Quiz - Algebra and Geometry",
  },
  {
    id: 2,
    title: "Science Workshop",
    time: "1:00 PM - 3:00 PM",
    description: "Hands-on experiments in physics and chemistry.",
  },
  {
    id: 3,
    title: "Sports Day Practice",
    time: "4:00 PM - 5:30 PM",
    description: "Relay race and high jump practice session.",
  },
];

const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());
  const { theme } = useTheme();
  const { themeColor } = useThemeContext();

  const isDarkMode = theme === "dark";

  const myTheme = themes[themeColor ?? "Blue"]; // Ensure theme exists
  const btnColor = isDarkMode ? `hsl(${myTheme.dark.p100})` : `hsl(${myTheme.light.p300})`;
  const txtColor = isDarkMode ? `hsl(${myTheme.dark.p700})` : `hsl(${myTheme.light.p950})`;
  
 
  return (
    <div className="p-4 rounded-xl shadow-md w-full mx-auto bg-p200 text-p600 mb-8">
      <Calendar onChange={onChange} value={value} className="rounded-lg w-full border" />
      
      <div className="flex justify-between items-center mt-4">
        <h1 className="font-semibold text-lg">Upcoming Events</h1>
        <Image src={isDarkMode ? "/more.png" : "/moreDark.png"} alt="More options" width={20} height={20} />
      </div>

      <div className="flex flex-col gap-4 mt-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-5 rounded-md border-2 border-t-4 odd:border-t-p400 even:border-t-p600"            
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-p900">{event.title}</h2>
              <span className="text-p500 text-sm">{event.time}</span>
            </div>
            <p className="mt-1 text-sm">{event.description}</p>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .react-calendar__tile--active {
          background-color: ${btnColor};
          color: ${txtColor};
        }
      `}</style>
    </div>
  );
};

export default EventCalendar;

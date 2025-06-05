"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { role } from "@/lib/data";

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: "/inew/home.gif", icon1: "/inew/home.png", label: "Home", href: "/", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/inew/teacher.gif", icon1: "/inew/teacher.png", label: "Teachers", href: "/list/teachers", visible: ["admin", "teacher"] },
      { icon: "/inew/student.gif", icon1: "/inew/student.png", label: "Students", href: "/list/students", visible: ["admin", "teacher"] },
      { icon: "/inew/family.gif", icon1: "/inew/family.png", label: "Parents", href: "/list/parents", visible: ["admin", "teacher"] },
      { icon: "/inew/book.gif", icon1: "/inew/book.png", label: "Subjects", href: "/list/subjects", visible: ["admin"] },
      { icon: "/inew/lecture-room.gif", icon1: "/inew/lecture-room.png", label: "Classes", href: "/list/classes", visible: ["admin", "teacher"] },
      { icon: "/inew/lesson.gif", icon1: "/inew/lesson.png", label: "Lessons", href: "/list/lessons", visible: ["admin", "teacher"] },
      { icon: "/inew/exam.gif", icon1: "/inew/exam.png", label: "Exams", href: "/list/exams", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/inew/blackboard.gif", icon1: "/inew/blackboard.png", label: "Assignments", href: "/list/assignments", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/inew/grades.gif", icon1: "/inew/grades.png", label: "Results", href: "/list/results", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/inew/tasking.gif", icon1: "/inew/tasking.png", label: "Attendance", href: "/list/attendance", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/inew/icons8-event.gif", icon1: "/inew/icons8-event.png", label: "Events", href: "/list/events", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/inew/message.gif", icon1: "/inew/message.png", label: "Messages", href: "/list/messages", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/inew/announcement.gif", icon1: "/inew/announcement.png", label: "Announcements", href: "/list/announcements", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: "/inew/avatar.gif", icon1: "/inew/avatar.png", label: "Profile", href: "/profile", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/inew/icons8-settings.gif", icon1: "/inew/icons8-settings.png", label: "Settings", href: "/settings", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/inew/icons8-logout.gif", icon1: "/inew/icons8-logout.png", label: "Logout", href: "/logout", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
];

const Menu = ({ menuWidth }: { menuWidth: number }) => {
  const path = usePathname();
  const [hoveredItems, setHoveredItems] = useState<Record<string, boolean>>({});
  // const [myRole, setMyRole] = useState<string | null>(role);
  const hideLabels = menuWidth < 80;

  // useEffect(() => {
  //     setMyRole(myRole); // Dynamic role fetching
  //   }, [myRole]);


  // const handleMouseLeave = (id: string) => {
  //   setHoveredItems((prev) => ({ ...prev, [id]: false }));
  // };
  if (!role) return null;

  return (
    <div className="w-full flex flex-col gap-1">
      {menuItems.map((menu, index) => (
        <div key={index} className="w-full">
          {!hideLabels && <div className="pl-3 text-black font-semibold dark:text-white">{menu.title}</div>}
          {menu.items
            .filter((item) => item.visible.includes(role))
            .map((item) => {
              const isActive = item.href === path;
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className={`flex items-center justify-center gap-1 p-1 rounded-md hover:bg-p400 hover:text-p900 transition-all w-full ${isActive ? hideLabels ? "bg-p200" : "font-extrabold text-shadow underline" : ""} ${hideLabels ? "gap-0 p-0 pl-0" : "pl-7 justify-start"}`}
                  onMouseEnter={() => setHoveredItems((prev) => ({ ...prev, [item.label]: true }))}
                  onMouseLeave={() => setHoveredItems((prev) => ({ ...prev, [item.label]: false }))}
                >
                  {/* Icon */}
                  <div className="relative group flex items-center justify-center rounded-full bg-white shadow-sm shadow-black min-w-[30px] max-w-[50px] min-h-[30px] max-h-[50px] transition-all">
                    <Image
                      src={hoveredItems[item.label] ? item.icon : item.icon1}
                      alt={item.label}
                      height={hoveredItems[item.label] ? 35 : 22}
                      width={hoveredItems[item.label] ? 35 : 22}
                      unoptimized
                    />
                    <span
                      className="absolute left-1/2 -translate-x-1/2 -top-7 hidden group-hover:block bg-black text-white px-2 py-1 rounded text-xs w-auto truncate z-50"
                      style={{ maxWidth: `${menuWidth}px` }}
                    >
                      {item.label}
                    </span>
                  </div>
                  {!hideLabels && <span className="text-lg font-semibold flex-grow truncate ">{item.label}</span>}
                </Link>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default Menu;

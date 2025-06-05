"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Bad_Script } from "next/font/google";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { ImperativePanelHandle } from "react-resizable-panels";

const badScript = Bad_Script({
  variable: "--font-bad-script",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuRef = useRef<HTMLDivElement>(null); 
  const panelRef = useRef<ImperativePanelHandle>(null); 
  const [menuWidth, setMenuWidth] = useState(200); 

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMenuWidth(entry.contentRect.width); 
      }
    });

    if (menuRef.current) {
      observer.observe(menuRef.current); 
    }

    return () => observer.disconnect(); 
  }, []);

  const hideLabels = menuWidth < 80;
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen min-h-screen flex"
      autoSaveId="persistence"
    >
      <ResizablePanel
        defaultSize={11}
        maxSize={14 }
        className="relative bg-p700 dark:bg-p500 text-p50 h-screen min-h-screen"
        collapsible
        ref={panelRef} 
      >
        <div ref={menuRef} className="w-full">
          <Link href="/" className="flex items-center justify-center min-w-[50px] max-w-[80px] min-h-[50px] max-h-[80px] transition-all">
            <Image src="/logo/apple-touch-icon.png" width={50} height={50} alt="logo" />
            <span className={`${hideLabels ? "hidden" : "block"} text-shadow ${badScript.className} px-2`}>
              Result+
            </span>
          </Link>
          <Menu menuWidth={menuWidth} /> 
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel className="flex flex-col h-screen min-h-screen overflow-hidden">
        <Navbar />
        <div className="flex-grow min-h-[calc(100vh-190)] overflow-auto">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

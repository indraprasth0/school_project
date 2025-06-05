import Image from "next/image";
import { Bad_Script } from "next/font/google";

import { cn } from "@/lib/utils";

const badFont = Bad_Script({ subsets: ["latin"], weight: ["400"] });

export const Header = ({ label }: { label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div className="flex flex-row gap-x-5">
        <Image
          src="/logo/android-chrome-512x512.png"
          height={30}
          width={70}
          alt="Logo_image"
          className="flex item-center mx-auto mt-3 mb-0"
        />
        <h1
          className={cn(
            "text-5xl font-bold text-p950 drop-shadow-lg",
            badFont.className
          )}
        >
          Result<span className="align-super text-5xl">+</span>
        </h1>
      </div>
      <p className="text-p800 drop-shadow-md text-lg">{label}</p>
    </div>
  );
};
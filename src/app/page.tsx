import Image from "next/image";
import { Bad_Script } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { ThemeColorToggle } from "@/components/theme-color-toggle";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

const font = Bad_Script({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  return (
    <div className="h-full bg-[radial-gradient(ellipse_at_top,_hsl(var(--p300)),_hsl(var(--p50)))]">
      <main className="flex flex-col items-center justify-center ">
        <div className="flex items-center justify-center mt-13.5 ">
          <div className="flex items-center justify-center w-32 h-32  rounded-full overflow-visible bg-[radial-gradient(ellipse_at_center,_#fef9c3,_#fde047,_#ec4899)] shadow-[0_0_100px_40px_rgba(255,255,0,0.5)]">
            <Image
              src="/saraswati mata.png"
              width={150}
              height={150}
              alt="Maa_saraswati_image"
              className="absolute -inset-1  m-auto my-15 overflow-visible"
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-25 gap-5">
        <Image
          src="/logo/android-chrome-512x512.png"
          height={130}
          width={130}
          alt="Logo_image"
          className="flex flex-col item-center mt-10"
          />        
          <h1
            className={cn(
              "text-6xl font-bold text-p950 drop-shadow-lg",
              font.className
            )}
            >
            Result<span className="align-super text-7xl">+</span>
          </h1>
          </div>
          <div className="flex flex-col space-y-7 text-center mt-10">
          <p className="text-p600 text-lg font-semibold drop-shadow-md pb-4">
            Boost Your Grades: Focus, Learn, Succeed!
          </p>
          <LoginButton mode="modal" asChild>
          <Button size="lg" variant="yellowed" className="rounded-full">
            Now! Start with sign-up
          </Button>
          </LoginButton>
        </div>
      </main>
      <footer className="flex items-center justify-center w-full mt-25 text-p950 text-sm">
        @Indraprastha Computer Education, Sakri (2025)
      </footer>
      <div className="absolute flex flex-row bottom-3 left-3 gap-2">
        <ThemeColorToggle />
        <ThemeModeToggle />
      </div>
    </div>
  );
}
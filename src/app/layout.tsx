import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Nunito, } from "next/font/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

import ThemeDataProvider from "@/context/theme-data-provider";
import { QueryClientProviders } from "@/components/tanstack/providers"
import TanStackCover from "@/components/tanstack/tanstackCover";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Result Plus", template: "Result Plus | %s" },
  description: "Result Plus is a school management system.",
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={`${poppins.className} ${nunito.className} antialiased`}>          
          <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <ThemeDataProvider>
              <QueryClientProviders>
                <TanStackCover>
                  {children}
                  <Toaster richColors position="top-right" />
                </TanStackCover>
              </QueryClientProviders>
            </ThemeDataProvider>
            {process.env.NODE_ENV === "production" && <SpeedInsights />}
          </NextThemesProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
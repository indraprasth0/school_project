"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import { Social } from "@/components/auth/social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md dark:bg-[radial-gradient(ellipse_at_top,_hsl(var(--p300)),_hsl(var(--p50)))] bg-[radial-gradient(ellipse_at_top,_hsl(var(--p300)),_hsl(var(--p600)))]">
      <Image
        src="/shree.png"
        alt="ganesh"
        height={80}
        width={80}
        className="items-center mx-auto mt-[-50px] "
      />

      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
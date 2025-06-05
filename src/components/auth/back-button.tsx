import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" size="sm" className="w-full font-normal text-p800 hover:text-yellow-300" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full"
        variant="whitelist"
        size="lg"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-6 w-6" />
      </Button>
      <Button
        className="w-full"
        variant="whitelist"
        size="lg"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-6 w-6" />
      </Button>
    </div>
  );
};
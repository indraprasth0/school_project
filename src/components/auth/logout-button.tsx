"use client";

import { signOut } from "next-auth/react";

import { logout as serverLogout} from "@/actions/logout";

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const onClick = async () => {
    try {
      await serverLogout(); // cleanup on server
    } catch (err) {
      console.error("Server logout failed:", err);
    }

    // Then client-side redirect logout
    signOut({ callbackUrl: "/" });
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
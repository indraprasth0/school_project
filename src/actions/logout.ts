"use server"

import { signOut } from "@/auth"

export const logout = async () => {
    console.log("User logged out from server at", new Date());
    await signOut()
}
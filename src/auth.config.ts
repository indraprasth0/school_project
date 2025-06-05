import type { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture,
    };
  },
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // Credentials({
    //   async authorize(credentials: Partial<Record<string, unknown>>) {
    //     // ✅ Dynamic import prevents mongoose from loading in Edge Runtime
    //     const { authorizeUser } = await import("@/lib/authorizeUser");
    //     if (typeof credentials?.email === "string" && typeof credentials?.password === "string") {
    //       return authorizeUser({ email: credentials.email, password: credentials.password });
    //     }
    //     return null;
    //   },
    // }),
  ],
} satisfies NextAuthConfig;

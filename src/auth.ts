// "use server";
// import NextAuth from 'next-auth';
// import authConfig from '@/auth.config';
// import Credentials from "next-auth/providers/credentials";
// import clientPromise from '@/lib/mongodb'; 
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import { getUserById } from '@/data/user';
// import { getTwoFactorConfirmationByUserId, deleteTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
// import { getAccountByUserId, getAccountByUserIdUpdate } from "@/data/account"
// import { authorizeUser } from './lib/authorizeUser';

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   events: {
//   async linkAccount({ user }) {
//     try {      
//       const existingAccount = await getAccountByUserIdUpdate(user.id as string)

//       if (!existingAccount) {
//         console.error("Account not found during account linking:", user.id);
//         return;
//       }
//       console.log("Linking account for user:", user.id);      
//     } catch (error) {
//       console.error("Error linking account:", error);
//     }
//   }
// },
//   adapter: MongoDBAdapter(clientPromise), 
//   providers: [
//     Credentials({
//       async authorize(
//         credentials: Partial<Record<string, unknown>>,
//         // request: Request
//       ) {
//         try {
//           // Ensure credentials has the required properties
//           const { email, password } = credentials as { email?: string; password?: string };
//           if (!email || !password) {
//             return null;
//           }
//           const res = await authorizeUser({ email, password });
//           // Expect authorizeUser to return { success: boolean, data: User }
//           if (res?.success && res.data) {
//             // Return only the user object as required by NextAuth
//             return res.data as import("next-auth").User; // Cast to NextAuth's User type
//           }
//           return null;
//         } catch (error) {
//           console.log("Error authorizing user", error);
//           return null;
//         }
//       },
//     }),
//     ...authConfig.providers,
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: "/login",
//     error: "/error",
//   },
//   callbacks: {
//     async signIn({ user, account }) {
//       try {
//         if (account?.provider !== "credentials") return true

//         if (!user?.id) {
//           console.error("User ID is missing in signIn callback:", user);
//           return false;
//         }

//         const existingUser = await getUserById(user.id as string)

//         if (!existingUser?.emailVerified) return false;

//         if (existingUser.isTwoFactorEnabled) {
//           const twoFactorToken = await getTwoFactorConfirmationByUserId(existingUser.id)

//           if (!twoFactorToken) return false

//           await deleteTwoFactorConfirmationByUserId(existingUser.id)
//         }

//         return true
//       } catch (error) {
//         console.error("Error in signIn callback:", error);
//         return false;        
//       }
//     },    
//     async jwt({ token }) {
//       try {
//         console.log("JWT Callback - Token:", token);
//         if (!token.sub) return token

//         const existingUser = await getUserById(token.sub)
//         if (!existingUser) return token

//         const existingAccount = await getAccountByUserId(existingUser.id)

//         token.isOAuth = !!existingAccount
//         token.name = existingUser.name
//         token.email = existingUser.email
//         token.role = existingUser.role
//         token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
//         return token
//       } catch (error) {
//         console.error("Error in jwt callback:", error)
//         return token
//       }
//     },
//     async session({ session, token }) {
//       try {
//         if (token.sub && session.user) {
//           session.user.id = token.sub
//         }

//         if (token.role && session.user) {
//           session.user.role = token.role as string
//         }

//         if (session.user) {
//           session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
//         }

//         if (session.user) {
//           session.user.name = token.name
//           session.user.email = token.email as string
//           session.user.isOAuth = token.isOAuth as boolean
//         }

//         return session
//       } catch (error) {
//         console.error("Error in session callback:", error)
//         return session
//       }
//     },
//   },
//   // ...authConfig
// });
import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { getUserById } from '@/data/user';
import {
  getTwoFactorConfirmationByUserId,
  deleteTwoFactorConfirmationByUserId,
} from '@/data/two-factor-confirmation';
import {
  getAccountByUserId,
  getAccountByUserIdUpdate,
} from '@/data/account';
import { authorizeUser } from '@/lib/authorizeUser';

export const { handlers, auth, signIn, signOut } = NextAuth({
  events: {
    async linkAccount({ user }) {
      try {
        const existingAccount = await getAccountByUserIdUpdate(user.id as string);

        if (!existingAccount) {
          console.error('Account not found during account linking:', user.id);
          return;
        }

        // console.log('Linking account for user:', user.id);
      } catch (error) {
        console.error('Error linking account:', error);
      }
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email?: string;
            password?: string;
          };

          if (!email || !password) return null;

          const res = await authorizeUser({ email, password });
          if (res?.success && res.data) {
            return {
              ...res.data,
              id: ((res.data as unknown) as { id: string | { toString: () => string } }).id?.toString?.() ?? ((res.data as unknown) as { id: string }).id, // ensure id is a string
            } as import('next-auth').User;
          }
          return null;
        } catch (error) {
          console.error('Error authorizing user', error);
          return null;
        }
      },
    }),
    ...authConfig.providers,
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const isBlocked = await isOAuthProviderBlocked(user.email); // custom logic
          if (isBlocked) return false;
        }
        
        if (account?.provider !== 'credentials') return true;
        
        if (!user?.id) {
          console.error('User ID is missing in signIn callback:', user);
          return false;
        }

        const existingUser = await getUserById(user.id);
        if (!existingUser?.emailVerified) return false;

        if (existingUser.isTwoFactorEnabled) {
          const twoFactorToken = await getTwoFactorConfirmationByUserId(
            existingUser.id
          );

          if (!twoFactorToken) return false;

          await deleteTwoFactorConfirmationByUserId(existingUser.id);
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token }) {
      try {
        if (!token.sub) {
          console.warn('JWT token.sub missing');
          return token;
        }

        const existingUser = await getUserById(token.sub);
        if (!existingUser) return token;

        const existingAccount = await getAccountByUserId(existingUser.id);

        return {
          ...token,
          isOAuth: !!existingAccount,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          isTwoFactorEnabled: existingUser.isTwoFactorEnabled,
        };
      } catch (error) {
        console.error('Error in jwt callback:', error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (session.user) {
          session.user = {
            ...session.user,
            id: token.sub as string,
            role: token.role as string,
            isTwoFactorEnabled: token.isTwoFactorEnabled as boolean,
            name: token.name,
            email: token.email as string,
            isOAuth: token.isOAuth as boolean,
          };
        }

        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
  },
});

async function isOAuthProviderBlocked(email: string | null | undefined): Promise<boolean> {
  // Example: Block sign-in for specific emails or domains
  if (!email) return true; // Block if email is missing

  const blockedEmails = ['blocked@example.com'];
  const blockedDomains = ['baddomain.com'];

  const emailDomain = email.split('@')[1]?.toLowerCase();

  if (blockedEmails.includes(email.toLowerCase())) return true;
  if (emailDomain && blockedDomains.includes(emailDomain)) return true;

  return false;
}
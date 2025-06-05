import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, publicRoutes, authRoutes, apiRoutes } from "./routes"
import { NextResponse } from "next/server";


const { auth } = NextAuth(authConfig)

export default auth( (req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    console.log("IS LOGGED IN:", isLoggedIn);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isApiRoute = apiRoutes.includes(nextUrl.pathname)

    
    if (isApiAuthRoute) return;

    if(isApiRoute) return;

    if (isAuthRoute) {
        if (isLoggedIn) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname
        if (nextUrl.search) { callbackUrl += nextUrl.search }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl)

        return NextResponse.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
    }

    return;
})


export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  // eslint-disable-next-line
    const isLoggedIn = request.cookies.get("next-auth.session-token") || request.cookies.get("credentials-token")
    const isPublic = request.nextUrl.pathname === "/auth/logIn" || request.nextUrl.pathname === "/auth/signUp" || request.nextUrl.pathname === "/"
    
    console.log("isLoggedIn", isLoggedIn);
    
    if(isLoggedIn && isPublic){
        return NextResponse.redirect(new URL('/temp', request.url))
    }

    if(!isLoggedIn && request.nextUrl.pathname === "/temp"){
        return NextResponse.redirect(new URL('/auth/logIn', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/temp",
    "/auth/signUp",
    "/auth/logIn",
  ]
}
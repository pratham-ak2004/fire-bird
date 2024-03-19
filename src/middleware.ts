import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  // eslint-disable-next-line
    const isLoggedIn = request.cookies.get("next-auth.session-token") || request.cookies.get("credentials-token")
    const isPublic = request.nextUrl.pathname === "/logIn" || request.nextUrl.pathname === "/signUp" || request.nextUrl.pathname === "/"
    // const cookie = request.cookies.get("next-auth.session-token")

    // console.log(cookie["value"]);
    
      
      // if(isLoggedIn && isPublic){
      //   if(cookie && cookie["value"]){
      //     await fetch(new URL('/api/middle', request.url),{
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         id : cookie["value"]
      //       })
      //     }).then((res) => {
      //       res.json().then((data) => {
      //         if(res.status === 202){
      //           return NextResponse.redirect(new URL(`/user/${data["id"]}`, request.url))
      //         }else{
      //           return NextResponse.redirect(new URL(`/login`, request.url))
      //         }
      //       })
      //     })
      //     .catch((error) => {
      //       console.log(
      //         error
      //         );
      //       })
      //     }
      // }

      if(isLoggedIn && isPublic){
        return NextResponse.redirect(new URL(`/user`, request.url))
      }
      
      if(!isLoggedIn && request.nextUrl.pathname.startsWith("/user")){
        return NextResponse.redirect(new URL('/logIn', request.url))
      }
      
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/user",
    "/signUp",
    "/logIn",
  ]
}
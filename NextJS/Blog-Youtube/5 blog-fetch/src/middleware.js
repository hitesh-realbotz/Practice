import { NextResponse } from "next/server";

export function middleware(request){

    // if(request.nextUrl.pathname!="/login"){
     return NextResponse.redirect(new URL("/login",request.url))
    // }

}

export const config={
    matcher:["/about/:path*", "/study/:path*"] //To main & child routes
    // matcher:["/about/:path*", "/study/:path+"] //To skip main & consider child routes
    // matcher:["/about/:path*", "/study"] //To consider main route only
}
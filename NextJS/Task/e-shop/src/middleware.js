import { NextResponse } from "next/server";
import { isAuthenticated } from "./utils/validation/validation.utils";

export function middleware(request){

    console.log("Middleware 1 ",request.nextUrl.pathname, !!request.cookies.get('authToken')?.value);
    
    const authToken = request.cookies.get("authToken")?.value;
    if (!!authToken) {
        if(request.nextUrl.pathname == "/auth"){
            return NextResponse.redirect(new URL("/",request.url));
        }else{    
            return NextResponse.next();
        }
        
    }else{
        if(request.nextUrl.pathname == "/auth" 
            || request.nextUrl.pathname == "/auth/forgot-pass" 
            || request.nextUrl.pathname == "/"
            || request.nextUrl.pathname.includes("/product/")
            ){
            return NextResponse.next();
        }else{
            return NextResponse.redirect(new URL("/",request.url));
        }
    }

}

export const config={
    matcher:["/about","/profile/:path*", "/dashboard", "/orders/:path*","/product/:path*", "/auth/:path*"] //To main & child routes 
}
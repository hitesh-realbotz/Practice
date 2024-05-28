import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(request){
    let payload = await request.json();

    const loginUserResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_ACCOUNT}:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
    });
    cookies().set("authToken",loginUserResponse.data.idToken);
    cookies().set("userEmail",loginUserResponse.data.email);
    return NextResponse.json( loginUserResponse.data);    
}
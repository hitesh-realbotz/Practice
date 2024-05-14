import { user } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request){
    let res =  user;
    console.log(res);
   
    return NextResponse.json(res, {status:200});
}

export async function POST(request){
    let payload = await request.json();
   if (!payload.name) {
    return NextResponse.json({result: "Required field not found", success: false}, {status:400});
   }
   
    return NextResponse.json({result: "new user created", success: true}, {status:201});
}
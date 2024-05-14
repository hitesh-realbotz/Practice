import { user } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request){
    let res =  user;
    console.log(res);
   
    return NextResponse.json(res, {status:200});
}
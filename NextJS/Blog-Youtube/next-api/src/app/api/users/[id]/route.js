import { user } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request, content){
   const data =  user;
   console.log('API ');
   console.log( data);
   console.log( content);
   const userData = await data.filter((item)=> {return item.id == content.params.id});
   console.log(userData[0]);
   
    return await NextResponse.json(userData.length != 0 ? ({result: userData[0], status:200}) : ({result: "No Data Found!", success: false}));
}               
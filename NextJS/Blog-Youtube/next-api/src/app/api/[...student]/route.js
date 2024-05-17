import { NextResponse } from "next/server";

// Catch all api routes
export async function GET(request, content){
    console.log(content.params.student);
    // return new Response('All route catched!');
    return NextResponse.json({result: content.params.student}, {status:200});
}
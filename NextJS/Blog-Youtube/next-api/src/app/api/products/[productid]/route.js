import { connectionStr } from "@/lib/db";
import { Product } from "@/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content){
    const id = { _id: content.params.productid};
    const payload = await request.json();
    await mongoose.createConnection(connectionStr);
    let data = await Product.findOneAndUpdate(id, payload);
    console.log(data);
    // data = await data.json();
    return NextResponse.json({result: data, success: true});

}
export async function GET(request, content){
    const id = { _id: content.params.productid};
    await mongoose.createConnection(connectionStr);
    let data = await Product.findById(id);
    console.log(data);
    // data = await data.json();
    return NextResponse.json({result: data, success: true});

}
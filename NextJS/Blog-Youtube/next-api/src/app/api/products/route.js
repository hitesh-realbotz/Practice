import mongoose from "mongoose";
import { connectionStr } from "@/lib/db.js"
import { NextResponse } from "next/server";
import { Product } from "@/lib/model/product";

export async function GET() {
    await mongoose.connect(connectionStr);
    const data = await Product.find();

    console.log(data);
    return NextResponse.json({ result: data, success: true });
}
export async function POST(request) {
    const payload = await request.json();
    await mongoose.connect(connectionStr);

    // const product = new Product({
    // name: 'Note 10',
    // price: "20000",
    // company: "Samsung",
    // color: "Black",
    // category: "mobile",
    // });
    let data = [];
    try {
        const product = new Product(payload);
        data = await product.save();
        return NextResponse.json({ result: data, success: true });
    } catch (error) {
        return NextResponse.json({ result: error, success: false });
    }
}
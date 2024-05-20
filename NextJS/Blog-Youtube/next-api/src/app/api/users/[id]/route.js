import { user } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const data = user;
    const userData = await data.filter((item) => { return item.id == content.params.id });

    return NextResponse.json(userData.length != 0 ? ({ result: userData[0], status: 200 }) : ({ result: "No Data Found!", success: false }));
}
export async function PUT(request, content) {
    let payload = await request.json();
    payload.id = content.params.id;

    console.log('Put API called');
    if ((!payload.id || !payload.name || !payload.age || !payload.email)) {
        return NextResponse.json({ result: "Required field not valid", success: false }, { status: 400 });
    }
    const data = user;
    let isUser = await data.some((item) => (item.id == content.params.id));
    if (!isUser)
        return NextResponse.json({ result: "Required field not valid", success: false }, { status: 400 });

    return NextResponse.json({ result: payload, success: true }, { status: 201 });
}
export async function DELETE(request, content) {
    let id = content.params.id;

    console.log('Put API called');
    if (!id) return NextResponse.json({ result: "Id not provided", success: false }, { status: 400 });

    const data = user;
    const isUser = await data.some((item) => (item.id == id));
    if (!isUser)
        return NextResponse.json({ result: "User not found", success: false }, { status: 400 });

    return NextResponse.json({ result: "User deleted successfully!", success: true }, { status: 201 });
}               
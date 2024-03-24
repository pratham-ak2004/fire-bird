import { NextRequest , NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(request: NextRequest , response: NextResponse) {
    const input = await request.json();

    const receiver = await db.user.findFirst({
        where: {
            email : input.to
        }
    })

    if(receiver === null){
        return NextResponse.json({ result: 'User not found'} , { status: 208})
    }

     const res = await db.mail.create({
         data: {...input}
    })
    
    return NextResponse.json({ result: res} , { status: 200})
}

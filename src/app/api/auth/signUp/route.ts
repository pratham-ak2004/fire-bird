import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import type { EmailUser } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const reqBody = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { email , password, username } = reqBody;
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ifExistsByEmail:EmailUser| null = await db.emailUser.findFirst({where: { email: email }});
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ifExistsByUserName:EmailUser| null = await db.emailUser.findFirst({where: { name: username }});
    
    if (ifExistsByEmail !== null) {
      return NextResponse.json({ message: "Email already in use" }, { status: 226 }); // IM USED
    }
    if (ifExistsByUserName !== null) {
      return NextResponse.json({ message: "Username already in use" }, { status: 226 }); // IM USED
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    await db.emailUser.create({data: {email: email, name: username, password: password}});

    return NextResponse.json({ message: "success" },{ status: 201 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ message: "Error Occured" }, { status: 400 });
  }
}

// This function is not usefull so it is deprecated

import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id } = await request.json();
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const session = await db.session.findFirst({ where: { sessionToken: id }, select: { userId: true }});
    
    if (session) {
      const user = await db.user.findFirst({where: { id: session.userId }});

      if (user) {
        return NextResponse.json(
          { id: user.id, message: "success" },
          { status: 202 },
        );
      }
    }

    return NextResponse.json(
      { text: "user not found", message: "failure" },
      { status: 204 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error Occured", error: error },
      { status: 401 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(request: NextRequest, response: NextResponse) {
  const url = new URL(request.url);
  const user = url.searchParams.get("user");
  const id = url.searchParams.get("id");

  if (user === null || user === undefined || id === null || id === undefined) {
    return NextResponse.error();
  } else {
    const mails = await db.mail.findMany({
      where: {
        id: parseInt(id),
      },
    });

    if (!mails[0]?.deleted.includes(user)) {
      const res = await db.mail.update({
        where: {
          id: parseInt(id),
        },
        data: {
          deleted: {
            push: user,
          },
        },
      });
      return NextResponse.json({ result: res }, { status: 200 });
    }
  }
}

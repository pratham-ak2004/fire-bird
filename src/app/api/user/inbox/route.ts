import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: NextRequest, response: NextResponse) {
  const url = new URL(request.url);
  const user = url.searchParams.get("user");

  if (user === null || user === undefined) {
    return NextResponse.error();
  } else {
    const mails = await db.mail.findMany({
      where: {
        OR: [{ from: user }, { to: user }, { cc: user }, { bcc: user }],
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    const filteredData = mails.filter(
      (item) => !item.deleted.includes(user),
    );

    return NextResponse.json({ result: filteredData }, { status: 200 });
  }
}

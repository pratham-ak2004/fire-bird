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
        OR: [{ from: user }, { to: user }, { cc: user }, { bcc: user }], // has user
        starred: {
          has: user,
        },
      },
    });

    const filteredData = mails.filter((item) => !item.deleted.includes(user));

    return NextResponse.json({ result: filteredData }, { status: 200 });
  }
}

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

    if (mails[0]?.starred.includes(user)) {
      let starredArr = mails[0]?.starred;
      const index = starredArr?.indexOf(user);
      if (index !== undefined && index > -1) {
        starredArr?.splice(index, 1);
      }

      const res = await db.mail.update({
        where: {
          id: parseInt(id),
        },
        data: {
          starred: starredArr,
        },
      });
      return NextResponse.json({ result: res }, { status: 200 });
    } else {
      const res = await db.mail.update({
        where: {
          id: parseInt(id),
        },
        data: {
          starred: {
            push: user,
          },
        },
      });
      return NextResponse.json({ result: res }, { status: 200 });
    }
  }
}

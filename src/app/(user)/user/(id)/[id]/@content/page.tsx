"use client";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { DataTable } from "~/app/_components/data-table/data-table";
import { Label } from "~/components/ui/label";

export default function Content() {
  return (
    <>
      <SessionProvider>
        <ContentHelper />
      </SessionProvider>
    </>
  );
}
export type Email = {
  id: string;
  from: string;
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
};

const data: Email[] = [
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "value",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
  {
    id: "1",
    from: "from",
    to: "to",
    cc: "cc",
    bcc: "bcc",
    subject: "subject",
    body: "body",
  },
];

function ContentHelper() {
  const params = useSearchParams();
  const session = useSession();

  if (
    session !== undefined &&
    session.data !== undefined &&
    session.data?.user !== undefined &&
    session.data?.user.email !== undefined
  ) {
    switch (params.get("tab")) {
      case null:
      case "mail":
        return (
          <>
            <MailHelper cat={params.get("cat")} session={session}></MailHelper>
          </>
        );

      case "chat":
        return <>chat</>;

      case "meet":
        return <>meet</>;

      default:
        return <>default</>;
    }
  }
}

function MailHelper(props: { cat: string | null; session: any }) {
  const [mails, setMails] = useState([]);

  React.useEffect(() => {
    fetchData(props.session, setMails, props.cat ?? "");
  }, [props.cat, props.session]);

  if (props.cat === "inbox" || props.cat === null) {
    return (
      <>
        <DataTable
          data={mails}
          email={props.session.data.user.email}
          setMails={setMails}
        ></DataTable>
      </>
    );
  } else if (props.cat === "sent") {
    return (
      <>
        <DataTable
          data={mails}
          email={props.session.data.user.email}
          setMails={setMails}
        ></DataTable>
      </>
    );
  } else if (props.cat === "starred") {
    return (
      <>
        <DataTable
          data={mails}
          email={props.session.data.user.email}
          setMails={setMails}
        ></DataTable>
      </>
    );
  } else {
    return (
      <>
        <div className="mt-10 flex w-full flex-row justify-center">
          <Label className=" text-center text-xl font-semibold">
            Something went wrong
          </Label>
        </div>
      </>
    );
  }
}

async function fetchData(session: any, setMails: any, cat: string) {
  if (cat === undefined || cat === null || session.data === undefined) return;

  await axios
    .get(
      `/api/user/${cat === "" ? "inbox" : cat}?user=${session.data.user.email}`,
    )
    .then((response) => {
      // console.log("data", response.data.result);
      
        setMails(response.data.result);
    })
    .catch((err) => {
      console.log(err);
    });
}

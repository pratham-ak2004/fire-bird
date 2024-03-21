"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React from "react";

import MailOptions from "~/app/_components/mail-contents/MailOptions";

function ContentHelper() {
  const params = useSearchParams();
  const session = useSession();
  

  switch (params.get("tab")) {
    case "mail":
      return (
        <>
          <MailOptions session={session} cat={params.get("cat") ? params.get("cat") : null} />
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

export default function Content() {
  return (
    <>
      <SessionProvider>
        <ContentHelper />
      </SessionProvider>
    </>
  );
}

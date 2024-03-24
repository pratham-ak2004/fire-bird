"use client";
import React from "react";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Compose from "~/app/_components/user-components/compose";

import { Label } from "~/components/ui/label";

export default function page() {
  
  return (
    <SessionProvider>
      <div className="h-screen w-[300px] flex-none">
        <div className="flex h-20 w-full items-center justify-center gap-x-4 pt-4">
          <Image
            src="/fire-bird-icon.png"
            alt="Fire Bird"
            width={1280}
            height={720}
            className="aspect-auto size-14"
          ></Image>
          <Label className="text-xl font-medium uppercase text-[#27426a] dark:text-[#5187dc]">
            Fire Bird
          </Label>
        </div>
        <OptionList />
      </div>
    </SessionProvider>
  );
}

function OptionList() {
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const handleCatChange = (cat: string) => {
    const tab = params.get("tab") ?? "mail";
    const id = params.get("id");
    router.push(`${path}?tab=${tab}&cat=${cat}${id ? `&id=${id}` : ""}`);
  };

  switch (params.get("tab")) {
    case null:
    case "mail":
      return (
        <>
          <div className="mt-6">
            <Compose />
          </div>
          <div className="mt-6 flex flex-col gap-y-3 pl-2">
            <button
              className={`text-md h-8 pl-4 text-left font-semibold ${params.get("cat") === "inbox" || params.get("cat") === null ? "bg-active rounded-l-3xl" : "w-[270px] rounded-3xl"}`}
              onClick={() => handleCatChange("inbox")}
            >
              Inbox
            </button>
            <button
              className={`text-md h-8 pl-4 text-left font-semibold ${params.get("cat") === "sent" ? "bg-active rounded-l-3xl" : "w-[270px] rounded-3xl"}`}
              onClick={() => handleCatChange("sent")}
            >
              Sent
            </button>
            <button
              className={`text-md h-8 pl-4 text-left font-semibold ${params.get("cat") === "starred" ? "bg-active rounded-l-3xl" : "w-[270px] rounded-3xl"}`}
              onClick={() => handleCatChange("starred")}
            >
              Starred
            </button>
          </div>
        </>
      );

    case "chat":
      return (
        <>
          <div className="bg-three m-4 flex h-36 flex-col justify-center rounded-lg text-center">
            <div>Available soon</div>
          </div>
        </>
      );

    case "meet":
      return (
        <>
          <div className="bg-three m-4 flex h-36 flex-col justify-center rounded-lg text-center">
            <div>Available soon</div>
          </div>
        </>
      );

    default:
      return (
        <>
          <div className="h-full w-full bg-white">Something went wrong</div>
        </>
      );
  }
}

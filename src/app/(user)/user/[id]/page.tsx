"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import SideBar from "~/app/_components/user-componects/sideBar";
import OptionList from "~/app/_components/user-componects/optionList";

import { Label } from "~/components/ui/label";
// bg-gradient-to-b from-[#4604a6] to-[#24005a] dark:bg-gradient-to-b dark:from-[#2e026d] dark:to-[#15162c]

function UserIdHelper() {
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();

  return (
    <>
      <main className="flex flex-row">
        <SideBar />
        <div className="bg-two flex h-screen w-full flex-row">
          <div className="bg-two h-screen w-[300px] flex-none">
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
            <OptionList options={searchParams.get("tab") || "mail"} />
          </div>
          <div className="flex flex-col grow">
          <div className="h-20 bg-two">nav</div>
          <div className="grow bg-three rounded-tl-3xl text-white"> body</div>
          </div>
        </div>

        <></>
      </main>
    </>
  );
}

export default function userId() {
  return (
    <SessionProvider>
      <UserIdHelper />
    </SessionProvider>
  );
}

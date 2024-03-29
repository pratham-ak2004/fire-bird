"use client";
import React from "react";
import { useTheme } from "next-themes";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import { IoMdMail, IoMdChatbubbles } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";

export default function SideBar() {
  const { theme, setTheme } = useTheme();
  const params = useSearchParams();
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col items-center justify-between px-2 py-4 border-r-2">
      <div className="flex flex-col gap-4 items-center">
        <Link className={`size-10  p-1 ${params.get("tab") === "mail" || params.get("tab") === null ? "bg-active rounded-md" : ""}`} href={{ pathname: pathname, query: { tab: "mail" } }}>
          <IoMdMail className="size-8 rounded-sm" />
        </Link>
        <Link className={`size-10  p-1 ${params.get("tab") === "chat" ? "bg-active rounded-md" : ""}`} href={{ pathname: pathname, query: { tab: "chat" } }}>
          <IoMdChatbubbles className="size-8" />
        </Link>
        <Link className={`size-10  p-1 ${params.get("tab") === "meet" ? "bg-active text-background rounded-md" : ""}`} href={{ pathname: pathname, query: { tab: "meet" } }}>
          <MdVideoCall className="size-8" />
        </Link>
      </div>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="bg-active">
        <SunIcon className="block dark:hidden" />
        <MoonIcon className="hidden dark:block" />
      </Button>
    </div>
  );
}

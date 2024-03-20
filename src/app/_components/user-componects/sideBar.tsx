"use client";
import React from "react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import { IoMdMail, IoMdChatbubbles } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";

export default function SideBar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-screen flex-col items-center justify-between py-4 px-2 bg-one">
      <div className="flex flex-col gap-4">
        <IoMdMail className="size-8 rounded-sm" />
        <IoMdChatbubbles className="size-8" />
        <MdVideoCall className="size-8" />
      </div>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme}
      </Button>
    </div>
  );
}

"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { Label } from "~/components/ui/label";
import { Skeleton } from "~/components/ui/skeleton";

import "./styles.modules.css";

export default function User() {
  return (
    <SessionProvider>
      <Component />
    </SessionProvider>
  );
}

function Component() {
  const session = useSession();
  const router = useRouter();
  const { theme } = useTheme();

  if (session.status === "authenticated") {
    setTimeout(() => {
      router.push(`/user/${session.data.user.id}`);
    }, 2000);
  }

  return (
    <>
      <div
        className={`flex h-screen w-screen flex-col items-center justify-center gap-5 bg-gradient-to-b from-[#2e026d] to-[#15162c] ${theme === "light" ? "bg-white" : "bg-black"}`}
      >
        <Label
          className={`text-3xl ${theme === "light" ? "text-black" : "text-white"}`}
        >
          Loading your mails...
        </Label>
        <Skeleton className={`custom-animation h-2 w-10 bg-slate-500`} />
      </div>
    </>
  );
}

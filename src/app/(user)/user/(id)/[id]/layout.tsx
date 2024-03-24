import "~/styles/globals.css";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "~/app/_components/theme-provider";

import SideBar from "~/app/_components/user-components/sideBar";
import { Toaster } from "~/components/ui/toaster";
import UserNavBar from "~/app/_components/user-components/navbar";

export const metadata = {
  title: "Fire Bird",
  description: "A Mailing service Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function UserLayout({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <main className="bg-inactive flex flex-row">
      <SideBar />
      <div className="flex h-screen w-full flex-row">
        {children}
        <div className="flex grow flex-col">
          <UserNavBar />
          <div className="bg-inactive h-[90%] grow rounded-tl-3xl">
            <div className="bg-inactive h-full w-full rounded-tl-2xl border-l-4 border-t-4 border-black dark:border-white">
              {content}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

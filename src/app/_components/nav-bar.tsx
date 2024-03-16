"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { set } from "zod";

export default function NavBar() {
  const { setTheme , theme } = useTheme();

  const toggleTheme = () => {
    
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <div className="flex h-16 w-full justify-center bg-slate-200 dark:bg-black fixed">
        <div className="flex h-full w-full max-w-screen-xl items-center p-4">
          <Link className="flex w-fit flex-row items-center gap-4" href={"/"}>
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
          </Link>
          <ul className="flex flex-row gap-4 ml-auto">
            <li>
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                  <SunIcon className="block dark:hidden" />
                  <MoonIcon className="hidden dark:block" />
              </Button>
            </li>
            <li>
              <Link href="/auth/logIn">
                <Button className="border-2 bg-white text-black hover:bg-slate-100 dark:bg-black dark:text-white hover:dark:bg-slate-800">
                  Sign In
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/auth/signUp">
                <Button className="hidden sm:block">Create Account</Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

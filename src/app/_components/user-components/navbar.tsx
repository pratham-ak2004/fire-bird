"use client";
import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { SessionProvider, signOut, useSession } from "next-auth/react";

export default function UserNavBar() {
  return (
    <>
      <SessionProvider>
        <UserNavBarHelper />
      </SessionProvider>
    </>
  );
}

function UserNavBarHelper() {
  const session = useSession();
  const [ userImage , setUserImage ] = useState<string>("/profile-loader.webp");

  useEffect(() => {
    setUserImage(session.data?.user.image || "/profile-loader.webp")
  },[session.data?.user.image])

  return (
    <>
      <div className="h-16">
        <Popover>
          <PopoverTrigger className="ml-auto mr-8 flex h-full items-center">
            <Avatar>
              <AvatarImage src={userImage} />
              <AvatarFallback>
                <Skeleton />
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="mr-4 w-fit">
            <Button onClick={() => signOut()}>Sign Out</Button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

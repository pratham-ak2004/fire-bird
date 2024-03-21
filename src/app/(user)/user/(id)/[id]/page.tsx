import React from "react";
import Image from "next/image";

import OptionList from "~/app/_components/user-componects/optionList";

import { Label } from "~/components/ui/label";

export default function page() {
  return (
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
  );
}

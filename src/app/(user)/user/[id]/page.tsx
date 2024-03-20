import React from "react";
import SideBar from "~/app/_components/user-componects/sideBar";
// bg-gradient-to-b from-[#4604a6] to-[#24005a] dark:bg-gradient-to-b dark:from-[#2e026d] dark:to-[#15162c]

export default function UserId() {
  return (
    <>
      <main className="flex flex-row">
        <SideBar />
        <div className="h-screen w-full bg-three">
          <div className="h-screen w-72 bg-two">

          </div>
        </div>
      </main>
    </>
  );
}

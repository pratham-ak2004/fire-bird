import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { Button } from "~/components/ui/button"
import { ChevronRightIcon } from "@radix-ui/react-icons"


export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Fire <span className="text-[hsl(280,100%,70%)]">Bird</span>
        </h1>
        <p className="text-wrap font-medium text-lg">A simple, fast and secure email service</p>
        <Link href="/signUp">
          <Button className="rounded-lg bg-white text-black dark:bg-black dark:text-white">Sign Up <ChevronRightIcon className="h-4 w-4 ml-2" /></Button>
        </Link>
      </div>
      
    </main>
  );
}

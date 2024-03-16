import { unstable_noStore as noStore } from "next/cache";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Link from "next/link";

import { Button } from "~/components/ui/button"
import { ChevronRightIcon } from "@radix-ui/react-icons"


export default async function Home() {
  noStore();
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Fire <span className="text-[hsl(280,100%,70%)]">Bird</span>
        </h1>
        <p className="text-wrap font-medium text-lg">A simple, fast and secure email service</p>
        <Link href="/auth/signUp">
          <Button className="rounded-lg bg-white text-black dark:bg-black dark:text-white ">Sign Up <ChevronRightIcon className="h-4 w-4 ml-2" /></Button>
        </Link>


        {/* <CrudShowcase /> */}
      </div>
    </main>
  );
}

// eslint-disable-next-line
async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}

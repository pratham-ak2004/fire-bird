"use client";
import { Button } from "~/components/ui/button";
import { MdModeEditOutline } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function OptionList(props: any) {
  const { options } = props;
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const handleCatChange = (cat: string) => {
    const tab = params.get("tab") || "mail";
    const id = params.get("id");
    router.push(`${path}?tab=${tab}&cat=${cat}${id ? `&id=${id}` : ""}`);
  };

  switch (options) {
    case "mail":
      return (
        <>
          <div className="mt-6">
            <Button className="ml-4 w-40">
              <MdModeEditOutline />
              Compose
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-y-3 pl-2">
            <button
              className={`bg-three text-md h-8 pl-4 text-left font-semibold ${params.get("cat") === "inbox" || params.get("cat") === null ? "rounded-l-3xl" : "w-[270px] rounded-3xl"}`}
              onClick={() => handleCatChange("inbox")}
            >
              Inbox
            </button>
            <button
              className={`bg-three text-md h-8 pl-4 text-left font-semibold ${params.get("cat") === "sent" ? "rounded-l-3xl" : "w-[270px] rounded-3xl"}`}
              onClick={() => handleCatChange("sent")}
            >
              Sent
            </button>
            <button
              className={`bg-three text-md h-8 pl-4 text-left font-semibold ${params.get("cat") === "starred" ? "rounded-l-3xl" : "w-[270px] rounded-3xl"}`}
              onClick={() => handleCatChange("starred")}
            >
              Starred
            </button>
          </div>
        </>
      );
    case "chat":
      return (
        <>
          <div className="bg-three m-4 flex h-36 flex-col justify-center rounded-lg text-center">
            <div>Available soon</div>
          </div>
        </>
      );

    case "meet":
      return (
        <>
          <div className="bg-three m-4 flex h-36 flex-col justify-center rounded-lg text-center">
            <div>Available soon</div>
          </div>
        </>
      );

    default:
      return (
        <>
          <div className="h-full w-full bg-white">Something went wrong</div>
        </>
      );
  }
}

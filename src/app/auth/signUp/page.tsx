"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState , useEffect } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Separator } from "~/components/ui/separator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const formSchema = z.object({
  email: z.string().email(),
  verificationCode: z.string().min(6).max(50),
});

export default function SignUp() {
  const [progress, setProgress] = useState(0);
  const [ currTab, setCurrTab] = useState("account");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      verificationCode: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setProgress(90);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setTimeout(() => {
      setProgress(100);
    },1000)
  }

  useEffect(() => {
    if (progress < 100) {
      setTimeout(() => {
        setProgress(progress + 10);
      }, 100);
    } else {
      setProgress(0);
    }
  },[]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="mx-6 h-fit w-full max-w-xl rounded-xl bg-slate-200 p-4 text-black dark:bg-black dark:text-white">
            <div className="mb-4 mt-4 w-full text-center text-2xl font-medium">
              Sign <span className="text-[hsl(280,100%,70%)]">Up</span>
            </div>
            <Progress
              value={progress}
              className="my-4 h-1 bg-slate-400 dark:bg-slate-800"
            />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col items-center justify-center gap-4 space-y-8"
              >
                {/* username and email*/}

                <Tabs defaultValue="account" className="w-full gap-2 p-4">
                  <TabsContent value="account">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xl">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="xyz@firemail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="verify">
                    <FormField
                      control={form.control}
                      name="verificationCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  className="text-xl">Verification Code</FormLabel>
                          <FormControl className="flex flex-row justify-center items-center">
                            {/* OTP */}
                            <InputOTP
                              maxLength={6}
                              {...field}
                              render={({ slots }) => (
                                <>
                                  <InputOTPGroup>
                                    {slots.slice(0, 3).map((slot, index) => (
                                      <InputOTPSlot key={index} {...slot} />
                                    ))}{" "}
                                  </InputOTPGroup>
                                  {/* <InputOTPSeparator /> */}
                                  <InputOTPGroup>
                                    {slots.slice(3).map((slot, index) => (
                                      <InputOTPSlot key={index} {...slot} />
                                    ))}
                                  </InputOTPGroup>
                                </>
                              )}
                            />
                            {/* OTP end */}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsList className="w-full gap-6 dark:bg-black mt-6">
                    <TabsTrigger
                      value="account"
                      className="w-full basis-1/2 dark:bg-white dark:text-black"
                      onClick={() => {setCurrTab("account");setProgress(10)}}
                      disabled={currTab === "account" || form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                    >
                      Back
                    </TabsTrigger>
                    <TabsTrigger
                      value="verify"
                      disabled={!emailRegex.test(form.getValues("email"))}
                      className={`w-full basis-1/2 dark:bg-white dark:text-black ${currTab === "account" ? "" : "hidden"}`}
                      onClick={() => {setCurrTab("verify");setProgress(50)}}
                    >
                      Next
                    </TabsTrigger>
                    <Button
                      type="submit"
                      className={`h-8 w-full basis-1/2 rounded-sm dark:bg-white dark:text-black ${currTab === "account" ? "hidden" : ""}`}
                      disabled={!form.formState.isValid || form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                    >
                      submit
                    </Button>
                  </TabsList>
                </Tabs>
              </form>
            </Form>

            <div className="mb-4 flex w-full flex-row content-center items-center justify-center gap-4">
              <Separator className="basis-[45%]" />{" "}
              <h1 className="text-lg font-medium">or</h1>{" "}
              <Separator className="basis-[45%]" />
            </div>

            <div className="mb-2 flex w-full flex-col content-center items-center gap-4">
              <Button className="w-[70%]" variant="secondary">
                Sign Up with Google
              </Button>
              <Button className="w-[70%]" variant="secondary">
                Sign Up with Facebook
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

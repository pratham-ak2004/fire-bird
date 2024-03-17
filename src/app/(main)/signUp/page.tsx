"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Separator } from "~/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const formSchema = z.object({
  userName: z.string().min(6),
  email: z.string().email("Invalid Email address"),
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine((data) => {
  return data.password === data.confirmPassword;
},{
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export default function SignUp() {
  const [progress, setProgress] = useState(0);
  const [currTab, setCurrTab] = useState("account");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setProgress(90);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = signIn("credentials", {"email" : values.email , "password" : values.password});
    console.log(res);
    
    console.log(values);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }

  useEffect(() => {
    if (progress < 100) {
      setTimeout(() => {
        setProgress(progress + 10);
      }, 100);
    } else {
      setProgress(0);
    }
    // eslint-disable-next-line
  }, []);

  const handleTabChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    tab: string,
    prog: number,
    prevent: boolean,
  ) => {
    if (prevent) {
      event.preventDefault();
    }
    setCurrTab(tab);
    setProgress(prog);
  };

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
                    {/* username */}
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xl">Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="@username"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {form.getValues("userName").length < 6 &&
                            form.getFieldState("userName").isTouched
                              ? "Username should be greater than 6 characters"
                              : ""}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    {/* email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xl">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="xyz@firemail.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {!emailRegex.test(form.getValues("email")) &&
                            form.getFieldState("email").isTouched
                              ? "Invalid Email address"
                              : ""}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="password">
                    {/* password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xl">Password</FormLabel>
                          <FormControl className="flex flex-row items-center justify-center">
                            <Input
                              placeholder="******"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {!passwordRegex.test(form.getValues("password")) &&
                            form.getFieldState("password").isTouched
                              ? "Password must contain atleast one capital, digit and symbol"
                              : ""}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                    {/* confirm password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xl">
                            Confirm Password
                          </FormLabel>
                          <FormControl className="flex flex-row items-center justify-center">
                            <Input
                              placeholder="******"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage>
                            {form.getValues("password") !==
                              form.getValues("confirmPassword") &&
                            form.getFieldState("confirmPassword").isTouched
                              ? "Passwords do not match"
                              : ""}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsList className="mt-6 w-full gap-6 dark:bg-black">
                    <TabsTrigger
                      value="account"
                      className="w-full basis-1/2 dark:bg-white dark:text-black"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTabChange(e, "account", 10, true)
                      }
                      disabled={
                        currTab === "account" ||
                        form.formState.isSubmitting ||
                        form.formState.isSubmitSuccessful
                      }
                    >
                      Back
                    </TabsTrigger>
                    <TabsTrigger
                      value="password"
                      className={`w-full basis-1/2 dark:bg-white dark:text-black ${currTab === "account" ? "" : "hidden"}`}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        handleTabChange(e, "password", 50, true)
                      }
                      disabled={
                        !emailRegex.test(form.getValues("email")) ||
                        form.getValues("userName").length < 6
                      }
                    >
                      Next
                    </TabsTrigger>
                    <Button
                      type="submit"
                      className={`h-8 w-full basis-1/2 rounded-sm dark:bg-white dark:text-black ${currTab === "account" ? "hidden" : ""}`}
                      onClick={() => {
                        setProgress(90);
                      }}
                      disabled={
                        !form.formState.isValid ||
                        form.formState.isSubmitting ||
                        form.formState.isSubmitSuccessful ||
                        !passwordRegex.test(form.getValues("password")) || form.getValues("password") !== form.getValues("confirmPassword")
                      }
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
              <Button className="w-[70%]" variant="secondary" onClick={() => signIn("google")}>
              <FcGoogle className="mr-2 size-6" />Sign Up with Google
              </Button>
              {/* <Button className="w-[70%]" variant="secondary">
                Sign Up with Facebook
              </Button> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

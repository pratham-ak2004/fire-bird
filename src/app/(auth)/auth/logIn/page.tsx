"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn , signOut } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

export default function LogIn() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try{

      const res = await signIn("credentials" , {"email" : values.email , "password" : values.password});
      console.log(res);
      
    }catch(err){
      console.log(err);
      
    }
    console.log(values);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          
          <div className="mx-6 h-fit w-full max-w-xl rounded-xl bg-slate-200 p-4 text-black dark:bg-black dark:text-white">

            <div className="mb-4 mt-4 w-full text-center text-2xl font-medium">Log <span className="text-[hsl(280,100%,70%)]">In</span></div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col items-center justify-center gap-2 mb-4"
              >

                {/* username */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full gap-2 p-1">
                      <FormLabel className="text-xl">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="xyz@firemail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full gap-2 p-1">
                      <FormLabel className="text-xl">Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                
                <div className="flex w-full justify-center mt-4">

                    <Button
                      type="submit"
                      className="w-[70%]"
                      disabled={!form.formState.isValid || form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                    >
                      submit
                    </Button>
                </div>
              </form>
            </Form>

            <div className="mb-4 flex w-full flex-row content-center items-center justify-center gap-4">
              <Separator className="basis-[45%]" />{" "}
              <h1 className="text-lg font-medium">or</h1>{" "}
              <Separator className="basis-[45%]" />
            </div>

            <div className="mb-2 flex w-full flex-col content-center items-center gap-4">
              <Button className="w-[70%]" variant="secondary" onClick={() => signIn("google")}>
              <FcGoogle className="mr-2 size-6" />Log In with Google
              </Button>
              {/* <Button className="w-[70%]" variant="secondary">
                Log In with Facebook
              </Button> */}
            </div>


          </div>
        </div>
      </main>
    </>
  );
}

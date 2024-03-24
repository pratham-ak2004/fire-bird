//import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import axios from "axios";

import { MdModeEditOutline } from "react-icons/md";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/use-toast";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "~/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export default function Compose() {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="bg-active ml-3 flex flex-row items-center rounded-lg p-2">
          {/* <Button className="bg-active"> */}
          <MdModeEditOutline className="mr-2" />
          Compose
          {/* </Button> */}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center font-bold">
              New Email
            </AlertDialogTitle>
            <AlertDialogDescription>
              <EmailForm />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

const formSchema = z.object({
  to: z.string().email(),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  subject: z.string().min(1),
  body: z.string().min(1),
  sentAt: z.string().optional(),
});

export function EmailForm() {
  const { toast } = useToast();
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
      sentAt: new Date().toISOString(),
    },
  });

  function showToast() {
    if (!form.formState.isValid) {
      toast({
        title: "Invaild Fields",
        description: "Enter the valid details in the fields",
        variant: "destructive",
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // to do
    const data = {
      ...values,
      from: session.data?.user.email ?? "",
      sentAt: new Date(),
    };

    
    axios.post("/api/user/newMail", data).then((res) => {
      if(res.status === 200){
        toast({
          title: "Success",
          description: "Mail sent successfully",
          variant: "default",
        })
      }else if(res.status === 208){
        toast({
          title: "Error",
          description: "Invalid target receiver email address",
          variant: "destructive",
        })
      }else{
        toast({
          title: "Error",
          description: "Error in sending mail",
          variant: "destructive",
        })
      }
    }).catch((err) => {
      toast({
        title: "Error",
        description: "Error in sending mail",
        variant: "destructive",
      })
      console.log(err);
    })
    
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 bg-inactive"
        >
          {/* To */}
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-full w-full flex-row items-center gap-2">
                  <FormLabel className="w-6">To</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                </div>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* CC */}
          <FormField
            control={form.control}
            name="cc"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-full w-full flex-row items-center gap-2">
                  <FormLabel className="w-6">CC</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                </div>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* BCC */}
          <FormField
            control={form.control}
            name="bcc"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-full w-full flex-row items-center gap-2">
                  <FormLabel className="w-6">BCC</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                </div>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <div className=" mt-6 h-full w-full">
                  <FormControl>
                    <Input placeholder="Subject" {...field} />
                  </FormControl>
                </div>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Body */}
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <div className=" mt-6 h-full w-full">
                  <FormControl>
                    <Textarea placeholder="Body" {...field} />
                  </FormControl>
                </div>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row space-x-4">

          <span onClick={showToast}>
            <AlertDialogAction
              type="submit"
              disabled={form.formState.isValid === false}
            >
              Send
            </AlertDialogAction>
          </span>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
        </form>
      </Form>
    </>
  );
}

import axios from "axios";
import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { Button } from "~/components/ui/button";
import { Email } from "~/app/(user)/user/(id)/[id]/@content/page";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "~/components/ui/dialog";

export function DataTable(props: any) {
  const [target, setTarget] = React.useState<Email | undefined>(undefined);

  function handleStarredToggle(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) {
    e.preventDefault();
    if (
      props.email !== null ||
      props.email !== undefined ||
      props.email !== ""
    ) {
      axios
        .post(`/api/user/starred?id=${id}&user=${props.email}`)
        .then((response) => {
          console.log(response.data.result);

          const updatedMails = props.data.map((mail: { id: any }) =>
            mail.id === response.data.result.id ? response.data.result : mail,
          );

          props.setMails(updatedMails);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) {
    e.preventDefault();
    if (
      props.email !== null ||
      props.email !== undefined ||
      props.email !== ""
    ) {
      axios
        .post(`/api/user/delete?id=${id}&user=${props.email}`)
        .then((response) => {
          console.log(response.data.result);

          const updatedMails = props.data.map((mail: { id: any }) => {
            if (mail.id !== response.data.result.id) {
              return mail;
            }
          });
          if (updatedMails === undefined) {
            props.setMails([]);
          } else {
            props.setMails(updatedMails);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getHourMinutes(dateStr: string) {
    const date = new Date(dateStr);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return date.toLocaleTimeString(navigator.language, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: timeZone,
    });
  }

  return (
    <>
      <Dialog>
        <div className="h-full overflow-y-scroll">
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            {props.data.length === 0 && (
              <TableCaption className="text-lg">
                You dont have any mails yet
              </TableCaption>
            )}
            <TableHeader>
              <TableRow>
                <TableHead className="w-20"></TableHead>
                <TableHead className="w-72 text-center">From</TableHead>
                <TableHead className="min-w-72 text-left">Subject</TableHead>
                <TableHead className="w-24">Time</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="h-[90%] overflow-y-auto">
              {props.data.map((item: any, index: number) => {
                if (item !== undefined) {
                  return (
                    <TableRow key={index}>
                      <TableCell className="flex w-20 flex-row">
                        <Button
                          className="bg-inactive hover:bg-backgroun"
                          onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                          ) => {
                            handleStarredToggle(e, item.id);
                          }}
                        >
                          {item?.starred.includes(props.email) ? (
                            <FaStar className="size-5" />
                          ) : (
                            <FaRegStar className="size-5" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="w-72 min-w-72 truncate text-center">
                        {item?.from}
                      </TableCell>
                      <DialogTrigger
                        className="mb-3 h-full w-full"
                        asChild
                        key={index}
                        onClick={() => setTarget(item)}
                      >
                        <TableCell className="text-left">
                          {item?.subject}
                        </TableCell>
                      </DialogTrigger>
                      <TableCell className="text-left">
                        {getHourMinutes(item?.sentAt)}
                      </TableCell>
                      <TableCell className="w-20">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            {/* className="bg-inactive hover:bg-background" */}
                            <SlOptions className="size-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                            {/* <DropdownMenuSeparator /> */}
                            <DropdownMenuItem>
                              <span
                                className="bg-inactive hover:bg-background"
                                onClick={(
                                  e: React.MouseEvent<
                                    HTMLButtonElement,
                                    MouseEvent
                                  >,
                                ) => {
                                  handleStarredToggle(e, item?.id);
                                }}
                              >
                                Star
                              </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span
                                onClick={(
                                  e: React.MouseEvent<
                                    HTMLButtonElement,
                                    MouseEvent
                                  >,
                                ) => {
                                  handleDelete(e, item?.id);
                                }}
                              >
                                Delete
                              </span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{target?.from}</DialogTitle>
            <DialogTitle className="text-md">
              Subject: {target?.subject}
            </DialogTitle>
            <DialogDescription>{target?.body}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {/* <Button type="submit">Confirm</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

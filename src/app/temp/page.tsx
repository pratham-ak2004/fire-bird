"use client"
import React from 'react'
import { Button } from '~/components/ui/button'
import { signOut } from 'next-auth/react'

export default function Temp() {
  return (
    <div className='w-screen h-screen dark:text-white text-black flex justify-center'> <Button className="size-10 mt-24" onClick={() => signOut()}>Log Out</Button> </div>
  )
}

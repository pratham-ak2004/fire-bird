"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function User() {
  return (
    <SessionProvider>
      <Component />
    </SessionProvider>
  )
}

function Component() {
  const session = useSession();
  const router = useRouter();
  
  if(session.status === "authenticated"){
    router.push(`/user/${session.data.user.id}`)
  }
  
  return(
    <></>
  )
}

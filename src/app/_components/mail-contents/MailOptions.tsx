import { SessionContextValue } from 'next-auth/react'
import React from 'react'

export default function MailOptions(props: {cat: string | null , session: SessionContextValue | null}) {    
  
    switch (props.cat) {
        case null:
        case "inbox":
            return (<>inbox</>)

        case "sent":
            return (<>sent</>)

        case "starred":
            return (<>starred</>)
    
        default:
            return (<>default</>)
    }


}

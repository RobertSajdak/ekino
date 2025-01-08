'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { Toaster } from "../ui/toaster"

type TProps = {
    children: ReactNode
}

export default function Providers({children}: TProps) {
    return (
        <SessionProvider>
            {children}
            <Toaster />
        </SessionProvider>
    )
}

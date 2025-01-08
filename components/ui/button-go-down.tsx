'use client'

import { ReactNode } from "react";
import { Button } from "./button";
import { Icons } from "../icons/icons";

type TProps = {
    children: ReactNode
}

export default function ButtonGoDown({children}: TProps) {
    return (
        <Button variant={'link'} size={'lg'} onClick={() => window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        })} className="bg-transparent text-lg text-white [&:hover_svg]:translate-y-2">
        <Icons.arrowDown className="mr-4 transition duration-500" />
            {children}
        </Button>
    )
}

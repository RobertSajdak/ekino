'use client'

import { useFormStatus } from "react-dom"
import { Button } from "./button";
import Loader from "./loader";

type TProps = {
    text: string
}

export default function SubmitButton({text}: TProps) {

    const {pending} = useFormStatus();

    return (
        <Button type="submit" className="w-full relative">
            {text}
            {pending ? <Loader className="absolute right-2.5 top-2.5" /> : ''}
        </Button>
    )
}

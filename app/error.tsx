"use client"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
     error,
     reset
}: {
     error: Error & { digest?: string },
     reset: () => void
}) {

     useEffect(() => {
         console.error(error)
     },[error])

    return (
        <div className="text-white text-center space-y-5">
            <h2>Coś poszło nie tak!</h2>
            <Button onClick={reset}>
                 Spróbuj ponownie
            </Button>
        </div>
    );
}

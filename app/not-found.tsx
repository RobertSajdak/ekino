import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <article className="text-white text-center flex flex-col gap-7">
            <div className="text-9xl">404</div>
            <div className="text-2xl">Nie znaleziono podanej strony</div>
            <Link href={'/'}>
                <Button>Wróć na stronę główną</Button>
            </Link>
        </article>
    )
}

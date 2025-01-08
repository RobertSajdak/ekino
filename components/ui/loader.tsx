import { cn } from "@/utils/lib/tailwind"
import { Icons } from "../icons/icons"

type TProps = {
    className?: string
}

export default function Loader({className}: TProps) {
    return (
        <Icons.loaderCircle className={cn(
            'size-5 animate-spin stroke-primary',
            className
        )} />
    )
}

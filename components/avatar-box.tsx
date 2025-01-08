import { cn } from "@/utils/lib/tailwind";
import { getNameInitials } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Heading from "./ui/heading";

type TProps = {
    name?: string | null;
    image?: string | null;
    className?: string;
    isHeadingVisible?: boolean;
}

export default function AvatarBox({name, image, className, isHeadingVisible = true}: TProps) {

    const nameInitials = name ? getNameInitials(name) : 'EK';

    return (
        <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <Avatar className={cn('size-36 border-2 border-primary', className)}>
                <AvatarImage src={image || ''} />
                <AvatarFallback className="bg-foreground text-5xl text-primary">
                    {!image ? nameInitials : null}
                </AvatarFallback>
            </Avatar>
            {isHeadingVisible ? <Heading variant="h2" tag="h1" className="text-white">
                {name || ''}
            </Heading> : ''}
        </div>
    )
}

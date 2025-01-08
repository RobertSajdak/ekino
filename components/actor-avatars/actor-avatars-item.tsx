import Image from "next/image"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

type TProps = {
    name: string,
    character: string,
    src?: string,
}

export default function ActorAvatarsItem({name, character, src}: TProps) {
    return (
        <HoverCard openDelay={350}>
            <HoverCardTrigger>
                {
                    src ? <Image
                        className="aspect-square rounded-full object-cover size-[60px]"
                        src={src}
                        width={60}
                        height={60}
                        alt={name}
                        /> : <div className="aspect-square rounded-full bg-primary size-[60px]" />
                }
            </HoverCardTrigger>
            <HoverCardContent className="tooltip-bottom relative mt-5 w-full p-4 rounded-none text-center bg-foreground border-primary">
                <div className="text-lg text-white">{name}</div>
                <div className="text-silver">{character}</div>
            </HoverCardContent>
        </HoverCard>
    )
}

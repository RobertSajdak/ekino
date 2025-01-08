import { TMediaTypes } from '@/types/types';
import { cn } from "@/utils/lib/tailwind";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { typeToLabel, typeToLink } from "@/utils/translations";
import Heading from "../ui/heading";
import UsersRating from "../user-rating";
import Link from "next/link";
import { Button } from "../ui/button";
import { TMDBImage500URL } from "@/config/tmdb-config";

type TProps = {
	id: number;
	src: string;
	title: string;
	type: TMediaTypes;
	originalTitle?: string;
	created?: string;
	rating?: number;
	ratingCount?: number;
	className?: string;
};

export default function MediaItem({
	id,
	src,
	title,
	type,
	originalTitle,
	created,
	rating,
	ratingCount,
	className,
}: TProps) {

    const typeText = typeToLabel(type);
    const typeLink = typeToLink(type);

	return <div className={cn('relative h-[520px] w-full sm:w-[364px] max-w-[364px] overflow-hidden border border-primary bg-black mx-auto', className)}>
        <Image src={TMDBImage500URL + src} alt="" width={364} height={520} className="object-cover object-top h-full" />
        <div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-foreground to-transparent" />
        <div className="absolute bottom-0 w-full p-5 pb-0">
            <Badge className="mb-1.5 text-foreground">{typeText}</Badge>
            <Heading tag="h4" variant="h3" className="text-white pb-0">
                {title}
            </Heading>
            <div className="mt-3">
                <div className="text-sm text-silver">
                    <div>{originalTitle}</div>
                    <div>{created}</div>
                </div>
                {
                    ratingCount && rating ? (
                        <UsersRating ratingCount={ratingCount} rating={rating} />
                    ) : ''
                }
            </div>
            <div className="my-5 text-center">
                <Link href={`/filmy-i-seriale/${typeLink}/${id}`}>
                    <Button variant={'outline'} className="w-full bg-transparent text-white">Dowiedz się więcej</Button>
                </Link>
            </div>
        </div>
    </div>;
}

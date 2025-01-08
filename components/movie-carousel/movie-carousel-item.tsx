import TMDB from "@/types/tmdb-types"
import { CarouselItem } from "../ui/carousel";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Heading from "../ui/heading";
import UsersRating from "../user-rating";
import Link from "next/link";
import { Button } from "../ui/button";
import { TMDBImageOriginalURL } from "@/config/tmdb-config";

type TProps = {
    movie: TMDB.TMovie;
    hasPriority: boolean;
}

export default function MovieCarouselItem({movie: {
    id,
    backdrop_path,
    title,
    original_title,
    release_date,
    vote_average,
    vote_count
}, hasPriority = false}: TProps) {
    return (
        <CarouselItem className="relative h-[50vh] w-full pl-0 lg:h-[calc(100vh_-_77px)]">
            <Image src={`${TMDBImageOriginalURL}${backdrop_path}`} fill priority={hasPriority} alt="" className="object-cover object-top" />
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-foreground to-transparent" />
            <div className="absolute top-1/4 w-full sm:top-1/3 lg:top-1/2">
                <div className="container">
                    <Badge className="mb-3 text-foreground">Film</Badge>
					<Heading tag="h2">{title}</Heading>
					<div className="mt-3 max-w-[450px]">
						<div className="hidden flex-row gap-3 text-silver lg:flex">
							<span>{original_title}</span>
							<span>{release_date}</span>
						</div>
						<UsersRating rating={vote_average} ratingCount={vote_count} />
					</div>
					<div className="mt-3 text-center lg:mt-20">
						<Link href={`/filmy-i-seriale/filmy/${id}`}>
							<Button variant={'outline'} className="bg-transparent text-white">
								Dowiedz się więcej
							</Button>
						</Link>
					</div>
                </div>
            </div>
        </CarouselItem>
    )
}

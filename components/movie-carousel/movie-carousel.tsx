'use client'

import TMDB from "@/types/tmdb-types"
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "../ui/carousel";
import MovieCarouselItem from "./movie-carousel-item";
import MovieCarouselDots from "./movie-carousel-dots";

type TProps = {
    movies: TMDB.TMovie[];
}

export default function MovieCarousel({movies}: TProps) {
    return (
        <Carousel
            opts={{
                loop: true,
                duration: 45
            }}
        >
            <CarouselContent>
                {movies.map((movie, idx) => (
                    <MovieCarouselItem key={movie.id} movie={movie} hasPriority={idx === 0} />
                ))}
            </CarouselContent>
            <CarouselPrevious className="bottom-0 left-4 top-auto hidden size-12 border-none bg-primary lg:flex 2xl:left-24 2xl:top-1/2" />
            <CarouselNext className="bottom-0 right-4 top-auto hidden size-12 border-none bg-primary lg:flex 2xl:right-24 2xl:top-1/2" />
            <div className="hidden lg:block">
                <MovieCarouselDots />
            </div>
        </Carousel>
    )
}

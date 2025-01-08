import TMDB from "@/types/tmdb-types"
import MediaItem from "./media-item";

type TProps = {
    mediaType: 'movie',
    mediaList: TMDB.TMovie[],
} | {
    mediaType: 'tv',
    mediaList: TMDB.TTV[]
}

export default async function MediaGrid({mediaType, mediaList}: TProps) {

    let mediaGridData;

    if(mediaType === 'movie') {
        mediaGridData = mediaList.map(movie => (
            <MediaItem
                key={movie.id}
                id={movie.id}
                src={movie.poster_path}
                title={movie.title}
                originalTitle={movie.original_title}
                rating={movie.vote_average}
                ratingCount={movie.vote_count}
                created={movie.release_date}
                type="movie"
            />
        ));
    } else if(mediaType === 'tv') {
        mediaGridData = mediaList.map(tv => (
            <MediaItem
                key={tv.id}
                id={tv.id}
                src={tv.poster_path}
                title={tv.name}
                originalTitle={tv.original_name}
                rating={tv.vote_average}
                ratingCount={tv.vote_count}
                created={tv.first_air_date}
                type="tv"
            />
        ));
    }

    return (
        <div className="grid xl:grid-cols-3 gap-5">
            {mediaGridData}
        </div>
    )
}

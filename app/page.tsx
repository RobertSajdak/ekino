import { Suspense } from 'react';
import TMDBService from '@/server/services/tmdb-service';

import Heading from '@/components/ui/heading';
import Section from '@/components/ui/section';
import InfoBox from '@/components/info-box';
import MediaGrid from '@/components/media-grid/media-grid';
import MediaGridSkeleton from '@/components/media-grid/media-grid-skeleton';
import MovieCarousel from '@/components/movie-carousel/movie-carousel';
import Search from "@/components/search/search";

export default async function HomePage() {
	const [
		trendingMovies,
		topRatedMovies,
		topRatedTV,
		movieGenres,
		tvGenres,
		countries,
	] = await Promise.all([
		TMDBService.getTrendingMovies(),
		TMDBService.getTopRatedMovies(),
		TMDBService.getTopRatedTV(),
		TMDBService.getMovieGenres(),
		TMDBService.getTVGenres(),
		TMDBService.getCountries(),
	]);

	return (
		<article>
			<section>
				{trendingMovies ? (
					<MovieCarousel movies={trendingMovies} />
				) : (
					''
				)}
			</section>
			<Section>
				<Heading tag="h2" variant="h3">
					Szukaj filmów i seriali:
				</Heading>
				{movieGenres && tvGenres && countries ? (
					<Search
						countries={countries}
						movieGenres={movieGenres}
						tvGenres={tvGenres}
					/>
				) : (
					''
				)}
			</Section>
			<Section>
				<Heading tag="h2" variant="h3">
					Filmy i seriale:
				</Heading>
				<Suspense fallback={<MediaGridSkeleton />}>
					<div>
						{topRatedMovies ? (
							<MediaGrid
								mediaList={topRatedMovies}
								mediaType="movie"
							/>
						) : (
							''
						)}
					</div>
					<div className="pt-5">
						{topRatedTV ? (
							<MediaGrid mediaList={topRatedTV} mediaType="tv" />
						) : (
							''
						)}
					</div>
				</Suspense>
			</Section>
			<Section>
				<Heading className="mb-12 text-center" tag="h2" variant="h1">
					Płacisz za to, co oglądasz:
				</Heading>
				<InfoBox />
			</Section>
		</article>
	);
}

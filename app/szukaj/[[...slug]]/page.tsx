import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import TMDBService from '@/server/services/tmdb-service';

import TMDB from '@/types/tmdb-types';
import { TMediaFilterSearchParams } from '@/types/types';
import Heading from '@/components/ui/heading';
import Section from '@/components/ui/section';
import { Separator } from '@/components/ui/separator';
import MediaGrid from '@/components/media-grid/media-grid';
import Search from '@/components/search/search';

type TProps = {
	params: {
		slug?: string[];
	};
	searchParams?: TMediaFilterSearchParams;
};

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
	return {
		title: !params.slug
			? `Szukaj filmu lub serialu`
			: `Szukaj: ${params.slug}`,
	};
}

export default async function SearchPage({ params, searchParams }: TProps) {
	if (params.slug !== undefined && params.slug.length > 1) {
		redirect('/');
	}

	const type = searchParams?.type || 'movie';
	const slug = params.slug ? params.slug[0] : undefined;

	const [mediaListRes, movieGenres, tvGenres, countries] = await Promise.all([
		TMDBService.filterMedia(slug, searchParams),
		TMDBService.getMovieGenres(),
		TMDBService.getTVGenres(),
		TMDBService.getCountries(),
	]);

	const mediaList = mediaListRes?.results;
	let mediaGrid = null;

	if (mediaList && type === 'movie') {
		mediaGrid = (
			<MediaGrid
				mediaList={mediaList as TMDB.TMovie[]}
				mediaType="movie"
			/>
		);
	} else if (mediaList && type === 'tv') {
		mediaGrid = (
			<MediaGrid mediaList={mediaList as TMDB.TTV[]} mediaType="tv" />
		);
	}

	let mediaHeading = null;

	if (mediaList && type === 'movie') {
		mediaHeading = (
			<Heading tag="h2" variant="h3">
				Filmy ({mediaListRes.total_results})
			</Heading>
		);
	} else if (mediaList && type === 'tv') {
		mediaHeading = (
			<Heading tag="h2" variant="h3">
				Seriale ({mediaListRes.total_results})
			</Heading>
		);
	} else {
		mediaHeading = (
			<Heading tag="h2" variant="h3">
				Brak wyników
			</Heading>
		);
	}

	return (
		<article>
			<Section>
				{ movieGenres && tvGenres && countries ? <Search
					countries={countries}
					movieGenres={movieGenres}
					tvGenres={tvGenres}
				/> : ''}
			</Section>
			<Section>
				{mediaHeading}
				<Separator className="mb-7" />
				{mediaGrid}
			</Section>
		</article>
	);
}

import { Metadata } from 'next';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { commentActions } from '@/server/actions';
import TMDBService from '@/server/services/tmdb-service';
import { linkToType, typeToLabel } from '@/utils/translations';

import { TMDBImageOriginalURL } from '@/config/tmdb-config';
import Heading from '@/components/ui/heading';
import Section from '@/components/ui/section';
import Comments from '@/components/comments/comments';
import Gallery from '@/components/gallery/gallery';
import MediaBG from '@/components/media-bg';
import UsersRating from '@/components/user-rating';

type TProps = {
	params: {
		type: string;
		stringId: string;
	};
};

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
	return {
		title: `${params.type.toUpperCase()} ID: ${params.stringId}`,
	};
}

export async function generateStaticParams() {
	const [topRatedMovies, topRatedTV] = await Promise.all([
		TMDBService.getTopRatedMovies(),
		TMDBService.getTopRatedTV(),
	]);

	if (!topRatedMovies || !topRatedTV) return [];

	const moviesParams = topRatedMovies.map(({ id }) => ({
		type: 'filmy',
		stringId: String(id),
	}));

	const tvParams = topRatedTV.map(({ id }) => ({
		type: 'seriale',
		stringId: String(id),
	}));

	return [...moviesParams, ...tvParams];
}

export default async function MoviesTVPage({
	params: { stringId, type },
}: TProps) {
	if (type !== 'filmy' && type !== 'seriale') {
		redirect('/szukaj');
	}

	const mediaType = linkToType(type);
	const typeLabel = typeToLabel(mediaType);
	const id = parseInt(stringId);

	const [media, images, comments] = await Promise.all([
		mediaType === 'movie'
			? TMDBService.getMovieDetails(id)
			: TMDBService.getTVDetails(id),
		mediaType === 'movie'
			? TMDBService.getMovieImages(id)
			: TMDBService.getTVImages(id),
		commentActions.getComments(id, mediaType),
	]);

	if (!media) notFound();

	return (
		<article>
			<section>
				<MediaBG
					src={TMDBImageOriginalURL + media.backdrop_path}
					title={'title' in media ? media.title : media.name}
					originalTitle={
						'original_title' in media
							? media.original_title
							: media.original_name
					}
					created={
						'release_date' in media
							? media.release_date
							: media.first_air_date
					}
					rating={media.vote_average}
					ratingCount={media.vote_count}
					type={mediaType}
					actorsList={media.credits.cast.slice(0, 4)}
					actorsListCount={media.credits.cast.length}
				/>
			</section>
			<Section>
				<Heading tag="h2" variant="h3">
					Opis {typeLabel.toLowerCase()}u{' '}
					{'title' in media ? media.title : media.name}
				</Heading>
				<div className="text-white">{media.overview}</div>
			</Section>
			{images?.backdrops ? (
				<Section>
					<Gallery images={images.backdrops} />
				</Section>
			) : (
				''
			)}
			<Section className="mx-auto max-w-[900px]">
				<Heading tag="h2" variant="h3">
					Opinie oglądających:
				</Heading>
				<div className="grid gap-3 sm:grid-cols-2 sm:gap-10">
					<Image
						src={'/testimonial-ok.svg'}
						width={500}
						height={500}
						alt="Kobieta dająca okejkę"
						className="mx-auto"
					/>
					<UsersRating
						variant="large"
						ratingCount={
							comments.success ? comments.data.length : 0
						}
						rating={
							comments.success
								? comments.data.reduce(
										(acc, curr) => acc + curr.rating,
										0,
									) / comments.data.length
								: 0
						}
					/>
				</div>
				<Comments
					comments={comments.success ? comments.data : undefined}
				/>
			</Section>
		</article>
	);
}

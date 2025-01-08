import Image from 'next/image';
import { typeToLabel } from '@/utils/translations';

import TMDB from '@/types/tmdb-types';
import { TMediaTypes } from '@/types/types';

import ActorAvatars from './actor-avatars/actor-avatars';
import { Badge } from './ui/badge';
import ButtonGoDown from './ui/button-go-down';
import Heading from './ui/heading';
import UsersRating from './user-rating';

type TProps = {
	src: string;
	title: string;
	type: TMediaTypes;
	originalTitle?: string;
	created?: string;
	rating?: number;
	ratingCount?: number;
	actorsList?: TMDB.TCast[];
	actorsListCount?: number;
};

export default function MediaBG({
	src,
	title,
	type,
	originalTitle,
	created,
	rating,
	ratingCount,
	actorsList,
	actorsListCount,
}: TProps) {
	const typeLabel = typeToLabel(type);

	return (
		<div className="relative h-[50vh] w-full pl-0 lg:h-[calc(100vh_-_77px)]">
			<Image
				src={src}
				fill
				priority
				alt=""
				className="object-cover object-top"
			/>
			<div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-foreground to-transparent" />
			<div className="absolute top-1/4 w-full sm:top-1/3 lg:top-1/2">
				<div className="container">
					<Badge className="mb-3 text-foreground">{typeLabel}</Badge>
					<Heading tag="h2" className="text-white lg:max-w-[67%]">
						{title}
					</Heading>
					<div className="mt-3 max-w-[450px]">
						<div className="flex flex-col gap-3 text-silver lg:flex-row">
							<span>{originalTitle}</span>
							<span>{created}</span>
						</div>
						{rating && ratingCount ? (
							<UsersRating
								rating={rating}
								ratingCount={ratingCount}
							/>
						) : (
							''
						)}
					</div>
					{actorsList && actorsListCount ? (
						<ActorAvatars
							actorsList={actorsList}
							actorsListCount={actorsListCount}
						/>
					) : (
						''
					)}
					<div className="mt-20 hidden text-center xl:block">
						<ButtonGoDown>Czytaj więcej</ButtonGoDown>
					</div>
				</div>
			</div>
		</div>
	);
}

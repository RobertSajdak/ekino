import TMDB from '@/types/tmdb-types';
import { TMDBImage200URL } from '@/config/tmdb-config';

import ActorAvatarsItem from './actor-avatars-item';

type TProps = {
	actorsList: TMDB.TCast[];
	actorsListCount: number;
};

export default function ActorAvatars({ actorsList, actorsListCount }: TProps) {
	return (
		<div className="mt-11 hidden gap-5 lg:flex">
			{actorsList.map(actor => (
				<ActorAvatarsItem
					key={actor.cast_id}
					src={
						actor.profile_path
							? TMDBImage200URL + actor.profile_path
							: undefined
					}
					character={actor.character}
					name={actor.name}
				/>
			))}
			{actorsListCount > 4 ? (
				<div className="flex size-[60px] items-center justify-center rounded-full border-[1.5px] border-primary bg-transparent text-xl text-primary">
					+{actorsListCount - 4}
				</div>
			) : (
				''
			)}
		</div>
	);
}

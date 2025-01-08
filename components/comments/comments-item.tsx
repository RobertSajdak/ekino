import { TCommentWithUser } from '@/server/db/schemas';
import { cn } from '@/utils/lib/tailwind';

import AvatarBox from '../avatar-box';
import StarRating from '../star-rating';
import { Separator } from '../ui/separator';

type TProps = {
	comment: TCommentWithUser;
};

export default function CommentsItem({ comment }: TProps) {
	return (
		<>
			<div
				className={cn(
					'grid items-start gap-4 md:grid-cols-[100px_1fr]',
					comment.userId === '' ? 'opacity-50' : '',
				)}>
				<AvatarBox
					className="size-12"
					name={comment.user.name}
					image={comment.user.image}
					isHeadingVisible={false}
				/>
				<div className="overflow-hidden">
					<p className="text-lg text-white">{comment.user.name}</p>
					{comment.dateCreated ? (
						<p className="my-1 text-sm text-silver">
							{comment.dateCreated?.toLocaleDateString()}
						</p>
					) : (
						''
					)}
					<StarRating rating={comment.rating} />
					<p className="text-balance text-lg text-white">
						{comment.content}
					</p>
				</div>
			</div>
			<Separator className="my-10" />
		</>
	);
}

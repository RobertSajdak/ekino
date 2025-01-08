'use client';

import { useOptimistic } from 'react';
import { TCommentWithUser } from '@/server/db/schemas';

import CommentsCreate from './comments-create';
import CommentsItem from './comments-item';

type TProps = {
	comments?: TCommentWithUser[];
};

export default function Comments({ comments }: TProps) {
	const [optimisticComments, addOptimisticComment] = useOptimistic<
		TCommentWithUser[],
		TCommentWithUser
	>(comments || [], (state, newComment) => [newComment, ...state]);

	return (
		<div>
			<CommentsCreate addComment={comment => addOptimisticComment(comment)} />
			<div className="mt-12">
				{optimisticComments
					? optimisticComments.map(comment => (
							<CommentsItem key={comment.id} comment={comment} />
						))
					: ''}
			</div>
		</div>
	);
}

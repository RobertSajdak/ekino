import { useState, useTransition } from 'react';

import FormField from '../form-field';
import { Textarea } from '../ui/textarea';
import StarRating from "../star-rating";
import { Button } from "../ui/button";
import FormError from "../ui/form-error";
import { TCommentWithUser } from "@/server/db/schemas";
import { TCommentValidatorErrors } from "@/validators/comment-validator";
import { useToast } from "@/utils/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { linkToType } from "@/utils/translations";
import { commentActions } from "@/server/actions";
import Loader from "../ui/loader";

type TProps = {
	addComment: (comment: TCommentWithUser) => void;
};

export default function CommentsCreate({ addComment }: TProps) {
	const [content, setContent] = useState('');
	const [rating, setRating] = useState(0);
	const [formErrors, setFormErrors] = useState<TCommentValidatorErrors>({});
	const {toast} = useToast();
	const {data: session} = useSession();
	const {type, stringId} = useParams<{type: 'filmy' | 'seriale', stringId: string}>();
	const [isPending, startTransition] = useTransition();

	const mediaType = linkToType(type);

	if(!session) {
		return (
			<div className="text-white">
				Zaloguj się aby dodać komentarz
			</div>
		)
	}

	const handleSend = async () => {

		if(isPending) return false;

		const comment = {
			mediaId: parseInt(stringId),
			mediaType,
			content,
			rating,
		}

		setContent('');
		setRating(0);

		startTransition(async () => {
			addComment({
				...comment,
				dateCreated: new Date(),
				id: crypto.randomUUID(),
				userId: '',
				user: {
					id: session?.user.id || '',
					name: session?.user.name || '',
					image: session?.user.image || '',
					email: session?.user.email || '',
				}
			});

			await new Promise(resolve => setTimeout(resolve, 3000));

			const res = await commentActions.sendComment(comment);

			if(!res.success && res.errors) {
				setFormErrors(res.errors);
			} else {
				setFormErrors({});
			}
			toast({
				title: res.message,
				variant: res.success ? 'success' : 'destructive'
			});
		});
	}

	return (
		<div className="space-y-2">
			<FormField label="Twój komentarz:" errors={formErrors.content}>
				<Textarea
					placeholder="Wpisz swój komentarz"
					id="content"
					name="content"
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
			</FormField>
            <p className="text-white">Oceń film w skali od 1 do 10:</p>
            <div className="items-center md:flex flex-wrap justify-between">
                <StarRating
                    rating={rating}
                    setRating={rating => setRating(rating)}
                    hints
                />
                <Button className="relative" onClick={handleSend}>
                    Dodaj komentarz
					{
						isPending ? (
							<Loader className="absolute right-2.5 top-2.5" />
						) : ''
					}
                </Button>
                <div className="w-full">
                    <FormError errors={formErrors.rating} />
                </div>
            </div>
		</div>
	);
}

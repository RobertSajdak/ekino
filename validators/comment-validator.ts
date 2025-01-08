import { inferFlattenedErrors, literal, number, object, string, z } from 'zod';

export const commentValidator = object({
	content: string()
		.trim()
		.min(3, {
			message: 'Treść komentarza musi mieć przynajmniej 3 znaki',
		})
		.max(512, {
			message: 'Treść komentarza nie może być większa niż 512 znaków',
		})
		.optional()
		.or(literal('')),
	rating: number()
		.min(1, {
			message: 'Ocena komentarza musi wynosić co najmniej 1',
		})
		.max(10, {
			message: 'Ocena komentarza nie może być większa niż 10',
		}),
    mediaId: number(),
    mediaType: z.enum(['movie', 'tv']),
    userId: string(),
});

export type TCommentValidatorErrors = inferFlattenedErrors<typeof commentValidator>['fieldErrors'];

export type TCommentValidator = z.infer<typeof commentValidator>

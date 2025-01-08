import { inferFlattenedErrors, object, string, z } from 'zod';

export const userLoginValidator = object({
	email: string()
		.trim()
		.email({
			message: 'Nieprawidłowy adres Email',
		})
		.min(5, {
			message: 'Email musi mieć przynajmniej 5 znaków',
		})
		.max(32, {
			message: 'Email może mieć max 32 znaki',
		}),
	password: string()
		.trim()
		.min(8, {
			message: 'Hasło powinno mieć co najmniej 8 znaków',
		})
		.max(32, {
			message: 'Hasło może mieć max 32 znaki',
		})
		.regex(/.*[0-9].*/, {
			message: 'Hasło musi zawierać przynajmniej jedną cyfrę',
		})
		.regex(/.*[!@#$%^&*].*/, {
			message:
				'Hasło musi zawierać przynajmniej jeden ze znaków specjalnych: !@#$%^&*',
		}),
});

export const userRegistrationValidator = userLoginValidator.extend({
	name: string()
		.trim()
		.min(5, {
			message: 'Nazwa użytkownika musi zawierać przynajmniej 5 znaków',
		})
		.max(32, {
			message: 'Nazwa użytkownika może mieć max 32 znaki',
		}),
    passwordConfirm: string().trim().optional()
}).refine(data => data.password === data.passwordConfirm, {
    message: 'Hasła nie pasują do siebie',
    path: ['passwordConfirm']
});

export type TRegistrationValidatorErrors = inferFlattenedErrors<
	typeof userRegistrationValidator
>['fieldErrors'];

export type TUserRegistrationValidator = z.infer<typeof userRegistrationValidator>

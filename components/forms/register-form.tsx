'use client'

import { userActions } from "@/server/actions"
import FormField from "../form-field"
import Heading from "../ui/heading"
import SubmitButton from "../ui/submit-button"
import { useToast } from "@/utils/hooks/use-toast"
import Link from "next/link"
import { useState } from "react"
import { TRegistrationValidatorErrors } from "@/validators/user-validator"
import { signIn } from "next-auth/react"

export default function RegisterForm() {

    const [formErrors, setFormErrors] = useState<TRegistrationValidatorErrors>({});
    const {toast} = useToast();

    const handleRegistration = async (formData: FormData) => {

        const res = await userActions.registerUser(formData);

        if(!res.success && res.errors) {
            setFormErrors(res.errors);
        } else {
            setFormErrors({});
        }
        toast({
            title: res.message,
            variant: res.success ? 'success' : 'destructive'
        });

        if(res.success === true) {
            await signIn('credentials', {
                email: formData.get('email'),
                password: formData.get('password')
            });
        }

    }

    return (
        <div className="mx-auto grid w-[350px] gap-6">
            <Heading tag="h1" variant="h2" className="text-center">Rejestracja</Heading>
            <form action={handleRegistration} className="space-y-1">
                <FormField
                    label="Nazwa użytkownika"
                    name="name"
                    placeholder="Jan Kowalski"
                    errors={formErrors.name}
                    required
                />
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="mail@gmail.com"
                    errors={formErrors.email}
                    required
                />
                <FormField
                    label="Hasło"
                    name="password"
                    type="password"
                    placeholder="*********"
                    errors={formErrors.password}
                    required
                />
                <FormField
                    label="Wpisz ponownie swoje hasło"
                    name="passwordConfirm"
                    type="password"
                    placeholder="*********"
                    errors={formErrors.passwordConfirm}
                    required
                />
                <SubmitButton text="Zarejestruj się" />
            </form>
            <div className="mt-4 text-center text-sm text-white">
                Masz już konto?{' '}
                <Link href="/logowanie" className="underline">
                    Zaloguj się
                </Link>
            </div>
        </div>
    )
}

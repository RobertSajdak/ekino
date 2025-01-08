'use client'

import { signIn } from "next-auth/react"
import FormField from "../form-field"
import { Button } from "../ui/button"
import Heading from "../ui/heading"
import SubmitButton from "../ui/submit-button"
import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/utils/hooks/use-toast"
import Link from "next/link"

export default function LoginForm() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const {toast} = useToast();

    useEffect(() => {
        const error = searchParams.get('error');

        if(error) {
            toast({
                title: error === 'CredentialsSignin' ? 'Niepoprawne dane logowania' : 'Błąd logowania spróbuj ponownie',
                variant: 'destructive',
            });
            router.push('/logowanie');
        }

    }, [router, searchParams, toast]);

    const handleGoogleSignIn = async () => {
        await signIn('google', {
            callbackUrl: '/'
        });
    }

    const handleSignIn = async (formData: FormData) => {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            callbackUrl: '/'
        });
    }

    return (
        <div className="mx-auto grid w-[350px] gap-6">
            <Heading tag="h1" variant="h2" className="text-center">Logowanie</Heading>
            <form action={handleSignIn} className="space-y-1">
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="mail@gmail.com"
                    required
                />
                <FormField
                    label="Hasło"
                    name="password"
                    type="password"
                    placeholder="*********"
                    required
                />
                <SubmitButton text="Zaloguj się" />
            </form>
            <Button variant={'outline'} className="w-full" onClick={handleGoogleSignIn}>
                Zaloguj się z Google
            </Button>
            <div className="mt-4 text-center text-sm text-white">
                Nie masz jeszcze konta?{' '}
                <Link href="/rejestracja" className="underline">
                    Zarejestruj się
                </Link>
            </div>
        </div>
    )
}

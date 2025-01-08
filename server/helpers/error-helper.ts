import { redirect } from "next/navigation"
import { ZodError } from "zod"

export class EkinoError extends Error {}
export class SessionError extends Error {}

export function getError<ParsedErrorType>(error: unknown) {
    
    if(error instanceof EkinoError) {
        return {
            success: false as const,
            message: error.message
        }
    } else if(error instanceof ZodError) {
        return {
            success: false as const,
            message: 'W formularzu wystąpiły błędy, popraw je i spróbuj ponownie',
            errors: error.flatten().fieldErrors as ParsedErrorType
        }
    } else if(error instanceof SessionError) {
        return {
            success: false as const,
            message: 'Dostęp tylko dla zalogowanych użytkowników',
        }
    } else if(error instanceof Error && error.message === 'NEXT_REDIRECT') {
        redirect('/');
    }

    return {
        success: false as const,
        message: 'Wystąpił nieoczekiwany błąd, skontaktuj się z administratorem aplikacji.'
    }
}

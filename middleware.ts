import { NextResponse } from "next/server";
import { auth as middleware } from "./server/providers/auth";

// config.matcher ustala ścieżki na których działa middleware
// export const config = {
//     matcher: [
//         '/szukaj(.*)',
//         '/moje-konto'
//     ]
// }

export default middleware(req => {

    // zalogowany użytkownik odwiedza stronę dla gości
    if(!req.auth && req.nextUrl.pathname.startsWith('/moje-konto')) {
        return NextResponse.redirect(new URL('/logowanie', req.url));
    }
    // zalogowany użytkownik odwiedza stronę dla gości
    if(req.auth && req.nextUrl.pathname.startsWith('/logowanie')) {
        return NextResponse.redirect(new URL('/moje-konto', req.url));
    }
    if(req.auth && req.nextUrl.pathname.startsWith('/rejestracja')) {
        return NextResponse.redirect(new URL('/moje-konto', req.url));
    }
});

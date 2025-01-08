import AvatarBox from "@/components/avatar-box"
import { auth } from "@/server/providers/auth"
import Image from "next/image"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export const metadata = {
    title: 'Moje konto'
}

type TProps = {
    children: ReactNode
}

export default async function DashboardLayout({children}: TProps) {

    const session = await auth();

    if(!session) {
        redirect('/');
    }

    return (
        <article>
            <section className="relative flex h-[290px] w-full items-end">
                <Image
                    src={'/bg-profile.jpg'}
                    fill
                    alt="tło mojego konta"
                    className="object-contain sm:object-cover object-top"
                />
                <div className="container">
                    <AvatarBox
                        name={session.user.name}
                        image={session.user.image}
                    />
                </div>
            </section>
            {children}
        </article>
    )
}

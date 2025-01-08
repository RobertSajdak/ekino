import LoginForm from "@/components/forms/login-form"
import Image from "next/image"

export const metadata = {
    title: 'Logowanie'
}

export default function LoginPage() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] mb-12">
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/ekino_cover.jpg"
                    alt=""
                    width={960}
                    height={1080}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <LoginForm />
            </div>
        </div>
    )
}

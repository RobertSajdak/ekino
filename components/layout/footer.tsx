import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="container">
            <Separator className="bg-white" />
            <div className="flex flex-col lg:flex-row gap-5 justify-between py-12">
                <Link href="/" className="mr-auto">
                    <Image
                        src="/logo.svg"
                        alt="Ekino logo"
                        width={149}
                        height={53}
                        priority
                        className="brightness-0 invert"
                    />
                </Link>
                <div className="text-white">
                    © eKino™, {currentYear}. All rights reserved.
                    <br />
                    Obrazki użyte na stronie wyłacznie w celach wizualizacji.
                    Kopiowanie i rozpowszechnianie zabronione.
                </div>
            </div>
        </footer>
    )
}

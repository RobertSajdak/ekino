import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import Breadcrumb from "./breadcrumb";

export default function Header() {

    return (
        <>
            <header className="fixed top-0 z-50 w-full bg-foreground py-3">
                <div className="container flex max-w-[500px] flex-wrap items-center justify-end gap-3 xl:max-w-screen-xl xl:gap-7">
                    <Link href="/" className="mr-auto" >
                    <Image
                            src="/logo.svg"
                            alt="Ekino logo"
                            width={149}
                            height={53}
                            priority
                        />
                    </Link>
                    <Menu />
                </div>
            </header>
            <div className="h-[129px] xl:h-[77px]" />
            <Breadcrumb />
        </>
    )
}

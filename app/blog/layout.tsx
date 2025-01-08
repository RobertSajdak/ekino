import Heading from "@/components/ui/heading";
import Link from "next/link";
import { ReactNode } from 'react';

type TProps = {
	children: ReactNode;
};

export const metadata = {
	title: 'Blog',
};

export default function BlogLayout({ children }: TProps) {
	return (
		<article className="prose prose-invert xl:prose-xl mx-auto">
			{children}
			<section className="mt-32">
				<Heading>Linki do artykułów</Heading>
				<ul>
					<li>
						<Link href="/">Blog główna</Link>
					</li>
					<li>
						<Link href="/blog/recenzja-krolestwo-planety-malp">Recenzja Królestwo Planety Małp</Link>
					</li>
					<li>
						<Link href="/blog/prozdrowotne-wlasciwosci-kawy">Prozdrowotne właściwości kawy</Link>
					</li>
					<li>
						<Link href="/blog/krotka-historia-polskie-kinematografii">Krótka historia polskiej kinematografii</Link>
					</li>
				</ul>
			</section>
		</article>
	);
}

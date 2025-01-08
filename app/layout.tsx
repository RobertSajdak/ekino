import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';

import { cn } from '@/utils/lib/tailwind';

import Header from '@/components/layout/header';
import Footer from "@/components/layout/footer";
import Providers from "@/components/providers/providers";

const poppins = Poppins({
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
	title: {
		absolute: 'E-Kino',
		template: '%s | E-Kino',
	},
	description: 'Platforma do oceny oraz zakupu filmów i seriali',
	keywords: ['Wypożyczalnia filmów', 'Wypożyczalnia seriali', 'VOD'],
	// własne metadane dodajemy w ten sposób
	// other: {
	// 	relatedMovies: ['spiderman', 'venom']
	// }
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="pl">
			<body
				className={cn(
					'font-poppins min-h-screen bg-foreground antialiased',
					poppins.variable,
				)}>
				<Providers>
					<Header />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}

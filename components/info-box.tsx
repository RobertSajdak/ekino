import Image from 'next/image';
import Link from 'next/link';

import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function InfoBox() {
	return (
		<div className="grid lg:grid-cols-2">
			<div className="relative h-[300px] w-full lg:h-[460px]">
				<Image
					src="/movie_night.svg"
					fill
					alt="Osoba jedząca popcorn przed TV"
				/>
			</div>
			<div className="mx-auto space-y-5 border border-white px-5 py-12 text-center text-white lg:max-w-[360px]">
				<p className="text-lg">
					Możesz wykupić dostęp do dowolnego filmu lub serialu
				</p>
				<div>
					<Badge className="text-foreground">Filmy</Badge> &nbsp; = &nbsp; 30,90 zł*
				</div>
				<div>
					<Badge className="text-foreground">Seriale</Badge> &nbsp; = &nbsp; 68,00 zł**
				</div>
				<div>
					<small>
						* Wykupiony dostęp do filmu trwa 72 godziny. Po tym
						czasie możliwość oglądania wygaśnie.
					</small>
				</div>
				<div>
					<small>
						** Wykupiony dostęp do serialu trwa 7 dni. Po tym
						czasie, możliwość oglądania wygaśnie.
					</small>
				</div>
				<Link href={'/filmy-i-seriale'} className="block">
					<Button variant={'outline'} className="bg-transparent">
						Przeglądaj filmy i seriale
					</Button>
				</Link>
			</div>
		</div>
	);
}

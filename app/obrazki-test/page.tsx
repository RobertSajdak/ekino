import Image from 'next/image';
import BanerEkino2 from '@/public/baner_ekino_2.jpg';
import BanerEkino from '@/public/baner_ekino.jpg';

export default function ImagesTestPage() {
	return (
		<>
			{/* Lokalny import - nie musimy określać width i height,
            a także automatycznie generuje on base64 dla zdjęcia do atrybutu blurDataURL o ile dodamy placeholder="blur" */}
			<Image src={BanerEkino} alt="" placeholder="blur" />

			{/* Import poprzez URL, musimy określić width i height, domyślnie sizes jest ustawione na 1x, 2x, ale możemy manualnie dodać sizes="100vw",
            funkcję generowania blura dla obrazka możemy dodać na serverze używając np. https://plaiceholder.co/docs */}
			<Image src="/baner_ekino.jpg" width={1920} height={874} alt="" />

            {/* Jeżeli nie znamy aspect-ratio to wtedy dodajemy atrybut fill,
            a do elementu nadrzędnego pozycję relatywną, oraz określamy height, musi to też być element typu block */}
			<div className="relative h-[500px]">
				<Image
                    // Jeżeli importujemy obrazek z zewnętrznego adresu, to musimy dodać go w remotePatterns
					src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg"
                    alt="" // alt jest zawsze wymagany
					fill // fill domyślnie ustawia sizes na 100vw
                    quality={90} // domyślnie ustawione jest na 75, przedział jest 0 - 100
                    // dodaje informację dla przeglądarki że powinna wstępnie załadować obrazek poprzez atrybut link preload, ma to wpływ na LCP
                    priority
                    // sizes określa nam jaką szerokość okna bierze pod uwagę podczas zaczytywania się obrazka,
                    // przydatne szczególnie wtedy gdy używamy obrazków w gridzie,
                    // dla przykładu 25vw jest to 25% szerokości okna, dla FullHD będzie to 480px, a dla 4K 960
					sizes="25vw"
                    // sizes="(min-width: 1200px) 25vw, 100vw"
                    // powyższy sizes od 1200px (załóżmy że mamy grida na PC z 4 kolumnami) pobiera nam obrazki o szerokości minimum 1/4 ekranu,
                    // a poniżej 1200px (załóżmy tablet / mobile - 1 kolumna), pobiera nam o szerokości równej lub większej całkowitej szerokości ekranu.
				/>
                {/* Dlaczego warto określać aspect-ratio obrazka? - ze względu na CLS - https://web.dev/articles/cls?hl=pl#examples */}
			</div>
		</>
	);
}

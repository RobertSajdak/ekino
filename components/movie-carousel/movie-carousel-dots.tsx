import { useDotButton } from '@/utils/hooks/use-dot-button';

import { DotButton, useCarousel } from '../ui/carousel';

export default function MovieCarouselDots() {
	const { api } = useCarousel();

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

	return (
		<div className="absolute bottom-2 left-1/2 z-50 -translate-x-1/2 space-x-3">
			{scrollSnaps.map((_, idx) => (
				<DotButton
					key={idx}
					onClick={() => onDotButtonClick(idx)}
					className={
						idx === selectedIndex ? 'bg-primary' : 'bg-gray-500'
					}
				/>
			))}
		</div>
	);
}

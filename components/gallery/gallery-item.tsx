import Image from 'next/image';
import { cn } from '@/utils/lib/tailwind';

import { TMDBImage500URL, TMDBImage780URL } from '@/config/tmdb-config';

type TProps = {
	className?: string;
	imgSize: 'big' | 'small';
	src?: string;
};

export default function GalleryItem({ className, imgSize, src }: TProps) {

	const imgSrcUrl = imgSize === 'big' ? TMDBImage780URL : TMDBImage500URL;
	const sizes = imgSize === 'big' ? '(min-width: 640px) 50vw, 100vw' : '(min-width: 640px) 25vw, 50vw';

	return (
		<div
			className={cn(
				'relative cursor-pointer overflow-hidden bg-primary',
				className,
			)}>
			{src ? (
				<Image
					src={imgSrcUrl + src}
					fill
					alt=""
					className="object-cover transition duration-700"
                    sizes={sizes}
				/>
			) : (
				''
			)}
		</div>
	);
}

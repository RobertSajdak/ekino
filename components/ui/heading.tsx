import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/lib/tailwind';
import { cva } from 'class-variance-authority';

type TProps = {
	tag?: 'h1' | 'h2' | 'h3' | 'h4';
	variant?: 'h1' | 'h2' | 'h3' | 'h4';
	children: ReactNode;
} & HTMLAttributes<HTMLHeadingElement>;

const headingVariants = cva(
	'scroll-m-20 tracking-tight text-white line-clamp-2',
	{
		variants: {
			variant: {
				h1: 'text-3xl lg:text-5xl lg:leading-normal font-extrabold',
				h2: 'text-xl lg:text-3xl font-semibold pb-7',
				h3: 'text-lg lg:text-2xl font-semibold pb-7',
				h4: 'text-md lg:text-xl font-semibold',
			},
		},
	},
);

export default function Heading({
	tag = 'h1',
	variant = 'h1',
	children,
	className,
	...props
}: TProps) {
	const Tag = tag;

	return (
		<Tag className={cn(headingVariants({ variant, className }))} {...props}>
			{children}
		</Tag>
	);
}

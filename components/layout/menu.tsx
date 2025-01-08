'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { cn } from '@/utils/lib/tailwind';
import { signOut, useSession } from 'next-auth/react';

import { navConfig } from '@/config/nav-config';

import { Icons } from '../icons/icons';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import Loader from "../ui/loader";

export default function Menu() {
	const [open, setOpen] = useState(false);
	const path = usePathname();
	const selectedLayoutSegment = useSelectedLayoutSegment();
	const { status, data } = useSession();

	console.log(data);

	const menuItems = navConfig.map(
		({ icon, label, slug, layoutSegment, visibility, type }) => {

			if(
				(visibility === 'guest' && status === 'authenticated') ||
				(visibility === 'authorized' && status === 'unauthenticated')
			) {
				return false;
			}

			if(
				(visibility === 'guest' || visibility === 'authorized') && status === 'loading'
			) {
				return false;
			}

			const Icon = Icons[icon];
			let click = undefined;

			if(type === 'logout') {
				click = async () => {
					await signOut();
				}
			}

			return (
				<Link
					key={label}
					href={slug}
					onClick={e => {
						if(click) {
							e.preventDefault();
							click();
						}
					}}
					className={cn(
						'flex gap-2 hover:text-primary [&:hover>svg]:fill-primary',
						slug === path || layoutSegment === selectedLayoutSegment
							? 'text-primary [&>svg]:fill-primary'
							: '',
					)}>
					<Icon /> {label}
				</Link>
			);
		},
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button
				variant="outline"
				size="icon"
				className="xl:hidden"
				onClick={() => setOpen(true)}>
				<Icons.menu />
			</Button>
			<nav className="hidden gap-5 text-white xl:flex">
				{menuItems}
				{status === 'loading' ? <Loader /> : ''}
			</nav>
			<DialogContent className="rounded-lg bg-foreground [&>button>svg]:stroke-white">
				<DialogHeader className="text-xl font-medium tracking-wide text-white sm:text-center">
					Menu główne
				</DialogHeader>
				<div className="mx-auto max-w-[400px]">
					<nav
						className="space-y-5 text-center text-white [&_a]:text-xl"
						onClick={() => setOpen(false)}>
						{menuItems}
						{status === 'loading' ? <Loader /> : ''}
					</nav>
				</div>
			</DialogContent>
		</Dialog>
	);
}

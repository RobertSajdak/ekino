'use client';

import { useEffect, useState } from 'react';
import { CommandList } from 'cmdk';
import { Check } from 'lucide-react';

import { cn } from '@/utils/lib/tailwind';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Icons } from "../icons/icons";

type TComboboxProps = {
	placeholder: string;
	notFoundText: string;
	searchText: string;
	defaultValue: string | null;
	select: (selectedValue: string) => void;
	data: {
		label: string;
		value: string;
	}[];
};

export default function Combobox({
	placeholder,
	data,
	notFoundText,
	searchText,
	defaultValue,
	select,
}: TComboboxProps) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);
	
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="justify-between px-3 py-2 max-h-10">
					{value
						? data.find(v => v.value === value)?.label
						: placeholder}
					<Icons.triangleDown className="ml-2 size-3 shrink-0 fill-foreground" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-screen xl:w-[360px] p-0">
				<Command
					filter={(value, search, keywords) => {
						const extendValue = `${value} ${keywords?.join(' ')}`;
						if (
							extendValue
								.toLowerCase()
								.indexOf(search.toLowerCase()) > -1
						)
							return 1;
						return 0;
					}}>
					<CommandInput placeholder={searchText} />
					<CommandList className="max-h-[400px] overflow-y-auto">
						<CommandEmpty>{notFoundText}</CommandEmpty>
						<CommandGroup>
							{data?.map(v => {
								return (
									<CommandItem
										key={v.label}
										value={v.value}
										keywords={[v.label]}
										onSelect={selectedValue => {
											setValue(selectedValue !== 'all' ? selectedValue : '');
											select(selectedValue !== 'all' ? selectedValue : '');
											setOpen(false);
										}}>
										<Check
											className={cn(
												'mr-2 h-4 w-4',
												value === v.value
													? 'opacity-100'
													: 'opacity-0',
											)}
										/>
										{v.label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

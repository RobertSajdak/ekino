import TMDB from '@/types/tmdb-types';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { memo } from "react";

type TProps = {
	currentGenres: TMDB.TGenres;
	defaultGenreId: string;
	select: (selectedValue: string) => void;
};

export default memo(function SelectGenre({
	currentGenres,
	defaultGenreId,
	select,
}: TProps) {

    console.log('rerender');

	return (
		<Select
			onValueChange={selectedValue =>
				selectedValue !== 'all' ? select(selectedValue) : select('')
			}
			value={defaultGenreId}>
			<SelectTrigger>
				<SelectValue placeholder="Gatunek" />
			</SelectTrigger>
            <SelectContent>
                <SelectItem key={'all'} value="all">Wszystkie</SelectItem>
                {currentGenres.genres.map(genre => (
                    <SelectItem key={genre.id} value={String(genre.id)}>
                        {genre.name}
                    </SelectItem>
                ))}
            </SelectContent>
		</Select>
	);
});

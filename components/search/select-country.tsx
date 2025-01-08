import TMDB from "@/types/tmdb-types"
import Combobox from "../ui/combobox";
import { memo } from "react";

type TProps = {
    countries: TMDB.TCountry[];
    placeholder: string;
    defaultCountry: string;
    select: (selectedValue: string) => void;
}

export default memo(function SelectCountry({countries, placeholder, defaultCountry, select}: TProps) {

    const data = countries.map(country => ({
        label: country.native_name,
        value: country.iso_3166_1
    }));

    const defaultOption = {
        label: 'Wszystkie',
        value: 'all'
    }

    return (
        <Combobox
            placeholder={placeholder}
            searchText="Szukaj"
            notFoundText="Nie znaleziono"
            defaultValue={defaultCountry}
            select={select}
            data={[defaultOption, ...data]}
        />
    )
});

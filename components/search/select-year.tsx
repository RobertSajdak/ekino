import { memo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type TProps = {
    defaultYear: string;
    select: (selectedValue: string) => void;
}

export default memo(function SelectYear({defaultYear, select}: TProps) {

    const startYear = 1920;
    const endYear = new Date().getFullYear();
    let currentYear = endYear;

    const mediaYears = [];

    for(currentYear; currentYear >= startYear; currentYear--) {
        mediaYears.push(String(currentYear));
    }

    return (
        <Select
            onValueChange={selectedValue => selectedValue !== 'all' ? select(selectedValue) : select('')}
            value={defaultYear}
        >
            <SelectTrigger>
                <SelectValue placeholder="Lata produkcji" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem key="all" value="all">Wszystkie</SelectItem>
                {mediaYears.map(year => (
                    <SelectItem key={year} value={year}>
                        {year}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
})

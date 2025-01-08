import { TMediaTypes } from "@/types/types"
import { Switch } from "../ui/switch";

type TProps = {
    type: TMediaTypes;
    checkedChange: () => void;
}

export default function MovieTVSwitch({type, checkedChange}: TProps) {
    return (
        <div className="flex text-white gap-3 mb-7">
            <div>Seriale</div>
            <Switch
                checked={type === 'movie'}
                onCheckedChange={checkedChange}
            />
            <div>Filmy</div>
        </div>
    )
}

import TMDB from "@/types/tmdb-types"
import Heading from "../ui/heading";
import GalleryItem from "./gallery-item";

type TProps = {
    images: TMDB.TImages['backdrops'];
}

export default function Gallery({images}: TProps) {

    if(images.length < 2) {
        return (
            <Heading variant="h4" tag="h4" className="text-white">
                Brak galerii...
            </Heading>
        )
    }

    return (
        <div className="grid sm:grid-cols-4 grid-rows-[repeat(6,100px)] sm:grid-rows-[270px_100px_270px] gap-1
        [&>div:hover_img]:scale-110 [&>div:hover_img]:opacity-70">
            <GalleryItem
                className="col-span-2 row-span-2"
                imgSize="big"
                src={images[1]?.file_path}
            />
            <GalleryItem imgSize="small" src={images[2]?.file_path} />
            <GalleryItem imgSize="small" src={images[3]?.file_path} />
            <GalleryItem
                className="row-start-3"
                imgSize="small"
                src={images[4]?.file_path}
            />
            <GalleryItem
                className="row-start-3"
                imgSize="small"
                src={images[5]?.file_path}
            />
            <GalleryItem
                className="col-span-2 row-span-2"
                imgSize="big"
                src={images[6]?.file_path}
            />
        </div>
    )
}

import { Skeleton } from "../ui/skeleton";

export default function MediaGridSkeleton() {
    return (
        <div className="grid xl:grid-cols-3 gap-5">
            <Skeleton className="h-[520px]" />
            <Skeleton className="h-[520px]" />
            <Skeleton className="h-[520px]" />

            <Skeleton className="h-[520px]" />
            <Skeleton className="h-[520px]" />
            <Skeleton className="h-[520px]" />
        </div>
    )
}

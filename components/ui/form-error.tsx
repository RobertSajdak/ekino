import { cn } from "@/utils/lib/tailwind";

type TProps = {
    errors?: string[];
    className?: string
}

export default function FormError({errors, className}: TProps) {
    return (
        <p className={cn('mt-1 min-h-5 text-xs text-destructive', className)}>
            {errors && errors[0] ? errors[0] : ''}
        </p>
    )
}

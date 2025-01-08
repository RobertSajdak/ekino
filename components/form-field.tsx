import { cn } from "@/utils/lib/tailwind";
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import FormError from "./ui/form-error";

type TProps = {
	label?: string;
	placeholder?: string;
	className?: string;
	name?: string;
	type?: HTMLInputTypeAttribute;
	errors?: string[];
	required?: boolean;
	defaultValue?: string;
	variant?: 'horizontal' | 'vertical';
	children?: React.ReactNode;
	change?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FormField({
	label,
	placeholder,
	className,
	name,
	type = 'text',
	errors,
	required = false,
	defaultValue,
    variant = 'vertical',
    children,
    change,
}: TProps) {

    const customClassName = variant === 'horizontal' ? 'grid-cols-1 lg:grid-cols-[250px_1fr] items-center lg:[&_p]:col-start-2' : '';

	return <div className={cn('grid gap-2', customClassName, className)}>
        {label ? <Label htmlFor={name} className="text-white">
            {label}
        </Label> : ''}
        {children ? children : <Input
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className="border-2 border-primary"
            defaultValue={defaultValue}
            onChange={change}
        />}
        <FormError errors={errors} />
    </div>;
}

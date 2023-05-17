import twclsx from "@/utils/twclsx";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const buttonVariants = cva(
	clsx(
		"flex justify-center items-center font-medium text-custom-white transition duration-200 hover:opacity-80 active:opacity-60",
		"disabled:pointer-events-none disabled:opacity-40 whitespace-nowrap"
	),
	{
		variants: {
			variant: {
				primary: "bg-custom-green",
				secondary: "bg-dark-grey border border-custom-green",
				outline: "border border-light-grey"
			},
			size: {
				sm: "px-2.5 py-1 gap-x-0.5 text-sm rounded-lg",
				base: "px-3 py-1.5 gap-x-1 rounded-xl",
				lg: "px-3.5 py-2 gap-x-1.5 text-lg rounded-2xl"
			}
		},
		defaultVariants: {
			variant: "primary",
			size: "base"
		}
	}
);

interface IProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
	showLoadingIcon?: boolean;
}

const Button = ({
	className,
	children,
	isLoading,
	showLoadingIcon = true,
	variant,
	size,
	...props
}: IProps) => (
	<button
		className={twclsx(buttonVariants({ variant, size, className }))}
		disabled={isLoading}
		{...props}
	>
		{isLoading && showLoadingIcon ? (
			<AiOutlineLoading3Quarters className="animate-spin" />
		) : null}
		{children}
	</button>
);

export default Button;

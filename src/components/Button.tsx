import twclsx from "@/utils/twclsx";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const buttonVariants = cva(
	clsx(
		"w-fit flex justify-center items-center font-medium text-custom-white transition duration-200",
		"hover:opacity-80 active:opacity-60 disabled:pointer-events-none disabled:opacity-40",
		"whitespace-nowrap select-none"
	),
	{
		variants: {
			variant: {
				primary: "bg-custom-green",
				secondary: "bg-dark-grey",
				"secondary-outline": "bg-dark-grey border border-custom-green",
				outline: "border border-light-grey"
			},
			size: {
				sm: "px-2.5 py-1 gap-x-0.5 text-sm rounded-lg",
				base: "px-2.5 py-1 gap-x-0.5 text-sm rounded-lg sm:text-base sm:px-3 sm:py-1.5 sm:gap-x-1 lg:rounded-xl",
				lg: "px-3 py-1.5 gap-x-1 rounded-xl lg:px-3.5 lg:py-2 lg:gap-x-1.5 lg:text-lg lg:rounded-2xl"
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

const Button = forwardRef<HTMLButtonElement, IProps>(
	(
		{
			className,
			children,
			isLoading,
			showLoadingIcon = true,
			variant,
			size,
			...props
		},
		ref
	) => (
		<button
			className={twclsx(buttonVariants({ variant, size, className }))}
			disabled={isLoading}
			ref={ref}
			{...props}
		>
			{isLoading && showLoadingIcon ? (
				<AiOutlineLoading3Quarters className="animate-spin" />
			) : null}
			{children}
		</button>
	)
);

export default Button;

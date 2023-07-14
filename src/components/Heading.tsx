import twclsx from "@/utils/twclsx";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { HTMLAttributes } from "react";

export const headingVariants = cva(clsx("font-semibold"), {
	variants: {
		size: {
			xl: "text-lg lg:text-xl",
			"2xl": "text-xl lg:text-2xl",
			"3xl": "text-2xl lg:text-3xl",
			"5xl": "text-4xl lg:text-5xl"
		}
	},
	defaultVariants: {
		size: "xl"
	}
});

interface IProps
	extends HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof headingVariants> {
	as?: React.ElementType;
}

const Heading = ({ className, children, size, as = "h1", ...props }: IProps) => {
	const Component = as;

	return (
		<Component className={twclsx(headingVariants({ size, className }))} {...props}>
			{children}
		</Component>
	);
};

export default Heading;

import { IButtonProps, buttonVariants } from "@/components/Button";
import twclsx from "@/utils/twclsx";

const ButtonSkeleton = ({
	size = "base",
	className,
	variant
}: Pick<IButtonProps, "size" | "className" | "variant">) => (
	<div
		className={twclsx(
			buttonVariants({
				size,
				variant
			}),
			"w-40 pointer-events-none",
			className
		)}
	>
		<span
			className={twclsx(
				"w-full bg-light-grey rounded-md",
				size === "sm" ? "h-5" : "",
				size === "base" ? "h-5 sm:h-6" : "",
				size === "lg" ? "h-6 lg:h-7" : ""
			)}
		></span>
	</div>
);

export default ButtonSkeleton;

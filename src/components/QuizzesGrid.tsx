import twclsx from "@/utils/twclsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const QuizzesGrid = ({ children, className, ...rest }: IProps) => (
	<div
		className={twclsx(
			"mt-8 grid grid-cols-2 auto-rows-fr gap-x-3 gap-y-5 lg:gap-x-5 lg:gap-y-7",
			className
		)}
		{...rest}
	>
		{children}
	</div>
);

export default QuizzesGrid;

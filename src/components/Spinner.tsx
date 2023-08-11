import twclsx from "@/utils/twclsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IconBaseProps } from "react-icons";

const Spinner = ({ className, ...rest }: IconBaseProps) => (
	<AiOutlineLoading3Quarters
		className={twclsx("w-7 h-7 animate-spin", className)}
		{...rest}
	/>
);

export default Spinner;

import twclsx from "@/utils/twclsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface IProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	radius: number;
	ratio: number;
	animate?: boolean;
	animationDuration?: number;
}

const CircleProgress = ({
	radius,
	ratio,
	className,
	animate = true,
	animationDuration = 0.8,
	children
}: IProps) => {
	const diameter = radius * 2;
	const circumference = diameter * Math.PI;
	const progress = circumference - ratio * circumference;

	return (
		<div className={className}>
			<svg
				className="rotate-90"
				width={diameter}
				height={diameter}
				viewBox={`-5 -5 ${diameter + 10} ${diameter + 10}`}
			>
				<circle
					className="fill-none stroke-dark-grey stroke-[0.2rem]"
					r={radius}
					cx={radius}
					cy={radius}
				></circle>
				<circle
					strokeDasharray={circumference}
					strokeDashoffset={progress}
					className={twclsx(
						"fill-none stroke-[0.2rem] transition duration-500",
						ratio < 0.4 && "stroke-custom-red",
						ratio > 0.4 && "stroke-custom-orange",
						ratio > 0.7 && "stroke-custom-green"
					)}
					r={radius}
					cx={radius}
					cy={radius}
				>
					{animate && (
						<animate
							attributeName="stroke-dashoffset"
							values={`${circumference};${progress}`}
							dur={`${animationDuration}s`}
						/>
					)}
				</circle>
			</svg>
			{children}
		</div>
	);
};

export default CircleProgress;

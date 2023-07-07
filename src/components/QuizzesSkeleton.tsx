import QuizSkeleton from "@/components/QuizSkeleton";
import twclsx from "@/utils/twclsx";

const QuizzesSkeleton = ({
	count = 10,
	className
}: {
	count?: number;
	className?: string;
}) => (
	<>
		<div
			className={twclsx(
				"mt-8 grid grid-cols-2 auto-rows-fr gap-x-3 gap-y-5 lg:gap-x-5 lg:gap-y-7",
				className
			)}
		>
			{Array.from(Array(count), (_, i) => (
				<QuizSkeleton key={i} />
			))}
		</div>
	</>
);

export default QuizzesSkeleton;

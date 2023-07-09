import QuizSkeleton from "@/components/QuizSkeleton";
import QuizzesGrid from "@/components/QuizzesGrid";

const QuizzesSkeleton = ({
	count = 10,
	className
}: {
	count?: number;
	className?: string;
}) => (
	<>
		<QuizzesGrid className={className}>
			{Array.from(Array(count), (_, i) => (
				<QuizSkeleton key={i} />
			))}
		</QuizzesGrid>
	</>
);

export default QuizzesSkeleton;

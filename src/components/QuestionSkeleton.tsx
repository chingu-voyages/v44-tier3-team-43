import clsx from "clsx";

const QuestionSkeleton = () => (
	<div
		className={clsx(
			"py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center",
			"gap-y-2 gap-x-4 border-t first:border-none first:pt-0 border-dark-grey"
		)}
	>
		<div className="h-6 lg:h-7 max-w-[40rem] w-full rounded-md bg-light-grey"></div>
		<div className="flex items-center gap-x-2">
			<div className="w-12 sm:w-14 h-7 sm:h-9 rounded-lg sm:rounded-xl bg-light-grey"></div>
			<div className="w-16 sm:w-16 h-7 sm:h-9 rounded-lg sm:rounded-xl bg-light-grey"></div>
		</div>
	</div>
);

export default QuestionSkeleton;

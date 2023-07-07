const QuizSkeleton = () => (
	<div className="flex flex-col md:flex-row bg-dark-grey rounded-lg overflow-hidden">
		<div className="relative w-full pb-[70%] md:w-[45%] md:pb-[36%] bg-light-grey"></div>
		<div className="px-3 py-5 w-full md:w-[55%] md:pl-5 md:pr-6 md:py-8">
			<div className="w-full h-4 sm:h-5 rounded-md bg-light-grey"></div>
			<div className="mt-1 w-[70%] h-4 sm:h-5 rounded-md bg-light-grey"></div>
			<div className="mt-5 md:mt-8 flex items-center gap-x-2">
				<div className="w-6 h-6 rounded-full bg-light-grey"></div>
				<div className="w-[60%] h-3 md:h-4 rounded-sm bg-light-grey"></div>
			</div>
		</div>
	</div>
);

export default QuizSkeleton;

const Loading = () => (
	<div className="flex flex-col items-center">
		<div className="max-w-[4rem] w-full h-4 bg-light-grey rounded-sm"></div>
		<div className="mt-4 max-w-[30rem] w-full h-8 bg-light-grey rounded-lg"></div>
		<div className="mt-8 w-full grid md:grid-cols-2 auto-rows-fr gap-3">
			{Array.from(Array(4), (_, i) => (
				<div
					className="w-full h-14 bg-light-grey rounded-xl lg:rounded-2xl"
					key={i}
				></div>
			))}
		</div>
	</div>
);

export default Loading;

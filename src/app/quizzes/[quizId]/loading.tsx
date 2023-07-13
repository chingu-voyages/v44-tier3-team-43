const Loading = () => (
	<div className="max-w-[36rem] md:max-w-none flex flex-col md:flex-row gap-8">
		<div className="max-w-[24rem] w-full md:max-w-none md:w-[40%] aspect-[3/2] bg-light-grey rounded-lg"></div>
		<div className="flex-1">
			<div className="h-7 w-full bg-light-grey rounded-lg"></div>
			<div className="mt-2 h-7 w-full bg-light-grey rounded-lg"></div>
			<div className="mt-6 md:mt-8 flex items-center gap-x-6">
				<div className="max-w-[7.5rem] w-full h-6 bg-light-grey rounded-md"></div>
				<div className="max-w-[7.5rem] w-full h-6 bg-light-grey rounded-md"></div>
			</div>
			<div className="mt-5 md:mt-6 flex items-center gap-x-2">
				<div className="w-7 h-7 bg-light-grey rounded-full"></div>
				<div className="max-w-[10rem] w-full h-5 bg-light-grey rounded-md"></div>
			</div>
		</div>
	</div>
);

export default Loading;

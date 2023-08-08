const Loading = () => (
	<>
		<div className="max-w-[12rem] w-full h-10 lg:h-12 rounded-lg bg-light-grey"></div>
		<div className="mt-8 flex flex-col md:flex-row md:justify-between items-start gap-x-8 gap-y-6">
			<div className="max-w-[42rem] w-full flex flex-col gap-y-4 lg:gap-y-6">
				<div className="w-full h-9 lg:h-11 rounded-xl lg:rounded-2xl bg-light-grey"></div>
				<div className="max-w-[14rem] w-full h-9 lg:h-11 rounded-xl lg:rounded-2xl bg-light-grey"></div>
				<div className="max-w-[24rem] w-full aspect-video rounded-lg bg-light-grey"></div>
			</div>
			<div className="max-w-[18rem] w-full flex items-center gap-x-3">
				<div className="flex-1 h-9 lg:h-11 rounded-xl lg:rounded-2xl bg-light-grey"></div>
				<div className="flex-1 h-9 lg:h-11 rounded-xl lg:rounded-2xl bg-light-grey"></div>
			</div>
		</div>
        <div className="mt-8 max-w-[14rem] w-full h-9 lg:h-11 rounded-xl lg:rounded-2xl bg-light-grey"></div>
	</>
);

export default Loading;

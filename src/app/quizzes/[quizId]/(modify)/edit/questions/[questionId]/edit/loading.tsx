const Loading = () => (
	<>
		<div className="mb-8 lg:mb-11 max-w-[20rem] w-full h-10 lg:h-12 rounded-lg bg-light-grey"></div>
		<div className="max-w-[42rem] md:max-w-none">
			<div className="max-w-[42rem] w-full h-9 lg:h-11 rounded-xl lg:rounded-2xl bg-light-grey"></div>
			<div className="mt-8 grid md:grid-cols-2 gap-3">
				{Array.from(Array(4), (_, i) => (
					<div key={i}>
						<div className="w-full h-9 lg:h-11 rounded-xl lg:rounded-2xl bg-light-grey"></div>
						<div className="mt-2 ml-2 h-5 max-w-[8rem] w-full rounded-md bg-light-grey"></div>
					</div>
				))}
				<div className="w-full h-9 lg:h-11 rounded-xl lg:rounded-2xl bg-light-grey md:col-span-2"></div>
			</div>
			<div className="max-w-[20rem] mt-8 flex items-center gap-x-3">
				<div className="flex-1 h-9 lg:h-11 rounded-xl lg:rounded-2xl bg-light-grey"></div>
				<div className="flex-1 h-9 lg:h-11 rounded-xl lg:rounded-2xl bg-light-grey"></div>
			</div>
		</div>
	</>
);

export default Loading;

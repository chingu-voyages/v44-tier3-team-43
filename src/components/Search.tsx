"use client";

import clsx from "clsx";
import { FormEvent, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form
			className={clsx(
				"px-2.5 py-1 lg:px-3 lg:py-1.5 max-w-[28rem] lg:max-w-[14rem] w-full flex justify-between items-center gap-1",
				"rounded-xl bg-dark-grey ring-1 ring-transparent focus-within:ring-custom-green transition duration-200",
				"text-sm lg:text-base overflow-hidden"
			)}
			onSubmit={handleSubmit}
		>
			<input
				className="w-full bg-transparent focus-visible:ring-0 placeholder:text-light-grey"
				placeholder="Search..."
				type="text"
				ref={inputRef}
			/>
			<button
				className={clsx(
					"focus-visible:ring-0 text-light-grey transition duration-200",
					"hover:opacity-80 active:opacity-60"
				)}
				tabIndex={-1}
			>
				<AiOutlineSearch className="w-4 h-4 lg:w-5 lg:h-5" />
			</button>
		</form>
	);
};

export default Search;

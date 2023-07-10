"use client";

import QuizSearchCategory from "@/components/QuizSearchCategory";
import QuizSearchSortBy from "@/components/QuizSearchSortBy";
import Button from "@/components/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const QuizSearchFilters = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("query");

	const handleClick = () => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));

		current.delete("category");
		current.delete("sortBy");

		const search = current.toString();

		const query = search ? `?${search}` : "";

		router.push(`${pathname}${query}`);
	};

	return (
		<div className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
			<QuizSearchCategory />
			<QuizSearchSortBy />
			{query && (
				<Button variant="outline" size="lg" onClick={handleClick}>
					Clear
				</Button>
			)}
		</div>
	);
};

export default QuizSearchFilters;

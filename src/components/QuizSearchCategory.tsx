"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import CategoriesSelect from "@/components/CategoriesSelect";

const QuizSearchCategory = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const category = searchParams.get("category") || undefined;
	const query = searchParams.get("query");
	const sortBy = searchParams.get("sortBy");

	const handleChange = (val: string) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));

		if (val === "any") {
			current.delete("category");
		} else {
			current.set("category", val);
		}

		const search = current.toString();

		const query = search ? `?${search}` : "";

		router.push(`${pathname}${query}`);
	};

	return (
		<CategoriesSelect
			value={category}
			onValueChange={handleChange}
			disableAny={!(query || sortBy)}
		/>
	);
};

export default QuizSearchCategory;

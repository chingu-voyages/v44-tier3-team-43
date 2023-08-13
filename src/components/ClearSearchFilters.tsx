"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";

const ClearSearchFilters = () => {
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
		<>
			{query && (
				<Button variant="outline" size="lg" onClick={handleClick}>
					Clear
				</Button>
			)}
		</>
	);
};

export default ClearSearchFilters;

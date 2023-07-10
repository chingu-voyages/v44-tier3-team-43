"use client";

import {
	SelectContent,
	SelectIcon,
	SelectItem,
	SelectItemText,
	SelectRoot,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectTrigger,
	SelectValue,
	SelectViewport
} from "@/components/Select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const QuizSearchSortBy = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const query = searchParams.get("query");
	const sortBy = searchParams.get("sortBy") || undefined;

	const handleChange = (val: string) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));

		if (val === "relevance") {
			current.delete("sortBy");
		} else {
			current.set("sortBy", val);
		}

		const search = current.toString();

		const query = search ? `?${search}` : "";

		router.push(`${pathname}${query}`);
	};

	return (
		<SelectRoot value={sortBy || "relevance"} onValueChange={handleChange}>
			<SelectTrigger className="font-normal" size="lg">
				Sort by:
				<span className="font-medium text-custom-green">
					<SelectValue placeholder="Relevance" />
				</span>
				<SelectIcon />
			</SelectTrigger>
			<SelectContent>
				<SelectScrollUpButton />
				<SelectViewport>
					<SelectItem value="relevance" disabled={!query}>
						<SelectItemText>Relevance</SelectItemText>
					</SelectItem>
					{["Featured", "Latest"].map((option, index) => (
						<SelectItem
							key={`${option}-${index}`}
							value={option.toLowerCase()}
						>
							<SelectItemText>{option}</SelectItemText>
						</SelectItem>
					))}
				</SelectViewport>
				<SelectScrollDownButton />
			</SelectContent>
		</SelectRoot>
	);
};

export default QuizSearchSortBy;

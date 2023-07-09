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
import useCategoriesStore from "@/stores/categoriesStore";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const QuizSearchCategory = () => {
	const { categories } = useCategoriesStore();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const query = searchParams.get("query");
	const sortBy = searchParams.get("sortBy");
	const category = searchParams.get("category") || undefined;

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
		<SelectRoot value={category || "any"} onValueChange={handleChange}>
			<SelectTrigger className="font-normal" size="lg">
				Category:
				<span className="font-medium text-custom-green">
					<SelectValue placeholder="Any" />
				</span>
				<SelectIcon />
			</SelectTrigger>
			<SelectContent>
				<SelectScrollUpButton />
				<SelectViewport>
					<SelectItem value="any" disabled={!(query || sortBy)}>
						<SelectItemText>Any</SelectItemText>
					</SelectItem>
					{categories.map((category, index) => (
						<SelectItem
							key={`${category}-${index}`}
							value={category.name.toLowerCase()}
						>
							<SelectItemText>{category.name}</SelectItemText>
						</SelectItem>
					))}
				</SelectViewport>
				<SelectScrollDownButton />
			</SelectContent>
		</SelectRoot>
	);
};

export default QuizSearchCategory;

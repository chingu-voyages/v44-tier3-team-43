import { ICategory, IQuiz } from "@/types/api";
import absoluteUrl from "@/utils/absoluteUrl";

export const getCategories = async (): Promise<ICategory[]> => {
	const url = absoluteUrl("/api/categories");

	const res = await fetch(url, {
		cache: "no-store"
	});

	return res.json();
};

export const searchQuizzes = async ({
	query,
	category,
	sortBy,
	page,
	perPage
}: {
	query?: string;
	category?: string;
	sortBy?: "featured" | "latest";
	page?: number;
	perPage?: number;
}): Promise<IQuiz[]> => {
	const params = {
		query: query || "",
		category: category || "",
		sort_by: sortBy || "",
		page: (page && String(page)) || "",
		per_page: (perPage && String(perPage)) || ""
	};

	const filteredParams = Object.fromEntries(
		Object.entries(params).filter(([key, value]) => value !== "")
	);

	const searchParams = new URLSearchParams(filteredParams);

	const url = absoluteUrl("/api/search?" + searchParams);

	const res = await fetch(url, {
		cache: "no-store"
	});

	return res.json();
};

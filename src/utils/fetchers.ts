import { ICategory } from "@/types/api";
import absoluteUrl from "@/utils/absoluteUrl";

export const getCategories = async (): Promise<ICategory[]> => {
	const url = absoluteUrl("/api/categories");

	const res = await fetch(url, {
		cache: "no-cache"
	});

	return res.json();
};

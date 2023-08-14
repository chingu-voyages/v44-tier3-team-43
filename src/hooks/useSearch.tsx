import { searchQuizzes } from "@/utils/fetchers";
import { useInfiniteQuery } from "@tanstack/react-query";

const useSearch = ({
	query,
	category,
	sortBy
}: {
	query?: string;
	category?: string;
	sortBy?: string;
}) =>
	useInfiniteQuery({
		queryKey: ["search-quizzes", query, category, sortBy],
		queryFn: ({ pageParam }) =>
			searchQuizzes({
				query,
				category,
				...((sortBy === "featured" || sortBy === "latest") && { sortBy }),
				page: pageParam,
				perPage: 20
			}),
		getNextPageParam: (lastPage, pages) =>
			lastPage && lastPage.length === 20 ? pages.length + 1 : undefined
	});

export default useSearch;

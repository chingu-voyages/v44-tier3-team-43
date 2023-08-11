import { getMyQuizzes } from "@/utils/fetchers";
import { useInfiniteQuery } from "@tanstack/react-query";

const useMyQuizzes = () =>
	useInfiniteQuery({
		queryKey: ["my-quizzes"],
		queryFn: ({ pageParam }) =>
			getMyQuizzes({
				page: pageParam,
				perPage: 20
			}),
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length === 20) {
				return pages.length + 1;
			}
		}
	});

export default useMyQuizzes;

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { searchQuizzes } from "@/utils/fetchers";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import QuizCard from "@/components/QuizCard";
import QuizzesGrid from "@/components/QuizzesGrid";
import Quizzes from "./Quizzes";

const QuizSearch = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get("query") || undefined;
	const category = searchParams.get("category") || undefined;
	const sortBy = searchParams.get("sortBy") || undefined;
	const perPage = 20;
	const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ["search-quizzes", query, category, sortBy],
		queryFn: ({ pageParam }) =>
			searchQuizzes({
				query,
				category,
				...((sortBy === "featured" || sortBy === "latest") && { sortBy }),
				page: pageParam,
				perPage
			}),
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length === perPage) {
				return pages.length + 1;
			}
		}
	});

	return (
		<>
			{status === "success" && (
				<InfiniteScroll
					dataLength={data?.pages.length}
					next={fetchNextPage}
					hasMore={!!hasNextPage}
					loader={<h4>Loading...</h4>}
				>
					<QuizzesGrid>
						{data?.pages.map((page) =>
							page.map((quiz) => (
								<QuizCard
									id={quiz.id}
									title={quiz.title}
									quizImage={quiz.image}
									userImage={quiz.User.image}
									userName={quiz.User.name}
									key={quiz.id}
								/>
							))
						)}
					</QuizzesGrid>
				</InfiniteScroll>
			)}
		</>
	);
};

export default QuizSearch;

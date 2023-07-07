"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { searchQuizzes } from "@/utils/fetchers";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import QuizCard from "@/components/QuizCard";
import QuizzesGrid from "@/components/QuizzesGrid";
import QuizzesSkeleton from "@/components/QuizzesSkeleton";

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
			{status === "success" &&
				(data.pages[0].length ? (
					<InfiniteScroll
						dataLength={data.pages.length}
						next={fetchNextPage}
						hasMore={!!hasNextPage}
						loader={<QuizzesSkeleton className="mt-5 lg:mt-7" count={20} />}
						scrollThreshold={0.4}
					>
						<QuizzesGrid>
							{data.pages.map((page) =>
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
				) : (
					<p className="mt-11 md:text-lg">We couldn't find anything '_'</p>
				))}
		</>
	);
};

export default QuizSearch;

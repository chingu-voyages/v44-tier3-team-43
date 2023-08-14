"use client";

import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import QuizCard from "@/components/QuizCard";
import QuizzesGrid from "@/components/QuizzesGrid";
import QuizzesSkeleton from "@/components/QuizzesSkeleton";
import Image from "next/image";
import Heading from "@/components/Heading";
import { BiErrorCircle } from "react-icons/bi";
import useSearch from "@/hooks/useSearch";

const QuizSearch = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get("query") || undefined;
	const category = searchParams.get("category") || undefined;
	const sortBy = searchParams.get("sortBy") || undefined;
	const { data, status, fetchNextPage, hasNextPage } = useSearch({
		query,
		category,
		sortBy
	});
	const quizzes = data?.pages?.reduce((acc, page) => [...acc, ...page], []);

	return (
		<>
			{status === "loading" && <QuizzesSkeleton className="mt-11" count={20} />}
			{status === "success" &&
				(quizzes?.length ? (
					<InfiniteScroll
						dataLength={quizzes.length}
						next={fetchNextPage}
						hasMore={!!hasNextPage}
						loader={<QuizzesSkeleton className="mt-5 lg:mt-7" count={20} />}
						scrollThreshold={0.4}
					>
						<QuizzesGrid className="mt-11">
							{quizzes.map((quiz) => (
								<QuizCard
									id={quiz.id}
									title={quiz.title}
									quizImage={quiz.image}
									userImage={quiz.User.image}
									userName={quiz.User.name}
									key={quiz.id}
								/>
							))}
						</QuizzesGrid>
					</InfiniteScroll>
				) : (
					<div className="mt-11 flex flex-wrap items-center gap-6">
						<div className="relative max-w-[6rem] sm:max-w-[8rem] w-full aspect-square">
							<Image fill src="/no-results.png" alt="no-results" />
						</div>
						<div>
							<Heading size="3xl" as="h3">
								We couldn&apos;t find anything...
							</Heading>
							<p className="mt-2 lg:mt-4 lg:text-lg">
								Try a different search query or category
							</p>
						</div>
					</div>
				))}
			{status === "error" && (
				<div className="mt-11 flex flex-wrap items-center gap-6">
					<BiErrorCircle className="w-24 h-24 lg:w-32 lg:h-32 text-custom-red" />
					<div>
						<Heading size="3xl" as="h3">
							Something went wrong...
						</Heading>
						<p className="mt-2 lg:mt-4 lg:text-lg">Please try again later</p>
					</div>
				</div>
			)}
		</>
	);
};

export default QuizSearch;

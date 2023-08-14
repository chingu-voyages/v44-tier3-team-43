"use client";

import useMyQuizzes from "@/hooks/useMyQuizzes";
import QuizzesSkeleton from "@/components/QuizzesSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import QuizzesGrid from "@/components/QuizzesGrid";
import MyQuizCard from "@/components/MyQuizCard";
import Image from "next/image";
import Heading from "@/components/Heading";
import { BiErrorCircle } from "react-icons/bi";

const MyQuizzes = () => {
	const { data, status, fetchNextPage, hasNextPage } = useMyQuizzes();
	const quizzes = data?.pages?.reduce((acc, page) => [...acc, ...page], []);

	return (
		<>
			{status === "loading" && <QuizzesSkeleton count={20} />}
			{status === "success" &&
				(quizzes?.length ? (
					<InfiniteScroll
						dataLength={quizzes.length}
						next={fetchNextPage}
						hasMore={!!hasNextPage}
						loader={<QuizzesSkeleton className="mt-5 lg:mt-7" count={20} />}
						scrollThreshold={0.4}
					>
						<QuizzesGrid>
							{quizzes.map((quiz) => (
								<MyQuizCard
									id={quiz.id}
									title={quiz.title}
									quizImage={quiz.image}
									key={quiz.id}
								/>
							))}
						</QuizzesGrid>
					</InfiniteScroll>
				) : (
					<div className="flex flex-wrap items-center gap-6">
						<div className="relative max-w-[6rem] lg:max-w-[8rem] w-full aspect-square">
							<Image fill src="/empty-folder.png" alt="empty-folder" />
						</div>
						<div>
							<Heading size="3xl" as="h3">
								There&apos;s nothing here yet...
							</Heading>
							<p className="mt-2 lg:mt-4 lg:text-lg">
								Start creating quizzes to see them here
							</p>
						</div>
					</div>
				))}
			{status === "error" && (
				<div className="flex flex-wrap items-center gap-6">
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

export default MyQuizzes;

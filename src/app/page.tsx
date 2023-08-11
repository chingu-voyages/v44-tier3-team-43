import FeaturedQuizzes from "@/components/FeaturedQuizzes";
import Heading from "@/components/Heading";
import LatestQuizzes from "@/components/LatestQuizzes";
import PopularTopics from "@/components/PopularTopics";
import QuizzesSkeleton from "@/components/QuizzesSkeleton";
import { Suspense } from "react";

const Home = () => (
	<>
		<PopularTopics />
		<Heading className="mt-16 md:mt-20 mb-8" size="3xl" as="h2">
			Latest Quizzes
		</Heading>
		<Suspense fallback={<QuizzesSkeleton />}>
			<LatestQuizzes />
		</Suspense>
		<Heading className="mt-16 md:mt-20 mb-8" size="3xl" as="h2">
			Featured Quizzes
		</Heading>
		<Suspense fallback={<QuizzesSkeleton />}>
			<FeaturedQuizzes />
		</Suspense>
	</>
);

export default Home;

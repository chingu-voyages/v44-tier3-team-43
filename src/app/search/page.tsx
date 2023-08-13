import Heading from "@/components/Heading";
import QuizSearch from "@/components/QuizSearch";
import QuizSearchFilters from "@/components/QuizSearchFilters";
import QuizzesSkeleton from "@/components/QuizzesSkeleton";
import { openGraph, twitter } from "@/utils/sharedMetadata";
import { Metadata } from "next";
import { Suspense } from "react";

const title = "Search quizzes";
const description =
	"Search for and play quizzes on a wide range of topics using Quizipy! Whether you're looking to test your knowledge, challenge your friends, or learn something new, our extensive collection of quizzes has something for everyone. Simply enter a keyword or select a topic you're interested in, and dive into the world of trivia and fun.";

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		...openGraph,
		title,
		description
	},
	twitter: {
		...twitter,
		title,
		description
	}
};

const Page = () => (
	<>
		<Heading className="mb-8" size="5xl">
			Results
		</Heading>
		<QuizSearchFilters />
		<Suspense fallback={<QuizzesSkeleton className="mt-11" count={20} />}>
			<QuizSearch />
		</Suspense>
	</>
);

export default Page;

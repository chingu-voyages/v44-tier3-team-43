import Heading from "@/components/Heading";
import QuizSearch from "@/components/QuizSearch";
import QuizSearchFilters from "@/components/QuizSearchFilters";
import QuizzesSkeleton from "@/components/QuizzesSkeleton";
import { Suspense } from "react";

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

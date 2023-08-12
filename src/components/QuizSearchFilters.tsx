import QuizSearchCategory from "@/components/QuizSearchCategory";
import QuizSearchSortBy from "@/components/QuizSearchSortBy";
import ClearSearchFilters from "@/components/ClearSearchFilters";
import { Suspense } from "react";
import ButtonSkeleton from "./ButtonSkeleton";

const QuizSearchFilters = () => (
	<div className="flex flex-wrap gap-x-3 gap-y-2">
		<Suspense fallback={<ButtonSkeleton variant="secondary" size="lg" />}>
			<QuizSearchCategory />
		</Suspense>
		<Suspense fallback={<ButtonSkeleton variant="secondary" size="lg" />}>
			<QuizSearchSortBy />
		</Suspense>
		<Suspense
			fallback={<ButtonSkeleton className="w-16" variant="outline" size="lg" />}
		>
			<ClearSearchFilters />
		</Suspense>
	</div>
);

export default QuizSearchFilters;

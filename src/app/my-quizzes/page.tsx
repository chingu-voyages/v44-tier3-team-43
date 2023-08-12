import { buttonVariants } from "@/components/Button";
import ButtonSkeleton from "@/components/ButtonSkeleton";
import Heading from "@/components/Heading";
import MyQuizzes from "@/components/MyQuizzes";
import NewQuizDialogOpener from "@/components/NewQuizDialogOpener";
import { Suspense } from "react";

const Page = () => (
	<>
		<Heading className="mb-8" size="5xl">
			My Quizzes
		</Heading>
		<Suspense fallback={<ButtonSkeleton className="mb-11" size="lg" />}>
			<NewQuizDialogOpener
				className={buttonVariants({
					size: "lg",
					className: "mb-11 hover:text-custom-white"
				})}
			>
				New quiz
			</NewQuizDialogOpener>
		</Suspense>
		<MyQuizzes />
	</>
);

export default Page;

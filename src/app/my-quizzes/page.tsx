import { buttonVariants } from "@/components/Button";
import ButtonSkeleton from "@/components/ButtonSkeleton";
import Heading from "@/components/Heading";
import MyQuizzes from "@/components/MyQuizzes";
import NewQuizDialogOpener from "@/components/NewQuizDialogOpener";
import { openGraph, twitter } from "@/utils/sharedMetadata";
import { Metadata } from "next";
import { Suspense } from "react";

const title = "My quizzes";
const description =
	"Effortlessly manage your quizzes with Quizipy. View, create, edit, and delete quizzes according to your preferences. Craft engaging quizzes that align with your objectives and refine them with ease. Take control of your quiz experience today.";

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

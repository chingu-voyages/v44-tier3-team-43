import { buttonVariants } from "@/components/Button";
import Heading from "@/components/Heading";
import MyQuizzes from "@/components/MyQuizzes";
import NewQuizDialogOpener from "@/components/NewQuizDialogOpener";

const Page = () => (
	<>
		<Heading className="mb-8" size="5xl">
			My Quizzes
		</Heading>
		<NewQuizDialogOpener
			className={buttonVariants({
				size: "lg",
				className: "mb-11 hover:text-custom-white"
			})}
		>
			New quiz
		</NewQuizDialogOpener>
		<MyQuizzes />
	</>
);

export default Page;

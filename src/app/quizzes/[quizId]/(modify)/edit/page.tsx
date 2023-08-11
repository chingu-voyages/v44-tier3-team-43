import EditQuizForm from "@/components/EditQuizForm";
import Heading from "@/components/Heading";
import { getQuiz } from "@/utils/fetchers";

const Page = async ({ params: { quizId } }: { params: { quizId: string } }) => {
	const quiz = await getQuiz(quizId);

	return (
		<>
			<Heading className="mb-8 lg:mb-11" size="5xl">
				Edit Quiz
			</Heading>
			<EditQuizForm
				id={quiz.id}
				title={quiz.title}
				category={quiz.category}
				image={quiz.image}
			/>
		</>
	);
};

export default Page;

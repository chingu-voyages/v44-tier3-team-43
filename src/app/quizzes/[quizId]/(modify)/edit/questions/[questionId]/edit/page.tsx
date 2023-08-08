import EditQuestionForm from "@/components/EditQuestionForm";
import Heading from "@/components/Heading";
import { getQuestion } from "@/utils/fetchers";

const Page = async ({
	params: { quizId, questionId }
}: {
	params: { quizId: string; questionId: string };
}) => {
	const question = await getQuestion({ quizId, questionId });

	return (
		<>
			<Heading className="mb-8 lg:mb-11" size="5xl">
				Edit Question
			</Heading>
			<EditQuestionForm
				id={question.id}
				title={question.title}
				answers={question.answers}
			/>
		</>
	);
};

export default Page;

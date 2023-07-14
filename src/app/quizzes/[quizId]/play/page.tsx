import Heading from "@/components/Heading";
import Questions from "@/components/Questions";
import { getQuestions } from "@/utils/fetchers";

const Page = async ({ params: { quizId } }: { params: { quizId: string } }) => {
	const questions = await getQuestions(quizId);

	return questions && questions.length ? (
		<Questions questions={questions} quizId={quizId} />
	) : (
		<Heading>There's nothing here yet</Heading>
	);
};

export default Page;

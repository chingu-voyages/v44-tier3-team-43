import Questions from "@/components/Questions";
import { getQuestions } from "@/utils/fetchers";

const Page = async ({ params: { quizId } }: { params: { quizId: string } }) => {
	const questions = await getQuestions(quizId);

	return <Questions questions={questions} />;
};

export default Page;

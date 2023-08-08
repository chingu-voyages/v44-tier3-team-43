import { getQuestions } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";

const useQuestions = (quizId: string) =>
	useQuery({
		queryKey: ["questions", quizId],
		queryFn: async () => await getQuestions(quizId)
	});

export default useQuestions;

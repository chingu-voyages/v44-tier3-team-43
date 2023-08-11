import { IQuestion } from "@/types/api";
import { createQuestion } from "@/utils/fetchers";
import { createQuestionSchema } from "@/utils/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

interface IVariables extends z.infer<typeof createQuestionSchema> {
	quizId: string;
}

const useCreateQuestion = () => {
	const queryClient = useQueryClient();

	return useMutation<IQuestion, Error, IVariables>(createQuestion, {
		onSuccess: (newQuestion, { quizId }) => {
			queryClient.setQueryData<IQuestion[]>(["questions", quizId], (old) => [
				...(old || []),
				newQuestion
			]);
		}
	});
};

export default useCreateQuestion;

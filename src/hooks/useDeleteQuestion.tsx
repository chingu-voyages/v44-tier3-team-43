import { IQuestion } from "@/types/api";
import { deleteQuestion } from "@/utils/fetchers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IVariables {
	quizId: string;
	questionId: string;
}

const useDeleteQuestion = () => {
	const queryClient = useQueryClient();

	return useMutation<string, Error, IVariables>(deleteQuestion, {
		onMutate: async ({ quizId, questionId }) => {
			const key = ["questions", quizId];

			await queryClient.cancelQueries(key);

			const previousQuestions = queryClient.getQueryData(key);

			queryClient.setQueryData<IQuestion[]>(key, (old) =>
				old?.filter((question) => question.id !== questionId)
			);

			return {
				previousQuestions
			};
		},
		onError: (_, { quizId }, context: any) => {
			queryClient.setQueryData(["questions", quizId], context.previousQuestions);
		},
		onSettled: (_, __, { quizId }) => {
			queryClient.invalidateQueries({ queryKey: ["questions", quizId] });
		}
	});
};

export default useDeleteQuestion;

import { IQuiz } from "@/types/api";
import { deleteQuiz } from "@/utils/fetchers";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteQuiz = () => {
	const queryClient = useQueryClient();

	return useMutation<string, Error, string>(deleteQuiz, {
		onMutate: async (quizId) => {
			const key = ["my-quizzes"];

			await queryClient.cancelQueries(key);

			const previousPages = queryClient.getQueryData(key);

			queryClient.setQueryData<InfiniteData<IQuiz[]>>(key, (oldData) => ({
				pages: [
					...(oldData?.pages.map((page) =>
						page.filter((quiz) => quiz.id !== quizId)
					) || [])
				],
				pageParams: oldData?.pageParams || []
			}));

			return {
				previousPages
			};
		},
		onError: (_, __, context: any) => {
			queryClient.setQueryData(["my-quizzes"], context.previousPages);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["my-quizzes"] });
		}
	});
};

export default useDeleteQuiz;

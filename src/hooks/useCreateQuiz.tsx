import { IQuiz } from "@/types/api";
import { createQuiz } from "@/utils/fetchers";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateQuiz = () => {
	const queryClient = useQueryClient();

	return useMutation<IQuiz, Error, FormData>(createQuiz, {
		onSuccess: (newQuiz) => {
			queryClient.setQueryData<InfiniteData<IQuiz[]>>(
				["my-quizzes"],
				(oldData) => ({
					pages: [[newQuiz], ...(oldData?.pages || [])],
					pageParams: oldData?.pageParams || []
				})
			);
		}
	});
};

export default useCreateQuiz;

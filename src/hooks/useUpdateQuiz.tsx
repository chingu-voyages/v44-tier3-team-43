import { IQuiz } from "@/types/api";
import { updateQuiz } from "@/utils/fetchers";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";

interface IVariables {
	formData: FormData;
	quizId: string;
}

const useUpdateQuiz = () => {
	const queryClient = useQueryClient();

	return useMutation<IQuiz, Error, IVariables>(updateQuiz, {
		onSuccess: (updatedQuiz) => {
			queryClient.setQueryData<InfiniteData<IQuiz[]>>(
				["my-quizzes"],
				(oldData) => ({
					pages: [
						...(oldData?.pages.map((page) =>
							page.map((quiz) =>
								quiz.id === updatedQuiz.id
									? { ...quiz, ...updatedQuiz }
									: quiz
							)
						) || [])
					],
					pageParams: oldData?.pageParams || []
				})
			);
		}
	});
};

export default useUpdateQuiz;

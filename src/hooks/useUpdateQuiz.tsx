import { IQuiz } from "@/types/api";
import { updateQuiz } from "@/utils/fetchers";
import { useMutation } from "@tanstack/react-query";

interface IVariables {
	formData: FormData;
	quizId: string;
}

const useUpdateQuiz = () => useMutation<IQuiz, Error, IVariables>(updateQuiz);

export default useUpdateQuiz;

import { IQuestion } from "@/types/api";
import { updateQuestion } from "@/utils/fetchers";
import { updateQuestionSchema } from "@/utils/schemas";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

interface IVariables extends z.infer<typeof updateQuestionSchema> {
	quizId: string;
	questionId: string;
}

const useUpdateQuestion = () => useMutation<IQuestion, Error, IVariables>(updateQuestion);

export default useUpdateQuestion;

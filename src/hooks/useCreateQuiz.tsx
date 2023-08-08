import { IQuiz } from "@/types/api";
import { createQuiz } from "@/utils/fetchers";
import { useMutation } from "@tanstack/react-query";

const useCreateQuiz = () => useMutation<IQuiz, Error, FormData>(createQuiz);

export default useCreateQuiz;

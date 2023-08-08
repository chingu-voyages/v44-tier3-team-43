import { deleteQuiz } from "@/utils/fetchers";
import { useMutation } from "@tanstack/react-query";

const useDeleteQuiz = () => useMutation<string, Error, string>(deleteQuiz);

export default useDeleteQuiz;

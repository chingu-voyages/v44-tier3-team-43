import { getCategories } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";

const useCategories = () =>
	useQuery({
		queryKey: ["categories"],
		queryFn: getCategories
	});

export default useCategories;

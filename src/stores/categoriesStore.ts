import { ICategory } from "@/types/api";
import { create } from "zustand";

interface ICategoriesState {
	categories: ICategory[];
}

const useCategoriesStore = create<ICategoriesState>()(() => ({
	categories: []
}));

export default useCategoriesStore;

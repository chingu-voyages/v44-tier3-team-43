"use client";

import { useRef } from "react";
import { ICategory } from "@/types/api";
import useCategoriesStore from "@/stores/categoriesStore";

const CategoriesStoreInitializer = ({ categories }: { categories: ICategory[] }) => {
	const initialized = useRef<boolean>(false);

	if (!initialized.current) {
		useCategoriesStore.setState({ categories });
		initialized.current = true;
	}

	return null;
};

export default CategoriesStoreInitializer;

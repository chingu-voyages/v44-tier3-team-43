"use client";

import {
	SelectContent,
	SelectIcon,
	SelectItem,
	SelectItemText,
	SelectRoot,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectTrigger,
	SelectValue,
	SelectViewport
} from "@/components/Select";
import useCategoriesStore from "@/stores/categoriesStore";
import { forwardRef } from "react";

interface IProps {
	value?: string;
	onValueChange?: (val: string) => void;
	disableAny?: boolean;
}

const CategoriesSelect = forwardRef<HTMLSpanElement, IProps>(
	({ value, onValueChange, disableAny }, ref) => {
		const { categories } = useCategoriesStore();

		return (
			<SelectRoot value={value || "any"} onValueChange={onValueChange}>
				<SelectTrigger className="font-normal" size="lg">
					Category:
					<span className="font-medium text-custom-green">
						<SelectValue ref={ref} placeholder="Any" />
					</span>
					<SelectIcon />
				</SelectTrigger>
				<SelectContent>
					<SelectScrollUpButton />
					<SelectViewport>
						<SelectItem value="any" disabled={disableAny}>
							<SelectItemText>Any</SelectItemText>
						</SelectItem>
						{categories.map((category, index) => (
							<SelectItem
								key={`${category}-${index}`}
								value={category.name.toLowerCase()}
							>
								<SelectItemText>{category.name}</SelectItemText>
							</SelectItem>
						))}
					</SelectViewport>
					<SelectScrollDownButton />
				</SelectContent>
			</SelectRoot>
		);
	}
);

export default CategoriesSelect;

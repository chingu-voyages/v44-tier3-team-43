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
import useCategories from "@/hooks/useCategories";
import { forwardRef } from "react";
import Spinner from "@/components/Spinner";

interface IProps {
	value?: string;
	onValueChange?: (val: string) => void;
	disableAny?: boolean;
}

const CategoriesSelect = forwardRef<HTMLSpanElement, IProps>(
	({ value, onValueChange, disableAny }, ref) => {
		const { data: categories, status } = useCategories();

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
					<SelectViewport
						className={status === "loading" ? "py-4 flex justify-center" : ""}
					>
						{status === "loading" && <Spinner />}
						{status === "success" && (
							<>
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
							</>
						)}
					</SelectViewport>
					<SelectScrollDownButton />
				</SelectContent>
			</SelectRoot>
		);
	}
);

export default CategoriesSelect;

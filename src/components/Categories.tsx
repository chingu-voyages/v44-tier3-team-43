import {
	DropdownRoot,
	DropdownTrigger,
	DropdownContent,
	DropdownItem
} from "@/components/Dropdown";
import useCategoriesStore from "@/stores/categoriesStore";
import clsx from "clsx";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

const Categories = () => {
	const categories = useCategoriesStore.getState().categories;

	return (
		<DropdownRoot modal={false}>
			<DropdownTrigger className="pr-4">
				Categories
				<BsChevronDown
					className={clsx(
						"absolute top-1/2 right-0 w-3 h-3 -translate-y-1/2 text-light-grey transition duration-200",
						"group-radix-state-open:rotate-180 group-radix-state-open:opacity-60"
					)}
				/>
			</DropdownTrigger>
			<DropdownContent className="grid-cols-3">
				<div className="absolute left-1/2 -top-1 w-2 h-2 bg-inherit rotate-45 -translate-x-1/2"></div>
				{categories.map((category, index) => (
					<DropdownItem asChild key={`${category}-${index}`}>
						<Link
							className="block"
							href={{
								pathname: "/search",
								query: { category: category.name.toLowerCase() }
							}}
						>
							{category.name}
						</Link>
					</DropdownItem>
				))}
			</DropdownContent>
		</DropdownRoot>
	);
};

export default Categories;

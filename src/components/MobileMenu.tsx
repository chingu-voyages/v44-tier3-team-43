"use client";

import {
	DropdownContent,
	DropdownItem,
	DropdownRoot,
	DropdownSeparator,
	DropdownSub,
	DropdownSubContent,
	DropdownSubTrigger,
	DropdownTrigger
} from "@/components/Dropdown";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { buttonVariants } from "@/components/Button";
import { BsChevronLeft } from "react-icons/bs";
import clsx from "clsx";

const MobileMenu = () => (
	<nav className="block lg:hidden">
		<DropdownRoot modal={false}>
			<DropdownTrigger className="text-light-grey hover:text-light-grey">
				<HiMenuAlt3 className="w-7 h-7" />
			</DropdownTrigger>
			<DropdownContent
				className="py-6 pl-8 pr-6 gap-y-4 max-w-[20rem] w-full"
				align="end"
			>
				<div className="absolute right-2.5 -top-1 w-2 h-2 bg-inherit -rotate-45 origin-top-right"></div>
				{[
					{ href: "/", title: "Home" },
					{ href: "/my-quizzes", title: "My Quizzes" },
					{ href: "/new-quiz", title: "New Quiz" }
				].map(({ href, title }, index) => (
					<DropdownItem asChild key={index}>
						<Link className="block" href={href}>
							{title}
						</Link>
					</DropdownItem>
				))}
				<DropdownSub>
					<DropdownSubTrigger className="pl-4 -ml-4">
						<BsChevronLeft
							className={clsx(
								"absolute top-1/2 left-0 w-3 h-3 -translate-y-1/2 text-light-grey transition",
								"duration-200"
							)}
						/>
						Categories
					</DropdownSubTrigger>
					<DropdownSubContent className="grid-cols-2 gap-x-4" alignOffset={-60}>
						{[
							"Books",
							"Film",
							"Music",
							"Theater",
							"Television",
							"Video Games",
							"Nature",
							"Computers",
							"Mathematics",
							"Mythology",
							"Sports",
							"Geography",
							"History",
							"Politics",
							"Art",
							"Celebrities",
							"Animals"
						].map((category, index) => (
							<DropdownItem asChild key={index}>
								<Link className="block" href="#">
									{category}
								</Link>
							</DropdownItem>
						))}
					</DropdownSubContent>
				</DropdownSub>
				<DropdownSeparator />
				<Link className={buttonVariants({ size: "sm" })} href="/auth">
					Sign in
				</Link>
			</DropdownContent>
		</DropdownRoot>
	</nav>
);

export default MobileMenu;

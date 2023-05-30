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
import Button, { buttonVariants } from "@/components/Button";
import { BsChevronLeft } from "react-icons/bs";
import clsx from "clsx";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { signOut, useSession } from "next-auth/react";

const MobileMenu = () => {
	const { data: session } = useSession();

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<nav className="flex items-center lg:hidden">
			<DropdownRoot modal={false}>
				<DropdownTrigger className="text-light-grey hover:text-light-grey">
					<HiMenuAlt3 className="w-6 h-6" />
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
						<DropdownSubTrigger className="pl-4 -ml-4 text-sm">
							<BsChevronLeft
								className={clsx(
									"absolute top-1/2 left-0 w-3 h-3 -translate-y-1/2 text-light-grey transition",
									"duration-200"
								)}
							/>
							Categories
						</DropdownSubTrigger>
						<DropdownSubContent
							className="grid-cols-2 gap-x-4"
							alignOffset={-60}
						>
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
					{session ? (
						<Button size="sm" onClick={handleSignOut}>
							Sign out
						</Button>
					) : (
						<DropdownMenuItem asChild>
							<Link className={buttonVariants({ size: "sm" })} href="/auth">
								Sign in
							</Link>
						</DropdownMenuItem>
					)}
				</DropdownContent>
			</DropdownRoot>
		</nav>
	);
};

export default MobileMenu;
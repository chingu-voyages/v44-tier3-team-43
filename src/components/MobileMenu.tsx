import {
	DropdownContent,
	DropdownItem,
	DropdownRoot,
	DropdownSeparator,
	DropdownSub,
	DropdownSubTrigger,
	DropdownTrigger
} from "@/components/Dropdown";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsChevronLeft } from "react-icons/bs";
import clsx from "clsx";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { getUserSession } from "@/lib/auth";
import MobileCategories from "@/components/MobileCategories";
import NewQuizDialogOpener from "@/components/NewQuizDialogOpener";

const MobileMenu = async () => {
	const session = await getUserSession();

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
						{ href: "/my-quizzes", title: "My Quizzes" }
					].map(({ href, title }, index) => (
						<DropdownItem asChild key={index}>
							<Link className="block" href={href}>
								{title}
							</Link>
						</DropdownItem>
					))}
					<DropdownItem asChild>
						<NewQuizDialogOpener>New Quiz</NewQuizDialogOpener>
					</DropdownItem>
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
						<MobileCategories />
					</DropdownSub>
					<DropdownSeparator />
					{session ? <LogoutButton size="sm" /> : <LoginButton size="sm" />}
				</DropdownContent>
			</DropdownRoot>
		</nav>
	);
};

export default MobileMenu as unknown as () => JSX.Element;

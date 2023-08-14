import Image from "next/image";
import Link from "next/link";
import Search from "@/components/Search";
import Categories from "@/components/Categories";
import MobileMenu from "@/components/MobileMenu";
import clsx from "clsx";
import NewQuizDialogOpener from "@/components/NewQuizDialogOpener";
import { Suspense } from "react";
import DesktopMenuAuth from "@/components/DesktopMenuAuth";

const Header = () => (
	<header
		className={clsx(
			"fixed top-0 left-0 py-5 w-full border-b border-dark-grey bg-custom-black z-50"
		)}
	>
		<div className="container flex justify-between items-center select-none">
			<nav className="flex">
				<Link
					className="mr-11 transition duration-200 hover:opacity-80 active:opacity-60"
					href="/"
				>
					<div className="relative w-24 h-10 hidden md:block">
						<Image fill src="/logo-big.svg" alt="logo big" />
					</div>
					<div className="relative w-7 h-7 block md:hidden">
						<Image fill src="/logo-small.svg" alt="logo small" />
					</div>
				</Link>
				<div className="hidden lg:flex items-center gap-8 font-medium">
					{[
						{ href: "/", title: "Home" },
						{ href: "/my-quizzes", title: "My Quizzes" }
					].map(({ href, title }, index) => (
						<Link
							className="transition duration-200 hover:text-custom-green active:opacity-80"
							href={href}
							key={index}
						>
							{title}
						</Link>
					))}
					<Suspense fallback={<a>New Quiz</a>}>
						<NewQuizDialogOpener>New Quiz</NewQuizDialogOpener>
					</Suspense>
					<Categories />
				</div>
			</nav>
			<div className="flex gap-x-4 lg:gap-x-8 items-center flex-grow justify-end">
				<Suspense
					fallback={
						<div
							className={clsx(
								"px-2.5 py-1 lg:px-3 lg:py-1.5 max-w-[28rem] lg:max-w-[14rem] w-full",
								"h-7 lg:h-9 rounded-xl bg-light-grey"
							)}
						></div>
					}
				>
					<Search />
				</Suspense>
				<Suspense
					fallback={
						<div className="hidden lg:block w-9 h-9 rounded-full bg-light-grey"></div>
					}
				>
					<DesktopMenuAuth />
				</Suspense>
				<MobileMenu />
			</div>
		</div>
	</header>
);

export default Header;

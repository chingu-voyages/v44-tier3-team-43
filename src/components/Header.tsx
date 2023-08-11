import Image from "next/image";
import Link from "next/link";
import Search from "@/components/Search";
import Categories from "@/components/Categories";
import MobileMenu from "@/components/MobileMenu";
import clsx from "clsx";
import { getUserSession } from "@/lib/auth";
import User from "@/components/User";
import LoginButton from "@/components/LoginButton";
import NewQuizDialogOpener from "@/components/NewQuizDialogOpener";

const Header = async () => {
	const session = await getUserSession();

	return (
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
						<Image
							className="hidden md:block"
							width={110}
							height={40}
							src="/logo-big.svg"
							alt="logo big"
						/>
						<Image
							className="block md:hidden"
							width={28}
							height={28}
							src="/logo-small.svg"
							alt="logo small"
						/>
					</Link>
					<div className="hidden lg:flex items-center gap-8 font-medium">
						{[
							{ href: "/", title: "Home" },
							{ href: "/my-quizzes", title: "My Quizzes" },
						].map(({ href, title }, index) => (
							<Link
								className="transition duration-200 hover:text-custom-green active:opacity-80"
								href={href}
								key={index}
							>
								{title}
							</Link>
						))}
						<NewQuizDialogOpener>New Quiz</NewQuizDialogOpener>
						<Categories />
					</div>
				</nav>
				<div className="flex gap-x-4 lg:gap-x-8 items-center flex-grow justify-end">
					<Search />
					<div className="hidden lg:flex items-center">
						{session ? (
							<User name={session.user.name!} image={session.user.image!} />
						) : (
							<LoginButton />
						)}
					</div>
					<MobileMenu />
				</div>
			</div>
		</header>
	);
};

export default Header as unknown as () => JSX.Element;

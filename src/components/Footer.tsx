import clsx from "clsx";
import { AiOutlineGithub } from "react-icons/ai";

const Footer = () => (
	<footer
		className={clsx(
			"w-full mt-16 md:mt-28 lg:mt-32 py-7 lg:pt-10 lg:pb-24 bg-custom-black",
			"border-t border-dark-grey text-center"
		)}
	>
		<div className="container flex flex-col items-center text-sm sm:text-base">
			<p>
				Developed by{" "}
				<a
					className={clsx(
						"text-custom-green font-medium transition duration-200",
						"hover:opacity-80 active:opacity-60"
					)}
					href="https://github.com/Pio-js"
					target="_blank"
				>
					Pio-js
				</a>{" "}
				and{" "}
				<a
					className={clsx(
						"text-custom-green font-medium transition duration-200",
						"hover:opacity-80 active:opacity-60"
					)}
					href="https://github.com/K0D0D"
					target="_blank"
				>
					K0D0D
				</a>
			</p>
			<a
				className={clsx(
					"mt-3 flex items-center gap-x-1 font-medium transition duration-200",
					"hover:opacity-80 active:opacity-60"
				)}
				href="https://github.com/chingu-voyages/v44-tier3-team-43"
				target="_blank"
			>
				<AiOutlineGithub className="w-5 h-5" />
				Source code
			</a>
		</div>
	</footer>
);

export default Footer;

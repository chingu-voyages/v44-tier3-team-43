import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface IProps {
	id: string;
	title: string;
	quizImage: string;
	userImage: string;
	userName: string;
}

const QuizCard = ({ id, title, quizImage, userImage, userName }: IProps) => (
	<div className="flex flex-col md:flex-row bg-dark-grey rounded-lg overflow-hidden select-none">
		<Link
			className="relative w-full pb-[70%] md:w-[45%] md:pb-[36%] bg-custom-green"
			href={`/quizzes/${id}`}
		>
			<Image
				className="object-cover transition duration-200 hover:opacity-80 active:opacity-60"
				fill
				src={quizImage}
				alt={title}
			/>
		</Link>
		<div className="px-3 py-5 md:w-[55%] md:pl-5 md:pr-6 md:py-8">
			<Link
				className={clsx(
					"text-lg sm:text-xl font-medium line-clamp-3 transition duration-200",
					"hover:text-custom-green active:opacity-80"
				)}
				href={`/quizzes/${id}`}
			>
				{title}
			</Link>
			<div className="mt-5 md:mt-8 flex items-center gap-x-2">
				<Image
					className="rounded-full"
					width={24}
					height={24}
					src={userImage}
					alt={userName}
				/>
				<p className="text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
					{userName}
				</p>
			</div>
		</div>
	</div>
);

export default QuizCard;

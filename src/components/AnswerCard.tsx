import Button from "@/components/Button";
import twclsx from "@/utils/twclsx";
import { ComponentProps } from "react";

interface IProps extends ComponentProps<typeof Button> {
	isQuestionAnswered: boolean;
	text: string;
	correct: boolean;
	isClicked: boolean;
}

const AnswerCard = ({
	isQuestionAnswered,
	text,
	correct,
	isClicked,
	...rest
}: IProps) => (
	<Button
		className={twclsx(
			"py-2 lg:py-3 w-full whitespace-normal text-center duration-0",
			isQuestionAnswered && correct
				? "bg-custom-green disabled:opacity-1"
				: isClicked && !correct && "bg-custom-red disabled:opacity-1"
		)}
		variant="secondary"
		size="lg"
		disabled={isQuestionAnswered}
		{...rest}
	>
		{text}
	</Button>
);

export default AnswerCard;

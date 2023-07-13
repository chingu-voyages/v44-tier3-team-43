import { Answer } from "@prisma/client";
import Heading from "@/components/Heading";
import AnswerCard from "@/components/AnswerCard";

interface IProps {
	question: string;
	answers: Answer[];
	userAnswer?: Answer;
	onAnswer: (answer: Answer) => void;
}

const QuestionCard = ({ question, answers, userAnswer, onAnswer }: IProps) => (
	<>
		<Heading className="text-center" as="h3" size="2xl">
			{question}
		</Heading>
		<div className="mt-8 grid md:grid-cols-2 auto-rows-fr gap-3">
			{answers.map((answer) => (
				<AnswerCard
					isQuestionAnswered={!!userAnswer}
					text={answer.text}
					correct={answer.correct}
					isClicked={userAnswer?.id === answer.id}
					onClick={() => onAnswer(answer)}
					key={answer.id}
				/>
			))}
		</div>
	</>
);

export default QuestionCard;

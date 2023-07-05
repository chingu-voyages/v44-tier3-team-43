import { IQuiz } from "@/types/api";
import QuizCard from "@/components/QuizCard";

const Quizzes = ({ quizzes }: { quizzes: IQuiz[] }) => (
	<div className="mt-8 grid grid-cols-2 auto-rows-fr gap-x-3 gap-y-5 lg:gap-x-5 lg:gap-y-7">
		{quizzes.map((quiz) => (
			<QuizCard
				id={quiz.id}
				title={quiz.title}
				quizImage={quiz.image}
				userImage={quiz.User.image}
				userName={quiz.User.name}
				key={quiz.id}
			/>
		))}
	</div>
);

export default Quizzes;

"use client";

import { IQuestion } from "@/types/api";
import QuestionCard from "@/components/QuestionCard";
import { useState } from "react";
import { Answer } from "@prisma/client";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import CircleProgress from "@/components/CircleProgress";

const Questions = ({ questions }: { questions: IQuestion[] }) => {
	const [isGameOver, setIsGameOver] = useState<boolean>(false);
	const [questionIndex, setQuestionIndex] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

	const isQuestionAnswered = userAnswers[questionIndex] ? true : false;

	const startQuiz = () => {
		setIsGameOver(false);
		setQuestionIndex(0);
		setScore(0);
		setUserAnswers([]);
	};

	const nextQuestion = async () => {
		const newQuestionIndex = questionIndex + 1;

		if (newQuestionIndex >= questions.length) {
			return setIsGameOver(true);
		}

		setQuestionIndex(newQuestionIndex);
	};

	const handleAnswer = (answer: Answer) => {
		if (answer.correct) setScore((prev) => prev + 1);

		setUserAnswers((prev) => [...prev, answer]);
	};

	return (
		<>
			{isGameOver ? (
				<div className="flex flex-col items-center text-center">
					<Heading size="2xl" as="h3">
						Your score is
					</Heading>
					<CircleProgress
						className="relative mt-8"
						radius={75}
						ratio={score / questions.length}
					>
						<p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-2xl font-medium">
							{score} / {questions.length}
						</p>
					</CircleProgress>
					<Button className="mt-11" size="lg" onClick={startQuiz}>
						Play again
					</Button>
				</div>
			) : (
				<>
					<p className="mb-4 text-center">
						<span className="fond-medium">{questionIndex + 1}</span> of{" "}
						<span className="font-medium">{questions.length}</span>
					</p>
					<QuestionCard
						question={questions[questionIndex].title}
						answers={questions[questionIndex].answers}
						userAnswer={userAnswers[questionIndex]}
						onAnswer={handleAnswer}
					/>
					{isQuestionAnswered && (
						<Button className="mx-auto mt-6" size="lg" onClick={nextQuestion}>
							{questionIndex === questions.length - 1
								? "Finish quiz"
								: "Next question"}
						</Button>
					)}
				</>
			)}
		</>
	);
};

export default Questions;

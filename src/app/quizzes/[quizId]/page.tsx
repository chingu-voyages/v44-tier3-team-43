import Heading from "@/components/Heading";

const Page = ({ params: { quizId } }: { params: { quizId: string } }) => {
	return <Heading>Quiz with id {quizId}</Heading>;
};

export default Page;

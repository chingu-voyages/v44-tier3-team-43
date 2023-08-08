import Heading from "@/components/Heading";
import NewQuestionForm from "@/components/NewQuestionForm";

const Page = () => (
	<>
		<Heading className="mb-8 lg:mb-11" size="5xl">
			New Question
		</Heading>
		<NewQuestionForm />
	</>
);

export default Page;

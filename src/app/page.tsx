import FeaturedQuizzes from "@/components/FeaturedQuizzes";
import LatestQuizzes from "@/components/LatestQuizzes";
import PopularTopics from "@/components/PopularTopics";

const Home = () => (
	<>
		<PopularTopics />
		<LatestQuizzes />
		<FeaturedQuizzes />
	</>
);

export default Home;

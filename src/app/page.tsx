import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Home = async () => {
    const user = await getServerSession(authOptions);

    console.log(user);

    return <></>;
};

export default Home;

import { Suspense } from "react";
import Loading from "./loading";
import Heading from "@/components/Heading";

const Layout = ({ children }: { children: React.ReactNode }) => (
	<>
		<Heading size="5xl">Results</Heading>
		<Suspense fallback={<Loading />}>{children}</Suspense>
	</>
);

export default Layout;

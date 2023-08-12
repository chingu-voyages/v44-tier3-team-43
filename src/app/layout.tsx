import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewQuizDialog from "@/components/NewQuizDialog";
import Providers from "@/components/Providers";
import "@/styles/globals.css";
import twclsx from "@/utils/twclsx";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Quizify",
	description: "Generated by create next app"
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => (
	<html lang="en">
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</head>
		<body
			className={twclsx(
				"min-h-screen flex flex-col bg-custom-black text-custom-white",
				inter.className
			)}
		>
			<Providers>
				<Header />
				<Suspense fallback={<></>}>
					<NewQuizDialog />
				</Suspense>
				<main className="mt-28 md:mt-40 flex-1 container flex flex-col">
					{children}
				</main>
				<Footer />
			</Providers>
		</body>
	</html>
);

export default RootLayout;

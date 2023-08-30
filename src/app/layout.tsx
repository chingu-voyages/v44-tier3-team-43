import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewQuizDialog from "@/components/NewQuizDialog";
import Providers from "@/components/Providers";
import "@/styles/globals.css";
import twclsx from "@/utils/twclsx";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { baseUrl, openGraph, twitter } from "@/utils/sharedMetadata";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

const title = "Quizipy";
const description =
	"Quizipy is a dynamic online platform that offers a wide range of quizzes for users to play, create, and share. Dive into interactive learning and entertainment with quizzes on various topics, challenge your knowledge, and unleash your creativity by crafting your own quizzes.";

export const metadata: Metadata = {
	title: {
		default: title,
		template: `%s | ${title}`
	},
	description,
	metadataBase: baseUrl,
	openGraph: {
		...openGraph,
		title: {
			default: title,
			template: `%s | ${title}`
		},
		description
	},
	twitter: {
		...twitter,
		title: {
			default: title,
			template: `%s | ${title}`
		},
		description
	},
	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
	}
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

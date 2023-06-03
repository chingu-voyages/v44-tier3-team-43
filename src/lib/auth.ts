import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import { firestore } from "@/lib/firebase";
import GoogleProvider from "next-auth/providers/google";

const getGoogleCredentials = () => {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

	if (!clientId || !clientId.length) {
		throw new Error("No clientID for Google Provider set");
	}

	if (!clientSecret || !clientSecret.length) {
		throw new Error("No clientSecret for Google Provider set");
	}

	return {
		clientId,
		clientSecret
	};
};

export const authOptions: NextAuthOptions = {
	adapter: FirestoreAdapter(firestore),
	providers: [
		GoogleProvider({
			clientId: getGoogleCredentials().clientId,
			clientSecret: getGoogleCredentials().clientSecret
		})
	],
	callbacks: {
		session: async ({ session, user }) => {
			if (session?.user) {
				session.user.id = user.id;
			}

			return session;
		},
		redirect() {
			return "/";
		}
	}
};

export const getUserSession = () => getServerSession(authOptions);

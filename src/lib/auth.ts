import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

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
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt"
	},
	providers: [
		GoogleProvider({
			clientId: getGoogleCredentials().clientId,
			clientSecret: getGoogleCredentials().clientSecret
		})
	],
	callbacks: {
		session({ token, session }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
			}

			return session;
		},
		async jwt({ token, user }) {
			const dbUser = await prisma.user.findFirst({
				where: {
					email: token.email
				}
			});

			if (!dbUser) {
				token.id = user!.id;
				return token;
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image
			};
		},
		redirect() {
			return "/";
		}
	}
};

export const getUserSession = () => getServerSession(authOptions);

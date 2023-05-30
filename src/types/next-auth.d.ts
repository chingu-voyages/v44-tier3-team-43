import { Session, User } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: User & {
			name: string;
			email: string;
			image: string;
			id: string;
		};
	}
}

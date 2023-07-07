"use client";

import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Providers = ({ children }: { children: ReactNode }) => {
	const [client] = useState(new QueryClient());

	return (
		<SessionProvider>
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
		</SessionProvider>
	);
};

export default Providers;

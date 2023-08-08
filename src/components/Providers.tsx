"use client";

import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "@/components/ToastProvider";

const Providers = ({ children }: { children: ReactNode }) => {
	const [client] = useState(new QueryClient());

	return (
		<SessionProvider>
			<QueryClientProvider client={client}>
				<ToastProvider>{children}</ToastProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default Providers;

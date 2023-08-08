"use client";

import clsx from "clsx";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, CloseButtonProps } from "react-toastify";

const CloseButton = ({ closeToast }: CloseButtonProps) => (
	<button
		className={clsx(
			"absolute right-2 top-2 text-custom-white transition duration-200",
			"hover:opacity-80 active:opacity-60"
		)}
		onClick={closeToast}
	>
		<IoMdClose className="w-5 h-5" />
	</button>
);

const ToastProvider = ({ children }: { children: React.ReactNode }) => (
	<>
		{children}
		<ToastContainer
			autoClose={3000}
			draggablePercent={50}
			pauseOnHover={false}
			pauseOnFocusLoss={false}
			closeOnClick={false}
			limit={4}
			closeButton={CloseButton}
			className={clsx(
				"top-0 right-0 sm:top-auto sm:bottom-6 sm:right-6 p-0 z-[999] pointer-events-auto",
				"max-w-[26rem] flex flex-col gap-2"
			)}
			toastClassName={clsx(
				"m-0 pl-2 pr-6 py-1 lg:py-2 bg-dark-grey text-custom-white text-sm lg:text-base",
				"sm:rounded-lg shadow-md"
			)}
			bodyClassName="py-1 m-0 whitespace-break-spaces break-all"
		/>
	</>
);

export default ToastProvider;

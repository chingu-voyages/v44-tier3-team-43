import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const twclsx = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default twclsx;

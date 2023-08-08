import twclsx from "@/utils/twclsx";

const FormError = ({ message, className }: { message: string; className?: string }) => (
	<p className={twclsx("text-sm text-red-600", className)}>{message}</p>
);

export default FormError;

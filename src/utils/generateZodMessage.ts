import { ZodIssue } from "zod";
import { generateErrorMessage, ErrorMessageOptions } from "zod-error";

const generateZodMessage = (
	issues: ZodIssue[],
	options?: ErrorMessageOptions
): string => {
	const customOptions: ErrorMessageOptions = {
		delimiter: {
			error: "\n"
		},
		transform: ({ errorMessage, index }) => `Error #${index + 1}: ${errorMessage}`,
		...options
	};

	return generateErrorMessage(issues, customOptions);
};

export default generateZodMessage;

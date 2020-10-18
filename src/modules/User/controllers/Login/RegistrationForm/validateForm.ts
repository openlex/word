// import { validateEmail } from "@utils";

interface IRegistrationFormErrors {
	email?: string;
	name?: string;
}

export enum EFormError {
	REQUIRED = "Required",
	EMAIL = "Invalid email address",
}

export const validateForm = (values: { email?: string; name: string }) => {
	const errors: IRegistrationFormErrors = {};

	// if (!values.email) {
	// 	errors.email = "Required";
	// } else if (!validateEmail(values.email)) {
	// 	errors.email = "Invalid email address";
	// }

	if (!values.name) {
		errors.name = "Required";
	}

	return errors;
};

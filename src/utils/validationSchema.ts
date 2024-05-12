import { initInvalidFormMsg } from "../constants/initInvalidFormMsg.constant";
import { IInvalidFormMsg } from "../ts/interfaces/IInvalidFormMsg";
import { isGmail } from "./helpers/isGmail";
import { regexEmail } from "./helpers/regexEmail";

export const validationSchema = (
	email: string,
	password: string
): IInvalidFormMsg => {
	const validation: IInvalidFormMsg = { ...initInvalidFormMsg };

	if (!regexEmail.test(email)) {
		validation.emailErr = true;
		validation.msgEmailErr = "Invalid email address";
	} else {
		if (!isGmail(email)) {
			validation.emailErr = true;
			validation.msgEmailErr = "Only Gmail addresses are accepted";
		}
	}

	if (password.length < 6) {
		validation.passwordErr = true;
		validation.msgPasswordErr = "Password must be at least 6 characters";
	}

	if (!email) {
		validation.emailErr = true;
		validation.msgEmailErr = "Field cannot be empty";
	}

	if (!password) {
		validation.passwordErr = true;
		validation.msgPasswordErr = "Field cannot be empty";
	}

	return validation;
};

export const isGmail = (email: string): boolean => {
	const gmail = email.split("@")[1].split(".")[0];

	return gmail === "gmail";
};

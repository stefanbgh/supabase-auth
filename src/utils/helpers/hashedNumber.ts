export const hashedNumber = (phone: string): string => {
	const visibleDigits = phone.slice(-2);
	const hiddenDigits = "*".repeat(phone.length - 2);
	const hashedNumber = `+381${hiddenDigits}${visibleDigits}`;

	return hashedNumber;
};

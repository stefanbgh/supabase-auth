import { createContext } from "react";

const PhoneCtx = createContext({
	phone: "",
	setPhone: (arg: string) => {},
});

export default PhoneCtx;

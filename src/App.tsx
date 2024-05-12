import { FC, useState } from "react";

import Router from "./router/Router";
import PhoneCtx from "./context/PhoneCtx";

import "./App.scss";

const App: FC = (): JSX.Element => {
	const [phone, setPhone] = useState<string>("");

	return (
		<PhoneCtx.Provider value={{ phone, setPhone }}>
			<Router />
		</PhoneCtx.Provider>
	);
};

export default App;

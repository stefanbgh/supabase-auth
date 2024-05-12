import { FC } from "react";

import { HashLoader } from "react-spinners";

import "./Spinner.scss";

const Spinner: FC = (): JSX.Element => {
	return (
		<div className="overlay">
			<HashLoader color="#3ecf8e" speedMultiplier={3} />
		</div>
	);
};

export default Spinner;

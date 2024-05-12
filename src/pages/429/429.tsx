import { FC } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

import "./429.scss";

const TooManyReq: FC = (): JSX.Element => {
	return (
		<div className="error">
			<FaExclamationTriangle className="error-icon" />
			<h1>Oops! Something went wrong.</h1>
			<h2>Please, try again later.</h2>
		</div>
	);
};

export default TooManyReq;

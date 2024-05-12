import { FC } from "react";

import "./404.scss";
import { Link } from "react-router-dom";
import { Routes } from "../../router/Routes";

const NotFound: FC = (): JSX.Element => {
	return (
		<div className="not-found">
			<div className="not-found__message">
				<h1>404</h1>
				<h2>Page not found!</h2>
				<h3>Sorry, we can't find that page.</h3>
			</div>
			<Link to={Routes.HOME}>
				<button className="button">Go to homepage</button>
			</Link>
		</div>
	);
};

export default NotFound;

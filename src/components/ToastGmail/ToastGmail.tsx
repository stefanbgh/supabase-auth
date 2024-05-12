import { FC } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

import "./ToastGmail.scss";

const ToastGmail: FC = (): JSX.Element => (
	<div className="toast__info">
		<p>Check your</p>
		<Link className="toast__info-link" to="https://mail.google.com">
			<FaGoogle />
			mail
		</Link>
	</div>
);

export default ToastGmail;

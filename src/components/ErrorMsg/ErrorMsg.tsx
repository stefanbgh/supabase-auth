import { FC } from "react";

import "./ErrorMsg.scss";

interface IProps {
	msg: string;
}

const ErrorMsg: FC<IProps> = ({ msg }): JSX.Element => (
	<p className="error-msg">{msg}</p>
);

export default ErrorMsg;

import { FC } from "react";

import { GiSmartphone } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Routes } from "../../../router/Routes";

import "./PhoneBtn.scss";

const PhoneBtn: FC = (): JSX.Element => {
	return (
		<button className="phone-btn" type="button">
			<Link to={Routes.AUTH_OTP}>
				<GiSmartphone size={24} />
				<p>Phone</p>
			</Link>
		</button>
	);
};

export default PhoneBtn;

import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../router/Routes";
import { authToken } from "../../constants/authToken.constant";

interface IProps {
	children: ReactNode;
}

const PrivateLayout: FC<IProps> = ({ children }): JSX.Element | null => {
	const token = localStorage.getItem(authToken) as string;

	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate(Routes.LOGIN);

			return;
		}
		// eslint-disable-next-line
	}, [token]);

	if (token) return <div>{children}</div>;

	return null;
};

export default PrivateLayout;

import React, { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../router/Routes";
import { authToken } from "../../constants/authToken.constant";

interface IProps {
	children: ReactNode;
}

const PublicLayout = ({ children }: IProps): JSX.Element | null => {
	const token = localStorage.getItem(authToken) as string;

	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			navigate(Routes.HOME);

			return;
		}

		//eslint-disable-next-line
	}, [token]);

	if (!token) return <div className="container">{children}</div>;

	return null;
};

export default PublicLayout;

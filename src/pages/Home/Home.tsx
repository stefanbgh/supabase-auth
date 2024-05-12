import { FC } from "react";
import { supabaseClient } from "../../utils/helpers/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../router/Routes";
import { authToken } from "../../constants/authToken.constant";

import "./Home.scss";

const Home: FC = (): JSX.Element => {
	const navigate = useNavigate();

	const signOut = async () => {
		await supabaseClient.auth.signOut();

		localStorage.removeItem(authToken);
		navigate(Routes.LOGIN);
	};

	return (
		<div className="home">
			<h1>Welcome to the Supabase App</h1>
			<button className="button" onClick={signOut}>
				Logout
			</button>
		</div>
	);
};

export default Home;

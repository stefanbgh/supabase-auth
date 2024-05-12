import { FC } from "react";
import { supabaseClient } from "../../../utils/helpers/supabaseClient";
import { FcGoogle } from "react-icons/fc";

import "./GoogleBtn.scss";

const GoogleBtn: FC = (): JSX.Element => {
	// sign in with google
	const signInWithGoogle = async () => {
		try {
			await supabaseClient.auth.signInWithOAuth({
				provider: "google",
			});
		} catch (error) {
			throw new Error(error as string);
		}
	};

	return (
		<button className="google-btn" type="button" onClick={signInWithGoogle}>
			<FcGoogle size={24} className="icon" />
		</button>
	);
};

export default GoogleBtn;

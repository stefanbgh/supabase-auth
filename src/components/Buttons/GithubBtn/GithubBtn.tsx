import { FC } from "react";
import { supabaseClient } from "../../../utils/helpers/supabaseClient";
import { FaGithub } from "react-icons/fa";

import "./GithubBtn.scss";

const GithubBtn: FC = (): JSX.Element => {
	// sign in with github
	const signInWithGitHub = async () => {
		await supabaseClient.auth.signInWithOAuth({
			provider: "github",
		});
	};

	return (
		<button className="github-btn" type="button" onClick={signInWithGitHub}>
			<FaGithub size={24} className="icon" />
		</button>
	);
};

export default GithubBtn;

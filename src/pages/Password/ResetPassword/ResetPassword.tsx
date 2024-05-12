import { FC, FormEvent, useRef, useState } from "react";
import { supabaseClient } from "../../../utils/helpers/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../../../router/Routes";
import { toast } from "react-toastify";
import { Spinner, ToastGmail } from "../../../components";
import { darkTheme } from "../../../constants/darkTheme.constant";
import { isGmail } from "../../../utils/helpers/isGmail";

const ResetPassword: FC = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const emailRef = useRef<HTMLInputElement | null>(null);

	const navigate = useNavigate();

	const handleResetPassword = async (e: FormEvent) => {
		e.preventDefault();

		setIsLoading(true);
		const gmail = isGmail(emailRef.current!.value);

		const { error } = await supabaseClient.auth.resetPasswordForEmail(
			emailRef.current!.value
		);

		setIsLoading(false);
		emailRef.current!.value = "";

		if (error) {
			if (error.status === 429) {
				navigate(Routes[429]);

				return;
			}

			toast.error("Invalid email address", darkTheme);

			return;
		}

		if (!gmail) {
			toast.error("Please enter a valid Gmail address", darkTheme);

			return;
		}

		toast.info(ToastGmail, darkTheme);
	};

	return (
		<>
			<form onSubmit={handleResetPassword} className="form">
				<h2 className="title">Reset your password</h2>
				<div className="switch">
					<p>Go back to</p>
					<Link to={Routes.LOGIN}>Sign In</Link>
				</div>
				<div className="field-container">
					<input
						ref={emailRef}
						className="field"
						type="string"
						placeholder="Enter your email"
					/>
				</div>
				<div className="submit-btn">
					<button type="submit">Send instructions</button>
				</div>
			</form>
			{isLoading && <Spinner />}
		</>
	);
};

export default ResetPassword;

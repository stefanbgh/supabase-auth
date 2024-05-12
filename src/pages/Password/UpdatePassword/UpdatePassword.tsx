import { FC, FormEvent, useRef, useState } from "react";
import { supabaseClient } from "../../../utils/helpers/supabaseClient";
import { Routes } from "../../../router/Routes";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { darkTheme } from "../../../constants/darkTheme.constant";
import { Spinner } from "../../../components";

const UpdatePassword: FC = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const newPasswordRef = useRef<HTMLInputElement | null>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

	const navigate = useNavigate();

	const handleUpdatePassword = async (e: FormEvent) => {
		e.preventDefault();

		if (
			newPasswordRef.current!.value === confirmPasswordRef.current!.value
		) {
			setIsLoading(true);

			const { error } = await supabaseClient.auth.updateUser({
				password: confirmPasswordRef.current!.value,
			});

			setIsLoading(false);

			if (error) {
				if (error.status === 422) {
					toast.error(
						"Password must be at least 6 characters",
						darkTheme
					);

					return;
				}

				if (error.status === 500) {
					toast.error("Sorry, the password is too long");

					return;
				}
			}

			toast.success("Successfully changed your password", darkTheme);
			navigate(Routes.HOME);

			return;
		}

		toast.error("Password does not match", darkTheme);
	};

	return (
		<>
			<form onSubmit={handleUpdatePassword} className="form">
				<h2 className="title">Create a new password</h2>
				<div className="switch">
					<p>Go back to</p>
					<Link to={Routes.LOGIN}>Sign In</Link>
				</div>
				<div className="field-container">
					<input
						ref={newPasswordRef}
						className="field"
						type="password"
						placeholder="Enter a new password"
					/>
				</div>
				<div className="field-container">
					<input
						ref={confirmPasswordRef}
						className="field"
						type="password"
						placeholder="Confirm password"
					/>
				</div>
				<div className="submit-btn">
					<button type="submit">Save changes</button>
				</div>
			</form>
			{isLoading && <Spinner />}
		</>
	);
};

export default UpdatePassword;

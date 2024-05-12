import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { supabaseClient } from "../../utils/helpers/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../../router/Routes";
import { GithubBtn, GoogleBtn, PhoneBtn, Spinner } from "../../components";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { darkTheme } from "../../constants/darkTheme.constant";

const App: FC = (): JSX.Element => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);

		supabaseClient.auth.onAuthStateChange((status) => {
			setIsLoading(false);

			if (status === "SIGNED_IN") {
				navigate(Routes.HOME);
			}
		});

		return () => {
			supabaseClient.auth.onAuthStateChange(() => {});
		};

		// eslint-disable-next-line
	}, []);

	const signIn = async (e: FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		const { error } = await supabaseClient.auth.signInWithPassword({
			email: emailRef.current!.value,
			password: passwordRef.current!.value,
		});

		setIsLoading(false);

		emailRef.current!.value = "";
		passwordRef.current!.value = "";

		if (error) toast.error("Invalid email address or password", darkTheme);
	};

	const handleChangeVisible = () => setIsVisible((iv) => !iv);

	return (
		<>
			<form onSubmit={signIn} className="form">
				<h2 className="title">Sign in to your account</h2>
				<div className="switch">
					<p>Don't have an account?</p>
					<Link to={Routes.REGISTER}>Sign Up</Link>
				</div>
				<div className="buttons">
					<GoogleBtn />
					<GithubBtn />
					<PhoneBtn />
				</div>
				<div className="horizontal-rule">
					<hr />
					<p>or</p>
					<hr />
				</div>
				<div className="field-container">
					<input
						className="field"
						ref={emailRef}
						type="text"
						placeholder="example@gmail.com"
					/>
				</div>
				<div className="field-container">
					<input
						className="field"
						ref={passwordRef}
						type={isVisible ? "text" : "password"}
						placeholder="*********"
					/>
					{isVisible ? (
						<IoEyeOffOutline
							size={18}
							onClick={handleChangeVisible}
							className="password-eye"
						/>
					) : (
						<IoEyeOutline
							size={18}
							onClick={handleChangeVisible}
							className="password-eye"
						/>
					)}
				</div>
				<div className="forgot-password">
					<Link to={Routes.RESET_PASSWORD}>Forgot password?</Link>
				</div>
				<div className="submit-btn">
					<button type="submit">Sign In</button>
				</div>
			</form>
			{isLoading && <Spinner />}
		</>
	);
};

export default App;

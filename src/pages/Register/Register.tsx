import { FC, FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../../router/Routes";
import { supabaseClient } from "../../utils/helpers/supabaseClient";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { darkTheme } from "../../constants/darkTheme.constant";
import { validationSchema } from "../../utils/validationSchema";
import { IInvalidFormMsg } from "../../ts/interfaces/IInvalidFormMsg";
import { initInvalidFormMsg } from "../../constants/initInvalidFormMsg.constant";
import { Spinner, ToastGmail, ErrorMsg } from "../../components";

const Register: FC = (): JSX.Element => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [invalidFormMsg, setInvalidFormMsg] = useState<IInvalidFormMsg>({
		...initInvalidFormMsg,
	});

	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const navigate = useNavigate();

	const handleSignUp = async (e: FormEvent) => {
		e.preventDefault();

		const { emailErr, msgEmailErr, passwordErr, msgPasswordErr } =
			validationSchema(
				emailRef.current!.value,
				passwordRef.current!.value
			);

		if (!emailErr && !passwordErr) {
			setInvalidFormMsg(initInvalidFormMsg);
			setIsLoading(true);

			const { error } = await supabaseClient.auth.signUp({
				email: emailRef.current!.value,
				password: passwordRef.current!.value,
			});

			toast.info(ToastGmail, darkTheme);
			setIsLoading(false);
			navigate(Routes.LOGIN);

			if (error) {
				toast.error(error.message, darkTheme);

				if (error.status === 429) {
					navigate(Routes[429]);

					return;
				}

				if (error.status === 500) {
					toast.error("Sorry, the password is too long", darkTheme);

					return;
				}

				return;
			}
		}

		setInvalidFormMsg({
			emailErr,
			msgEmailErr,
			msgPasswordErr,
			passwordErr,
		});
	};

	const handleChangeVisible = () => setIsVisible((iv) => !iv);

	return (
		<>
			<form onSubmit={handleSignUp} className="form">
				<h2 className="title">Sign up to your account</h2>
				<div className="switch">
					<p>Have an account?</p>
					<Link to={Routes.LOGIN}>Sign In</Link>
				</div>
				<div className="field-container">
					<input
						ref={emailRef}
						className={
							invalidFormMsg.emailErr ? "field err" : "field"
						}
						type="text"
						placeholder="example@gmail.com"
					/>
				</div>
				{invalidFormMsg.emailErr && (
					<ErrorMsg msg={invalidFormMsg.msgEmailErr} />
				)}
				<div className="field-container">
					<input
						ref={passwordRef}
						className={
							invalidFormMsg.passwordErr ? "field err" : "field"
						}
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
				{invalidFormMsg.passwordErr && (
					<ErrorMsg msg={invalidFormMsg.msgPasswordErr} />
				)}
				<div className="submit-btn">
					<button type="submit">Sign Up</button>
				</div>
			</form>
			{isLoading && <Spinner />}
		</>
	);
};

export default Register;

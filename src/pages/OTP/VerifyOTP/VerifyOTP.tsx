import { Context, FC, FormEvent, useContext, useRef, useState } from "react";
import { supabaseClient } from "../../../utils/helpers/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../../../router/Routes";
import PhoneCtx from "../../../context/PhoneCtx";
import { IPhoneCtx } from "../../../ts/interfaces/IPhoneCtx";
import { toast } from "react-toastify";
import { darkTheme } from "../../../constants/darkTheme.constant";
import { Spinner } from "../../../components";
import { hashedNumber } from "../../../utils/helpers/hashedNumber";

const VerifyOTP: FC = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { phone } = useContext(PhoneCtx as Context<IPhoneCtx>);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const navigate = useNavigate();

	const handleVerifyOTP = async (e: FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		const { error } = await supabaseClient.auth.verifyOtp({
			phone: `+381${phone}`,
			token: inputRef.current!.value,
			type: "sms",
		});

		setIsLoading(false);
		navigate(Routes.HOME);

		inputRef.current!.value = "";

		if (error) {
			if (error.status === 401) {
				toast.error(
					"Invalid code. Please check and try again",
					darkTheme
				);

				return;
			}

			if (error.status === 404) {
				toast.info(
					"Verification code expired. Please resend for a new one",
					darkTheme
				);

				return;
			}
		}
	};

	const handleResendCode = async () => {
		setIsLoading(true);

		const { error } = await supabaseClient.auth.signInWithOtp({
			phone: `+381${phone}`,
		});

		const hN = hashedNumber(phone);

		toast.info(`Check your phone ${hN}`, darkTheme);
		setIsLoading(false);

		if (error) {
			if (error.status === 400) {
				toast.info("Please enter your phone number again", darkTheme);
				navigate(Routes.AUTH_OTP);

				return;
			}
		}
	};

	return (
		<>
			<form onSubmit={handleVerifyOTP} className="form">
				<h2 className="title">Verify OTP</h2>
				<div className="switch">
					<p>Go back to</p>
					<Link to={Routes.LOGIN}>Sign In</Link>
				</div>
				<div className="field-container">
					<input
						className="field"
						ref={inputRef}
						type="string"
						placeholder="6-digits code"
					/>
				</div>
				<div className="resend-code">
					<button type="button" onClick={handleResendCode}>
						Resend code
					</button>
				</div>
				<div className="submit-btn">
					<button type="submit">Check</button>
				</div>
			</form>
			{isLoading && <Spinner />}
		</>
	);
};

export default VerifyOTP;

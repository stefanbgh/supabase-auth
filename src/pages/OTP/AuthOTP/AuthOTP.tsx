import { FC, useRef, FormEvent, useContext, Context, useState } from "react";
import { supabaseClient } from "../../../utils/helpers/supabaseClient";
import { Routes } from "../../../router/Routes";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { darkTheme } from "../../../constants/darkTheme.constant";
import { IPhoneCtx } from "../../../ts/interfaces/IPhoneCtx";
import PhoneCtx from "../../../context/PhoneCtx";
import rs from "../../../assets/rs.webp";
import { Spinner } from "../../../components";
import { hashedNumber } from "../../../utils/helpers/hashedNumber";

const AuthOTP: FC = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { setPhone } = useContext(PhoneCtx as Context<IPhoneCtx>);
	const phoneRef = useRef<HTMLInputElement | null>(null);

	const navigate = useNavigate();

	const handleAuthOTP = async (e: FormEvent) => {
		e.preventDefault();

		const phoneNumber = phoneRef.current!.value;

		if (phoneNumber.length < 2) {
			toast.error(
				"Phone number must be at least 2 characters",
				darkTheme
			);

			phoneRef.current!.value = "";
			return;
		}

		setIsLoading(true);

		const hN = hashedNumber(phoneNumber);

		const { error } = await supabaseClient.auth.signInWithOtp({
			phone: `+381${phoneNumber}`,
		});

		setIsLoading(false);
		setPhone(phoneNumber);

		phoneRef.current!.value = "";

		if (error) {
			if (error.status === 422) {
				toast.error("Invalid phone number format", darkTheme);

				return;
			}

			if (error.status === 400) {
				toast.error("The phone number does not exist", darkTheme);

				return;
			}

			if (error.status === 429) {
				navigate(Routes[429]);

				return;
			}
		}

		toast.info(`Check your phone ${hN}`, darkTheme);
		navigate(Routes.VERIFY_OTP);
	};

	return (
		<>
			<form onSubmit={handleAuthOTP} className="form">
				<h2 className="title">Sign in with phone number</h2>
				<div className="switch">
					<p>Go back to</p>
					<Link to={Routes.LOGIN}>Sign In</Link>
				</div>
				<div className="field-container phone">
					<div className="country">
						<img src={rs} width={25} alt="rs" />
						<p>+381</p>
					</div>
					<input
						ref={phoneRef}
						className="field"
						type="string"
						placeholder="Enter your phone number"
					/>
				</div>
				<div className="submit-btn">
					<button type="submit">Send me a code</button>
				</div>
			</form>
			{isLoading && <Spinner />}
		</>
	);
};

export default AuthOTP;

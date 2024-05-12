import { FC } from "react";
import {
	BrowserRouter,
	Routes as BrowserRoutes,
	Route,
} from "react-router-dom";
import { Routes } from "./Routes";
import { PrivateLayout, PublicLayout } from "../layouts";
import {
	AuthOTP,
	TooManyReq,
	Home,
	Login,
	Register,
	ResetPassword,
	UpdatePassword,
	VerifyOTP,
	NotFound,
} from "../pages";
import { ToastContainer } from "react-toastify";

const Router: FC = (): JSX.Element => {
	return (
		<BrowserRouter>
			<ToastContainer />
			<BrowserRoutes>
				{/* Private */}
				<Route
					path={Routes.HOME}
					element={
						<PrivateLayout>
							<Home />
						</PrivateLayout>
					}
				/>

				{/* Public */}
				<Route
					path={Routes.LOGIN}
					element={
						<PublicLayout>
							<Login />
						</PublicLayout>
					}
				/>

				<Route
					path={Routes.RESET_PASSWORD}
					element={
						<PublicLayout>
							<ResetPassword />
						</PublicLayout>
					}
				/>

				<Route
					path={Routes.UPDATE_PASSWORD}
					element={
						<PublicLayout>
							<UpdatePassword />
						</PublicLayout>
					}
				/>

				<Route
					path={Routes.AUTH_OTP}
					element={
						<PublicLayout>
							<AuthOTP />
						</PublicLayout>
					}
				/>

				<Route
					path={Routes.VERIFY_OTP}
					element={
						<PublicLayout>
							<VerifyOTP />
						</PublicLayout>
					}
				/>

				<Route
					path={Routes.REGISTER}
					element={
						<PublicLayout>
							<Register />
						</PublicLayout>
					}
				/>

				<Route
					path={Routes[429]}
					element={
						<PublicLayout>
							<TooManyReq />
						</PublicLayout>
					}
				/>

				<Route path={Routes[404]} element={<NotFound />} />
			</BrowserRoutes>
		</BrowserRouter>
	);
};

export default Router;

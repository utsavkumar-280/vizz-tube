import "./styles.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../Context";

export const ForgotPassword = () => {
	const [isHidden, setIsHidden] = useState(true);
	const [isAlsoHidden, setIsAlsoHidden] = useState(true);

	const [isLoading, setIsLoading] = useState(false);
	const [changedPass, setChangedPass] = useState(false);
	const [passError, setPassError] = useState("");
	const { state } = useLocation();
	const previousPath = { from: state?.from ? state.from : "/" };

	const { updatePassword } = useAuth();

	const formSubmit = async ({
		email,
		password,
		from,
		setPassError,
		setIsLoading,
		setChangedPass,
		updatePassword,
	}) => {
		setPassError("");
		setIsLoading(true);

		const response = await updatePassword({
			email,
			password,
			from,
		});

		if (response?.status === 200) {
			setIsLoading(false);
			setChangedPass(true);
		} else {
			setPassError(response?.data?.message || "Please try again!");
			setIsLoading(false);
		}
	};

	return (
		<div className="form-container">
			<div className="form-main">
				{changedPass ? (
					<div className="form-submitted">
						<h1>Your password has been changed successfully.</h1>
						<p>Please Login to Continue</p>
					</div>
				) : (
					<div className="form-card">
						<h1 className="form-head">Change Password</h1>
						<Formik
							initialValues={{ email: "", password: "", passwordConf: "" }}
							validationSchema={Yup.object({
								email: Yup.string()
									.email("Invalid email address")
									.required("Email required"),
								password: Yup.string()
									.matches(
										/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
										"password should contain minimum 8 characters (Atleast a number, an uppercase character, a lowercase character and a special character)"
									)
									.required("Password required"),
								passwordConf: Yup.string().oneOf(
									[Yup.ref("password"), null],
									"Passwords must match"
								),
							})}
							onSubmit={({ email, password }, { setSubmitting }) => {
								setTimeout(() => {
									formSubmit({
										email,
										password,
										from: previousPath,
										setPassError,
										setIsLoading,
										setChangedPass,
										updatePassword,
									});
									setSubmitting(false);
								}, 400);
							}}
						>
							<Form className="form-field-container">
								<div className="input-control">
									<label htmlFor="email" className="form-label">
										Email Address
									</label>
									<div className="input-field-container">
										<Field
											name="email"
											type="email"
											placeholder="Enter email"
											className="input-field"
										/>
									</div>
									<ErrorMessage name="email" />
								</div>

								<div className="input-control">
									<label htmlFor="password" className="form-label">
										New Password
									</label>
									<div className="input-field-container">
										<span className="input-grid width100">
											<Field
												name="password"
												placeholder="Enter password"
												className="input-pass-field"
												type={isHidden ? "password" : "text"}
											/>
											<button
												type="button"
												className="input-pass-cta"
												onClick={() => setIsHidden((isHidden) => !isHidden)}
											>
												{isHidden ? (
													<FaEye className="hide-cta" />
												) : (
													<FaEyeSlash className="hide-cta" />
												)}
											</button>
										</span>
									</div>
									<div className="error-container">
										<ErrorMessage name="password" />
									</div>
								</div>

								<div className="input-control">
									<label htmlFor="passwordConf" className="form-label">
										Confirm Password
									</label>
									<div className="input-field-container">
										<span className="input-grid width100">
											<Field
												name="passwordConf"
												placeholder="Re-enter password"
												className="input-pass-field"
												type={isAlsoHidden ? "password" : "text"}
											/>
											<button
												type="button"
												className="input-pass-cta"
												onClick={() =>
													setIsAlsoHidden((isAlsoHidden) => !isAlsoHidden)
												}
											>
												{isAlsoHidden ? (
													<FaEyeSlash className="hide-cta" />
												) : (
													<FaEye className="hide-cta" />
												)}
											</button>
										</span>
									</div>
									<ErrorMessage name="passwordConf" />
								</div>

								<div className="pass-error">{passError}</div>
								<button type="submit" className="form-submit-cta">
									{isLoading ? "Changing Password..." : "Change Password"}
								</button>
							</Form>
						</Formik>
					</div>
				)}
			</div>
		</div>
	);
};

import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useLocation, Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { useAuth } from "../../Context";
import "./styles.css";

export const Signup = () => {
	const [isHidden, setIsHidden] = useState(true);
	const [isAlsoHidden, setIsAlsoHidden] = useState(true);

	const [isLoading, setIsLoading] = useState(false);
	const [signedUp, setSignedUp] = useState(false);
	const [signupError, setSignupError] = useState("");
	const { state } = useLocation();
	const previousPath = { from: state?.from ? state.from : "/" };

	const {
		state: { token },
		signup,
	} = useAuth();

	const formSubmit = async ({
		firstname,
		lastname,
		email,
		password,
		from,
		setSignupError,
		setIsLoading,
		setSignedUp,
		signup,
	}) => {
		setSignupError("");
		setIsLoading(true);

		const response = await signup({
			firstname,
			lastname,
			email,
			password,
			from,
		});

		if (response?.status === 201) {
			setIsLoading(false);
			setSignedUp(true);
		} else {
			setSignupError(response?.data?.message || "Please try again!");
			setIsLoading(false);
		}
	};

	return (
		<div className="form-container">
			<div className="form-main">
				{token ? (
					<Navigate to="/profile" replace />
				) : signedUp ? (
					<div>
						<h1>Thank you for creating an account</h1>
						<p>Please Login to Continue</p>
					</div>
				) : (
					<div className="form-card">
						<h1 className="form-head">Sign Up</h1>
						<Formik
							initialValues={{
								firstname: "",
								lastname: "",
								email: "",
								password: "",
								passwordConf: "",
							}}
							validationSchema={Yup.object({
								firstname: Yup.string()
									.max(15, "Must be 15 characters or less")
									.required("Required"),
								lastname: Yup.string()
									.max(20, "Must be 20 characters or less")
									.required("Required"),
								email: Yup.string()
									.email("Invalid email address")
									.required("Required"),
								password: Yup.string()
									.matches(
										/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
										"password should contain minimum 8 characters (Atleast a number, an uppercase character and a lowercase character)"
									)
									.required("Password required"),
								passwordConf: Yup.string()
									.oneOf([Yup.ref("password"), null], "Passwords must match")
									.required("Password required"),
							})}
							onSubmit={(
								{ firstname, lastname, email, password },
								{ setSubmitting }
							) => {
								setTimeout(() => {
									formSubmit({
										firstname,
										lastname,
										email,
										password,
										from: previousPath,
										setSignupError,
										setIsLoading,
										setSignedUp,
										signup,
									});
									setSubmitting(false);
								}, 400);
							}}
						>
							<Form className="form-field-container">
								<div className="input-control">
									<label htmlFor="firstname" className="form-label">
										First Name
									</label>
									<div className="input-field-container">
										<Field
											name="firstname"
											type="text"
											placeholder="Enter firstname"
											className="input-field"
										/>
									</div>
									<ErrorMessage name="firstname" className="form-error" />
								</div>

								<div className="input-control">
									<label htmlFor="lastname" className="form-label">
										Last Name
									</label>
									<div className="input-field-container">
										<Field
											name="lastname"
											type="text"
											placeholder="Enter listname"
											className="input-field"
										/>
									</div>
									<ErrorMessage name="lastname" className="form-error" />
								</div>

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
									<ErrorMessage name="email" className="form-error" />
								</div>

								<div className="input-control">
									<label htmlFor="password" className="form-label">
										Password
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
													<FaEyeSlash className="hide-cta" />
												) : (
													<FaEye className="hide-cta" />
												)}
											</button>
										</span>
									</div>
									<ErrorMessage name="password" className="form-error" />
								</div>

								<div className="input-control">
									<label htmlFor="passwordConf" className="form-label">
										Confirm Password
									</label>
									<div className="input-field-container">
										<span className="input-grid width100">
											<Field
												name="passwordConf"
												className="input-pass-field"
												placeholder="Re-enter password"
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
									<ErrorMessage name="passwordConf" className="form-error" />
								</div>
								<div className="signup-error">{signupError}</div>
								<button type="submit" className="form-submit-cta">
									{isLoading ? "Creating account..." : "Create account"}
								</button>
							</Form>
						</Formik>
					</div>
				)}
			</div>
		</div>
	);
};

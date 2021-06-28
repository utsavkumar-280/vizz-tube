import "./styles.css";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const ForgotPassword = () => {
	const [isHidden, setIsHidden] = useState(true);
	const [isAlsoHidden, setIsAlsoHidden] = useState(true);
	return (
		<div className="form-container">
			<div className="form-main">
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
									"password should contain minimum 8 characters (Atleast a number, an uppercase character and a lowercase character)"
								)
								.required("Password required"),
							passwordConf: Yup.string().oneOf(
								[Yup.ref("password"), null],
								"Passwords must match"
							),
						})}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
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

							<button type="submit" className="form-submit-cta">
								Change Password
							</button>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

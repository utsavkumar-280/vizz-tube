import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./styles.css";

export const Login = () => {
	const [isHidden, setIsHidden] = useState(true);
	return (
		<div className="form-container">
			<div className="form-main">
				<div className="form-card">
					<h1 className="form-head">Login</h1>
					<Formik
						initialValues={{ email: "", password: "" }}
						validationSchema={Yup.object({
							email: Yup.string()
								.email("Invalid email address")
								.required("Email required"),
							password: Yup.string()
								.min(8, "pasword must be 8 characters or more")
								.required("Password required"),
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

							<button type="submit" className="form-submit-cta">
								Login
							</button>
							<Link to="/forgot-pass" className="form-links marginTop1">
								Forgot Password?
							</Link>
							<p className="form-text marginTop1">
								Not Registered yet?
								<span>
									<Link to="/signup" className="form-links">
										Sign up
									</Link>
								</span>
							</p>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import "./styles.css";

export const Signup = () => {
	const [isHidden, setIsHidden] = useState(true);
	const [isAlsoHidden, setIsAlsoHidden] = useState(true);
	return (
		<div className="form-container">
			<div className="form-main">
				<div className="form-card">
					<h1 className="form-head">Sign Up</h1>
					<Formik
						initialValues={{
							firstName: "",
							lastName: "",
							email: "",
							password: "",
							passwordConf: "",
						}}
						validationSchema={Yup.object({
							firstName: Yup.string()
								.max(15, "Must be 15 characters or less")
								.required("Required"),
							lastName: Yup.string()
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
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								console.log(values);
								setSubmitting(false);
							}, 400);
						}}
					>
						<Form className="form-field-container">
							<div className="input-control">
								<label htmlFor="firstName" className="form-label">
									First Name
								</label>
								<div className="input-field-container">
									<Field
										name="firstName"
										type="text"
										placeholder="Enter firstname"
										className="input-field"
									/>
								</div>
								<ErrorMessage name="firstName" className="form-error" />
							</div>

							<div className="input-control">
								<label htmlFor="lastName" className="form-label">
									Last Name
								</label>
								<div className="input-field-container">
									<Field
										name="lastName"
										type="text"
										placeholder="Enter listname"
										className="input-field"
									/>
								</div>
								<ErrorMessage name="lastName" className="form-error" />
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

							<button type="submit" className="form-submit-cta">
								Create Account
							</button>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

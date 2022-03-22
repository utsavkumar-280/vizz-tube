import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../../Context";
import { VIZZ_API } from "../../../utils";
import { FaUserCircle } from "react-icons/fa";
import "./styles.css";

export const Profile = () => {
	const {
		state: { userDetails, token },
		dispatch,
		logout,
	} = useAuth();

	console.log({ userDetails, token });

	return (
		<div className="profile-container">
			<div className="profile-main">
				<div className="profile-card">
					<FaUserCircle className="profile-logo" />
					<div>
						<p className="profile-text">
							Firstname:{" "}
							<span className="primary-color">
								{userDetails?.userFirstName}
							</span>
						</p>
						<p className="profile-text">
							Lastname:{" "}
							<span className="primary-color">{userDetails?.userLastName}</span>
						</p>
						<p className="profile-text">
							Email:{" "}
							<span className="primary-color">{userDetails?.userEmail}</span>
						</p>
					</div>

					<button onClick={() => logout()} className="form-submit-cta">
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

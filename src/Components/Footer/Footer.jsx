import "./styles.css";
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";

export const Footer = () => {
	return (
		<div className="footer-container">
			<div className="footer-main">
				<div className="footer-content">
					<Link to="/" className="footer-logo">
						<FaYoutube className="head-logo" />
						vizztube
					</Link>
					<div className="connectMe">
						<div className="footer-name-padding">BY</div>
						<a
							href="https://utsav-kumar.netlify.app/"
							className=" footer-name-padding"
						>
							@UTSAV
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

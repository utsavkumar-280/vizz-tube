import "./styles.css";
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";

export const Footer = () => {
	return (
		<div className="footer-container">
			<div className="footer-main">
				<div className="footer-left ">
					<div className="footer-padding footer-para">Connect with me</div>
					<div className="socialNav">
						<a
							href="https://www.linkedin.com/in/utsav-kumar-a3a79b187/"
							aria-label="Linkedin-profile"
						>
							<i className="fab fa-linkedin-in"></i>
						</a>
						<a
							href="https://twitter.com/utsavkumar280"
							aria-label="Twitter-handle"
						>
							<i className="fab fa-twitter"></i>
						</a>
						<a
							href="https://github.com/utsavkumar-280"
							aria-label="Github-profile"
						>
							<i className="fab fa-github"></i>
						</a>
					</div>
				</div>

				<div className="footer-right">
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

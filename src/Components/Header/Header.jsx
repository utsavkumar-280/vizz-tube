import "./styles.css";
import { Link } from "react-router-dom";
// import { RiYoutubeFill } from "react-icons/ri";
import { FaUserCircle, FaYoutube } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

export const Header = () => {
	return (
		<div className="header-container">
			<nav className="header-main">
				<div className="head-left">
					<Link to="/" className="head-main-logo">
						<FaYoutube className="head-logo" />
						<span className="head-vizztube">vizztube</span>
					</Link>
				</div>
				<div className="head-center">
					<div className="search-container">
						<input
							type="search"
							name="search-bar"
							id="search-bar-main"
							placeholder="Search"
							className="search-bar"
						/>
						<button className="search-icon-container">
							<BiSearch className="search-icon" />
						</button>
					</div>
				</div>
				<div className="head-right ">
					<Link to="/login" className="heading flex-align-center">
						<FaUserCircle className="head-icons" />
						<span className="head-hidden head-login ">Login</span>
					</Link>
				</div>
			</nav>
		</div>
	);
};

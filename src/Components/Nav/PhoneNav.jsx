import "./phoneNav.css";
import { NavLink } from "react-router-dom";
import { FaCompass, FaHeart } from "react-icons/fa";
import { BsFillCollectionPlayFill, BsFillDisplayFill } from "react-icons/bs";
import { MdPhoto } from "react-icons/md";
import { FaBook, FaRegLaughSquint } from "react-icons/fa";
import { RiHistoryLine } from "react-icons/ri";
import { SiAdobelightroomcc, SiAdobephotoshop } from "react-icons/si";

export const PhoneNav = () => {
	return (
		<div className="phone-nav-container">
			<div className="phone-nav-main">
				<NavLink
					to="/explore"
					className="phone-nav-menu"
					activeClassName="phone-nav-active"
				>
					<FaCompass className="phone-nav-icons" />
					<span className="phone-nav-head">Explore</span>
				</NavLink>
				<NavLink
					to="/liked"
					className="phone-nav-menu"
					activeClassName="phone-nav-active"
				>
					<FaHeart className="phone-nav-icons" />
					<span className="phone-nav-head">Liked</span>
				</NavLink>
				<NavLink
					to="/history"
					className="phone-nav-menu"
					activeClassName="phone-nav-active"
				>
					<RiHistoryLine className="phone-nav-icons" />
					<span className="phone-nav-head">History</span>
				</NavLink>
				<NavLink
					to="/playlist"
					className="phone-nav-menu"
					activeClassName="phone-nav-active"
				>
					<BsFillCollectionPlayFill className="phone-nav-icons" />
					<span className="phone-nav-head">Playlist</span>
				</NavLink>
			</div>
		</div>
	);
};

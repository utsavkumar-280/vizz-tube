import "./nav.css";
import { NavLink } from "react-router-dom";
import { FaCompass, FaHeart } from "react-icons/fa";
import { BsFillCollectionPlayFill, BsFillDisplayFill } from "react-icons/bs";
import { MdPhoto } from "react-icons/md";
import { FaBook, FaRegLaughSquint } from "react-icons/fa";
import { RiHistoryLine } from "react-icons/ri";
import { SiAdobelightroomcc, SiAdobephotoshop } from "react-icons/si";

export const Nav = () => {
	return (
		<div className="nav-container">
			<div className="nav-main">
				<nav className="nav-menu">
					<div className="nav-head">MENU</div>
					<NavLink
						to="/explore"
						className="menu-main"
						activeClassName="nav-active"
					>
						<div className="nav-icons-container">
							<FaCompass className="nav-icons" />
						</div>

						<span className="menu-head">Explore</span>
					</NavLink>
					<NavLink
						to="/liked"
						className="menu-main"
						activeClassName="nav-active"
					>
						<div className="nav-icons-container">
							<FaHeart className="nav-icons" />
						</div>

						<span className="menu-head">Liked</span>
					</NavLink>
					<NavLink
						to="/playlist"
						className="menu-main"
						activeClassName="nav-active"
					>
						<div className="nav-icons-container">
							<BsFillCollectionPlayFill className="nav-icons" />
						</div>

						<span className="menu-head">Playlist</span>
					</NavLink>
					<NavLink
						to="/history"
						className="menu-main"
						activeClassName="nav-active"
					>
						<div className="nav-icons-container">
							<RiHistoryLine className="nav-icons" />
						</div>

						<span className="menu-head">History</span>
					</NavLink>
				</nav>
				<nav className="nav-category">
					<div className="nav-head">CATEGORY</div>
					<NavLink
						to="/login"
						className="cat-main"
						activeClassName="nav-active"
					>
						<div className="nav-icons-container">
							<FaBook className="nav-icons" />
						</div>

						<span className="cat-head">Basics</span>
					</NavLink>
					<NavLink
						to="/login"
						className="cat-main"
						activeClassName="nav-active"
					>
						<div className="nav-icons-container">
							<MdPhoto className="nav-icons" />
						</div>

						<span className="cat-head">Beginners</span>
					</NavLink>
					<NavLink
						to="/login"
						className="cat-main"
						activeClassName="nav-active"
					>
						<div className="nav-icons-container">
							<SiAdobephotoshop className="nav-icons" />
						</div>

						<span className="cat-head"> Photoshop</span>
					</NavLink>
					<NavLink
						to="/login"
						className="cat-main"
						activeClassName="nav-active"
					>
						<div className="nav-icons-container">
							<SiAdobelightroomcc className="nav-icons" />
						</div>

						<span className="cat-head"> Lightroom</span>
					</NavLink>
					<NavLink
						to="/login"
						className="cat-main"
						activeClassName="nav-active"
					>
						<div className="nav-icons-container">
							<BsFillDisplayFill className="nav-icons" />
						</div>

						<span className="cat-head">Video Editing</span>
					</NavLink>
					<NavLink
						to="/not-related"
						className="cat-main"
						activeClassName="nav-active"
					>
						<div className="nav-icons-container">
							<FaRegLaughSquint className="nav-icons" />
						</div>

						<span className="cat-head">Not related</span>
					</NavLink>
				</nav>
			</div>
		</div>
	);
};

import "./nav.css";
import { NavLink, useLocation } from "react-router-dom";
import { FaCompass, FaHeart } from "react-icons/fa";
import { BsFillCollectionPlayFill, BsFillDisplayFill } from "react-icons/bs";
import { FaBook, FaRegLaughSquint, FaFilm } from "react-icons/fa";
import { RiHistoryLine } from "react-icons/ri";
import { SiAdobelightroomcc, SiAdobephotoshop } from "react-icons/si";

export const Nav = () => {
	const search = new URLSearchParams(useLocation().search);
	const searchedCategory = search.get("cat") ? search.get("cat") : "All Videos";
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

						<span className="menu-head">Playlists</span>
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
						to="/explore?cat=Basics"
						className={`cat-main ${
							searchedCategory === "Basics" ? "nav-active" : ""
						}`}
					>
						<div className="nav-icons-container">
							<FaBook className="nav-icons" />
						</div>

						<span className="cat-head">Basics</span>
					</NavLink>
					<NavLink
						to="/explore?cat=Photoshop"
						className={`cat-main ${
							searchedCategory === "Photoshop" ? "nav-active" : ""
						}`}
					>
						<div className="nav-icons-container">
							<SiAdobephotoshop className="nav-icons" />
						</div>

						<span className="cat-head">Photoshop</span>
					</NavLink>
					<NavLink
						to="/explore?cat=Lightroom"
						className={`cat-main ${
							searchedCategory === "Lightroom" ? "nav-active" : ""
						}`}
					>
						<div className="nav-icons-container">
							<SiAdobelightroomcc className="nav-icons" />
						</div>

						<span className="cat-head">Lightroom</span>
					</NavLink>
					<NavLink
						to="/explore?cat=Video%20Editing"
						className={`cat-main ${
							searchedCategory === "Video Editing" ? "nav-active" : ""
						}`}
					>
						<div className="nav-icons-container">
							<BsFillDisplayFill className="nav-icons" />
						</div>

						<span className="cat-head">Video Editing</span>
					</NavLink>
					<NavLink
						to="/explore?cat=Filmmaking"
						className={`cat-main ${
							searchedCategory === "Filmmaking" ? "nav-active" : ""
						}`}
					>
						<div className="nav-icons-container">
							<FaFilm className="nav-icons" />
						</div>

						<span className="cat-head">Filmmaking</span>
					</NavLink>
					<NavLink
						to="/explore?cat=Not%20Related"
						className={`cat-main ${
							searchedCategory === "Not Related" ? "nav-active" : ""
						}`}
					>
						<div className="nav-icons-container">
							<FaRegLaughSquint className="nav-icons" />
						</div>

						<span className="cat-head">Not Related</span>
					</NavLink>
				</nav>
			</div>
		</div>
	);
};

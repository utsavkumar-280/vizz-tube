import "./explore.css";
import { VideoCard } from "../../VideoCard/VideoCard";
import { useLocation, NavLink } from "react-router-dom";
import { categories } from "../../../utils/data";
import { useAppDataContext } from "../../../Context";

import PulseLoader from "react-spinners/PulseLoader";

export const Explore = () => {
	const { state } = useAppDataContext();
	const search = new URLSearchParams(useLocation().search);
	const searchedCategory = search.get("cat") ? search.get("cat") : "All Videos";

	const filteredVideoLength = state.videos.filter(
		(video) => video.category === searchedCategory
	).length;
	const islessThan3Row = filteredVideoLength !== 0 && filteredVideoLength <= 10;

	return (
		<div className="explore-container">
			<div className="explore-main">
				<nav className="category-toggle">
					{categories
						.filter((cat) => cat !== "Popular")
						.map((category) => {
							return (
								<NavLink
									to={`?cat=${category}`}
									key={category}
									className={`category-cta ${
										searchedCategory === category ? "category-cta-active" : ""
									}`}
								>
									{category}
								</NavLink>
							);
						})}
				</nav>
				{state.videos.length !== 0 ? (
					<section
						className={`video-card-container ${
							islessThan3Row && "video-card-container-alt"
						}`}
					>
						{searchedCategory === "All Videos"
							? state.videos.map((video) => {
									return <VideoCard video={video} key={video._id} />;
							  })
							: state.videos
									.filter((video) => video.category === searchedCategory)
									.map((video) => {
										return <VideoCard video={video} key={video._id} />;
									})}
					</section>
				) : (
					<div className="loader-container">
						<PulseLoader loading={true} size={15} color={"#6c5ecf"} />
					</div>
				)}
			</div>
		</div>
	);
};

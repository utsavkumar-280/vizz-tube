import "./styles.css";
import { Link } from "react-router-dom";
import { VideoCard } from "../VideoCard";
import { useAppDataContext } from "../../Context";

export const Home = () => {
	const { state } = useAppDataContext();
	return (
		<div className="home-container">
			<div className="home-main">
				<div className="discover-container">
					<div className="discover-head">Discover</div>
					<div className="discover-main">
						<div className="discover-photo">
							<p>
								Learn about the
								<br />
								What, Why and How
								<br />
								of Photography
								<br />
							</p>
							<Link to="/explore">
								<button className="discover-button">Watch Now</button>
							</Link>
						</div>
						<div className="discover-edit">
							<p>
								Video Editing
								<br />
								Tips you need to know
								<br />
								right now
							</p>
							<Link to="/explore">
								<button className="discover-button">Watch Now</button>
							</Link>
						</div>
					</div>
				</div>
				<div className="popular-container">
					<div className="popular-head">Popular</div>
					<div className="popular-main">
						{state.videos
							.filter((video) => video.category === "Popular")
							.map((video) => {
								return <VideoCard video={video} key={video._id} />;
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

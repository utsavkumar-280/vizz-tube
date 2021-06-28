import "./styles.css";
import ReactPlayer from "react-player/youtube";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { VIZZ_API } from "../../utils";
import PulseLoader from "react-spinners/PulseLoader";

export const VideoDetails = () => {
	const [video, setVideo] = useState(null);
	let { vidId } = useParams();
	// console.log("vidID:", vidId);
	useEffect(() => {
		(async () => {
			try {
				const {
					data: { response },
				} = await axios.get(`${VIZZ_API}/videos/${vidId}`);
				setVideo(response);
				// console.log("response:", response);
			} catch (error) {
				console.log(error);
				setVideo(null);
			}
		})();
	}, [vidId]);

	// console.log("video:", video);
	return (
		<div className="video-details-container">
			{video !== null ? (
				<div className="video-details-main">
					<section className="video-container">
						<ReactPlayer
							url={`https://www.youtube-nocookie.com/embed/${video.vidURL}`}
							controls
							playing
							height={"100%"}
							width={"100%"}
							className="main-video"
							pip={true}
						/>
					</section>
					<article className="video-details-info">
						<section className="video-text">
							<Link to={`/explore?cat=${video.category}`} className="video-cat">
								#{video.category}
							</Link>
							<h1 className="video-title">{video.title}</h1>
							<section className="video-author-container">
								<img
									src={video.authorImg}
									alt="author-avatar"
									className="author-avatar"
								/>
								<h2 className="video-author">{video.author}</h2>
							</section>
						</section>
						<section className="video-cta-container">
							<button className="video-cta color-secondary">Like</button>
							<button className="video-cta color-primary">Add</button>
						</section>
					</article>
				</div>
			) : (
				<div className="loader-container ">
					<PulseLoader loading={true} size={15} color={"#6c5ecf"} />
				</div>
			)}
		</div>
	);
};

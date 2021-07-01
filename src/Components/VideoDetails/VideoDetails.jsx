import "./styles.css";
import ReactPlayer from "react-player/youtube";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
	addOrRemoveVideoInPlaylist,
	VIZZ_API,
	addVideosInPlaylist,
} from "../../utils";
import PulseLoader from "react-spinners/PulseLoader";
import { useAppDataContext, useAuth } from "../../Context";

export const VideoDetails = () => {
	const [video, setVideo] = useState(null);
	let { vidId } = useParams();

	const {
		state: { history, liked },
		dispatch,
	} = useAppDataContext();
	const {
		state: { token },
	} = useAuth();
	// console.log({ liked }, { history });

	useEffect(() => {
		(async () => {
			try {
				const {
					data: { response },
				} = await axios.get(`${VIZZ_API}/videos/${vidId}`);
				setVideo(response);
			} catch (error) {
				console.log(error);
				setVideo(null);
			}
		})();
	}, [vidId]);

	// console.log("video:", video);
	return (
		<div className="video-details-container">
			{video === "error" ? (
				<Navigate to="/error" replace />
			) : video !== null ? (
				<div className="video-details-main">
					<section className="video-container">
						<ReactPlayer
							url={`https://www.youtube-nocookie.com/embed/${video.vidURL}`}
							controls
							playing
							height={"100%"}
							width={"100%"}
							className="main-video"
							onStart={() => {
								if (token) {
									addVideosInPlaylist({
										token,
										type: "SET_HISTORY",
										dispatch,
										playlistId: history._id,
										video: vidId,
									});
								}
							}}
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
							<button
								className={
									liked.videos?.find((vid) => vid.video._id == vidId)
										? "video-cta color-secondary-liked"
										: "video-cta color-secondary"
								}
								onClick={() => {
									addOrRemoveVideoInPlaylist({
										token,
										type: "SET_LIKED",
										dispatch,
										playlistId: liked._id,
										video: vidId,
									});
								}}
							>
								{liked.videos?.find((vid) => vid.video._id == vidId)
									? "Liked"
									: "Like"}
							</button>
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

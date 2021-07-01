import { Link } from "react-router-dom";
import { useAppDataContext, useAuth } from "../../../Context";
import { addOrRemoveVideoInPlaylist, clearHistory } from "../../../utils";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./styles.css";

export const Liked = () => {
	const {
		state: { liked },
		dispatch,
	} = useAppDataContext();

	const {
		state: { token },
	} = useAuth();

	return (
		<div className="liked-container">
			<div className="liked-main">
				<div className="playlist-head-container">
					<div className="playlist-text">
						<h1 className="playlist-head">Liked videos</h1>
						<p className="playlist-para">{liked?.videos?.length} videos</p>
					</div>
				</div>
				<div className="playlist-videos-container">
					{liked?.videos?.length !== 0 ? (
						liked?.videos?.map(({ video, date }) => (
							<div className="video-flat-card" key={video._id}>
								<img
									src={video.thumbnail}
									alt="video-img"
									className="flat-card-img"
								/>
								<div className="flat-card-video-info">
									<div className="flat-card-text">
										<div className="flat-card-info">
											<Link to="/" className="no-text-deco">
												<p className="flat-card-category">#{video.category}</p>
											</Link>
											<Link
												to={`/explore/${video._id}`}
												className="no-text-deco"
											>
												<h1 className="flat-card-title">{video.title}</h1>
											</Link>
											<h2 className="flat-card-author">{video.author}</h2>
										</div>
										<p className="flat-card-date">{date}</p>
									</div>
									<button
										type="button"
										className="video-remove-cta"
										onClick={() => {
											addOrRemoveVideoInPlaylist({
												token,
												type: "SET_LIKED",
												dispatch,
												playlistId: liked._id,
												video: video._id,
											});
										}}
									>
										<RiDeleteBin5Fill />
									</button>
								</div>
							</div>
						))
					) : (
						<div className="playlist-empty">
							<h1>You have not liked any video</h1>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

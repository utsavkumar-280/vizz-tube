import { Link } from "react-router-dom";
import { useAppDataContext, useAuth } from "../../../Context";
import { addOrRemoveVideoInPlaylist, clearHistory } from "../../../utils";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./styles.css";

export const History = () => {
	const {
		state: { history },
		dispatch,
	} = useAppDataContext();

	const {
		state: { token },
	} = useAuth();

	return (
		<div className="history-container">
			<div className="history-main">
				<div className="playlist-head-container">
					<div className="playlist-text">
						<h1 className="playlist-head">History</h1>
						<p className="playlist-para">{history?.videos?.length} videos</p>
					</div>

					<button
						type="button"
						className="playlist-cta"
						onClick={() => {
							clearHistory({
								dispatch,
								playlistId: history._id,
								token,
							});
						}}
					>
						Clear History
					</button>
				</div>
				<div className="playlist-videos-container">
					{history?.videos?.length !== 0 ? (
						history?.videos?.map(({ video, date }, key) => (
							<div className="video-flat-card" key={key}>
								<img
									src={video.thumbnail}
									alt="video-img"
									className="flat-card-img"
								/>
								<div className="flat-card-video-info">
									<div className="flat-card-text">
										<div className="flat-card-info">
											<p className="flat-card-category">#{video.category}</p>
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
												type: "SET_HISTORY",
												dispatch,
												playlistId: history._id,
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
							<h1>You have not watched any video</h1>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

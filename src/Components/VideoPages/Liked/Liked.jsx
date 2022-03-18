import { Link } from "react-router-dom";
import { useState } from "react";
import { CircleSpinner } from "react-spinners-kit";
import { useAppDataContext, useAuth } from "../../../Context";
import { addOrRemoveVideoInPlaylist } from "../../../utils";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "./styles.css";

export const Liked = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const {
		state: { liked },
		dispatch,
	} = useAppDataContext();

	const {
		state: { token },
	} = useAuth();

	const objectNotLoaded = Object.keys(liked).length === 0;

	console.log({ isDeleting, liked }, Boolean(liked));

	return (
		<div className="liked-container">
			{objectNotLoaded ? (
				<div className="loading-container">
					<CircleSpinner size={25} loading />
				</div>
			) : (
				<div className="liked-main">
					<div className="playlist-head-container">
						<div className="playlist-text">
							<h1 className="playlist-head">Liked videos</h1>
							<p className="playlist-para">
								{liked?.videos?.length === 1
									? `${liked?.videos?.length} video`
									: `${liked?.videos?.length} videos`}
							</p>
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
												setIsDeleting(true);
												addOrRemoveVideoInPlaylist({
													token,
													type: "SET_LIKED",
													dispatch,
													playlistId: liked._id,
													video: video._id,
													setIsDeleting: setIsDeleting,
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
					{isDeleting && (
						<div className="modal-page-container">
							<div className="modal-page">
								<div className="loading-modal-container">
									<CircleSpinner size={27.5} loading />
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

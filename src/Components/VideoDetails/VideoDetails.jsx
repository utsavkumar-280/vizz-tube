import "./styles.css";
import ReactPlayer from "react-player/youtube";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { CircleSpinner } from "react-spinners-kit";
import { useParams } from "react-router-dom";
import { FaPlusCircle, FaCheckCircle } from "react-icons/fa";
import {
	addOrRemoveVideoInPlaylist,
	VIZZ_API,
	addVideosInPlaylist,
	createPlaylist,
} from "../../utils";
import PulseLoader from "react-spinners/PulseLoader";
import { useAppDataContext, useAuth } from "../../Context";

export const VideoDetails = () => {
	const [video, setVideo] = useState(null);
	const [playlistTitle, setPlaylistTitle] = useState("");
	const [playlistModal, setPlaylistModal] = useState(false);
	const [newPlaylistInput, setNewPlaylistInput] = useState(false);
	const [isLiking, setIsLiking] = useState(false);
	let { vidId } = useParams();

	const formSubmit = (e) => {
		e.preventDefault();
		createPlaylist({
			dispatch,
			token,
			video,
			title: playlistTitle,
			setPlaylistTitle,
		});
		setPlaylistModal((prev) => !prev);
		setNewPlaylistInput(false);
	};

	const {
		state: { history, liked, playlists },
		dispatch,
	} = useAppDataContext();

	const {
		state: { token },
	} = useAuth();

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

	console.log({ liked, history, playlists, vidId });

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
									liked.videos?.find((vid) => vid.video._id === vidId)
										? "video-cta color-secondary-liked"
										: "video-cta color-secondary"
								}
								onClick={() => {
									setIsLiking(true);
									addOrRemoveVideoInPlaylist({
										token,
										type: "SET_LIKED",
										dispatch,
										playlistId: liked._id,
										video: vidId,
										setIsLiking: setIsLiking,
									});
								}}
							>
								{liked.videos?.find((vid) => vid.video._id === vidId) ? (
									isLiking ? (
										<>
											<p style={{ paddingRight: "1rem" }}>Liked</p>
											<CircleSpinner size={20} loading />
										</>
									) : (
										"Liked"
									)
								) : isLiking ? (
									<>
										<p style={{ paddingRight: "1rem" }}>Like</p>
										<CircleSpinner size={20} loading />
									</>
								) : (
									"Like"
								)}
							</button>
							<button
								className="video-cta color-primary"
								onClick={() => setPlaylistModal((prev) => !prev)}
							>
								Add
							</button>
							<div
								className="modal-bg"
								style={{ display: playlistModal ? "block" : "none" }}
							>
								<section className="modal-container">
									<section className="modal-main">
										<div className="modal-head">
											<h2>Add to</h2>
											<button
												className="modal-cta"
												onClick={() => setPlaylistModal((prev) => !prev)}
											>
												Close
											</button>
										</div>
										<div className="modal-hero">
											{playlists.map((playlist) => (
												<div className="modal-row" key={playlist._id}>
													<button
														className="modal-add-cta"
														onClick={() => {
															addOrRemoveVideoInPlaylist({
																playlistId: playlist._id,
																token,
																dispatch,
																video: vidId,
																type: "UPDATE_PLAYLIST",
															});
														}}
													>
														{playlist.videos?.find(
															(vid) => vid.video._id === vidId
														) ? (
															<FaCheckCircle className="modal-icon" />
														) : (
															<FaPlusCircle className="modal-icon" />
														)}

														<p>{playlist.title}</p>
													</button>
												</div>
											))}
										</div>
										<div className="modal-footer">
											<div className="modal-row">
												<button
													style={{
														display: newPlaylistInput ? "none" : "flex",
													}}
													onClick={() => setNewPlaylistInput(true)}
													className="modal-add-cta"
												>
													<FaPlusCircle className="modal-icon" />
													<p>Add to New Playlist</p>
												</button>
												{newPlaylistInput && (
													<section className="modal-form-container">
														<form className="modal-form" onSubmit={formSubmit}>
															<input
																className="modal-form-input"
																value={playlistTitle}
																type="text"
																autoFocus
																required
																onChange={(e) =>
																	setPlaylistTitle(e.target.value)
																}
															/>
															<button
																className="modal-form-submit"
																type="submit"
															>
																Add to this Playlist
															</button>
														</form>
													</section>
												)}
											</div>
										</div>
									</section>
								</section>
							</div>
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

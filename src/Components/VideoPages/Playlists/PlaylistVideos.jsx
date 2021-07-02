import { useAppDataContext, useAuth } from "../../../Context";
import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
	addOrRemoveVideoInPlaylist,
	deletePlaylist,
	updatePlaylistTitle,
} from "../../../utils";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { FaCheck, FaTimes } from "react-icons/fa";

import "./playlistVideos.css";
export const PlaylistVideos = () => {
	const { playlistId } = useParams();
	const { state, dispatch } = useAppDataContext();
	const {
		state: { token },
	} = useAuth();

	const playlist = state.playlists.find(
		(playlist) => playlist._id === playlistId
	);

	const temp = playlist?.title;
	const [playlistTitle, setPlaylistTitle] = useState(temp);
	const [titleInput, setTitleInput] = useState(false);

	const TitleInput = () => {
		return (
			<section className="title-input-container">
				<input
					className="title-input"
					autoFocus
					value={playlistTitle}
					onChange={(e) => {
						setPlaylistTitle(e.target.value);
					}}
				/>
				<div className="title-cta-container">
					<button
						type="button"
						className="title-cta"
						onClick={() => {
							updatePlaylistTitle({
								token,
								dispatch,
								title: playlistTitle,
								playlistId,
							});
							setTitleInput(false);
						}}
					>
						<FaCheck />
					</button>
					<button
						type="button"
						className="title-cta-sec"
						onClick={() => {
							setTitleInput(false);
							setPlaylistTitle("");
						}}
					>
						<FaTimes />
					</button>
				</div>
			</section>
		);
	};
	return (
		<>
			{playlist ? (
				<div className="playlistVideos-container">
					<div className="playlistVideos-main">
						<div className="playlist-head-container">
							<div className="playlist-text">
								{titleInput ? (
									<TitleInput />
								) : (
									<h1 className="playlist-head"> {playlist?.title}</h1>
								)}

								<p className="playlist-para">
									{playlist?.videos?.length === 1
										? `${playlist?.videos?.length} video`
										: `${playlist?.videos?.length} videos`}
								</p>
							</div>
							<div className="playlist-head-cta">
								<button
									type="button"
									onClick={() => {
										setTitleInput(true);
									}}
									className="video-remove-cta margin1"
								>
									<BiEditAlt />
								</button>
								<button
									type="button"
									onClick={() => {
										deletePlaylist({ token, dispatch, playlistId });
									}}
									className="video-remove-cta margin1"
								>
									<RiDeleteBin5Fill />
								</button>
							</div>
						</div>
						<div className="playlist-videos-container">
							{playlist?.videos?.length !== 0 ? (
								playlist?.videos?.map(({ video, date }, key) => (
									<div className="video-flat-card" key={key}>
										<img
											src={video.thumbnail}
											alt="video-img"
											className="flat-card-img"
										/>
										<div className="flat-card-video-info">
											<div className="flat-card-text">
												<div className="flat-card-info">
													<p className="flat-card-category">
														#{video.category}
													</p>
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
														type: "UPDATE_PLAYLIST",
														dispatch,
														playlistId: playlist._id,
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
									<h1>This playlist is empty</h1>
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				<Navigate to="/playlists" replace />
			)}
		</>
	);
};

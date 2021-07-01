import { useAppDataContext, useAuth } from "../../../Context";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
export const PlaylistVideos = () => {
	const { playlistId } = useParams();
	const { state, dispatch } = useAppDataContext();
	const {
		state: { token },
	} = useAuth();

	const playlist = state.playlists.find(
		(playlist) => playlist._id === playlistId
	);
	return (
		<div className="playlist-videos-container">
			<div className="playlist-videos-main"></div>
		</div>
	);
};

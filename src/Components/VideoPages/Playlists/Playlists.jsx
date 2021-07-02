import { useAppDataContext } from "../../../Context";

import { Link } from "react-router-dom";

import "./styles.css";

export const Playlists = () => {
	const {
		state: { playlists },
	} = useAppDataContext();

	return (
		<div className="playlists-container">
			<div className="playlists-main">
				<div className="playlist-text">
					<h1 className="playlist-head">Playlists</h1>
					<p className="playlist-para">
						{playlists?.length === 0
							? `2 playlists`
							: `${2 + playlists?.length} playlists`}
					</p>
				</div>

				<div className="playlists-list">
					<Link to="/liked" className="playlist-box">
						Liked videos
					</Link>
					<Link to="/history" className="playlist-box">
						Watched videos
					</Link>

					{playlists?.map((playlist) => (
						<Link
							to={`${playlist._id}`}
							className="playlist-box"
							key={playlist._id}
						>
							{playlist.title}
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

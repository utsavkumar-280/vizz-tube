import { Link } from "react-router-dom";
import "./videoCard.css";

export const VideoCard = ({ video }) => {
	return (
		<div className="card-container">
			<Link to={`/explore/${video._id}`} className="card-thumbnail-container">
				<img
					src={video.thumbnail}
					alt="thumbnail-img"
					className="card-thumbnail"
					width="15vw"
					height="auto"
				/>
			</Link>

			<article className="card-info">
				<p className="card-cat">#{video.category} </p>
				<Link to={`/explore/${video._id}`} className="card-title">
					<h2>{video.title}</h2>
				</Link>
				<h3 className="card-author">{video.author}</h3>
			</article>
			<img src={video.authorImg} alt="avatar-img" className="card-avatar" />
		</div>
	);
};

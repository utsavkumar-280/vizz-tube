import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const VideoDetails = () => {
	const [video, setVideo] = useState(null);
	let { vidId } = useParams();
	console.log("vidID:", vidId);

	useEffect(() => {
		(async () => {
			try {
				const {
					data: { response },
				} = await axios.get(`http://localhost:8040/videos/${vidId}`);
				setVideo(response);
				console.log("response:", response);
			} catch (error) {
				console.log(error);
				setVideo(null);
			}
		})();
	}, [vidId]);

	console.log("video:", video);
	return (
		<div className="video-details-container">
			{video !== null && (
				<div className="video-details-main">
					<section className="video-conatiner">
						<iframe
							src={`https://www.youtube-nocookie.com/embed/${video.vidURL}`}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
							className="main-video"
						/>
					</section>
					<article className="video-details-info">
						<section className="video-text">
							<p className="video-cat">#{video.category}</p>
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
							<button className="video-cta color-primary">Add to</button>
						</section>
					</article>
				</div>
			)}
		</div>
	);
};

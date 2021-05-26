import "./styles.css";

export const NotRelated = () => {
	return (
		<div className="not-related-container">
			<div className="not-related-main">
				<iframe
					src="https://www.youtube.com/embed/6vKucgAeF_Q"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
					allowfullscreen
					className="main-video"
				></iframe>
			</div>
		</div>
	);
};

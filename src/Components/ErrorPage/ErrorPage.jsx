import "./styles.css";

export const ErrorPage = () => {
	return (
		<div className="error-page-container">
			<div className="error-page-main">
				<img
					src="https://i.postimg.cc/K8mHKTz6/dark-Error-Page.png"
					alt="404-img"
					className="error-hero"
				/>
				<h1 className="error-page-head">Page Not Found</h1>
				<h2 className="error-page-text">
					The page you were looking for could not be found.It might have been
					removed, renamed, or did not exist in the first place.{" "}
				</h2>
			</div>
		</div>
	);
};

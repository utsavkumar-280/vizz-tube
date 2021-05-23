import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = ({ path, ...props }) => {
	const isLoggedIn = false;

	return isLoggedIn ? (
		<Route {...props} path={path} />
	) : (
		<Navigate to="/login" state={{ from: path }} replace />
	);
};

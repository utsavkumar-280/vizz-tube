import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = ({ path, ...props }) => {
	const isLoggedIn = true;

	return isLoggedIn ? (
		<Route {...props} path={path} />
	) : (
		<Navigate to="/login" state={{ from: path }} replace />
	);
};

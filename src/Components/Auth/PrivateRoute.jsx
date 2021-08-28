import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../../Context";

export const PrivateRoute = ({ path, ...props }) => {
	const {
		state: { token },
	} = useAuth();

	return token ? (
		<Route {...props} path={path} />
	) : (
		<Navigate to="/login" state={{ from: path }} replace />
	);
};

export const AuthReducer = (state, { type, payload }) => {
	switch (type) {
		case "LOGIN":
			return {
				...state,
				token: payload.token,
				userName: payload.userName,
			};
		case "LOGOUT":
			return {
				...state,
				token: "",
				userName: "",
				userDetails: null,
			};
		case "SET_USER_DETAILS":
			return {
				...state,
				userDetails: payload.userDetails,
			};

		default:
			throw new Error("Can't handle this type of action");
	}
};

export const AppDataReducer = (state, { type, payload }) => {
	switch (type) {
		case "SET_VIDEOS":
			return { ...state, videos: payload };

		case "SET_PLAYLIST":
			return { ...state, playlists: payload };

		case "SET_LIKED":
			return { ...state, liked: payload };

		case "SET_HISTORY":
			return { ...state, history: payload };

		case "ADD_PLAYLIST":
			return { ...state, playlists: state.playlists.concat(payload) };

		case "UPDATE_PLAYLIST":
			return {
				...state,
				playlists: state.playlists.map((playlist) =>
					playlist._id === payload._id ? payload : playlist
				),
			};

		case "DELETE_PLAYLIST":
			return {
				...state,
				playlists: state.playlists.filter(
					(playlist) => playlist._id !== payload._id
				),
			};
		case "RESET_STATE": {
			return {
				...state,
				playlists: [],
				liked: {},
				history: {},
			};
		}

		default:
			return state;
	}
};

import axios from "axios";
import { VIZZ_API } from "./data";

export const createPlaylist = async ({
	token,
	video,
	dispatch,
	title,
	setPlaylistTitle,
}) => {
	try {
		const {
			data: { response },
		} = await axios({
			method: "POST",
			url: `${VIZZ_API}/playlists`,
			data: {
				title,
				videos: [{ video: video._id, date: new Date().toDateString() }],
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({
			type: "ADD_PLAYLIST",
			payload: response,
		});
		setPlaylistTitle("");
	} catch (error) {
		console.log(error);
	}
};

export const addOrRemoveVideoInPlaylist = async ({
	token,
	playlistId,
	video,
	type,
	dispatch,
	setIsLiking,
	setIsDeleting,
}) => {
	try {
		const {
			data: { response },
		} = await axios({
			method: "POST",
			url: `${VIZZ_API}/playlists/${playlistId}/videos`,
			data: {
				video,
				date: new Date().toDateString(),
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({ type, payload: response });
		if (setIsLiking) {
			setIsLiking(false);
		}
		if (setIsDeleting) {
			setIsDeleting(false);
		}
	} catch (error) {
		console.log(error);
	}
};

export const addVideosInPlaylist = async ({
	token,
	playlistId,
	video,
	type,
	dispatch,
}) => {
	try {
		const {
			data: { response },
		} = await axios({
			method: "POST",
			url: `${VIZZ_API}/playlists/${playlistId}/videos/add`,
			data: {
				video,
				date: new Date().toDateString(),
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		dispatch({ type, payload: response });
	} catch (error) {
		console.log(error);
	}
};

export const updatePlaylistTitle = async ({
	playlistId,
	title,
	type,
	token,
	dispatch,
}) => {
	try {
		const {
			data: { response },
		} = await axios({
			url: `${VIZZ_API}/playlists/${playlistId}`,
			method: "POST",
			data: { title },
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		dispatch({ type: "UPDATE_PLAYLIST", payload: response });
	} catch (error) {
		console.log(error);
	}
};

export const deletePlaylist = async ({ token, playlistId, dispatch }) => {
	try {
		const {
			data: { response },
		} = await axios({
			url: `${VIZZ_API}/playlists/${playlistId}`,
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		dispatch({ type: "DELETE_PLAYLIST", payload: response._id });
	} catch (error) {
		console.log(error);
	}
};

export const clearHistory = async ({
	token,
	playlistId,
	dispatch,
	setIsClearing,
}) => {
	try {
		const {
			data: { response },
		} = await axios({
			url: `${VIZZ_API}/playlists/${playlistId}`,
			method: "POST",
			data: {
				videos: [],
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		dispatch({ type: "SET_HISTORY", payload: response });
		setIsClearing(false);
	} catch (error) {
		console.log(error);
	}
};

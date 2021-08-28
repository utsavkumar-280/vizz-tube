import { createContext, useContext, useReducer } from "react";
import { AppDataReducer } from "../Reducer";

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
	const initialState = {
		videos: [],
		playlists: [],
		liked: {},
		history: {},
	};

	const [state, dispatch] = useReducer(AppDataReducer, initialState);

	return (
		<AppDataContext.Provider value={{ state, dispatch }}>
			{children}
		</AppDataContext.Provider>
	);
};

export const useAppDataContext = () => useContext(AppDataContext);

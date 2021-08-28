import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthReducer } from "../Reducer";
import { VIZZ_API } from "../utils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const { userName, token } = JSON.parse(localStorage.getItem("user_cred")) || {
		userName: "",
		token: "",
	};

	const initialState = {
		userName,
		token,
		userDetails: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);
	const navigate = useNavigate();

	const signup = async ({ firstname, lastname, email, password }) => {
		try {
			const {
				data: { message },
				status,
			} = await axios.post(`${VIZZ_API}/users`, {
				firstname,
				lastname,
				email,
				password,
			});

			console.log({ message });
			return { status };
		} catch (error) {
			console.error(error);
			return error.response;
		}
	};

	const login = async ({ email, password, from }) => {
		try {
			const {
				data: {
					response: { firstname, token },
				},
				status,
			} = await axios({
				method: "POST",
				url: `${VIZZ_API}/users/login`,
				headers: { email, password },
			});

			if (status === 200) {
				localStorage?.setItem(
					"user_cred",
					JSON.stringify({
						userName: firstname,
						token,
					})
				);
			}

			dispatch({
				type: "LOGIN",
				payload: { userName: firstname, token },
			});

			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

			navigate(from);
		} catch (error) {
			console.error(error);
			return error.response;
		}
	};

	const updatePassword = async ({ email, password }) => {
		try {
			const {
				data: { message },
				status,
			} = await axios.post(`${VIZZ_API}/users/password-reset`, {
				email,
				password,
			});

			console.log({ message });
			if (status === 200) {
				return { status };
			}
		} catch (error) {
			console.error(error);
			return error.response;
		}
	};

	const logout = () => {
		delete axios.defaults.headers.common["Authorization"];
		localStorage?.removeItem("user_cred");
		dispatch({ type: "LOGOUT" });
	};

	return (
		<AuthContext.Provider
			value={{
				state,
				dispatch,
				signup,
				login,
				logout,
				updatePassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

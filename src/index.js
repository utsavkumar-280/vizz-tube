import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppDataProvider } from "./Context";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
	<StrictMode>
		<Router>
			<AppDataProvider>
				<App />
			</AppDataProvider>
		</Router>
	</StrictMode>,
	document.getElementById("root")
);

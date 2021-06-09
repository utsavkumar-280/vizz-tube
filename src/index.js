import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { AppDataProvider } from "./Context";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
	<StrictMode>
		<Router>
			<ChakraProvider>
				<AppDataProvider>
					<App />
				</AppDataProvider>
			</ChakraProvider>
		</Router>
	</StrictMode>,
	document.getElementById("root")
);

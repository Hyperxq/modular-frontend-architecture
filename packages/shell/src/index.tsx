import { render } from "preact";
import App from "./App";
import "./styles/base.css";

const root = document.getElementById("root");
if (root) {
	render(<App />, root);
}

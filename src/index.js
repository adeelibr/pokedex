// The entry point of the app
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// ReactDOM.render(<App />, document.getElementById("root"));
const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);
root.render(<App />)

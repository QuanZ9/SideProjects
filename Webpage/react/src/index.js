import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TopNav from "./TopNav";
import Desc from "./Desc";
import Main from "./Main";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<TopNav />, document.getElementById("topNav"));
ReactDOM.render(<Desc />, document.getElementById("desc"));
ReactDOM.render(<Main />, document.getElementById("main"));
registerServiceWorker();

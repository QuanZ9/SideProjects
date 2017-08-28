import React from 'react';

function TopNav() {
    return (
		<div id="topNav">
			<img id="logo" src={require("./img/plogo.png")} alt=""/>
			<p id="stdtName">Casey</p>
			<img id="help" src={require("./img/help.png")} alt=""/>
			<img id="noti" src={require("./img/noti.png")} alt=""/>
		</div>
	)
}

export default TopNav;


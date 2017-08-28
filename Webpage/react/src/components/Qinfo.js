import React from 'react';
import "../css/styles.css";


function Qinfo(props){
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    
    function gotoFunction(questionId) {
    	var dropdowns = document.getElementsByClassName("dropdown-content");
	    var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
		props.setter(questionId);
	}
    
	function getText(status){
		if (status === "incomplete"){
			return "incomplete";
		}
		else{
			return (<div style={{display:"inline"}}><span className='greenMarker'>✓ </span> "Complete"</div>);
		}
	}

	return (
		<div>
		<div className="dropdown">
            <button onClick={myFunction} className="greybtn" id="dropbtn">Question {props.state.currentQuestion+1} of 5 ▼</button>
            <div id="myDropdown" className="dropdown-content">
                <a id = "q1Choose" onClick={() => gotoFunction(0)} href="#q1">1. {getText(props.state.Q[0])} </a>
                <a id = "q2Choose" onClick={() => gotoFunction(1)} href="#q2">2. {getText(props.state.Q[1])} </a>
                <a id = "q3Choose" onClick={() => gotoFunction(2)} href="#q3">3. {getText(props.state.Q[2])} </a>
                <a id = "q4Choose" onClick={() => gotoFunction(3)} href="#q4">4. {getText(props.state.Q[3])} </a>
                <a id = "q4Choose" onClick={() => gotoFunction(4)} href="#q5">5. {getText(props.state.Q[4])} </a>
            </div>
		</div>
        <p id="pts">Worth {props.points} point{props.points > 1 ? "s" : ""}</p>
		</div>
	);
}

export default Qinfo;

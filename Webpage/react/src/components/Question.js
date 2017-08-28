import React from 'react';

import "../css/styles.css";

function Question(props) {
    return (
		<div className="topBar">
		<p>{props.content}</p>
		</div>
	);
}

Question.propTypes = {
	content: React.PropTypes.string.isRequired
};

export default Question;

import React from 'react';

import "../css/styles.css";

function Option(props) {
	return (
			<div>
			<input
			    type="radio"
				name={props.questionId}
				value={props.optionId}
				onClick={props.onAnswerSelected}
			/>
				{props.answerContent}
			</div>
	);
}

Option.propTypes = {
	questionId: React.PropTypes.number.isRequired,
	answerContent: React.PropTypes.string.isRequired,
	onAnswerSelected: React.PropTypes.func.isRequired,
	optionId: React.PropTypes.number.isRequired
};

export default Option;

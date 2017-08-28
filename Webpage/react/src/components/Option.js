import React from 'react';

import "../css/styles.css";

function Option(props) {
	var show = props.optionId == props.checkedOption;
	return (
			<div>
			<input
			    type="radio"
				name={props.questionId}
				value={props.optionId}
				id={props.optionId + props.questionId}
				onClick={props.onAnswerSelected}
				checked={show}
			/>
				{props.answerContent}
			</div>
	);
}

Option.propTypes = {
	questionId: React.PropTypes.number.isRequired,
	answerContent: React.PropTypes.string.isRequired,
	onAnswerSelected: React.PropTypes.func.isRequired,
	optionId: React.PropTypes.number.isRequired,
	checkedOption: React.PropTypes.number.isRequired
};

export default Option;

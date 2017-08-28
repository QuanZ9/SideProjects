import React from "react";
import Question from "./Question";
import Option from "./Option";
import "../css/styles.css";


function Result(props) {
	function renderAnswerOptions(key) {
		return (
			<Option
				answerContent={key.text}
				optionId={key.num}
				questionId={props.questionId}
				onAnswerSelected={props.onAnswerSelected}
			/>
		);
	}
	
	return (
		<div id="qall">
			<Question content={props.question} />
			<div id="choices">
			<p>{props.title}</p>
			<ul>
				{props.answerOptions.map(renderAnswerOptions)}
			</ul>
			</div>
		</div>
	);
}

Result.propTypes = {
	state: React.PropTypes.object.isRequired;
};

export default Result;

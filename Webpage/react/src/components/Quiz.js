import React from "react";
import Question from "./Question";
import Option from "./Option";
import "../css/styles.css";


function Quiz(props) {
	function renderAnswerOptions(key) {
		return (
			<Option
				answerContent={key.text}
				optionId={key.num}
				questionId={props.questionId}
				checkedOption={props.checkedOption}
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

Quiz.propTypes = {
	answerOptions: React.PropTypes.array.isRequired,
	question: React.PropTypes.string.isRequired,
	questionId: React.PropTypes.number.isRequired,
	onAnswerSelected: React.PropTypes.func.isRequired,
	title: React.PropTypes.string.isRequired
};

export default Quiz;

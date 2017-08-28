import React, { Component } from "react";
import { Player } from 'video-react';
import Quiz from "./components/Quiz";
import Contents from "./data/data";
import Info from "./data/info";
import "./css/styles.css";
import "../node_modules/video-react/dist/video-react.css";
import Qinfo from "./components/Qinfo";
import DonutChart from './components/DonutChart';
import ResultList from "./components/ResultList";

class Main extends Component {
    constructor(props, context){
	    super(props, context);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleAnswerSelected = this.handleAnswerSelected.bind(this); 
		this.handlePlay = this.handlePlay.bind(this);
		this.showQuestion = this.showQuestion.bind(this);
		this.showError = this.showError.bind(this);
		this.showConfirm = this.showConfirm.bind(this);
		this.hideSubmitInfo = this.hideSubmitInfo.bind(this);
		this.handleConfirmedSubmit = this.handleConfirmedSubmit.bind(this);
		this.showQinfo = this.showQinfo.bind(this);
		this.setQuestionId = this.setQuestionId.bind(this);
		this.handleStateChange = this.handleStateChange.bind(this);
	    this.state = {Q: ["incomplete",
						  "incomplete",
						  "incomplete",
						  "incomplete",
						  "incomplete"],
					  A: [false, false, false, false, false],
					  finished: false,
					  currentQuestion: -2,
					  latestQuestion: -1,
					  submitStatus: "none",
	    }
    }

  	componentDidMount() {
	  	this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
	}

    handleStateChange(state, prevState) {
		var time0 = Contents[0].time;
		var time1 = Contents[1].time;
		var time2 = Contents[2].time;
		var time3 = Contents[3].time;
		var time4 = Contents[4].time;

		if (state.currentTime > 0 && state.currentTime < time0){
			this.setState({currentQuestion: -1});
		}
		else if (prevState.currentTime < time0 
				&& state.currentTime > time0
				&& this.state.Q[0] === "incomplete"){
			this.refs.player.pause();
			this.setState({currentQuestion: 0});
		}
		else if (prevState.currentTime < time1
				&& state.currentTime > time1
				&& this.state.Q[1] === "incomplete"){
			this.refs.player.pause();
			this.setState({currentQuestion: 1});
		}
		else if (prevState.currentTime < time2
				&& state.currentTime > time2
				&& this.state.Q[2] === "incomplete"){
			this.refs.player.pause();
			this.setState({currentQuestion: 2});
		}
		else if (prevState.currentTime < time3 
				&& state.currentTime > time3
				&& this.state.Q[3] === "incomplete"){
			this.refs.player.pause();
			this.setState({currentQuestion: 3});
		}
		else if (prevState.currentTime < time4 
				&& state.currentTime > time4
				&& this.state.Q[4] === "incomplete"){
			this.refs.player.pause();
			this.setState({currentQuestion: 4});
		}
		this.state.currentQuestion > this.state.latestQuestion ? this.setState({latestQuestion: this.state.currentQuestion}) : {};
}

  	handleSubmit(){
		for (var i = 0; i < 5; i++){
    		if (this.state.Q[i] === "incomplete"){
				this.setState({submitStatus: "incomplete"});
				return;
    		}
		}
    	
        this.setState({
    		A: [this.state.Q[0] == Contents[0].correctAnswer,
        		this.state.Q[1] == Contents[1].correctAnswer,
        	    this.state.Q[2] == Contents[2].correctAnswer,
        	    this.state.Q[3] == Contents[3].correctAnswer,
        	    this.state.Q[4] == Contents[4].correctAnswer],
			submitStatus: "complete"
    	});
    }

	handleConfirm(){
		this.setState({submitStatus: "confirmed"});
	}


	hideSubmitInfo(){
		this.setState({submitStatus: "..."});
	}
	
	handleConfirmedSubmit(){
		this.handleConfirm(); 
		this.setState({finished: true});
	}

	showError(){
		return (
			<div id="error" className="popup">
		    	<span className="close" onClick={this.hideSubmitInfo}>&times;</span>
			 	<p className="redMarker">Error</p>
				<p >Please answer all the questions before submitting your quiz.</p>
			</div>
		);
	}

	showConfirm(){
	  	return(
		<div className="confirmbg">
			<div className="confirm">
				<div className="topBar">
					<span className="close" id="closeCon" onClick={this.hideSubmitInfo}><strong>&times;</strong></span>
       				<p className="conTitle">Submit Quiz</p> 
	      		</div>
				<p className="popText">Are you sure you're ready to submit? You won't be able to change your answers.</p>
				<button id="subQCon" className="bluebtn" onClick={this.handleConfirmedSubmit}>Submit Quiz</button>
				<button id="review" className="greybtn" onClick={this.hideSubmitInfo}>Review</button>
			</div>
		</div>
		);
	}

	showSuccess(){
		return (
			<div id="success"  className="popup">
				<span className="close" onClick={this.hideSubmitInfo}>&times;</span>
				<p className="greenMarker">Success</p>
				<p>Success! You've submitted your quiz.</p>
			</div>
		)
	}

  	handlePlay(){
		this.refs.player.play();
	}

	showQuestion(){
		var num = this.state.currentQuestion;
		if (num < 0){
			return (
				<div>
					<p className="start">Select the play button to begin your quiz</p>
				</div>
			)
		}
		else if (num < 4){
    		return (
    			<div>
    			<Quiz
    				answerOptions = {Contents.map((question) => question.answers)[num]}
    				question = {Contents[num].question}
    				questionId = {num}
    				onAnswerSelected={this.handleAnswerSelected}
					checkedOption = {this.state.Q[num]}
    				title={Contents[num].title}
    			/>
				<input id="resumeQ" className="bluebtn" type="button" value={this.state.currentQuestion === -2 ? "Play" : "Resume"} onClick={this.handlePlay}/>
    			</div>
    		)
		}
		else{
    		return (
    			<div>
    			<Quiz
    				answerOptions = {Contents.map((question) => question.answers)[num]}
    				question = {Contents[num].question}
    				questionId = {num}
    				onAnswerSelected={this.handleAnswerSelected}
    				title={Contents[num].title}
					checkedOption={this.state.Q[num]}
    			/>	
				<input id="subQ" className="bluebtn" type="button" value="Submit Quiz" onClick={this.handleSubmit}/>
				</div>
			)
		}
	}
	
	setQuestionId(qid){
		if (qid <= this.state.latestQuestion &&
				qid >= 0){
			this.setState({currentQuestion: qid});
			this.refs.player.seek(Contents[qid].time);
		}
	}		

	showQinfo(){
		var qid = this.state.currentQuestion;
		if (qid >= 0){
			return (
				<Qinfo points = {Contents[qid].points} state={this.state} setter={this.setQuestionId} />
			)
		}
	}

	showScore(){
		var score = 0;
		var correctCount = 0;
		for (var i = 0; i < 5; i++){
			if (this.state.A[0]){
				score = score + Contents[i].points;
				correctCount = correctCount + 1;
			}
		}
		var value = ~~(100 * score / Info.totalPoints);
		var incorrectCount = 5 - correctCount;

		return (
			<div className="topScore">
				<div>	
					<DonutChart
						value={value}
					/>
				</div>
       			<div className="chartText">
         			<p className='scorePercent'>{value}%</p>
         			<p className="yqs">Your quiz score!</p>
           			<p id="scoreP" className="scoreText"> Score {value}</p>
           			<p id="scoreIn" className="scoreText"> {incorrectCount} Incorrect - </p>
           			<p id="scoreC" className="scoreText"> {correctCount} Correct / </p>
           			<p id="scoreAll"className="scoreText"> 5 Questions / </p>  
  				</div>
       		</div>
		);
	}

	showResult(){
		return(
			<ResultList mainState={this.state} setter={this.setQuestionId}/>
		)
	}

    handleAnswerSelected(event) {
    	var key = event.currentTarget.name;
    	var value = event.currentTarget.value;
    	const curQ = this.state.Q;
		curQ[key] = value;
    	this.setState({curQ});
    }
  
    render() {
        return (
			<div>
			<div className="content">
			{this.state.finished ? this.showScore() : this.showQinfo()}
    		    <div className="mainPart">
    		        <table className= "vandq">
    				<tbody>
    		            <tr>
    						<td>
        						<Player ref="player" src="http://www.w3schools.com/html/mov_bbb.mp4"/>
    						</td>
                			<td>
     							{this.state.finished ? this.showResult() : this.showQuestion()}
    						</td> 
    	    			</tr>
    				</tbody>
    				</table>
    			</div>
			</div>
			{this.state.submitStatus === "confirmed" ? this.showSuccess() : ""}
			{this.state.submitStatus === "complete" ? this.showConfirm() : ""}
			{this.state.submitStatus === "incomplete" ? this.showError() : ""}
			</div>
		);
  	}
}

export default Main;


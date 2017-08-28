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
	    this.state = {Q0: 2,
		   	  		  Q1: 1,
					  Q2: 0,
					  Q3: 3,
					  Q4: 3,
					  finished: false,
					  currentQuestion: -2,
					  latestQuestion: -1,
					  submitStatus: "none"
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
				&& state.currentTime > time0){
			this.refs.player.pause();
			this.setState({currentQuestion: 0});
		}
		else if (prevState.currentTime < time1
				&& state.currentTime > time1){
			this.refs.player.pause();
			this.setState({currentQuestion: 1});
		}
		else if (prevState.currentTime < time2
				&& state.currentTime > time2){
			this.refs.player.pause();
			this.setState({currentQuestion: 2});
		}
		else if (prevState.currentTime < time3 
				&& state.currentTime > time3){
			this.refs.player.pause();
			this.setState({currentQuestion: 3});
		}
		else if (prevState.currentTime < time4 
				&& state.currentTime > time4){
			this.refs.player.pause();
			this.setState({currentQuestion: 4});
		}
		this.state.currentQuestion > this.state.latestQuestion ? this.setState({latestQuestion: this.state.currentQuestion}) : {};
    }

  	handleSubmit(){
    	if (this.state.Q0 === "incomplete" ||
    			this.state.Q1 === "incomplete" ||
    			this.state.Q2 === "incomplete" ||
    			this.state.Q3 === "incomplete" ||
    			this.state.Q4 === "incomplete" 
    	){
			this.setState({submitStatus: "incomplete"});
    	}
    	else{
        	this.setState({
    			A0: this.state.Q0 == Contents[0].correctAnswer,
        		A1: this.state.Q1 == Contents[1].correctAnswer,
        		A2: this.state.Q2 == Contents[2].correctAnswer,
        		A3: this.state.Q3 == Contents[3].correctAnswer,
        		A4: this.state.Q4 == Contents[4].correctAnswer,
				submitStatus: "complete"
    		});
		}
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
			 	<p id="errTitle">Error</p>
				<p >Please answer all the questions before submitting your quiz.</p>
			</div>
		);
	}

	showConfirm(){
	  	return(
		<div id="confirmbg">
			<div id="confirm">
				<div className="topBar">
					<span className="close" id="closeCon" onClick={this.hideSubmitInfo}><strong>&times;</strong></span>
       				<p id="conTitle">Submit Quiz</p> 
	      		</div>
				<p className="popText">Are you sure you're ready to submit? You won't be able to change your answers.</p>
				<button id="subQCon" className="bluebtn" onClick={this.handleConfirmedSubmit}>Submit Quiz</button>
				<button id="review" className="greybtn" onClick={this.hideSubmitInfo}>Review</button>
			</div>
		</div>
		)
	}

	showSuccess(){
		return (
			<div id="success"  className="popup">
				<span className="close" onClick={this.hideSubmitInfo}>&times;</span>
				<p id="sucTitle">Success</p>
				<p >Success! You've submitted your quiz.</p>
			</div>
		)
	}

  	handlePlay(){
		this.refs.player.play();
	}

	showQuestion(){
		var num = this.state.currentQuestion;
		var id = "Q" + num;
		if (num < 0){
			return (
				<div>
					<p>Select the play button to begin your quiz</p>
				<input id="subQ" className="bluebtn" type="button" value="Submit Quiz" onClick={this.handleSubmit}/>
				</div>
			)
		}
		else if (num < 4){
    		return (
    			<div>
    			<Quiz
    				answerOptions = {Contents.map((question) => question.answers)[num]}
    				question = {Contents[num].question}
    				questionId = {id}
    				onAnswerSelected={this.handleAnswerSelected}
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
    				questionId = {id}
    				onAnswerSelected={this.handleAnswerSelected}
    				title={Contents[num].title}
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
		var score0 = this.state.A0 ? Contents[0].points : 0;
		var score1 = this.state.A1 ? Contents[1].points : 0;
		var score2 = this.state.A2 ? Contents[2].points : 0;
		var score3 = this.state.A3 ? Contents[3].points : 0;
		var score4 = this.state.A4 ? Contents[4].points : 0;
		var userScore = score0 + score1 + score2 + score3 + score4;	
		var value = ~~(100 * userScore / Info.totalPoints);

		var correctCount = 0;
		if (this.state.A0){
			correctCount = correctCount + 1;
		}
		if (this.state.A1){
			correctCount = correctCount + 1;
		}
		if (this.state.A2){
			correctCount = correctCount + 1;
		}
		if (this.state.A3){
			correctCount = correctCount + 1;
		}
		if (this.state.A4){
			correctCount = correctCount + 1;
		}

		var incorrectCount = 5 - correctCount;

		return (
			<div id="topScore">
				<div id="donutchart">	
					<DonutChart
						value={value}
					/>
				</div>
       			<div id="chartText">
         			<p id='scorePercent'>{value}%</p>
         			<p id="yqs">Your quiz score!</p>
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
    	var obj = {};
    	obj[key] = value;
    	this.setState(obj);
    }
  
    render() {
        return (
			<div>
			<div id="content">
			{this.state.finished ? this.showScore() : this.showQinfo()}
    		    <div id="mainPart">
    		        <table id= "vandq">
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


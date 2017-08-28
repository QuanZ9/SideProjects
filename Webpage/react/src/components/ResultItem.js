import React, {Component} from 'react';
import "../css/Result.css";
import "../css/styles.css";

class ResultItem extends Component{
 	constructor(props){
		super(props);
		this.toggleContent = this.toggleContent.bind(this);
		this.showOptions = this.showOptions.bind(this);
		this.showMark = this.showMark.bind(this);
	}

    toggleContent(){
        this.props.toggleOne(this.props.id)
    }
    getHeight(){
        if(this.props.open){
            return "200px"
        } else {
            return "0"
        }
    }

	showOptions(optionId){
		if (this.props.data.correctAnswer == optionId){
			return (
				<p className="greenMarker"> ✓ {this.props.data.answers[optionId].text}</p>
			);
		}
		else{
			if (this.props.mainState.Q[this.props.id] == optionId){
				return (
					<p className="redMarker"> {this.props.data.answers[optionId].text}</p>		
				)
			}
			else{
        		return (
    				<p>{this.props.data.answers[optionId].text}</p>
    			);
			}
		}
	}

	showMark(){
		var qid = this.props.id;
		if (this.props.mainState.A[qid]){
			return (
				<span className="qCI-corrent"> ✓ </span>
			);
		}
		else{
			return (
				<span className="qCI-wrong"> x </span>
			);
		}
	}

    render() {
      	var style = { height: this.getHeight() };
      	return (
        	<div className="dropdown-list">
          		<p className="dropdown-item-title" onClick={this.toggleContent}>{this.props.data.title}
				{this.showMark()}
				</p>
				<div className="dropdown-item-content" style={style} >
				<p className="dropdown-list-title">{this.props.data.question}</p>
				<div className="dropdown-list-items">
					{this.showOptions(0)}
					{this.showOptions(1)}
					{this.showOptions(2)}
					{this.showOptions(3)}
		        </div>
				</div>
        	</div>
      	);
    }
}

export default ResultItem;

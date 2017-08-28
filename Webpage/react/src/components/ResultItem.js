import React, {Component} from 'react';
import "../css/Result.css";

class ResultItem extends Component{
 	constructor(props){
		super(props);
		this.toggleContent = this.toggleContent.bind(this);
		this.showOptions = this.showOptions.bind(this);
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

	showOptions(id){
		if (this.props.data.correctAnswer === id){
			if (this.props.mainState.Q2){
				return (<p> Correct!!!</p>);
			}
		}
		else{
    		return (
				<p>{this.props.data.answers[id].text}</p>
			);
		}
	}


    render() {
      	var style = { height: this.getHeight() }
      	return (
        	<div className="dropdown-list">
          		<p className="dropdown-item-title" onClick={this.toggleContent} >{this.props.data.title}</p>
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

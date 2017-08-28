import React, {Component} from 'react';
import Contents from "../data/data";
import ResultItem from "./ResultItem"


class ResultList extends Component{
	constructor(props){
		super(props);
		this.buildItems = this.buildItems.bind(this);
		this.buildItem = this.buildItem.bind(this);
		this.toggleOne = this.toggleOne.bind(this);
		this.state = {openItemIndex: -1};
	}

 	buildItems(){
    	var items = Contents.map(this.buildItem)
    	return items;
  	}

  	buildItem(data, index){
      	var openStatus = (index === this.state.openItemIndex);
		return (
	  		<ResultItem id={index} data={data} toggleOne={this.toggleOne} open={openStatus} mainState={this.props.mainState} />);
  	}

  	toggleOne(id){
      	this.props.setter(id);
    	if(this.state.openItemIndex === id){
      		this.setState({openItemIndex: -1});
   	 	} else {
      		this.setState({openItemIndex: id});
    	}
 	}

  	render() {
    	var items = this.buildItems();
    	return (
     	 	<div>
        		{items}
      		</div>
    	);
  	}
}

export default ResultList;

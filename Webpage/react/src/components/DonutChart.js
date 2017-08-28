import React, { Component } from 'react';
import "../css/DonutChart.css";

class DonutChart extends Component{
	
  constructor(props){
  	super(props);
  }


  render() {

    const halfsize = (this.props.size * 0.5);
    const radius = halfsize - (this.props.strokewidth * 0.5);
    const circumference = 2 * Math.PI * radius;
    const strokeval = ((this.props.value * circumference) / 100);
    const dashval = (strokeval + ' ' + circumference);

    const trackstyle = {strokeWidth: this.props.strokewidth};
    const indicatorstyle = {strokeWidth: this.props.strokewidth, strokeDasharray: dashval}
    const rotateval = 'rotate(-90 '+halfsize+','+halfsize+')';

    return (
      <svg width={this.props.size} height={this.props.size} className="donutchart">
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={trackstyle} className="donutchart-track"/>
        <circle r={radius} cx={halfsize} cy={halfsize} transform={rotateval} style={indicatorstyle} className="donutchart-indicator"/>
      </svg>
    );
  }
}

DonutChart.propTypes = {
    value: React.PropTypes.number,        // value the chart should show
    valuelabel: React.PropTypes.string,   // label for the chart
    size: React.PropTypes.number,         // diameter of chart
    strokewidth: React.PropTypes.number   // width of chart line
};


DonutChart.defaultProps = {
      value:0,
      valuelabel:'Completed',
      size:116,
      strokewidth:10
};

export default DonutChart;

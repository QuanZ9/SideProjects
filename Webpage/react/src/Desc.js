import React, { Component } from 'react';
import Info from "./data/info";

class Desc extends Component {
    render() {
	return(
		<div id ="content">
		<table id= "description">
            <tbody>
			<tr>
                <td><strong>Title:</strong> {Info.title}</td>
                <td><strong>{Info.totalPoints} Points</strong></td>
                <td><strong>Due:</strong> {Info.due}</td>
            </tr>
            <tr>
                <td colSpan="3"><strong>Learning Objectives:</strong> {Info.objective} </td>
            </tr>
            <tr>
                <td colSpan="3"><strong>Description:</strong> {Info.description} </td>
            </tr>
			</tbody>
        </table>
		</div>
	);
	}
}

export default Desc;

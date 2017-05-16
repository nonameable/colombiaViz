import React, { Component } from 'react';
import d3 from "d3";

import './ColombiaMap.css';


export default class Overlay extends Component {
	constructor(props) {
		super(props);
		this.projection = null;
    this.width=960;
    this.height=500;
	}

	componentDidMount() {

	}
  componentWillUpdate() {
    let projection = this.props.getProjection();
    console.log("projection in overlay");
    console.log(projection);
    console.log("projection in overlay")
	}

	render() {
		return (
			<div className="Overlay">
        <canvas id="overlay" width={this.width} height={this.height}></canvas>
			</div>);
	}
}

import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import d3 from "d3";

import './Overlay.css';


export default class Overlay extends Component {
	constructor(props) {
		super(props);
		this.projection = null;
    this.width=960;
    this.height=500;
    this.canvas = null;
	}

	componentDidMount() {

	}
  componentWillUpdate(nextProps) {
    console.log("WILL UPDATE runs");
    let projection = nextProps.getProjection();
    let canvas = this.canvas;
    //let canvas = document.getElementById('overlayq');
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.beginPath();
    ctx.fillStyle = "rgb(200,0,0)";
    nextProps.tweets.forEach((t,i) => {
      console.log(t);
      let realCoordinates = t.coordinates.coordinates;
      console.log("real coordinates");
      //console.log(realCoordinates);
      //console.log(projection);
      mapCoordinates = projection(realCoordinates);
      console.log(mapCoordinates);
      let x = mapCoordinates[0];
      let r = 5;
      let y = mapCoordinates[1];
      //console.log("coordinates: X: " + x + " and Y: " + y);
      //ctx.fillText(t.user.screen_name, x+20,y+r/2);
      ctx.moveTo(x,y);
      ctx.arc(x,y,r,0,2*Math.PI);
    });
    ctx.fill();

	}

	render() {
		return (
			<canvas id="overlayq" ref={(canvas) => { this.canvas = canvas; }} width={this.width} height={this.height}></canvas>
	   );
	}
}

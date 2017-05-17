import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";

import './Stats.css';


export default class Overlay extends Component {
	constructor(props) {
		super(props);
	  this.count = 0;
	}

	componentDidMount() {

	}
  componentWillUpdate(nextProps) {
    console.log("WILL UPDATE Stats runs");
    console.log(this.props);
    console.log("------ props from stats");
    this.count = this.props.getTweetCount();
	}

	render() {
    let rate = 0;
    if(this.props.count > 0){
      rate = this.props.countColombia/this.props.count;
    }

		return (
      <div>
        <h1> Twitter Stats</h1>
        <div> <b>Rate (Tweets from Colombia / total): </b> {rate}</div>
        <div> <b>Most followed user: </b> {this.props.most_followed_user} </div>
      </div>

	   );
	}
}

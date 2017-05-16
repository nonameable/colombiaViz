import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx";

import {Tweets} from "../api/Tweets.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.projection = null;
    this.setProjection = this.setProjection.bind(this);
    this.getProjection = this.getProjection.bind(this);
  }

  setProjection(projection){
    this.projection = projection;
  }

  getProjection(){
    console.log("is called get projection");
    return this.projection;
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);

  }


  render() {
    console.log("render!");
    return (
      <div>
        <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
        { this.props && this.props.err ?
          <div>Error: {this.props.err}</div> :
          <span></span>
        }
        <h2>Results:</h2>
        {this.props && this.props.tweets ?
          <div>
          <ColombiaMap setProjection={this.setProjection}
            data={{RISARALDA:10}}
          />
          <Overlay getProjection={this.getProjection}/>
          <TweetsResults tweets={this.props.tweets}/></div> :
          <p>Enter a query</p>
        }

      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);

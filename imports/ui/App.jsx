import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import TweetsResults from "./TweetsResults.jsx";
import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx";
import Stats from "./Stats.jsx";

import {Tweets} from "../api/Tweets.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.projection = null;
    this.setProjection = this.setProjection.bind(this);
    this.getProjection = this.getProjection.bind(this);

    this.tweet_count = 0;
    this.most_followed_user = 'duto_guerra';
    this.tweet_count_Colombia = 0;

    this.incrementTweetCount = this.incrementTweetCount.bind(this);
    this.getTweetCount = this.getTweetCount.bind(this);

    this.incrementTweetCountColombia = this.incrementTweetCountColombia.bind(this);
    this.incrementTweetCountColombia = this.incrementTweetCountColombia.bind(this);

    this.setMostFollowedUser = this.setMostFollowedUser.bind(this);
  }


  setProjection(projection){
    this.projection = projection;
  }

  getProjection(){
    return this.projection;
  }

  incrementTweetCount(){
    this.tweet_count = this.tweet_count + 1;
  }

  getTweetCount(){
    return this.tweet_count;
  }

  incrementTweetCountColombia(){
    this.tweet_count_Colombia = this.tweet_count_Colombia + 1;
  }

  getTweetCountColombia(){
    return this.tweet_count_Colombia;
  }

  setMostFollowedUser(user){
    console.log("is called!");
    this.most_followed_user = user;
    console.log(this.most_followed_user);
    console.log("is called!");
  }


  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;
    console.log("enter de change query")
    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);

  }
  componentWillMount(){
    Meteor.call("twitter.stream", '');
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
          <Overlay getProjection={this.getProjection} tweets={this.props.tweets}/>
          <ColombiaMap setProjection={this.setProjection}
            data={{RISARALDA:10}}
          />
          <Stats getTweetCount={this.getTweetCount} count={this.tweet_count} countColombia={this.tweet_count_Colombia} most_followed_user={this.most_followed_user}/>

          <h2> Tweets Results</h2>
          <TweetsResults tweets={this.props.tweets} incrementTweetCount={this.incrementTweetCount} setMostFollowedUser={this.setMostFollowedUser} incrementTweetCountColombia={this.incrementTweetCountColombia}/>
          </div> :
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

import React, {Component} from "react";


import Tweet from "./Tweet.jsx";

export default class TweetResults extends Component {

  constructor(props) {
		super(props);

		this.most_followed_user_followers = -1;
	}

  componentWillMount(){
    this.most_followed_user_followers = -1;
  }

  renderTweets() {
    return this.props.tweets.map((tweet) => {
      if(tweet.place.country === 'Colombia'){
        this.props.incrementTweetCountColombia();
      }
      if(tweet.user.followers_count >= this.most_followed_user_followers){
        console.log("entra if de cambio de user");
        console.log(tweet.user.followers_count);
        console.log(tweet.user.screen_name);
        console.log("--------------------------");
        this.most_followed_user_followers = tweet.user.followers_count;
        this.props.setMostFollowedUser(tweet.user.screen_name);
      }
      this.props.incrementTweetCount();
      return (<Tweet key={tweet.id} tweet={tweet}/>);
    });
  }

  render() {
    return (
      <div className="tweetResults">
        {this.renderTweets()}
      </div>
    );
  }
}

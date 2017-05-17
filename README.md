# ColombianViz


App that shows a map in real time of all the tweets with precise geo location (e.g. with dots on the map). It is done for tweets in Colombia or at least very near to it's borders. The app should support a high volume of tweets, as it uses html canvas to draw to the dots without performance issues.

## Technologies used:

* React + Meteor for general app structure and component creation
* SVG for the map, so we can interact easily with the browser
* Canvas for drawing the dots using an Overlay on top of the already generated map

## Creative Differentiator


*  Create a clear readme that will allow me to run it, explains what you did, and specifies the creative differentiator

## To run the project

First, the app requires you to setup your credentials on the server using environment variables:

```
export TWITTER_CONSUMER_KEY="yourCredentialsHere"
export TWITTER_CONSUMER_SECRET="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_KEY="yourCredentialsHere"
export TWITTER_ACCESS_TOKEN_SECRET="yourCredentialsHere"
```

Then, install all the necessary dependencies:

```
meteor npm install --save d3@v3
meteor npm install
```


With the previous command we make sure to check you are using D3.js version 3, as version 4 is not supported here.

Now we can run our project:
```
meteor
```

This is a very basic implementation that handles a global search shared by all users and doesn't implement any security or restriction. It's intended as a starting point, so add your own requirements.

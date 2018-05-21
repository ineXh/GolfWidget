import React from 'react';
import {render} from 'react-dom';
import Golf from './Golf.jsx';

class App extends React.Component {
  render() {
    return (
        <Golf
        	numStages = {this.props.numStages}
        	width 	  = {this.props.width}/>
    );
  }
}

class Empty extends React.Component {
  render () { return false; }
}
window.renderEmpty = function(element) {
  render(<Empty/>, document.getElementById(element));
}
window.renderApp = function(appID, numStages, width) {
  render(<App
  		numStages={numStages}
  		width={width}
  	/>, document.getElementById(appID));
}
//renderEmpty('GolfWidget')
renderApp('GolfWidget', 5, window.innerWidth*0.5);
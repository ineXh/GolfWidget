import React from 'react';
import {render} from 'react-dom';
import Golf from './Golf.jsx';

class App extends React.Component {
  render() {
    return (
        <Golf input = {this.props.input}/>
    );
  }
}

class Empty extends React.Component {
  render () { return false; }
}
window.renderEmpty = function(element) {
  render(<Empty/>, document.getElementById(element));
}
window.renderApp = function(appID, input) {
  render(<App
  		input={input}
  	/>, document.getElementById(appID));
}
//renderEmpty('GolfWidget')
renderApp('GolfWidget',
	{totalStages: 5,
	 currentStage: 0,
	 unlockedStages: 3,
	 width: 400 //window.innerWidth*0.5
	});

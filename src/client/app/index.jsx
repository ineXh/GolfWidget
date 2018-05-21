import React from 'react';
import {render} from 'react-dom';
import Golf from './Golf.jsx';

class App extends React.Component {
  render() {
    return (
        <Golf numStages={this.props.numStages}/>
    );
  }
}

class Empty extends React.Component {
  render () { return false; }
}
window.renderApp = function(appID, numStages) {
  render(<App numStages={numStages}/>, document.getElementById(appID));
}
renderApp('GolfWidget', 5);
import React from 'react';
import {render} from 'react-dom';
import Golf from './Golf.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        Hello
        <Golf/>
      </div>
    );
  }
}

class Empty extends React.Component {
  render () { return false; }
}
window.renderApp = function(element) {
  render(<App/>, document.getElementById('GolfWidget'));
}
renderApp();
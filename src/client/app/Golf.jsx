import React, {Component} from 'react';
import {MDCLinearProgress} from '@material/linear-progress/dist/mdc.linearProgress';

import './css/styles/LinearProgressIndicatorCatalog.scss';
class Golf extends React.Component {

  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }

  render() {
    return (
      <div>
        Hello 2
        <LinearProgressDemos/>
      </div>
    );
  }
} // end Golf
var indicators = []
class LinearProgressDemos extends Component {
  constructor(props) {
    super(props);
  }
  initIndicator(indicatorEl){
    console.log('initIndicator')
    if (!indicatorEl) return;
    const indicator = new MDCLinearProgress(indicatorEl);
    indicator.progress = 0.5;
    indicators.push(indicator);
  }

  initBufferIndicator(indicatorEl){
    console.log('initBufferIndicator')
    if (!indicatorEl) return;
    const indicator = new MDCLinearProgress(indicatorEl);
    indicator.progress = 0.5;
    indicator.buffer = 0.75;
    indicators.push(indicator);
  }

  componentWillUnmount() {
    this.indicators.forEach(indicator => indicator.destroy());
  }

  renderLinearProgressVariant(title, variantClass, buffer) {
    const initFunction = buffer ? this.initBufferIndicator : this.initIndicator;
    return (
      <div className='demo-linear-progress-indicator'>
        <h3 className='mdc-typography--subtitle1'>{title}</h3>
        <div role='progressbar'
          className={`mdc-linear-progress ${variantClass}`}
          ref={initFunction}>
          <div className='mdc-linear-progress__buffering-dots'></div>
          <div className='mdc-linear-progress__buffer'></div>
          <div className='mdc-linear-progress__bar mdc-linear-progress__primary-bar'>
            <span className='mdc-linear-progress__bar-inner'></span>
          </div>
          <div className='mdc-linear-progress__bar mdc-linear-progress__secondary-bar'>
            <span className='mdc-linear-progress__bar-inner'></span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderLinearProgressVariant('Buffered', '', true)}
        {this.renderLinearProgressVariant('Indeterminate', 'mdc-linear-progress--indeterminate')}
        {this.renderLinearProgressVariant('Reversed', 'mdc-linear-progress--reversed')}
        {this.renderLinearProgressVariant('Reversed Buffered', 'mdc-linear-progress--reversed', true)}
      </div>
    );
  }
}


  export default Golf;
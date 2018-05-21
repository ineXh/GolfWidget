import React, {Component} from 'react';
//import {MDCLinearProgress} from '@material/linear-progress/dist/mdc.linearProgress';
import {MDCLinearProgress} from '@material/linear-progress';
import {MDCIconToggle} from '@material/icon-toggle';
//import './css/styles/LinearProgressIndicatorCatalog.scss';
//import './../../../linear-progress.scss';
//import './css/styles/LinearProgressIndicatorCatalog.css';
//import css from './css/styles/LinearProgressIndicatorCatalog.css';
//var indicator = null;
window.indicator = null;
var icon = null;
class Golf extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log(this.props)
  }
  initLinearProgressBufferIndicator(indicatorEl){
    //console.log('initBufferIndicator')
    if (!indicatorEl) return;
    indicator = new MDCLinearProgress(indicatorEl);
    indicator.progress = 0.5;
    indicator.buffer = 1.0;
    //indicators.push(indicator);
  }
  initIcon(iconEl){
    if(!iconEl) return;

  }
  render() {
    var icon = 'golf_course';
    //var icon = '';
    return (
      <div id="golf">
        <div role="progressbar" className="mdc-linear-progress linear-progress--custom"
          ref={this.initLinearProgressBufferIndicator}>
          <div className="mdc-linear-progress__buffering-dots"></div>
          <div className="mdc-linear-progress__buffer"></div>
          <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
            <span className="mdc-linear-progress__bar-inner"></span>
          </div>
          <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
            <span className="mdc-linear-progress__bar-inner"></span>
          </div>
        </div>
        <div id="light-on-bg" className="demo-color-combo">
            <i className="mdc-icon-toggle material-icons mdc-theme--on-primary iconX"
               role="button"
               aria-label="Add to favorites"
               aria-pressed="false"
               tabIndex="0"
               data-toggle-on='{"content": "golf_course_on", "label": "Remove From Favorites"}'
               data-toggle-off='{"content": "golf_course_off", "label": "Add to Favorites"}'>
              {icon}
            </i>
        </div>

        <div className="dotX"><div className="dotY dot-object"></div></div>
      </div>
    );
  }
} // end Golf

/*
 <i className="mdc-icon-toggle material-icons" role="button" aria-pressed="false"
           aria-label="Add to favorites" tabIndex="0"
           data-toggle-on='{"label": "Remove from favorites", "content": "golf_course"}'
           data-toggle-off='{"label": "Add to favorites", "content": "golf_course"}'
           ref={iconToggleEl => iconToggleEl && MDCIconToggle.attachTo(iconToggleEl)}>
        </i>
        */

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
    indicator.buffer = 1.0;
    indicators.push(indicator);
  }
  componentDidMount() {
    console.log('did mount')
    //this.indicators.forEach(indicator => indicator.destroy());
  }
  componentWillUnmount() {
    indicators.forEach(indicator => indicator.destroy());
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
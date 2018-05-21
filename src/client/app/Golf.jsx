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
window.icon = null;
window.showBall = null;
window.updateBallX = null;
var ballTimeOut = null;
window.findKeyframesRule = function(rule){
    // gather all stylesheets into an array
    var ss = document.styleSheets;
    // loop through the stylesheets
    for (var i = 0; i < ss.length; ++i) {
        // loop through all the rules
        try{
          ss[i].cssRules
        }
        catch(error){
          //console.error(error)
          continue;
        }
          for (var j = 0; j < ss[i].cssRules.length; j++) {
              if (ss[i].cssRules[j].name == rule)
                //debugger;
                  return [i, j]; //ss[i].cssRules[j];
          }
    }
    // rule not found
    return null;
}

class Golf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numStages: 0,
      width: 400,
      stages: [],
      showBall: true
    }
    showBall = this.showBall.bind(this);
    updateBallX = this.updateBallX.bind(this);
    //this.togglePosition = this.togglePosition.bind(this);
  }
  componentDidMount(){
    //console.log(this.props)
    this.state.numStages = this.props.numStages;
    this.state.width = this.props.width;
    this.updateStage(this.props.numStages)
    this.updateBallX(this.state.gap);
    //this.showBall(true)
  }
  updateStage(numStage){
    var stages = [];
    for(var i = 0; i < this.state.numStages; i++){
      stages.push(i)
    }
    this.state.gap = (this.state.numStages > 0) ? (this.state.width/(this.state.numStages-1)): 0;
    this.setState({stages: stages})
  }
  showBall(bool){
    this.setState({showBall: bool})
    if(!bool) clearTimeout(ballTimeOut)
    if(bool) ballTimeOut = setTimeout(function(){ showBall(false) }, 1000);
  }
  updateBallX(x){
    showBall(true);
    var indices = findKeyframesRule('xAxis')
    var i = indices[0]
    var j = indices[1]
    var ss = document.styleSheets;
    ss[i].deleteRule(j);
    var rule = "@keyframes xAxis { 100% { animation-timing-function: linear; transform: translateX(" + x + "px); }}"
    ss[i].insertRule(rule);
    /*while(keyframesRule.cssRules.length > 0){
      ss[.deleteRule(keyframesRule.cssRules[0].keyText)
    }
    console.log(rule)
    keyframesRule.appendRule(rule)*/
  }
  initLinearProgressBufferIndicator(indicatorEl){
    //console.log('initBufferIndicator')
    if (!indicatorEl) return;
    //console.log(indicatorEl)
    indicator = new MDCLinearProgress(indicatorEl);
    indicator.progress = 0.5;
    indicator.buffer = 1.0;
    //indicators.push(indicator);
  }
  togglePosition(position){
    //console.log('togglePosition')
    //console.log(position)
    indicator.progress = position / (this.state.numStages-1);
  }
  render() {
    var golfStyle = {
      width: this.state.width + 'px'
    };
    return (
      <div id="golf" style={golfStyle}>
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

        {this.state.showBall ? this.renderBall() : null}
        {this.renderPositions()}
      </div>
    );
  } // end render
  renderBall(){
    //console.log('renderBall')
    return(
      <div className="dotX"><div className="dotY dot-object"></div></div>
      )
  }
  renderPositions(){
    var gap = this.state.gap;
    //console.log('width ' + this.state.width)
    //console.log('gap ' + gap)
    var numStages = this.state.numStages;
    var togglePosition = this.togglePosition.bind(this);
    var positionNodes = this.state.stages.map(function(position, index){
      var x = position*gap;
      return(
          <PositionItem
            x = {x}
            numStages = {numStages}
            position = {position}
            togglePosition = {togglePosition}
            key = {index}/>
        );
    });
    return(
      <div id="Positions">
        {positionNodes}
      </div>
      );
  } // end renderPositions
} // end Golf

class PositionItem extends Component {
  constructor(props) {
    super(props);
    //this.onClick = this.onClick.bind(this);
  }
  initIcon(iconEl){
    if(!iconEl) return;
    //console.log(iconEl)
    icon = MDCIconToggle.attachTo(iconEl);
  }
  onClick(event){
    //console.log(this.props.position)
    this.props.togglePosition(this.props.position)
    //indicator.progress = this.props.position / (this.props.numStages-1);
  }
  render() {
    //console.log(this.props)
    //window.innerWidth/2
    var x = this.props.x + 'px'
    var divStyle = {
      left: x
    };
    return (
      <div>
        <div id="light-on-bg" className="demo-color-combo" style={divStyle}>
            <i className="mdc-icon-toggle material-icons mdc-theme--on-primary iconX"
               role="button"
               aria-label="Add to favorites"
               aria-pressed="false"
               tabIndex="0"
               data-toggle-on='{"content": "golf_course", "label": "Remove From Favorites"}'
               data-toggle-off='{"content": "golf_course", "label": "Add to Favorites"}'
               onClick = {this.onClick.bind(this)}
               ref={this.initIcon}>
            </i>
        </div>
      </div>
    );
  }
} // end PositionItem

//onClick={this.props.togglePosition.call(this.props.position)}






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
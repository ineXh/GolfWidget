import React, {Component} from 'react';
//import {MDCLinearProgress} from '@material/linear-progress/dist/mdc.linearProgress';
import {MDCLinearProgress} from '@material/linear-progress';
import {MDCIconToggle} from '@material/icon-toggle';
//import './css/styles/LinearProgressIndicatorCatalog.scss';
//import './../../../linear-progress.scss';
//import './css/styles/LinearProgressIndicatorCatalog.css';
//import css from './css/styles/LinearProgressIndicatorCatalog.css';

//window.indicator = null;
//window.icon = null;
//window.showBall = null;
//window.updateBallX = null;
let ballTimeOut = null;
let indicator = null;

function Widget(){
}
Widget.prototype = {
  gotoStage: null,
  prevStage: null,
  nextStage: null,
  unlockStage: null,
}
window.golfWidget = new Widget();

var findKeyframesRule = function(rule){
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
      totalStages: 0,
      currentStage: 0,
      unlockedStages: 0,
      stages: [],
      cb: null,
      width: 400,
      gap: 0,
      ballTime: 0,
      showBall: false,
      ballx0: 0
    }
    //showBall = this.showBall.bind(this);
    //updateBallX = this.updateBallX.bind(this);
    //this.togglePosition = this.togglePosition.bind(this);
    golfWidget.gotoStage = this.gotoStage.bind(this);
    golfWidget.prevStage = this.prevStage.bind(this);
    golfWidget.nextStage = this.nextStage.bind(this);
    golfWidget.unlockStage = this.unlockStage.bind(this);

  }
  componentDidMount(){
    //console.log(this.props)
    this.state.totalStages    = this.props.input.totalStages;
    this.state.currentStage   = this.props.input.currentStage;
    this.state.unlockedStages = this.props.input.unlockedStages;
    this.state.width = this.props.input.width;
    this.state.cb = this.props.input.cb;
    this.updateStage(this.props.totalStages)
    this.updateBallX(0, this.state.gap);
    //this.showBall(true)
  }
  gotoStage(position){
    this.processPosition(position)
  }
  prevStage(){
    //console.log('prevStage')
    if(this.state.currentStage > 0){
      this.processPosition(this.state.currentStage-1)
    }else{
      this.processPosition(this.state.currentStage)
    }
  }
  nextStage(){
    //console.log('nextStage')
    if(this.state.currentStage < this.state.unlockedStages-1){
        this.processPosition(this.state.currentStage+1)
    }else{
      this.processPosition(this.state.currentStage)
    }
  }
  unlockStage(){
    if(this.state.unlockedStages < this.state.totalStages){
      this.setState({unlockedStages: this.state.unlockedStages + 1})
    }
  }
  updateStage(numStage){
    var stages = [];
    for(var i = 0; i < this.state.totalStages; i++){
      stages.push(i)
    }
    this.state.gap = (this.state.totalStages > 0) ? (this.state.width/(this.state.totalStages-1)): 0;
    this.setState({stages: stages})
  }
  showBall(bool){
    this.setState({showBall: bool})
    var showBall = this.showBall.bind(this)
    if(!bool) clearTimeout(ballTimeOut)
    if(bool) ballTimeOut = setTimeout(function(){ showBall(false) }, 500);
  }
  updateBallX(x0, dist){
    //showBall(true);
    this.state.ballx0 = x0;
    var indices = findKeyframesRule('xAxis')
    var i = indices[0]
    var j = indices[1]
    var ss = document.styleSheets;
    ss[i].deleteRule(j);
    var rule = "@keyframes xAxis { 100% { animation-timing-function: linear; transform: translateX(" + dist + "px); }}"
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
    indicator.progress = this.state.currentStage / (this.state.totalStages-1);
    indicator.buffer = 1.0;
    //indicators.push(indicator);
  }
  processPosition(position){
    //console.log('togglePosition')
    //console.log('position: ' + position)
    //console.log('this.state.unlockedStages: ' + this.state.unlockedStages)
    if(position < this.state.unlockedStages){
      var date = new Date();
      if(date.getTime() - this.state.ballTime > 500){
        var x0 = this.state.currentStage*this.state.gap;
        var x1 = position*this.state.gap;
        var dist = x1-x0
        this.updateBallX(x0, dist);
        this.showBall(true);
        this.state.ballTime = date.getTime()
        this.setState({currentStage: position})
        indicator.progress = position / (this.state.totalStages-1);
        return true;
      }
    }
    return false;
  }
  togglePosition(position){
      var bool = this.processPosition(position)
      if(bool) if(this.state.cb) this.state.cb(position);
  }
  render() {
    var golfStyle = {
      width: this.state.width + 'px'
    };
    return (
      <div id="golf" style={golfStyle}>
        <div role="progressbar" className="mdc-linear-progress linear-progress--custom"
          ref={this.initLinearProgressBufferIndicator.bind(this)}>
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
    var ballStyle = {
      left: (this.state.ballx0 + 8) + 'px',
    }
    return(
      <div className="dotX"><div className="dotY dot-object" style={ballStyle}></div></div>
      )
  }
  renderPositions(){
    var gap = this.state.gap;
    //console.log('width ' + this.state.width)
    //console.log('gap ' + gap)
    var totalStages = this.state.totalStages;
    var currentStage = this.state.currentStage;
    var unlockedStages = this.state.unlockedStages;
    var togglePosition = this.togglePosition.bind(this);
    var positionNodes = this.state.stages.map(function(position, index){
      var x = position*gap;
      //console.log("currentStage " + currentStage)
      //console.log("position " + position)
      var current = (currentStage == position) ? true : false;
      var on_off = (currentStage > position) ? true : false;
      var locked = (position > unlockedStages-1) ? true : false;
      return(
          <PositionItem
            x = {x}
            current = {current}
            on_off = {on_off}
            locked = {locked}
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
    var icon = MDCIconToggle.attachTo(iconEl);
  }
  onClick(event){
    //console.log(this.props.position)
    this.props.togglePosition(this.props.position)
  }
  render() {
    //console.log(this.props)
    //window.innerWidth/2
    var x = this.props.x + 'px'
    var backgroundColor = //(this.props.locked) ? 'black'   :
                          (this.props.current) ? 'rgb(75, 255, 0)' :
                          (this.props.on_off)  ? '#ccc'    : 'white';
    //console.log('this.props.on_off ' + this.props.on_off)
    var icon = (this.props.locked) ? 'lock' : 'golf_course';
    //var icon = 'golf_course'
    var divStyle = {
      left: x,
      backgroundColor: backgroundColor
    };
    return (
      <div>
        <div id="light-on-bg" className="demo-color-combo" style={divStyle}>
            <i className="mdc-icon-toggle material-icons mdc-theme--on-primary iconX"
               role="button"
               aria-label="label XY"
               aria-pressed="false"
               tabIndex="0"
               data-toggle-on = {'{"label": "label X"}'}
               data-toggle-off= {'{"label": "label Y"}'} // lock
               onClick = {this.onClick.bind(this)}
               ref={this.initIcon}>
               {icon}
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
console.log('hi from app.js')

import {MDCLinearProgress} from '@material/linear-progress';
window.ready = function() {
	var determinates = document.querySelectorAll('.mdc-linear-progress');
	for (var i = 0, determinate; determinate = determinates[i]; i++) {
	  //var linearProgress = mdc.linearProgress.MDCLinearProgress.attachTo(determinate);
	  var linearProgress = MDCLinearProgress.attachTo(determinate);
	  linearProgress.progress = 0.5;
	  if (determinate.dataset.buffer) {
	    linearProgress.buffer = 0.75;
	  }
	}
}
ready()
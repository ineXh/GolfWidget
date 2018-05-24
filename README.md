# Golf Widget

A widget to proceed to different stages

# Usage

Create a division for the widget
<div id="GolfWidget"></div>

Render the app with: the current stage, total stages, unlocked stages, width and a callback for clicking the stages

var currentStage = 0;
var totalStages = 5;
var unlockedStages = 3;

renderApp('GolfWidget',
        {totalStages:  totalStages,
         currentStage: currentStage,
         unlockedStages: unlockedStages,
         width: window.innerWidth*0.4,
         cb: clickedStage
        });

To access the app in JS
golfWidget.gotoStage(currentStage)
golfWidget.unlockStage()

To clear the app
renderEmpty('GolfWidget')

# Demo
https://inexh.github.io/GolfWidget/index.html

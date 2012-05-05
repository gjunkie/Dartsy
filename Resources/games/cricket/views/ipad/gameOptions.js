
var gameOptionsTrigger = Titanium.UI.createLabel({
	color:'#fff',
	backgroundImage:'images/ipad/CricketOptions.png',
	text:'',
	width:71,
	height: 60,
	bottom: 0,
});


var restartGameAlert = Titanium.UI.createAlertDialog({
    title: 'Restart Game',
    message: 'Are you sure you want to restart this game?',
    buttonNames: ['Yes', 'Cancel'],
    cancel: 1
});

var restartSetAlert = Titanium.UI.createAlertDialog({
    title: 'Restart Set',
    message: 'Are you sure you want to restart this set?',
    buttonNames: ['Yes', 'Cancel'],
    cancel: 1,
});

var quitSetAlert = Titanium.UI.createAlertDialog({
    title: 'Quit',
    message: 'Are you sure you want to quit?',
    buttonNames: ['Yes', 'Cancel'],
    cancel: 1,
});

var clearBoardAlert = Titanium.UI.createAlertDialog({
    title: 'Clear Board',
    message: 'Are you sure you want to start a new game?',
    buttonNames: ['Yes', 'Cancel'],
    cancel: 1,
});

var gameOptionsDialog = Titanium.UI.createOptionDialog({
    title: '',
    options: ['Restart Game','Restart Set','Quit'],
    destructive: 2,
});

var gameOptionsDialogSingle = Titanium.UI.createOptionDialog({
    title: '',
    options: ['Clear Board','Quit'],
    destructive: 1,
});

numbersView.add(gameOptionsTrigger);

Titanium.include('../../models/gameOptions.js');
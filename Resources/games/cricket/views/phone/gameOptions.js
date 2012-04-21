
var gameOptionsTrigger = Titanium.UI.createLabel({
	backgroundImage:'images/'+device+'/CricketOptions.png',
	text:'',
	width:44,
	height: 35,
	bottom: 0,
});

var GameOptions = Titanium.UI.createView({
	id: 'Game Options',
	height: 47,
	bottom: 0,
	backgroundImage: 'images/'+device+'/gameOptions.png',
});

var GameOptionsMask = Titanium.UI.createView({
	id: 'Game Options Mask',
	bottom: 94,
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
    options: ['Restart Game','Restart Set','Quit', 'Cancel'],
    cancel:3,
    destructive: 2,
});

var gameOptionsDialogSingle = Titanium.UI.createOptionDialog({
    title: '',
    options: ['Clear Board','Quit', 'Cancel'],
    cancel:2,
    destructive: 1,
});

numbersView.add(gameOptionsTrigger);
win2.add(GameOptions);

Titanium.include('../../models/gameOptions.js');

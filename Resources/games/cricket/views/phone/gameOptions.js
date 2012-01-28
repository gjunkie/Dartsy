
var gameOptionsTrigger = Titanium.UI.createLabel({
	color:'#fff',
	backgroundImage:'images/'+device+'/CricketOptions.png',
	text:'',
	width:35,
	height: 30,
	bottom: 0,
});

var restartGame = Titanium.UI.createButton({
	color:'#fff',
	borderRadius: 10,
	title:'Restart Game',
	backgroundImage: 'none',
	font: {fontSize:24,fontFamily:'Ballpark'},
	textAlign:'center',
	width:150,
	height: 40,
	left: '20%',
});

var restartSet = Titanium.UI.createButton({
	color:'#fff',
	borderRadius: 10,
	backgroundImage: 'none',
	title:'Restart Set',
	font: {fontSize:24,fontFamily:'Ballpark'},
	textAlign:'center',
	width:150,
	height: 40,
});


var quitSet = Titanium.UI.createButton({
	color:'#fff',
	borderRadius: 10,
	title:'Quit',
	backgroundImage: 'none',
	font: {fontSize:24,fontFamily:'Ballpark'},
	textAlign:'center',
	width:150,
	height: 40,
	right: '20%',
});

var clearBoard = Titanium.UI.createButton({
	color:'#fff',
	borderRadius: 10,
	title:'Clear Board',
	backgroundImage: 'none',
	font: {fontSize:24,fontFamily:'Ballpark'},
	textAlign:'center',
	width:150,
	height: 40,
	left: '30%',
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

clearBoard.addEventListener('click', function(){
	clearBoardAlert.show();
	clearBoardAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			GameNumber = 0;
			start_new_game();
		}
		GameView.animate(gameSlideDown);
		win2.remove(GameOptionsMask);
	});
});

numbersView.add(gameOptionsTrigger);
win2.add(GameOptions);

Titanium.include('../../models/gameOptions.js');


var gameOptionsTrigger = Titanium.UI.createLabel({
	color:'#fff',
	backgroundImage:'images/CricketOptions.png',
	text:'',
	width:71,
	height: 60,
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

clearBoard.addEventListener('click', function(){
	start_new_game();
});

var GameOptions = Titanium.UI.createView({
	id: 'Game Options',
	height: 94,
	width:768,
	bottom: 0,
	backgroundImage: 'images/gameOptions.png',
});

var GameOptionsMask = Titanium.UI.createView({
	id: 'Game Options Mask',
	bottom: 94,
});

var removeOptions = function(){
	if(totalPlayers>1){
		GameOptions.remove(restartGame);
		GameOptions.remove(restartSet);
		GameOptions.remove(quitSet);
	} else {
		GameOptions.remove(clearBoard);
		GameOptions.remove(quitSet);
	}
}

GameOptionsMask.addEventListener('click', function(){
	GameView.animate(gameSlideDown);
	win2.remove(GameOptionsMask);
});

var GameOptionsVisible = false;
gameOptionsTrigger.addEventListener('click', function(){
	if(totalPlayers>1){
		quitSet.right = '20%';
		restartGame.left = '20%';
		GameOptions.add(restartGame);
		GameOptions.add(restartSet);
		GameOptions.add(quitSet);
	} else {
		quitSet.right = '30%';
		GameOptions.add(clearBoard);
		GameOptions.add(quitSet);
	}
	if (GameOptionsVisible == false) {
		GameView.animate(gameSlideUp);
		win2.add(GameOptionsMask);
	} else if (GameOptionsVisible == true) {
		GameView.animate(gameSlideDown);
	}
});

var restartGameAlert = Titanium.UI.createAlertDialog({
    title: 'Restart Game',
    message: 'Are you sure you want to restart this game?',
    buttonNames: ['Yes', 'Cancel'],
    cancel: 1
});

restartGame.addEventListener('click', function(){
	restartGameAlert.show();
	restartGameAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			start_new_game();
		}
		GameView.animate(gameSlideDown);
		win2.remove(GameOptionsMask);
	});
});

var quitSetAlert = Titanium.UI.createAlertDialog({
    title: 'Quit',
    message: 'Are you sure you want to quit?',
    buttonNames: ['Yes', 'Cancel'],
    cancel: 1,
});

quitSet.addEventListener('click', function(){
	quitSetAlert.show();
	quitSetAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			end_set();
			win1.open();
			win2.close();
		}
		GameView.animate(gameSlideDown);
		win2.remove(GameOptionsMask);
	});
});

var restartSetAlert = Titanium.UI.createAlertDialog({
    title: 'Restart Set',
    message: 'Are you sure you want to restart this set?',
    buttonNames: ['Yes', 'Cancel'],
    cancel: 1,
});

restartSet.addEventListener('click', function(){
	restartSetAlert.show();
	restartSetAlert.addEventListener('click',function(e){
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

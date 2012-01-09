
var gameOptionsTrigger = Titanium.UI.createLabel({
	color:'#fff',
	backgroundImage:'images/CricketOptions.png',
	text:'',
	width:71,
	height: 60,
	bottom: 0,
});

var restartGame = Titanium.UI.createButton({
	color:'#000',
	borderRadius: 10,
	title:'Restart Game',
	font: {fontSize:18,fontFamily:'Futura-CondensedMedium'},
	textAlign:'center',
	width:100,
	height: 40,
	left: '27%',
});

var restartSet = Titanium.UI.createButton({
	color:'#000',
	borderRadius: 10,
	title:'Restart Set',
	font: {fontSize:18,fontFamily:'Futura-CondensedMedium'},
	textAlign:'center',
	width:100,
	height: 40,
});


var quitSet = Titanium.UI.createButton({
	color:'#000',
	borderRadius: 10,
	title:'Quit',
	font: {fontSize:18,fontFamily:'Futura-CondensedMedium'},
	textAlign:'center',
	width:100,
	height: 40,
	right: '27%',
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

GameOptionsMask.addEventListener('click', function(){
	GameView.animate(gameSlideDown);
	win2.remove(GameOptionsMask);
});

var GameOptionsVisible = false;
gameOptionsTrigger.addEventListener('click', function(){
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
GameOptions.add(restartGame);
GameOptions.add(restartSet);
GameOptions.add(quitSet);

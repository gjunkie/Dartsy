
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
	title:'New Game',
	font: {fontSize:15,fontFamily:'Futura-Medium'},
	textAlign:'center',
	width:120,
	height: 40,
	left: '30%',
});

var endSet = Titanium.UI.createButton({
	color:'#000',
	borderRadius: 10,
	title:'End Set',
	font: {fontSize:15,fontFamily:'Futura-Medium'},
	textAlign:'center',
	width:120,
	height: 40,
	right: '30%',
});

var GameOptions = Titanium.UI.createView({
	id: 'Game Options',
	height: 100,
	bottom: 0,
	backgroundColor: '#232323',
	//backgroundOpacity: .5,
});

var GameOptionsVisible = false;
gameOptionsTrigger.addEventListener('click', function(){
	if (GameOptionsVisible == false) {
		GameView.animate(gameSlideUp);
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
	});
});
var endSetAlert = Titanium.UI.createAlertDialog({
    title: 'End Set',
    message: 'Are you sure you want to end this set?',
    buttonNames: ['Yes', 'Cancel'],
    cancel: 1,
});
endSet.addEventListener('click', function(){
	endSetAlert.show();
	endSetAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			end_set();
			win1.open();
			win2.close();
		}
	});
});

numbersView.add(gameOptionsTrigger);
win2.add(GameOptions);
GameOptions.add(restartGame);
GameOptions.add(endSet);

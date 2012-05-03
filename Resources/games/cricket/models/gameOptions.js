
var GameOptionsVisible = false;

GameOptionsMask.addEventListener('click', function(){
	GameView.animate(gameSlideDown);
	CricketWindow.remove(GameOptionsMask);
});

gameOptionsTrigger.addEventListener('click', function(){
	if(totalPlayers>1){
		gameOptionsDialog.show({view:gameOptionsTrigger});
	} else {
		gameOptionsDialogSingle.show({view:gameOptionsTrigger});
	}
});


// 
gameOptionsDialog.addEventListener('click',function(e){
	if(e.index == 0) {
		restartGamePressed();
	} else if(e.index == 1) {
		restartSetPressed();
	}else if(e.index == 2) {
		quitSetPressed();
	}
});

// restartGame.addEventListener('click', function(){
	// restartGamePressed();
// });
// 
// quitSet.addEventListener('click', function(){
	// quitSetPressed();
// });
// 
// restartSet.addEventListener('click', function(){
	// restartSetPressed();
// });
// 
// clearBoard.addEventListener('click', function(){
	// start_new_game();
// });

var restartGamePressed = function(){
	restartGameAlert.show();
	restartGameAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			start_new_game();
		}
		CricketWindow.remove(GameOptionsMask);
	});
}

var quitSetPressed = function(){
	quitSetAlert.show();
	quitSetAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			end_set();
			PlayerSelectWindow.open();
			CricketWindow.close();
		}
		CricketWindow.remove(GameOptionsMask);
	});
}

var restartSetPressed = function(){
	restartSetAlert.show();
	restartSetAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			GameNumber = 0;
			for(var i=0;i<totalPlayers;i++){
				players[i].wins = 0;
			}
			start_new_game();
		}
		CricketWindow.remove(GameOptionsMask);
	});
}

var clearBoardPressed = function(){
	clearBaordAlert.show();
	clearBaordAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			GameNumber = 0;
			start_new_game();
		}
		CricketWindow.remove(GameOptionsMask);
	});
}

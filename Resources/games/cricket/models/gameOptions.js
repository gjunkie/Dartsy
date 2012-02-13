
var GameOptionsVisible = false;

clearBoard.addEventListener('click', function(){
	start_new_game();
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

gameOptionsTrigger.addEventListener('click', function(){
	gameOptionsDialog.show({view:gameOptionsTrigger});
});

gameOptionsDialog.addEventListener('click',function(e){
	if(e.index == 0) {
		restartGamePressed();
	} else if(e.index == 1) {
		restartSetPressed();
	}else if(e.index == 2) {
		quitSetPressed();
	}
});

restartGame.addEventListener('click', function(){
	restartGamePressed();
});

quitSet.addEventListener('click', function(){
	quitSetPressed();
});

restartSet.addEventListener('click', function(){
	restartSetPressed();
});

var restartGamePressed = function(){
	restartGameAlert.show();
	restartGameAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			start_new_game();
		}
		GameView.animate(gameSlideDown);
		win2.remove(GameOptionsMask);
	});
}

var quitSetPressed = function(){
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
}

var restartSetPressed = function(){
	restartSetAlert.show();
	restartSetAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			GameNumber = 0;
			start_new_game();
		}
		GameView.animate(gameSlideDown);
		win2.remove(GameOptionsMask);
	});
}


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
	if(iphone){
		gameOptionsDialog.show();
	} else {
		if(totalPlayers>1){
			if(ipad){
				quitSet.right = '20%';
				restartGame.left = '20%';
			} else if(iphone){
				quitSet.center = {x:240,y:24};
				restartGame.center = {x:80,y:24};
			}
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
	}
});


if(iphone){
	gameOptionsDialog.addEventListener('click',function(e){
		if(e.index == 0) {
			restartGamePressed();
		} else if(e.index == 1) {
			restartSetPressed();
		}else if(e.index == 2) {
			quitSetPressed();
		}
	});
}

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

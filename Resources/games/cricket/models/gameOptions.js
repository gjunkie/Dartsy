
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
	if(totalPlayers>1){
		if(ipad){
			quitSet.right = '20%';
			restartGame.left = '20%';
		} else if(iphone){
			// quitSet.center = {x-axis:'25%',y-axis:'50%'};
			// restartGame.center = {x-axis:'75%',y-axis:'50%'};
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

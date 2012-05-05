
gameOptionsTrigger.addEventListener('click', function(){
	if(totalPlayers>1){
		gameOptionsDialog.show({view:gameOptionsTrigger});
	} else {
		gameOptionsDialogSingle.show({view:gameOptionsTrigger});
	}
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

gameOptionsDialogSingle.addEventListener('click',function(e){
	if(e.index == 0) {
		clearBoardPressed();
	}else if(e.index == 1) {
		quitSetPressed();
	}
});

var restartGamePressed = function(){
	restartGameAlert.show();
	restartGameAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			start_new_game();
		}
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
	});
}

var clearBoardPressed = function(){
	clearBoardAlert.show();
	clearBoardAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			GameNumber = 0;
			start_new_game();
		}
	});
}

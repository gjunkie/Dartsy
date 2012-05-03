
var buttonHit = null;
var theMultiplier = 0;

// Miss button tapped
miss.addEventListener('click', function(){
	this.animate(buttonPressed);
	numbers_missed(players[currentPlayerIndex], currentPlayerIndex);
	if (throwsThisRound == 3){
		throwsThisRound = 0;
		checkClosedNums(players[currentPlayerIndex].buttons, players[currentPlayerIndex]);
		if(someoneFinished) {
			winner();
		}
		changeTurn();
	};
	killModal();
});

// Undo button tapped
undoPoints.addEventListener('click', function(){
	if (totalThrows > 0) {
		killModal();
		undo();
		clearTimeout(modalTimer);
	}
});

if(iphone){
	multDialog.addEventListener('click',function(e, button){
		if(e.index == 0) {
			multiplierDialog(buttonHit, 2, players[currentPlayerIndex]);
		} else if(e.index == 1) {
			multiplierDialog(buttonHit, 3, players[currentPlayerIndex]);
		}
		determine_highest_score();
		if(throwsThisRound==3){
			changeTurn();
		}
	});
	multDialogBull.addEventListener('click',function(e, button){
		if(e.index == 0) {
			multiplierDialog(buttonHit, 2, players[currentPlayerIndex]);
		}
		determine_highest_score();
		if(throwsThisRound==3){
			changeTurn();
		}
	});
}

var multiplierDialog = function(button, multiplier, player){
	button_calc(button, multiplier, player);
}

// A number is hit
var buttonTap = function(playerButton){
	playerButton.addEventListener('click',function(){
		if (throwsThisRound != 3){
			button_calc(this, 1, this.owner);
			if(!someoneFinished) {
				checkClosedNums(playerButton.parent.children, playerButton.owner);
			}
			if(ipad){
				addDartsModal(this, this.parent, this.incModal);
			}
			determine_highest_score();
			if(iphone && throwsThisRound==3){
				changeTurn();
			}
		}
	});
	if(iphone){
		playerButton.addEventListener('longpress',function(e){
			buttonHit = playerButton;
			if (throwsThisRound != 3){
				if(this.worth<25){
					multDialog.show();
				} else {
					multDialogBull.show();
				}
			}
		});
	}
}

// A player name is tapped to skip to player
var namesTap = function(index){
	// Quickly change turns by tapping another player's name
	playerNamesLabels[index].addEventListener('click',function(){
		if(index!=currentPlayerIndex){
			// Remaining darts are misses
			throwsLeft = 3 - throwsThisRound;
			for(var i=0;i<throwsLeft;i++){
				numbers_missed(players[currentPlayerIndex], index);
			}
			throwsThisRound = 3;
			// If skipping to a player ahead of current player
			if(index>currentPlayerIndex){
				// add one to current index to avoid current player
				// less than index to avoid player we skipped to
				for(var i=currentPlayerIndex+1;i<index;i++){
					players[i].startedTurn = true;
					loopMisses(i);
				}
			// If skipping to a player before current player
			} else if(index<currentPlayerIndex){
				for(var i=currentPlayerIndex+1;i<totalPlayers;i++){
					players[i].startedTurn = true;
					loopMisses(i);
				}
				checkClosedNums(players[currentPlayerIndex].buttons, players[currentPlayerIndex]);
				if(someoneFinished) {
					winner();
				} else {
					// Check if game is over before running this
					for(var i=0;i<index;i++){
						players[i].startedTurn = true;
						loopMisses(i);
					}
					for(var i=index;i<totalPlayers;i++){
						players[i].startedTurn = false;
					}
				}
			}
			changeTurn(index);
		}
	});
}
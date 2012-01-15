
miss.addEventListener('click', function(){
	this.animate(buttonPressed);
	numbers_missed(players[currentPlayerIndex], currentPlayerIndex);
	if (throwsThisRound == 3){
		throwsThisRound = 0;
		changeTurn();
	};
	killModal();
});

var buttonTap = function(playerButton){
	playerButton.addEventListener('click',function(){
		if (throwsThisRound != 3){
			button_calc(this, 1, this.owner);
			addDartsModal(this, this.parent, this.incModal);
			determine_highest_score();
		}
	});
}

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
				// Check if game is over before running this
				for(var i=0;i<index;i++){
					players[i].startedTurn = true;
					loopMisses(i);
				}
				checkClosedNums(players[currentPlayerIndex].buttons, players[currentPlayerIndex]);
				if(someoneFinished) {
					lastTurn = true;
					winner();
				}
				for(var i=index;i<totalPlayers;i++){
					players[i].startedTurn = false;
				}
			}
			changeTurn(index);
		}
	});
}
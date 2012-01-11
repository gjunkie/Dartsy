
var playersClosed = 0;
var playersFinished = 0;
var sameScore = 0;

// Disable number that is no longer scorable for any player
// Is passed index of clicked number to compare with other numbers of same index
var closeNumbers = function(indx){
	var hits_on_this_num = 0;
	for(i=0;i<views.length;i++){
		if(views[i].children[indx].hits>=3){
			hits_on_this_num++;
		}
	}
	if(hits_on_this_num==views.length){
		for(i=0;i<views.length;i++){
			views[i].children[indx].touchEnabled=false;
			views[i].children[indx].status=false;
			views[i].children[indx].animate(seeThru);
			views[i].children[indx].color = '#ffffff';
			views[i].children[indx].backgroundImage = 'images/button.png';
		}
		availNums[indx].animate(seeThru);
		return true;
	};
}

var openNumbers = function(button){
	// Reverse the number closure
	button.touchEnabled=true;
	button.status=true;
	button.animate(notSeeThru);
	highlight(button);
	availNums[button.index].animate(notSeeThru);
}

// determines which player holds highest score, does not account for 2 players having the same high score
// This never runs if the first to finish does not have highest score
var highestIndex = null;
var highestScoreTmp = 0;
var has_highest_score = function(){
	debug('highest score is running');
	for(i=0;i<totalPlayers;i++){
		debug('inside for loop');
        if (players[i].score > highestScoreTmp) {
            highestIndex = i;
            highestScoreTmp = players[i].score;
			debug('highest player index = ' + highestIndex);
			debug('highest player score = ' + highestScoreTmp);
        }
	}
			debug('highest player index = ' + highestIndex);
			debug('highest player score = ' + highestScoreTmp);
	if(highestIndex!=null){
		if(playerFinishedNums(highestIndex)){
			debug('highest score is true');
			debug('highest player index = ' + highestIndex);
			debug('highest player score = ' + highestScoreTmp);
	    	return true;
		}
	} else {
		debug('highest score is false');
		highestScoreTmp = 0;
	    return false;
	}
}

// This checks if all players have started their turns
var allPlayersFinished = function(){
	for(i=0; i<totalPlayers; i++){
		if(players[i].startedTurn){
			playersFinished++;
		}
	}
	// try removing throwsThisRound == 3 to end game even if not all darts are thrown
	if(playersFinished == totalPlayers && throwsThisRound == 3){
		playersFinished=0;
		return true;
	}
	playersFinished = 0;
}

var displayWinner = function(winner){
	players[winner].wins += 1;
	GameNumber++;
	//Games to play is defined in options.js, imported after closer.js, this breaks
	if(players[winner].wins>GamesToPlay/2){
		winnerOfSets(players[winner].name);
	} else {
		winnerAlert(players[winner].name);	
	}
}

// Counts how many closed numbers the specified player has,
// returns true if player finished all numbers
var currentPlayerFinished = 0;
var playerFinishedNums = function(playerIndex){
	for(var i=0;i<7;i++){
		if(players[playerIndex].buttons[i].closed){
			currentPlayerFinished++;
		}
	}
	if(currentPlayerFinished==7) {
		players[playerIndex].allClosed = true;
		currentPlayerFinished = 0;
		return true;
	} else {
		currentPlayerFinished = 0;
		return false;
	}
}


var someoneFinished = false;
var closedNums = 0;
var closedConfirm = 0
var playersChecked = 0;
var firstPlayerToClose = null;
var checkClosedNums = function(buttons){
	// This is in case a player has closed all numbers
	// and then undoes moves to open numbers
	if(someoneFinished) {
		for(var i=0;i<totalPlayers;i++){
			for(var a=0;a<players[i].buttons.count;a++){
				if(players[i].buttons[a].hits>2){
					closedConfirm++;
				}
			}
			if(closedConfirm<7){
				closedConfirm = 0;
				players[currentPlayerIndex].allClosed = false;
				someoneFinished = false;
			} else {
				closedConfirm = 0;
				someoneFinished = true;
				playersChecked = 0;
				break;
			}
			playersChecked++;
			if(playersChecked==totalPlayers && !someoneFinished){
				firstPlayerToClose = null;
			}
		}
	}
	for(i=0;i<7;i++){
		if(buttons[i].hits>2){
			closedNums++;
		}
		if(closedNums==7) {
			firstPlayerToClose = currentPlayerIndex;
			someoneFinished = true;
		}
	}
	closedNums=0;
}

// Determines if 2 or more players are tied
var matchesHighestScore = function(playerToCheck, topScore){
	if (players[playerToCheck].score == topScore){
    	return true;
    } else {
    	return false;
	}
}

var winner = function(buttons){
	debug('winner is running');
	if (totalPlayers == 1) {
		// If only one person is playing
		singlePlayerFinished()
	} else if(has_highest_score() && allPlayersFinished()) {
		// Player who closed all numbers who also has highest score wins
		debug('winner determined: 1');
		lastTurn = true;
		displayWinner(highestIndex);
		highestIndex = null;
		highestScoreTmp = 0;
	} else if(tieGame()) {
		// Game is tied
		lastTurn = true;
	} else if(matchesHighestScore(firstPlayerToClose, highestScore) && allPlayersFinished()) {
		// this is running because it's "matching" the highest score, even if it is itself
		// If at least 2 players are tied in score, but one player has closed all numbers, and all players have finished their last turn
		debug('winner determined: 2');
		lastTurn = true;
		displayWinner(firstPlayerToClose);
	}
}

// Checks if all players have closed all numbers and score is the same
var tieGame = function(){
	for(i=0; i<totalPlayers; i++){
		if(players[i].allClosed){
			playersClosed++;
		}
		if(players[i].score == highestScore){
			sameScore++;
		}
	}
	if(playersClosed == totalPlayers && sameScore == totalPlayers){
		playersClosed = 0;
		sameScore = 0;
		return true;
	} else {
		playersClosed = 0;
		sameScore = 0;
		return false;
	}
}

var singlePlayerFinished = function(winner){
	var gameWinnerAlert = Titanium.UI.createAlertDialog({
	    title: 'Game Finished',
	    message: 'You closed all the numbers!',
	    buttonNames: ['New Game', 'Quit'],
	    cancel: 0
	});
	gameWinnerAlert.show();
	gameWinnerAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			start_new_game();
		} else if(e.index == 1) {
			end_set();
			win1.open();
			win2.close();
		}
	});
}

var winnerAlert = function(winner){
	var gameWinnerAlert = Titanium.UI.createAlertDialog({
	    title: 'Game Finished',
	    message: winner + ' wins!',
	    buttonNames: ['Next Game', 'Quit Set'],
	    cancel: 0
	});
	gameWinnerAlert.show();
	gameWinnerAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			start_new_game();
		} else if(e.index == 1) {
			end_set();
			win1.open();
			win2.close();
		}
	});
}

var resetCounts = function(){
	throwsThisRound = 0;
	numberTracker.length = 0;
}

var winnerOfSets = function(winner){
	var setsWinnerAlert = Titanium.UI.createAlertDialog({
	    title: 'Set Finished',
	    message: winner + ' wins the set!',
	    buttonNames: ['OK', 'New Set', 'Change Players'],
	    cancel: 0
	});
	setsWinnerAlert.show();
	setsWinnerAlert.addEventListener('click',function(e){
		if(e.index == 0) {
			// if user presses OK, all buttons are made untouchable.
			for(numOfButtons=0;numOfButtons<7;numOfButtons++){
				for(var numOfViews=0;numOfViews<totalPlayers;numOfViews++){
					views[numOfViews].touchEnabled = false;
					miss.touchEnabled = false;
					undoPoints.touchEnabled = false;
				}
			}
		} else if(e.index == 1) {
			GameNumber = 0;
			start_new_game();
			for(var i=0;i<totalPlayers;i++){
				players[i].wins = 0;
			}
		} else if(e.index == 2) {
			end_set();
			win1.open();
			win2.close();
		}
	});
}

// Start new game. This restarts current game.
// Do not set views to not touch enabled so names can be used to skip turns
var start_new_game = function(){
	for(var numOfButtons=0;numOfButtons<7;numOfButtons++){
		for(var numOfViews=0;numOfViews<totalPlayers;numOfViews++){
			views[numOfViews].remove(dartsModal);
			calculate_points(players[numOfViews].buttons[numOfButtons], 0, 0);
			players[numOfViews].buttons[numOfButtons].hits = 0;
			players[numOfViews].buttons[numOfButtons].animate(notSeeThru);
			players[numOfViews].buttons[numOfButtons].status = true;
			players[numOfViews].buttons[numOfButtons].touchEnabled = false;
			printScore(views[numOfViews].children[8], 0);
			highlight(players[numOfViews].buttons[numOfButtons]);
			players[numOfViews].turn = false;
		}
		availNums[numOfButtons].animate(notSeeThru);
	}
	slideBanner(turnBanners[currentPlayerIndex],'up');
	currentPlayerIndex = 0;
	throwsThisRound = 0;
	totalThrows = 0;
	numberTracker.length = 0;
	players[0].turn = true;
	players[0].startedTurn = true;
	miss.touchEnabled = true;
	undoPoints.touchEnabled = true;
	slideBanner(turnBanners[0],'down');
	currentPlayerStart();
	indicators.myView = views[0];
	views[0].add(indicators);
	someoneFinished = false;
	lastTurn = false;
	firstPlayerToClose = null;
}

var end_set = function(){
	GameView.animate(gameSlideDown);
	for(i=0;i<views.length;i++){
		GameView.remove(views[i]);
	}
	someoneFinished = false;
	firstPlayerToClose = null;
	views.length = 0;
	playerButtons.length = 0;
	numberTracker.length = 0;
	totalThrows = 0;
	throwsThisRound = 0;
	GameNumber = 0;
}

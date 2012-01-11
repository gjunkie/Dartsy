var currentPlayerIndex = 0;
var lastTurn = false;

var changeTurn = function(newPlayerIndex){
	if(!lastTurn){
		if(currentPlayerIndex != (totalPlayers-1)){
			currentPlayerDone();
			players[currentPlayerIndex].turns =+ 1;
			currentPlayerIndex++;
			currentPlayerStart(newPlayerIndex);
		} else {
			if(someoneFinished) {
				winner(players[currentPlayerIndex].buttons);
			}
			currentPlayerDone();
			Games.Cricket.rounds =+ 1;
			currentPlayerIndex = 0;
			for(i=0; i<totalPlayers; i++){
				players[i].startedTurn = false;
			}
			clearThrownDarts();
			currentPlayerStart(newPlayerIndex);
		}
		throwsThisRound = 0;
		newPlayerIndex = null;
		miss.touchEnabled = true;
		showIndicators();
		if(modalIsVisible){
			// Future optimization: check which modal is showing and remove it
			dartsModal.myView.remove(dartsModal);
			dartsModalBull.myView.remove(dartsModalBull);
			modalIsVisible = false;
		}
	}
}

var currentPlayerDone = function(){
	slideBanner(turnBanners[currentPlayerIndex],'up');
	players[currentPlayerIndex].turn = false;
	// Accounts for turn change by tapping name
	// Does not account for players ahead of last player if this is a lower index player
	throwsThisRound = 3;
	for(var i=0;i<availNums.length;i++){
		players[currentPlayerIndex].buttons[i].touchEnabled = false;		
	}
}

var currentPlayerStart = function(newPlayerIndex){
	// Checks to see if we skiped a player
	if (newPlayerIndex != null){
		currentPlayerIndex = newPlayerIndex;
	}
	slideBanner(turnBanners[currentPlayerIndex],'down');
	players[currentPlayerIndex].turn = true;
	players[currentPlayerIndex].startedTurn = true;
	for(var i=0;i<availNums.length;i++){
		if(players[currentPlayerIndex].buttons[i].status) {
			players[currentPlayerIndex].buttons[i].touchEnabled = true;
		}
	}
}

var reverseTurn = function(){
	if(currentPlayerIndex != 0){
		currentPlayerDone();
		players[currentPlayerIndex].turns =- 1;
		currentPlayerIndex--;
		currentPlayerStart();
	} else if (currentPlayerIndex == 0) {
		currentPlayerDone();
		players[currentPlayerIndex].turns =- 1;
		currentPlayerIndex = (totalPlayers-1);
		currentPlayerStart();
	}
}
var removePlayer = function(playerIndex, label, button){
	players.splice(playerIndex,1);
	label.text = '';
	button.backgroundImage = 'images/playerNotSelected.png';
	button.playerIsSet = false;
	button.selected = false;
	PlayerName.blur();
	playerSliderDoor();
	PlayerName.value = '';
	totalPlayers--;
}

var removeIndicator = function(index){
	indicators.children[index-1].hide();
	if(index == 3){
		views[currentPlayerIndex].remove(indicators);
	}
}

var addIndicator = function(index){
	if(index == 3){
		views[currentPlayerIndex].add(indicators);
		for(i=0;i<3;i++){
			indicators.children[i].hide();
		}
	}
	indicators.children[index-1].show();
}

var showIndicators = function(){
	indicators.myView = views[currentPlayerIndex];
	views[currentPlayerIndex].add(indicators);
	for(i=0;i<3;i++){
		indicators.children[i].show();
	}
}

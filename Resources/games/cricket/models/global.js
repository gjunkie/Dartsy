var currentPlayerIndex = 0;
var lastTurn = false;
var indicatorsRemoved = false;

var changeTurn = function(newPlayerIndex){
	if(!lastTurn){
		if(currentPlayerIndex != (totalPlayers-1)){
			currentPlayerDone();
			players[currentPlayerIndex].turns =+ 1;
			currentPlayerIndex++;
			currentPlayerStart(newPlayerIndex);
		} else {
			if(!someoneFinished) {
				checkClosedNums(players[currentPlayerIndex].buttons, players[currentPlayerIndex]);
			} else if(someoneFinished) {
				winner();
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
		killModal();
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
	indicatorsRemoved = false;
	players[currentPlayerIndex].turn = true;
	players[currentPlayerIndex].startedTurn = true;
	showIndicators();
	for(var i=0;i<availNums.length;i++){
		if(players[currentPlayerIndex].buttons[i].status) {
			players[currentPlayerIndex].buttons[i].touchEnabled = true;
		}
	}
	slideBanner(turnBanners[currentPlayerIndex],'down');
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
var removePlayer = function(parentIndex, label, button){
	for(var i=0, c = players.length; i<c; i++){
		if(typeof players[i] === 'undefined') continue;
		if(players[i].parent == parentIndex){
			players.splice(i,1);
			continue;
		}
	}
	players.sort(function(a, b){
		return a.id-b.id
	})
	label.text = '';
	button.backgroundImage = 'images/'+device+'/playerNotSelected.png';
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
		if(!indicatorsRemoved){
			views[currentPlayerIndex].remove(indicators);
		}
	}
	if(index==2){
		indicatorsRemoved = true;
	}
}

var addIndicator = function(index){
	if(index == 3){
		views[currentPlayerIndex].add(indicators);
		for(i=0;i<3;i++){
			indicators.children[i].hide();
		}
	}
	// Index - 1 due to 0 based array
	indicators.children[index-1].show();
	indicatorsRemoved = false;
}

var showIndicators = function(){
	indicators.myView = views[currentPlayerIndex];
	views[currentPlayerIndex].add(indicators);
	for(i=0;i<3;i++){
		indicators.children[i].show();
	}
	indicatorsRemoved = false;
}

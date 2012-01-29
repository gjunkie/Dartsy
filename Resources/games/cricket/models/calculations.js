
// Points calculated once a number can be scored on
var calculate_points = function(numberHit, value, tap_count){
	if(tap_count<3){
		numberHit.title = '';
	} else if(tap_count==3){
		numberHit.title = 'O';
	} else if (tap_count>3){
		numberHit.title = ((tap_count-3)*value);
	}
	highlight(numberHit);
	return tap_count;
}

// highlights the number passed in
var highlight = function(scorableNum){
	
	if(scorableNum.hits==1){
		scorableNum.closed = false;
		scorableNum.backgroundImage = 'images/buttonSingle.png';
	} else if(scorableNum.hits==2){
		scorableNum.closed = false;
		scorableNum.backgroundImage = 'images/buttonDouble.png';
	} else if(scorableNum.hits>2){
		scorableNum.closed = true;
		scorableNum.font = {fontSize:20};
		scorableNum.color = '#189814';
		scorableNum.backgroundImage = 'images/scorableButton.png';
	} else {
		scorableNum.closed = false;
		scorableNum.font = {fontSize:50};
		scorableNum.color = '#ffffff';
		scorableNum.backgroundImage = 'images/button.png';
	}
}

// Determines if a number is available to score
var available_to_score = function(button, taps){
	if(button.status != false && taps>=3){
		return true;
	}
}

// determines which player holds highest score
// does not account for two player tied for first place.
var highestIndex = null;
var highestScore = 0;
var determine_highest_score = function(){
	for(i=0;i<totalPlayers;i++){
        if (players[i].score > highestScore) {
            highestIndex = i;
            highestScore = players[i].score;
        }
	}
}

// Subtract Points
var subPoints = function(taps, number, label){
	if (taps==0){
		label.text='';
	} else if(taps==1){
		label.text = '/';
	} else if(taps==2){
		label.text = 'X';
	} else if(taps==3){
		label.text = 'O';
	} else if(taps>3){
		label.text=(taps-3)*number;
	}
	calculatePoints();
}


var lastMove = null;
var lastButton = null;
var multiplier = null;
var newhits = null;
var points = 0;
var buttonIndex = 0;
var undo = function(){
	lastMove = numberTracker[totalThrows-1];
	lastButton = lastMove.button;
	if (throwsThisRound == 0) {
		reverseTurn();
		throwsThisRound = 3;
	}
	multiplier = lastMove.multiplier;
	newhits = lastButton.hits - multiplier;
	if (lastMove.multiplier != 0){
		addIndicator(throwsThisRound);
		lastButton.hits = newhits;
		calculate_points(lastButton, lastButton.worth, lastButton.hits);
		buttonIndex = lastButton.index;
		points = 0;
		for(var nums = 0; nums < allNumbers; nums++){
			points += ~~(lastButton.parent.children[nums].title);
		}
		printScore(lastButton.parent.children[8], points);
		players[currentPlayerIndex].score = points;
		for(var playerToUndo = 0; playerToUndo < totalPlayers; playerToUndo++){
			openNumbers(views[playerToUndo].children[buttonIndex]);
		}
	} else {
		addIndicator(throwsThisRound);
		miss.animate(buttonPressed);
	}
	numberTracker.splice(totalThrows-1,1);
	totalThrows--;
	throwsThisRound--;
	players[currentPlayerIndex].throwsThisRound = throwsThisRound;
	checkClosedNums(lastButton.parent.children);
	if(throwsThisRound == 3){
		miss.touchEnabled = false;
	} else {
		miss.touchEnabled = true;
	}
}

var numbers_missed = function(player, index){
	if(throwsThisRound==3){
		throwsThisRound=0;
	}
	numberTracker.push({button: miss, multiplier: 0});
	throwsThisRound++;
	totalThrows++;
	if(!indicatorsRemoved){
		removeIndicator(throwsThisRound);
	}
	player.throwsThisRound = throwsThisRound;
	if(!someoneFinished) {
		checkClosedNums(player.buttons, player);
	} else if(someoneFinished) {
		winner(currentPlayerIndex, views[currentPlayerIndex].children);
	}
}


// Print total score
var printScore = function(label, score){
	label.text = score + ' pts';
}

// Calculate total worth of specific number tapped
var this_number_points = function(taps, worth){
	return worth*(taps-3);
}

// Determine Taps
var tap_count = function(action, tapsOnNumber){
	if(action=="add"){
		tapsOnNumber++;
	} else if(action=="sub"){
		tapsOnNumber--;
	}
	return tapsOnNumber;
}
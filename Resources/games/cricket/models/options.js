
var setsChosen = false;
var GamesToPlay = 0;
var totalPlayers = 0;
var GameNumber = 1;
var sliderIsOpen = false;
var placement = null;
var deleteIndex = null;
var clearLabel = null;
var clearButton = null;
var lastPlayerButtonTapped = null;

var pickRandomProperty = function(facts) {
    var fact;
    var count = 0;
    for (var item in facts)
        if (Math.random() < 1/++count)
           fact = item;
    factsLabel.text = facts[fact].toUpperCase();
}

var playerTap = function(aPlayer){
		// Event listeners for players
	aPlayer.addEventListener('click', function(){
		if (this.playerIsSet){
			clearUnsetPlayers(this);
			deleteIndex = this.playerIndex;
			clearLabel = PlayerLabels[this.id];
			clearButton = this;
			if ((lastPlayerButtonTapped == this.id && sliderIsOpen) || (lastPlayerButtonTapped != this.id && !sliderIsOpen) || (!sliderIsOpen)){
				playerSliderDoor();
			}
			submittedPlayer.text = this.name;
			playerSlider.remove(PlayerName);
			playerSlider.remove(OkButton);
			playerSlider.add(submittedPlayer);
			playerSlider.add(DeletePlayer);
		} else if (!this.playerIsSet){
			playerSlider.add(PlayerName);
			playerSlider.add(OkButton);
			PlayerName.focus();
			playerSlider.remove(submittedPlayer);
			playerSlider.remove(DeletePlayer);
			if (lastPlayerButtonTapped == this.id || lastPlayerButtonTapped == null || !sliderIsOpen){
				playerSliderDoor();
			}
			PlayerName.value = '';
			clearUnsetPlayers(this);
			placement = this.id;
			if(!this.selected){
				this.selected = true;
				this.backgroundImage = 'images/playerSelected.png';
				playerClicked = true;
			} else if (this.selected){
				this.selected=false;
				this.backgroundImage = 'images/playerNotSelected.png';
			}
		}
		playButtonCheck();
		lastPlayerButtonTapped = this.id;
	});
}

var possibleSetTap = function(possibleSet){
	// Event listeners for sets
	possibleSet.addEventListener('click', function(){
		clearUnsetPlayers(null);
		for(var i=0;i<=2;i++){
			possibleSets[i].backgroundImage ='images/blank-set.png';
		}
		if (sliderIsOpen){
			playerSliderDoor();
		}
		this.backgroundImage = 'images/blue-button.png';
		GamesToPlay = this.gamesToPlay;
		if (!setsChosen){
			setsChosen = true;
		}
		playButtonCheck();
	});
}

// To clear all buttons pass in null
// To not clear active button, pass in button
var clearUnsetPlayers = function(currentButton){
	if(currentButton != null){
		for(var i=0;i<thePlayerButtons.length;i++){
			if(!thePlayerButtons[i].playerIsSet && thePlayerButtons[i] != currentButton){
				thePlayerButtons[i].backgroundImage = 'images/playerNotSelected.png';
				thePlayerButtons[i].selected = false;
			}
		}
	} else {
		for(var i=0;i<thePlayerButtons.length;i++){
			if(!thePlayerButtons[i].playerIsSet){
				thePlayerButtons[i].backgroundImage = 'images/playerNotSelected.png';
				thePlayerButtons[i].selected = false;
			}
		}
	}
}

var playButtonCheck = function(){
	if(players.length>0 && setsChosen){
		play.backgroundImage = 'images/PlayButton.png';
		play.touchEnabled = true;
		play.enabled = true;
	} else {
		play.backgroundImage = 'images/PlayButtonDisabled.png';
		play.touchEnabled = false;
		play.enabled = false;
	}	
}

play.addEventListener('click', function(){
	addColumns(totalPlayers);
	start_new_game();
	win2.open();
	win1.close();
})

var playerSliderDoor = function(player){
	PlayerName.hintText = "Player Name";
	if (sliderIsOpen) {
		playerSelect.animate(playersSliderHideTop);
		setsSelect.animate(playersSliderHideBottom);
		sliderIsOpen = false;
	} else if (!sliderIsOpen) {
		playerSelect.animate(playersSliderExposeTop);
		setsSelect.animate(playersSliderExposeBottom);
		sliderIsOpen = true;
	}
}

var printName = function(name, placement){
	PlayerLabels[placement].text = name;
	thePlayerButtons[placement].name = name;
}

//Return Key submission
PlayerName.addEventListener('return',function(){
	if (PlayerName.value != '') {
		submitThePlayer();
	}
	playButtonCheck();
});

OkButton.addEventListener('click',function(){
	if (PlayerName.value != '') {
		submitThePlayer();
	}
	playButtonCheck();
});

DeletePlayer.addEventListener('click', function(){
	removePlayer(deleteIndex, clearLabel, clearButton);
	if (totalPlayers==0){
		play.backgroundImage = 'images/PlayButtonDisabled.png',
		play.touchEnabled = false;
	}
	playButtonCheck();
});

var submitThePlayer = function(){
	totalPlayers++;
	var playerName = PlayerName.value;
	players.splice(placement,0,new Player(placement, playerName));
	printName(playerName, placement);
	thePlayerButtons[placement].playerIsSet=true;
	thePlayerButtons[placement].playerIndex = players.length-1;
	playerSliderDoor();
	// Database Function
	//checkForNewPlayer(playerName);
}
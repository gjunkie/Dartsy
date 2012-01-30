
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
				this.backgroundImage = 'images/'+device+'/playerSelected.png';
				playerClicked = true;
			} else if (this.selected){
				this.selected=false;
				this.backgroundImage = 'images/'+device+'/playerNotSelected.png';
			}
		}
		playButtonCheck();
		lastPlayerButtonTapped = this.id;
	});
}

// To clear all buttons pass in null
// To not clear active button, pass in button
var clearUnsetPlayers = function(tappedButton){
	if(tappedButton != null){
		for(var i=0;i<thePlayerButtons.length;i++){
			if(!thePlayerButtons[i].playerIsSet && thePlayerButtons[i] != tappedButton){
				thePlayerButtons[i].backgroundImage = 'images/'+device+'/playerNotSelected.png';
				thePlayerButtons[i].selected = false;
			}
		}
	} else {
		for(var i=0;i<thePlayerButtons.length;i++){
			if(!thePlayerButtons[i].playerIsSet){
				thePlayerButtons[i].backgroundImage = 'images/'+device+'/playerNotSelected.png';
				thePlayerButtons[i].selected = false;
			}
		}
	}
}

var playButtonCheck = function(){
	if(players.length>0 && setsChosen){
		play.backgroundImage = 'images/'+device+'/PlayButton.png';
		play.touchEnabled = true;
		play.enabled = true;
		letsPlay.animate(letsPlayFadeIn);
	} else {
		play.backgroundImage = 'images/'+device+'/PlayButtonDisabled.png';
		play.touchEnabled = false;
		play.enabled = false;
		letsPlay.animate(letsPlayFadeOut);
	}	
}

var submitThePlayer = function(){
	totalPlayers++;
	var playerName = PlayerName.value;
	players[placement] = new Player(placement, playerName);
	players.sort(function(a, b){
		return a.id-b.id
	})
	printName(playerName, placement);
	thePlayerButtons[placement].playerIsSet=true;
	thePlayerButtons[placement].playerIndex = players.length-1;
	playerSliderDoor();
	// Database Function
	//checkForNewPlayer(playerName);
}

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
		play.backgroundImage = 'images/'+device+'/PlayButtonDisabled.png',
		play.touchEnabled = false;
	}
	playButtonCheck();
});

play.addEventListener('click', function(){
	addColumns(totalPlayers);
	start_new_game();
	win2.open();
	win1.close();
});


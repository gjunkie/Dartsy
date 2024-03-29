
var setsChosen = false;
var GamesToPlay = 0;
var totalPlayers = 0;
var GameNumber = 1;
var sliderIsOpen = false;
var placement = null;
var deleteIndex = null;
var clearLabel = null;
var deleteButtonVisible = false;
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
		placement = this.id;
		if (this.playerIsSet){
			clearUnsetPlayers(this);
			paintDeleteButton(this);
			deleteIndex = thePlayerButtons.indexOf(this);
			clearLabel = PlayerLabels[this.id];
			clearButton = this;
			if ((lastPlayerButtonTapped == this.id && sliderIsOpen) || (lastPlayerButtonTapped != this.id && !sliderIsOpen) || (!sliderIsOpen)){
				playerSliderDoor();
			}
			submittedPlayer.text = this.name;
			playerSlider.remove(PlayerName);
			playerSlider.remove(OkButton);
			playerSlider.add(submittedPlayer);
		} else if (!this.playerIsSet){
			playerSlider.add(PlayerName);
			playerSlider.add(OkButton);
			PlayerName.focus();
			playerSlider.remove(submittedPlayer);
			removeDeleteButton();
			if (lastPlayerButtonTapped == this.id || lastPlayerButtonTapped == null || !sliderIsOpen){
				playerSliderDoor();
			}
			PlayerName.value = '';
			clearUnsetPlayers(this);
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


var possibleSetTap = function(possibleSet){
	// Event listeners for sets
	possibleSet.addEventListener('click', function(){
		clearUnsetPlayers(null);
		for(var i=0;i<=2;i++){
			possibleSets[i].backgroundImage ='images/'+device+'/blank-set.png';
		}
		if (sliderIsOpen){
			playerSliderDoor();
		}
		this.backgroundImage = 'images/'+device+'/blue-button.png';
		GamesToPlay = this.gamesToPlay;
		if (!setsChosen){
			setsChosen = true;
		}
		playButtonCheck();
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

var paintDeleteButton = function(playerButton){
	var newLeft = playerButton.left - 5;
	DeletePlayer.left = newLeft;
	if(!deleteButtonVisible){
		deleteButtonView.add(DeletePlayer);
		deleteButtonVisible = true;
	}
}

var removeDeleteButton = function(){
	if(deleteButtonVisible){
		deleteButtonView.remove(DeletePlayer);
		deleteButtonVisible = false;
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

var submitThePlayer = function(parent){
	totalPlayers++;
	var playerName = PlayerName.value;
	players.push(new Player(placement, playerName, parent));
	players.sort(function(a, b){
		return a.id-b.id
	});
	for(var i=0, c = players.length; i<c; i++){
		if(typeof players[i] === 'undefined'){
			players.splice(i,1);
			continue;
		}
	}
	printName(playerName, placement);
	thePlayerButtons[placement].playerIsSet = true;
	playerSliderDoor();
	// find the id of every player and assign it to playerIndex of buttons
	// Database Function
	//checkForNewPlayer(playerName);
}

var playerSliderDoor = function(player){
	PlayerName.hintText = "Player Name";
	if (sliderIsOpen) {
		playerSelect.animate(playersSliderHideTop);
		setsSelect.animate(playersSliderHideBottom);
		removeDeleteButton();
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
		submitThePlayer(placement);
	}
	playButtonCheck();
});

OkButton.addEventListener('click',function(){
	if (PlayerName.value != '') {
		submitThePlayer(placement);
	}
	playButtonCheck();
});

DeletePlayer.addEventListener('click', function(){
	removePlayer(placement, clearLabel, clearButton);
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

helpButton.addEventListener('click',function(){
	helpView.animate(helpViewShow);
});
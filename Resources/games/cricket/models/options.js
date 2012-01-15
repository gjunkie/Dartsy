
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

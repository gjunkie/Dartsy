// This file creates all scorable buttons and playable numbers on the board 

var allNumbers = Object.keys(Games.Cricket.avail_nums).length;
var gameKeys = Games.Cricket.avail_nums;
var availNums=[];
var backgroundImageNumber = null;
var playerButtons=[];
var playerPointsLabels = [];
var playerNamesLabels = [];
var currentPlayer = [];
var topDistance;
var allButtons = [];
var numberTracker = [];
var totalThrows = 0;
var throwsThisRound = 0;
var throwsLeft = 0;


var undoPoints = Titanium.UI.createButton({
	title: '',
	backgroundImage: 'images/undo.png',
	playersLeft: totalPlayers,
	width:73,
	height: 62,
	left: 13,
	top: 0,
	touchEnabled: true
});

var miss = Titanium.UI.createButton({
	color:'#fff',
	title: '',
	backgroundImage: 'images/miss.png',
	playersLeft: totalPlayers,
	width:73,
	height: 62,
	right: 13,
	top: 0,
	touchEnabled: true
});
numbersView.add(miss);

miss.addEventListener('click', function(){
	this.animate(buttonPressed);
	numbers_missed(players[currentPlayerIndex], currentPlayerIndex);
	if (throwsThisRound == 3){
		throwsThisRound = 0;
		changeTurn();
	};
	killModal();
});

for(i=0;i<gameKeys.length;i++){
	// Numbers in the middle
	topDistance = 124+(122*i);
	if(Games.Cricket.avail_nums[i]==25){
		var theTitle = 'Bull';
	} else {
		var theTitle = Games.Cricket.avail_nums[i];
	}
	backgroundImageNumber = Games.Cricket.avail_nums[i];
	availNums[i] = Titanium.UI.createLabel({
		backgroundImage: 'images/numbers/'+backgroundImageNumber+'.png',
		text: '',
		playersLeft: totalPlayers,
		width:64,
		height: 66,
		top: topDistance,
	});
	number = availNums[i];
	numbersView.add(number);
}

// Player buttons/labels
var paintButtons = function(myView, totalPlayers, playerIndex){
	for(var i=0;i<allNumbers;i++){
		topDistance = 110+(120*i);
		modalTopDistance = 60+(120*i);
		if (i<allNumbers) {
			playerButtons[i] = Titanium.UI.createButton({
				parent: myView,
				playerNum: playerIndex,
				owner: players[playerIndex].name,
				index: i,
				color:'#fff',
				backgroundImage:'images/button.png',
				title:'',
				font:{fontSize:50,fontFamily:'Futura-CondensedMedium'},
				textAlign:'center',
				width:105,
				height: 105,
				top: topDistance,
				incModal: modalTopDistance,
				relation: availNums[i],
				hits: 0,
				worth: Games.Cricket.avail_nums[i],
				closed: false,
				status: true,
				touchEnabled: true,
			});
		}
		playerButton = playerButtons[i];
		players[playerIndex].buttons.push(playerButton);
		// append all buttons to this array for comparing purposes
		allButtons.push(playerButton);
		currentPlayer = totalPlayers[i];
		playerButton.addEventListener('click',function(){
			if (throwsThisRound != 3){
				button_calc(this, 1, this.owner);
				addDartsModal(this, this.parent, this.incModal);
				determine_highest_score();
			}
		});
		myView.add(playerButton);
	}
}

var Names = function(myView, index){
	playerNamesLabels[index] = Titanium.UI.createLabel({
		borderColor: '#e5e5e5',
		borderWidth: 0,
		color:'#fff',
		backgroundColor:'none',
		borderRadius: 5,
		text: players[index].name,
		font:{fontSize:22,fontFamily:'Ballpark'},
		textAlign:'center',
		width:100,
		height: 50,
		top: '2%',
		touchEnabled: true,
		zIndex: 1,
	});
	playerPointsLabels[index] = Titanium.UI.createLabel({
		color:'#fff',
		text:'0 pts',
		font:{fontSize:25,fontFamily:'Futura-CondensedMedium'},
		textAlign:'center',
		width:100,
		height: 23,
		bottom: 20,
	});
	// Quickly change turns by tapping another player's name
	playerNamesLabels[index].addEventListener('click',function(){
		if(index!=currentPlayerIndex){
			// Remaining darts are misses
			throwsLeft = 3 - throwsThisRound;
			for(var i=0;i<throwsLeft;i++){
				numbers_missed(players[currentPlayerIndex], index);
			}
			if(index>currentPlayerIndex){
				// add one to current index to avoid current player
				// less than index to avoid player we skipped to
				for(var i=currentPlayerIndex+1;i<index;i++){
					debug('i = '+i)
					debug('index = '+index)
					loopMisses(i);
				}
			} else if(index<currentPlayerIndex){
				for(var i=currentPlayerIndex+1;i<totalPlayers;i++){
					loopMisses(i);
				}
				for(var i=0;i<index;i++){
					loopMisses(i);
				}
			}
			changeTurn(index);
		}
	});
	playerTotalLabel = playerPointsLabels[index];
	playerNameLabel = playerNamesLabels[index];
	myView.add(playerNameLabel);
	myView.add(playerTotalLabel);
}

var loopMisses = function(index){
	//debug(index)
	for(var a=0;a<3;a++){
		numbers_missed(players[index], true);
	}
}

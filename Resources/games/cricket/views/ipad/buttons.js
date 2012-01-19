// This file creates all scorable buttons and playable numbers on the board 

debug('view buttons ipad loaded');
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

var numbersView = Titanium.UI.createView({
	id: 'Numbers',
	backgroundImage:'images/ipad/numbers_bg.jpg',
	width:175,
	zIndex: 3,
});

var undoPoints = Titanium.UI.createButton({
	title: '',
	backgroundImage: 'images/ipad/undo.png',
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
	backgroundImage: 'images/ipad/miss.png',
	playersLeft: totalPlayers,
	width:73,
	height: 62,
	right: 13,
	top: 0,
	touchEnabled: true
});
numbersView.add(miss);


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
		backgroundImage: 'images/ipad/numbers/'+backgroundImageNumber+'.png',
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
				id: Games.Cricket.avail_nums[i],
				parent: myView,
				playerNum: playerIndex,
				owner: players[playerIndex].name,
				index: i,
				color:'#fff',
				backgroundImage:'images/ipad/button.png',
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
		// next two lines may be useless
		allButtons.push(playerButton);
		currentPlayer = totalPlayers[i];
		buttonTap(playerButton, i);
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
	namesTap(index);
	playerTotalLabel = playerPointsLabels[index];
	playerNameLabel = playerNamesLabels[index];
	myView.add(playerNameLabel);
	myView.add(playerTotalLabel);
}

numbersView.add(undoPoints);
GameView.add(numbersView);
Titanium.include('../../models/buttons.js');
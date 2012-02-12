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

var numbersView = Titanium.UI.createView({
	id: 'Numbers',
	backgroundImage:'images/'+device+'/numbers_bg.jpg',
	width:88,
	zIndex: 3,
});

var undoPoints = Titanium.UI.createButton({
	title: '',
	backgroundImage: 'images/'+device+'/undo.png',
	playersLeft: totalPlayers,
	width:45,
	height: 38,
	top: 0,
	touchEnabled: true
});

var miss = Titanium.UI.createButton({
	color:'#fff',
	title: '',
	backgroundImage: 'images/'+device+'/miss.png',
	playersLeft: totalPlayers,
	width:36.5,
	height: 31,
	right: 2,
	top: 0,
	touchEnabled: true
});
//numbersView.add(miss);


var multDialog = Titanium.UI.createOptionDialog({
    title: '',
    options: ['Double','Triple','Cancel'],
    cancel:2,
});

var multDialogBull = Titanium.UI.createOptionDialog({
    title: '',
    options: ['Double','Cancel'],
    cancel:1,
});

for(i=0;i<gameKeys.length;i++){
	// Numbers in the middle
	topDistance = 50+(55*i);
	backgroundImageNumber = Games.Cricket.avail_nums[i];
	availNums[i] = Titanium.UI.createLabel({
		backgroundImage: 'images/'+device+'/numbers/'+backgroundImageNumber+'.png',
		text: '',
		playersLeft: totalPlayers,
		width:30,
		height: 30,
		top: topDistance,
	});
	number = availNums[i];
	numbersView.add(number);
}

// Player buttons/labels
var paintButtons = function(myView, totalPlayers, playerIndex){
	for(var i=0;i<allNumbers;i++){
		topDistance = 43+(55*i);
		if (i<allNumbers) {
			playerButtons[i] = Titanium.UI.createButton({
				id: Games.Cricket.avail_nums[i],
				parent: myView,
				playerNum: playerIndex,
				owner: players[playerIndex].name,
				index: i,
				color:'#fff',
				backgroundImage:'images/'+device+'/button.png',
				title:'',
				font:scorableNumFontNormal,
				textAlign:'center',
				width:50,
				height: 50,
				top: topDistance,
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
		color:'#fff',
		backgroundColor:'none',
		text: players[index].name.substr(0, 1),
		font:{fontSize:27,fontFamily:'Ballpark'},
		textAlign:'center',
		width:50,
		height: 25,
		top: 4,
		touchEnabled: true,
		zIndex: 1,
	});
	playerPointsLabels[index] = Titanium.UI.createLabel({
		color:'#fff',
		text:'0 pts',
		font:{fontSize:14,fontFamily:'Futura-CondensedMedium'},
		textAlign:'center',
		width:100,
		height: 23,
		bottom: 2,
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
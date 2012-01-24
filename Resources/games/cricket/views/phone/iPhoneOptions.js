
var players = [];
var thePlayerButtons = [];
var PlayerLabels = [];
var possibleSets = [];

var helpButton = Titanium.UI.createButton({
	id: 'Help Button',
	backgroundImage:'images/iphone/help.png',
	height:31,
	width:31,
	bottom: 20,
	right: 20,
});

helpButton.addEventListener('click',function(){
	helpView.animate(helpViewShow);
});

var playerSelect = Titanium.UI.createView({
	id: 'Player Selector',
	backgroundImage:'images/iphone/cricket-intro-top.jpg',
	height:200,
	top: -20,
	zIndex: 3,
});

var setsSelect = Titanium.UI.createView({
	id: 'Sets Selector',
	backgroundImage:'images/iphone/cricket-intro-bottom.jpg',
	height:280,
	bottom: 0,
	zIndex: 3,
});

var factsView = Titanium.UI.createView({
	id: 'Fun Facts',
	backgroundColor:'#161616',
	height:100,
	width:320,
	opacity: 0.75,
	borderRadius: 20,
	borderWidth:2,
	borderColor:'#000000',
	top: 50,
	zIndex: 4,
});

var factsLabel = Titanium.UI.createLabel({
	id: 'Fun Facts',
	color: '#949494',
	textAlign: 'center',
	font:{fontSize:11,fontFamily:'Futura'},
	height:'95%',
	width:'95%',
});

var playerSlider = Titanium.UI.createView({
	id: 'Player Slider',
	backgroundImage: 'images/iphone/PlayerSubmit_bg.jpg',
	height: 45,
	top: 180,
});

var PlayerName = Titanium.UI.createTextField({
    color:'#336699',
    hintText:'Player Name',
	width: 180,
	height: 30,
	left: 40,
	autocorrect: false,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    keyboardToolbarColor: '#999',   
    keyboardToolbarHeight: 40,
	returnKeyType: Titanium.UI.RETURNKEY_DONE
});

var OkButton = Titanium.UI.createButton({
	backgroundImage:'images/iphone/ok.png',
	width: 24,
	height: 15,
	right: 20,
	title: '',
});

var DeletePlayer = Titanium.UI.createButton({
	backgroundImage:'images/iphone/deletePlayer.png',
	bottom: 10,
	width: 18,
	height: 18,
	title: '',
});

var CricketTitle = Titanium.UI.createImageView({
	image: 'images/iphone/CricketTitle.png',
	width: 219,
	height: 117,
	top: 20,
});

var playersText = Titanium.UI.createLabel({
	text: 'CHOOSE PLAYERS',
	textAlign: 'center',
	height: 30,
	bottom: 80,
	color: '#b2b2b2',
	font:{fontSize:18,fontFamily:'Futura-CondensedMedium'},
});

var numOfGamesText = Titanium.UI.createLabel({
	text: 'BEST OF',
	textAlign: 'center',
	height: 30,
	top: 20,
	color: '#b2b2b2',
	font:{fontSize:18,fontFamily:'Futura-CondensedMedium'},
});

var submittedPlayer = Titanium.UI.createLabel({
	text: '',
	textAlign: 'center',
	height: 50,
	top: 3,
	color: '#ffffff',
	font:{fontSize:22,fontFamily:'Ballpark'},
});

// Buttons for user to select number of players
var paintPlayerSelections = function() {
	for(var i=0;i<possiblePlayers;i++){
		var leftMargin = 12 + (20*i) + '%';
		thePlayerButtons[i] = Titanium.UI.createButton({
			id: i,
			playerIndex: null,
			name: '',
			color:'#fff',
			backgroundImage: 'images/iphone/playerNotSelected.png',
			hintText:'Player 1',
			font:{fontSize:30,fontFamily:'Ballpark'},
			textAlign:'center',
			title: '',
			textAlign:'center',
			width:60,
			height: 60,
			top: 110,
			left: leftMargin,
			selected: false,
			playerIsSet: false,
			touchEnabled: true,
		});
		aPlayer = thePlayerButtons[i];
		playerTap(aPlayer);
	
		PlayerLabels[i] = Titanium.UI.createLabel({
			color: '#fff',
			id: i,
			width: 60,
			height: 30,
			left: leftMargin,
			textAlign: 'center',
			font:{fontSize:17,fontFamily:'Ballpark'},
			top: 115,
		});
		aPlayerLabel = PlayerLabels[i];
		
		playerSelect.add(aPlayer);
		playerSelect.add(aPlayerLabel);
	}
}

var paintPossibleSets = function(){
	// Buttons for user to select number of sets
	for(var i=0;i<Games.Cricket.sets.length;i++){
		var leftMargin = 21 + (20*i) + '%';
		possibleSets[i] = Titanium.UI.createButton({
			color:'#fff',
			backgroundImage: 'images/iphone/blank-set.png',
			hintText:'Player 1',
			font:{fontSize:25,fontFamily:'Futura-CondensedMedium'},
			textAlign:'center',
			title: Games.Cricket.sets[i],
			gamesToPlay: Games.Cricket.sets[i],
			textAlign:'center',
			width:55,
			height: 55,
			top: 50,
			left: leftMargin,
			touchEnabled: true,
		});
		
		possibleSet = possibleSets[i];
		possibleSetTap(possibleSet);
		setsSelect.add(possibleSet);
	}
}

var GameView = Titanium.UI.createView({
	id: 'Cricket View',
	backgroundImage:'images/iphone/cricket-dark-wood.jpg',
});

var indicators = Titanium.UI.createView({
	id: 'Indicators',
	height: 13,
	width: 39,
	top: 3,
	myView: null,
});

var indicator1 = Titanium.UI.createLabel({
	id: 'Indicator 1',
	backgroundImage: 'images/iphone/dartIndicator.png',
	height: 13,
	width: 13,
	left: 26,
});

var indicator2 = Titanium.UI.createLabel({
	id: 'Indicator 2',
	backgroundImage: 'images/iphone/dartIndicator.png',
	height: 13,
	width: 13,
	left: 13,
});

var indicator3 = Titanium.UI.createLabel({
	id: 'Indicator 3',
	backgroundImage: 'images/iphone/dartIndicator.png',
	height: 13,
	width: 13,
	left: 0,
});
	
var views = [];
var turnBanners = [];
var thePlayer;
var leftSpace = null;
var addColumns = function(playerCount, name){
	for(var i=0; i<playerCount; i++){
		thePlayer = players[i];
		if(players[i].id<2){
			leftSpace = (60*players[i].id);
		} else if (players[i].id>1){
			leftSpace = (60*players[i].id) + 88;
		}
		turnBanners[i] = Titanium.UI.createImageView({
			image: 'images/iphone/banner.png',
			width: 200,
			height: 50,
			top: -127,
			zIndex: 0,
		});
		
		views[i] = Titanium.UI.createView({
			id: 'view ' + i,
			width:64,
			left: leftSpace,
		});
		theView = views[i];
		turnBanner = turnBanners[i];
		paintButtons(theView, totalPlayers, i);
		Names(theView, i, name);
		theView.add(turnBanner);
		GameView.add(theView);
	}
	win2.add(GameView);
}

var play = Titanium.UI.createButton({
	backgroundImage:'images/iphone/PlayButtonDisabled.png',
	backgroundSelectedImage:'',
	title:'',
	width:56,
	height: 56,
	bottom: 50,
	touchEnabled: false,
	enabeld: false,
});

indicators.add(indicator1);
indicators.add(indicator2);
indicators.add(indicator3);
playerSelect.add(CricketTitle);
playerSelect.add(playersText);
//factsView.add(factsLabel);
//playerSelect.add(factsView);
setsSelect.add(play);
setsSelect.add(numOfGamesText);
//setsSelect.add(helpButton);
playerSlider.add(PlayerName);
playerSlider.add(OkButton);
win1.add(playerSlider);
win1.add(playerSelect);
win1.add(setsSelect);

Titanium.include('../../models/options.js');

var players = [];
var thePlayerButtons = [];
var PlayerLabels = [];
var possibleSets = [];
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

var helpButton = Titanium.UI.createButton({
	id: 'Help Button',
	backgroundImage:'images/help.png',
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
	backgroundImage:'images/'+device+'/cricket-intro-top.jpg',
	height:'50%',
	top: 0,
	zIndex: 3,
});

var factsView = Titanium.UI.createView({
	id: 'Fun Facts',
	backgroundColor:'#161616',
	height:100,
	width:420,
	opacity: 0.75,
	borderRadius: 20,
	borderWidth:2,
	borderColor:'#000000',
	top: 150,
	zIndex: 4,
});

var factsLabel = Titanium.UI.createLabel({
	id: 'Fun Facts',
	color: '#949494',
	textAlign: 'center',
	font:{fontSize:12,fontFamily:'Futura'},
	height:'95%',
	width:'95%',
});

var pickRandomProperty = function(facts) {
    var fact;
    var count = 0;
    for (var item in facts)
        if (Math.random() < 1/++count)
           fact = item;
    factsLabel.text = facts[fact].toUpperCase();
}

var setsSelect = Titanium.UI.createView({
	id: 'Sets Selector',
	backgroundImage:'images/'+device+'/cricket-intro-bottom.jpg',
	height:'50%',
	bottom: 0,
	zIndex: 3,
});

var playerSlider = Titanium.UI.createView({
	id: 'Player Slider',
	backgroundImage: 'images/'+device+'/PlayerSubmit_bg.jpg',
	height: '15%',
});

var PlayerName = Titanium.UI.createTextField({
    color:'#336699',
    hintText:'Player Name',
	width: 200,
	height: 30,
	autocorrect: false,
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    keyboardToolbarColor: '#999',   
    keyboardToolbarHeight: 40,
	returnKeyType: Titanium.UI.RETURNKEY_DONE
});

var OkButton = Titanium.UI.createButton({
	backgroundImage:'images/'+device+'/ok.png',
	width: 48,
	height: 30,
	right: 225,
	title: '',
});

var DeletePlayer = Titanium.UI.createButton({
	backgroundImage:'images/'+device+'/deletePlayer.png',
	bottom: 35,
	width: 27,
	height: 27,
	title: '',
});

var CricketTitle = Titanium.UI.createImageView({
	image: 'images/'+device+'/CricketTitle.png',
	width: 219,
	height: 117,
	top: 20,
});

var playersText = Titanium.UI.createLabel({
	text: 'CHOOSE PLAYERS',
	textAlign: 'center',
	height: 30,
	bottom: 200,
	color: '#b2b2b2',
	font:{fontSize:25,fontFamily:'Futura-CondensedMedium'},
});

var numOfGamesText = Titanium.UI.createLabel({
	text: 'BEST OF',
	textAlign: 'center',
	height: 30,
	top: 20,
	color: '#b2b2b2',
	font:{fontSize:25,fontFamily:'Futura-CondensedMedium'},
});

var submittedPlayer = Titanium.UI.createLabel({
	text: '',
	textAlign: 'center',
	height: 50,
	top: 35,
	color: '#ffffff',
	font:{fontSize:45,fontFamily:'Ballpark'},
});

	
// Buttons for user to select number of players
for(var i=0;i<possiblePlayers;i++){
	var leftMargin = 20 + (15*i) + '%';
	thePlayerButtons[i] = Titanium.UI.createButton({
		id: i,
		playerIndex: null,
		name: '',
		color:'#fff',
		backgroundImage: 'images/'+device+'/playerNotSelected.png',
		borderRadius: 50,
		hintText:'Player 1',
		font:{fontSize:30,fontFamily:'Ballpark'},
		textAlign:'center',
		title: '',
		textAlign:'center',
		width:116,
		height: 116,
		top: '65%',
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
		width: 116,
		height: 30,
		left: leftMargin,
		textAlign: 'center',
		font:{fontSize:24,fontFamily:'Ballpark'},
		top: '87%',
	});
	aPlayerLabel = PlayerLabels[i];
	
	playerSelect.add(aPlayer);
	playerSelect.add(aPlayerLabel);
}

// Buttons for user to select number of sets
for(var i=0;i<Games.Cricket.sets.length;i++){
	var leftMargin = 29 + (14*i) + '%';
	possibleSets[i] = Titanium.UI.createButton({
		color:'#fff',
		backgroundImage: 'images/'+device+'/blank-set.png',
		hintText:'Player 1',
		font:{fontSize:35,fontFamily:'Futura-CondensedMedium'},
		textAlign:'center',
		title: Games.Cricket.sets[i],
		gamesToPlay: Games.Cricket.sets[i],
		textAlign:'center',
		width:110,
		height: 110,
		top: '15%',
		left: leftMargin,
		touchEnabled: true,
	});
	
	possibleSet = possibleSets[i];
		
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
	setsSelect.add(possibleSet);
}

// To clear all buttons pass in null
// To not clear active button, pass in button
var clearUnsetPlayers = function(currentButton){
	if(currentButton != null){
		for(var i=0;i<thePlayerButtons.length;i++){
			if(!thePlayerButtons[i].playerIsSet && thePlayerButtons[i] != currentButton){
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
	} else {
		play.backgroundImage = 'images/'+device+'/PlayButtonDisabled.png';
		play.touchEnabled = false;
		play.enabled = false;
	}	
}

var GameView = Titanium.UI.createView({
	id: 'Cricket View',
	backgroundImage:'images/'+device+'/cricket-dark-wood.jpg',
});


var indicators = Titanium.UI.createView({
	id: 'Indicators',
	height: 13,
	width: 39,
	top: 70,
	myView: null,
});

var indicator1 = Titanium.UI.createLabel({
	id: 'Indicator 1',
	backgroundImage: 'images/'+device+'/dartIndicator.png',
	height: 13,
	width: 13,
	left: 26,
});

var indicator2 = Titanium.UI.createLabel({
	id: 'Indicator 1',
	backgroundImage: 'images/'+device+'/dartIndicator.png',
	height: 13,
	width: 13,
	left: 13,
});

var indicator3 = Titanium.UI.createLabel({
	id: 'Indicator 1',
	backgroundImage: 'images/'+device+'/dartIndicator.png',
	height: 13,
	width: 13,
	left: 0,
});
	
var views = [];
var turnBanners = [];
var thePlayer;
var leftSpace = null;
var addColumns = function(playerCount, name){
	debug(players)
	for(var i=0; i<playerCount; i++){
		thePlayer = players[i];
		if(players[i].id<2){
			leftSpace = (20*players[i].id) + '%'
		} else if (players[i].id>1){
			leftSpace = (20*players[i].id) + 20 + '%'
		}
		turnBanners[i] = Titanium.UI.createImageView({
			image: 'images/'+device+'/banner.png',
			width: 100,
			height: 127,
			top: -127,
			zIndex: 0,
		});
		
		views[i] = Titanium.UI.createView({
			id: 'view ' + i,
			borderRadius:10,
			width:'20%',
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
	backgroundImage:'images/'+device+'/PlayButtonDisabled.png',
	backgroundSelectedImage:'',
	borderRadius: 10,
	title:'',
	textAlign:'center',
	width:112,
	height: 112,
	bottom: '20%',
	touchEnabled: false,
	enabeld: false,
});

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
		play.backgroundImage = 'images/'+device+'/PlayButtonDisabled.png',
		play.touchEnabled = false;
	}
	playButtonCheck();
});

var submitThePlayer = function(){
	totalPlayers++;
	var playerName = PlayerName.value;
	players.splice(placement,0,new Player(placement, playerName));
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

indicators.add(indicator1);
indicators.add(indicator2);
indicators.add(indicator3);
playerSelect.add(CricketTitle);
playerSelect.add(playersText);
factsView.add(factsLabel);
playerSelect.add(factsView);
setsSelect.add(play);
setsSelect.add(numOfGamesText);
//setsSelect.add(helpButton);
playerSlider.add(PlayerName);
playerSlider.add(OkButton);
win1.add(playerSlider);
win1.add(playerSelect);
win1.add(setsSelect);
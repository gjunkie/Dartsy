
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
var boundaries = [262, 384, 502];
var positions = [];

var helpButton = Titanium.UI.createButton({
	id: 'Help Button',
	backgroundImage:'images/ipad/help.png',
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
	backgroundImage:'images/ipad/cricket-intro-top.jpg',
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

var setsSelect = Titanium.UI.createView({
	id: 'Sets Selector',
	backgroundImage:'images/ipad/cricket-intro-bottom.jpg',
	height:'50%',
	bottom: 0,
	zIndex: 3,
});

var playerSlider = Titanium.UI.createView({
	id: 'Player Slider',
	backgroundImage: 'images/ipad/PlayerSubmit_bg.jpg',
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
	backgroundImage:'images/ipad/ok.png',
	width: 48,
	height: 30,
	right: 225,
	title: '',
});

var DeletePlayer = Titanium.UI.createButton({
	backgroundImage:'images/ipad/deletePlayer.png',
	bottom: 35,
	width: 27,
	height: 27,
	title: '',
});

var CricketTitle = Titanium.UI.createImageView({
	image: 'images/ipad/CricketTitle.png',
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
var paintPlayerSelections = function() {
	for(var i=0;i<possiblePlayers;i++){
		if(i==0){
			midLeft = null;
			midRight = boundaries[i];
		} else if(i==3){
			midLeft = boundaries[2];
			midRight = null;
		} else {
			midLeft = boundaries[i-1];
			midRight = boundaries[i];
		}
		var leftMargin = 145 + (120*i);
		positions.push(leftMargin);
		thePlayerButtons[i] = Titanium.UI.createLabel({
			id: i,
			slot:i+1,
			playerIndex: null,
			name: '',
			backgroundImage: 'images/ipad/playerNotSelected.png',
			borderRadius: 50,
			hintText:'Player 1',
			title: '',
			width:116,
			height: 116,
			top: '65%',
			left: leftMargin,
			mids:{midLeft:midLeft,midRight:midRight},
			selected: false,
			position: i,
			playerIsSet: false,
			touchEnabled: true,
		});
		aPlayer = thePlayerButtons[i];
		//playerTap(aPlayer);
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
	
	// set constants from player button options array
var staticOne = thePlayerButtons[0];
var staticTwo = thePlayerButtons[1];
var staticThree = thePlayerButtons[2];
var staticFour = thePlayerButtons[3];
var staticOneLabel = PlayerLabels[0];
var staticTwoLabel = PlayerLabels[1];
var staticThreeLabel = PlayerLabels[2];
var staticFourLabel = PlayerLabels[3];
	
	var tmp_index;
	var playersSwitched = false;
	var tmp_position;
	var oneSwitch = false;
	var twoSwitch = false;
	var threeSwitch = false;
	var fourSwitch = false;
	var switchPlayers = function(movingPlayer, movingPlayerX, movingPlayerY, playerLabelY){
		//debug('moving player id is '+movingPlayer.id);
		if(positionOne(movingPlayerX) && movingPlayer != staticOne){
			if(!oneSwitch){
				debug('Position One Running');
				// try easing animation
				staticOne.animate({center:{x:movingPlayer.position,y:movingPlayerY}, duration:1});
				staticOneLabel.animate({center:{x:movingPlayer.position,y:playerLabelY}, duration:1});
				tmp_position = staticOne.position;
				debug('tmp_position is '+tmp_position);
				staticOne.position = movingPlayer.position;
				debug('staticOne.position is '+staticOne.position);
				movingPlayer.position = tmp_position;
				debug('movingPlayer.position is '+movingPlayer.position);
				movingPlayer.slot = 1;
				//oneSwitch = true;
			}
		} else if(positionTwo(movingPlayerX) && movingPlayer != staticTwo){
			if(!twoSwitch){
				debug('Position Two Running');
				staticTwo.animate({center:{x:movingPlayer.position,y:movingPlayerY}, duration:1});
				staticTwoLabel.animate({center:{x:movingPlayer.position,y:playerLabelY}, duration:1});
				tmp_position = staticTwo.position;
				debug('tmp_position is '+tmp_position);
				staticTwo.position = movingPlayer.position;
				debug('staticTwo.position is '+staticTwo.position);
				movingPlayer.position = tmp_position;
				debug('movingPlayer.position is '+movingPlayer.position);
				movingPlayer.slot = 2;
				//twoSwitch = true;
			}
		} else if(positionThree(movingPlayerX) && movingPlayer != staticThree){
			if(!threeSwitch){
				debug('Position Three Running');
				staticThree.animate({center:{x:movingPlayer.position,y:movingPlayerY}, duration:1});
				staticThreeLabel.animate({center:{x:movingPlayer.position,y:playerLabelY}, duration:1});
				tmp_position = staticThree.position;
				staticThree.position = movingPlayer.position;
				movingPlayer.position = tmp_position;
				movingPlayer.slot = 3;
				//threeSwitch = true;
			}
		} else if(positionFour(movingPlayerX) && movingPlayer != staticFour){
			if(!fourSwitch){
				debug('Position Four Running');
				staticFour.animate({center:{x:movingPlayer.position,y:movingPlayerY}, duration:1});
				staticFourLabel.animate({center:{x:movingPlayer.position,y:playerLabelY}, duration:1});
				tmp_position = staticFour.position;
				staticFour.position = movingPlayer.position;
				movingPlayer.position = tmp_position;
				movingPlayer.slot = 4;
				//fourSwitch = true;
			}
		}
	}
	
	var setMoveEvents = function(){
		var oldX, newX, newY, labelY;
		for(var i=0;i<possiblePlayers;i++){
			thePlayerButtons[i].addEventListener("touchmove", function(e){
			    if(e.source.name == i) {
			    	oldX = newX;
			        newX = e.x;
			        newY = 384;
			        labelY = 451;
			    } else {
			    	oldX = newX;
			        newX = e.x + this.animatedCenter.x - this.width/2;
			        newY = 384;
			        labelY = 451;
			    }
			    this.animate({center:{x:newX,y:newY}, duration:1});
			    //PlayerLabels[i].animate({center:{x:newX,y:labelY}, duration:1});
				if(leftDirection(oldX, newX) && passedBoundary(this, newX)){
						debug('switching should happen to the left');
					if(this.id>0){
						slidePlayerRight(this, newY, labelY);
				 		//switchPlayers(this, newX, newY, labelY);
					}
				} else if(rightDirection(oldX, newX) && passedBoundary(this, newX)){
						debug('switching should happen to the right');
					if(this.id<3){
						slidePlayerLeft(this, newY, labelY);
				 		//switchPlayers(this, newX, newY, labelY);
					}
				} else {
					debug('im dragging '+this.id)
 					debug('moving player mids '+this.mids.midRight)
 					debug('moving player mids '+this.position)
				}
			});
		}
	}
	
	var setDroppedEvents = function(){
		for(var i=0;i<possiblePlayers;i++){
			thePlayerButtons[i].addEventListener("touchend", function(e){
				reindexAllPlayerButtons(thePlayerButtons);
			});
		}
	}
	
	setMoveEvents();
	setDroppedEvents();
	
	var tmp_mids;
	var slidePlayerLeft = function(movingPlayer, newY, labelY){
 		thePlayerButtons[movingPlayer.position+1].animate({left:positions[movingPlayer.position], duration:2});
 		PlayerLabels[movingPlayer.position+1].animate({center:{x:movingPlayer.left,y:labelY}, duration:2});
 		tmp_mids = movingPlayer.mids;
 		movingPlayer.mids = thePlayerButtons[movingPlayer.position+1].mids;
 		thePlayerButtons[movingPlayer.position+1].mids = tmp_mids;
 		thePlayerButtons[movingPlayer.position+1].position--;
 		movingPlayer.position++;
		for(var i=0;i<possiblePlayers;i++){
			debug('positions after slide are '+thePlayerButtons[i].position);
		}
	}
	
	var slidePlayerRight = function(movingPlayer, newY, labelY){
 		thePlayerButtons[movingPlayer.position-1].animate({left:positions[movingPlayer.position], duration:2});
 		PlayerLabels[movingPlayer.position-1].animate({center:{x:movingPlayer.left,y:labelY}, duration:2});
 		tmp_mids = movingPlayer.mids;
 		movingPlayer.mids = thePlayerButtons[movingPlayer.position-1].mids;
 		thePlayerButtons[movingPlayer.position-1].mids = tmp_mids;
 		thePlayerButtons[movingPlayer.position-1].position++;
 		movingPlayer.position--;
		for(var i=0;i<possiblePlayers;i++){
			debug('positions after slide are '+thePlayerButtons[i].position);
		}
	}
	var passedBoundary = function(playerButton, newX){
		if(newX<playerButton.mids.midLeft){
			debug('passed left boundary left '+playerButton.mids.midLeft);
			return true;
		} else if(newX>playerButton.mids.midRight){
			debug('passed right boundary right '+playerButton.mids.midRight);
			return true;
		} else {
			debug(newX);
			debug('didnt pass boundary left: '+playerButton.mids.midLeft+' or right: '+playerButton.mids.midRight);
			return false;
		}
	}

	var reindexAllPlayerButtons = function(myArray){
		myArray.sort(function(a, b){
			return a.position-b.position;
		})
		
		for(var i=0;i<possiblePlayers;i++){
			myArray[i].id = myArray[i].position;
			debug('new position thePlayerButtons is '+myArray[i].position);
			debug('new id thePlayerButtons is '+myArray[i].id);
		}
	}
	
	var leftDirection = function(oldX, newX){
		if(newX<oldX){
			return true;
		} else {
			return false;
		}
	}
	
	var rightDirection = function(oldX, newX){
		if(newX>oldX){
			return true;
		} else {
			return false;
		}
	}
	
	// verifies that movingPlayerX is within the boundaries of each section.
var positionOne = function(movingPlayerX){
	var left = 200;
	var right = 300;
	if(movingPlayerX>left && movingPlayerX<right){
		return true;
	} else {
		return false;
	}
}
var positionTwo = function(movingPlayerX){
	var left = 300;
	var right = 400;
	if(movingPlayerX>left && movingPlayerX<right){
		return true;
	} else {
		return false;
	}
}
var positionThree = function(movingPlayerX){
	var left = 400;
	var right = 500;
	if(movingPlayerX>left && movingPlayerX<right){
		return true;
	} else {
		return false;
	}
}
var positionFour = function(movingPlayerX){
	var left = 500;
	var right = 600;
	if(movingPlayerX>left && movingPlayerX<right){
		return true;
	} else {
		return false;
	}
}
	// thePlayerButtons[0].addEventListener("touchmove", function(e){
	    // var newX, newY, labelY;
	    // if(e.source.name == '0') {
	        // newX = e.x;
	        // newY = 384;
	        // labelY = 451;
	    // } else {
	        // newX = e.x + thePlayerButtons[0].animatedCenter.x - thePlayerButtons[0].width/2;
	        // newY = 384;
	        // labelY = 451;
	    // }
	 	// if(newX>leftLimit && newX<rightLimit){
	 		// // next two lines animate the drag.
		    // thePlayerButtons[0].animate({center:{x:newX,y:newY}, duration:1});
		    // PlayerLabels[0].animate({center:{x:newX,y:labelY}, duration:1});
		    // // checks to switch player positions
		    // switchPlayers(this, newX, newY, labelY);
		// }
	// });
// 	
	// thePlayerButtons[1].addEventListener("touchmove", function(e){
	    // var newX, newY, labelY;
	    // if(e.source.name == '1') {
	        // newX = e.x;
	        // newY = 384;
	        // labelY = 451;
	    // } else {
	        // newX = e.x + thePlayerButtons[1].animatedCenter.x - thePlayerButtons[1].width/2;
	        // newY = 384;
	        // labelY = 451;
	    // }
	 	// if(newX>leftLimit && newX<rightLimit){
		    // thePlayerButtons[1].animate({center:{x:newX,y:newY}, duration:1});
		    // PlayerLabels[1].animate({center:{x:newX,y:labelY}, duration:1});
		    // switchPlayers(this, newX, newY, labelY);
		// }
	// });
// 	
	// thePlayerButtons[2].addEventListener("touchmove", function(e){
	    // var newX, newY, labelY;
	    // if(e.source.name == '2') {
	        // newX = e.x;
	        // newY = 384;
	        // labelY = 451;
	    // } else {
	        // newX = e.x + thePlayerButtons[2].animatedCenter.x - thePlayerButtons[2].width/2;
	        // newY = 384;
	        // labelY = 451;
	    // }
	 	// if(newX>leftLimit && newX<rightLimit){
		    // thePlayerButtons[2].animate({center:{x:newX,y:newY}, duration:1});
		    // PlayerLabels[2].animate({center:{x:newX,y:labelY}, duration:1});
		    // switchPlayers(this, newX, newY, labelY);
		// }
	// });
// 	
	// thePlayerButtons[3].addEventListener("touchmove", function(e){
	    // var newX, newY, labelY;
	    // if(e.source.name == '3') {
	        // newX = e.x;
	        // newY = 384;
	        // labelY = 451;
	    // } else {
	        // newX = e.x + thePlayerButtons[3].animatedCenter.x - thePlayerButtons[3].width/2;
	        // newY = 384;
	        // labelY = 451;
	    // }
	 	// if(newX>leftLimit && newX<rightLimit){
		    // thePlayerButtons[3].animate({center:{x:newX,y:newY}, duration:1});
		    // PlayerLabels[3].animate({center:{x:newX,y:labelY}, duration:1});
		    // switchPlayers(this, newX, newY, labelY);
		// }
	// });
}


	// thePlayerButtons[0].addEventListener("touchend", function(e){})
	// thePlayerButtons[1].addEventListener("touchend", function(e){})
	// thePlayerButtons[2].addEventListener("touchend", function(e){})
	// thePlayerButtons[3].addEventListener("touchend", function(e){})
	
var paintPossibleSets = function(){
	// Buttons for user to select number of sets
	for(var i=0;i<Games.Cricket.sets.length;i++){
		var leftMargin = 29 + (14*i) + '%';
		possibleSets[i] = Titanium.UI.createButton({
			color:'#fff',
			backgroundImage: 'images/ipad/blank-set.png',
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
		possibleSetTap(possibleSet);
		setsSelect.add(possibleSet);
	}
}

var GameView = Titanium.UI.createView({
	id: 'Cricket View',
	backgroundImage:'images/ipad/cricket-dark-wood.jpg',
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
	backgroundImage: 'images/ipad/dartIndicator.png',
	height: 13,
	width: 13,
	left: 26,
});

var indicator2 = Titanium.UI.createLabel({
	id: 'Indicator 2',
	backgroundImage: 'images/ipad/dartIndicator.png',
	height: 13,
	width: 13,
	left: 13,
});

var indicator3 = Titanium.UI.createLabel({
	id: 'Indicator 3',
	backgroundImage: 'images/ipad/dartIndicator.png',
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
			leftSpace = (20*players[i].id) + '%'
		} else if (players[i].id>1){
			leftSpace = (20*players[i].id) + 20 + '%'
		}
		turnBanners[i] = Titanium.UI.createImageView({
			image: 'images/ipad/banner.png',
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
	backgroundImage:'images/ipad/PlayButtonDisabled.png',
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




debug(thePlayerButtons);






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

Titanium.include('../../models/options.js');
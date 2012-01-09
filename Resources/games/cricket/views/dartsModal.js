var modalIsVisible = false;

var dartsModal = Titanium.UI.createView({
	borderRadius:10,
	backgroundImage:'images/dartsModal.png',
	width:108,
	height:75,
	owner: null,
	myView: null,
});

var dartsModalBull = Titanium.UI.createView({
	borderRadius:10,
	backgroundImage:'images/bullseyeModal.png',
	width:65,
	height:76,
	bottom: 145,
	owner: null,
	myView: null,
});

var dartsxtwo = Titanium.UI.createButton({
	title: '',
	backgroundImage: 'images/double.png',
	width: 44,
	height: 44,
	worth: 2,
	top: 8,
	touchEnabled: true
});

var dartsxthree = Titanium.UI.createButton({
	title: '',
	color:'#fff',
	backgroundImage: 'images/triple.png',
	width: 44,
	height: 44,
	worth: 3,
	right: 10,
	top: 8,
	touchEnabled: true
});

var removeModal = function(){
	theModal.animate(fadeOutSlow);
	if (throwsThisRound == 3){
		changeTurn();
		dartsModal.myView.remove(theModal);
		modalIsVisible = false;
	};
};

var killModal = function(){	
	if (modalIsVisible){
		dartsModal.myView.remove(theModal);
		modalIsVisible = false;
	};
}

var modalTimer;
var theModal = null;
var addDartsModal = function(btn, theView, topPlacement){
	killModal();
	modalIsVisible = true;
	clearTimeout(modalTimer);
	dartsModal.top = topPlacement;
	dartsModal.button = btn;
	dartsModal.myView = theView;
	dartsModalBull.myView = theView;
	if(btn.worth<25){
		dartsxtwo.left = 10;
		theModal = dartsModal;
		dartsModal.add(dartsxtwo);
		dartsModal.add(dartsxthree);
		theView.add(dartsModal);
		dartsModal.opacity = 1;
	} else {
		dartsxtwo.left = null;
		theModal = dartsModalBull;
		dartsModalBull.add(dartsxtwo);
		theView.add(dartsModalBull);
		dartsModalBull.opacity = 1;
	}
	modalTimer = setTimeout(removeModal,3000);
}

dartsxtwo.addEventListener('click', function(){
	multiplierHit(this.worth);
});

dartsxthree.addEventListener('click', function(){
	multiplierHit(this.worth);
});


var multiplier = 0;
var multiplierHit = function(worth){
	// Subtract one because of the original hit to bring up the modal
	multiplier = worth;
	totalThrows--;
	throwsThisRound--;
	dartsModal.button.hits--;
	numberTracker.splice(totalThrows,1);
	button_calc(dartsModal.button, worth, dartsModal.button.owner);
	killModal();
	if (throwsThisRound == 3){
		changeTurn();
	};
	clearTimeout(modalTimer);
}

// Calculates points based on multiplier
var points = 0;
var indicator = null;
var button_calc = function(button, multiplier, owner){
	totalThrows++;
	throwsThisRound++;
	removeIndicator(throwsThisRound);
	playerFinishedNums(currentPlayerIndex);
	players[button.playerNum].throwsThisRound = throwsThisRound;
	if(throwsThisRound == 3){
		miss.touchEnabled = false;
	}
	numberTracker.push({button: button, multiplier: multiplier});
	for(plus = 0; plus<multiplier; plus++){
		button.hits++;
		calculate_points(button, button.worth, button.hits);
		if(available_to_score(button, button.hits)){
			highlight(button);
			for(var i = 0; i < allNumbers; i++){
				points += ~~(button.parent.children[i].title);
			}
			printScore(button.parent.children[8], points);
			players[currentPlayerIndex].score = points;
			points = 0;
		}
		if(!someoneFinished) {
			checkClosedNums(button.parent.children);
		} else if(someoneFinished) {
			winner(button.parent.children);
		} else {

		}
		if(closeNumbers(button.index)){
			break;
		};
	}
		/*
		var currentNumHits = db2.execute("SELECT 'count_" + button.worth + "' FROM playersTabels4 WHERE name = '" + owner + "'");
		if (currentNumHits.isValidRow()){
			debug('sweet there');
			var newhits = 13;
			//var numberHit = db2.execute("UPDATE playersTabels4 SET count_" + button.worth + " = '7' WHERE name = '" + owner + "'");
			var numberHit = db2.execute("UPDATE playersTabels4 SET count_"+button.worth+" = "+newhits+" WHERE name = '" + owner + "'");
			
		} else {
			debug('not there');
		}
		*/
		//var rows = db2.execute("INSERT 1 FROM playersTabels3 WHERE name= '" + owner + "'");
			// var rows = db2.execute('INSERT INTO playersTabels3 (nineteen) VALUES (1) WHERE name = Freddie009');
		// 
		// var imagesString = rows.fieldByName('nineteen');
		// var numberHit = db2.execute("UPDATE '" + button + "' FROM playersTabels3 WHERE name = '" + playerName + "'");
		// if (playerExists.isValidRow()){
			// debug('its there')
		// } else {
			// debug('not there');
			// db2.execute('INSERT INTO playersTabels3 (name) VALUES (?)',playerName);
		// }
	
}
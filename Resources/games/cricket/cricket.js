
Titanium.include('models/players.js');
Titanium.include('models/calculations.js');
Titanium.include('views/dartsModal.js');
 
var numbersView = Titanium.UI.createView({
	id: 'Numbers',
	backgroundImage:'images/numbers_bg.jpg',
	width:175,
	zIndex: 3,
});

Titanium.include('views/buttons.js');
Titanium.include('views/gameOptions.js');
Titanium.include('models/transitions.js');


var clearThrownDarts = function(){
	for(var i=0;i<totalPlayers;i++){
		players[i].throwsThisRound = 0;
	}
}

Titanium.include('models/closer.js');

undoPoints.addEventListener('click', function(){
	if (totalThrows > 0) {
		killModal();
		undo();
		clearTimeout(modalTimer);
	}
});

GameView.add(numbersView);
numbersView.add(undoPoints);


Titanium.include('models/players.js');
Titanium.include('models/calculations.js');
 


Titanium.include('models/transitions.js');


var clearThrownDarts = function(){
	for(var i=0;i<totalPlayers;i++){
		players[i].throwsThisRound = 0;
	}
}

Titanium.include('models/closer.js');


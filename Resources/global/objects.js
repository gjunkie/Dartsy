
// Global Player Object
var Player = function(id,name, parent) {
	this.id = id;
	this.parent = parent;
	this.name = name;
	this.turn = false;
	this.throwsThisRound = 0;
	this.turns = 0;
	this.startedTurn = false;
	this.score = 0;
	this.wins = 0;
	this.closedNums = 0;
	this.allClosed = false;
	this.losses = 0;
	this.shots = 0;
	this.buttons = [];
	this.numbers = [
		20, 
		19, 
		18, 
		17, 
		16, 
		15, 
		25 
	];
}

// Cricket Object
var Cricket = function() {
	this.id = id;
	this.numbers = [
		20, 
		19, 
		18, 
		17, 
		16, 
		15, 
		25 
	];
}

var SetAllPlayers = function(totalPlayers){
	for(i=1;i<=totalPlayers;i++){
		if(i==1){
			var currentTurn = true;
		} else {
			var currentTurn = false;
		}
		Player.push({
			name : '',
			score : 0,
			turn : currentTurn,
			turnCount : 0,
			wins : 0,
			sets_won : 0,
			total_throws : 0,
		});
	}
}

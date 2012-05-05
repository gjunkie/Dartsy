
/*
 * View elements for the game selection screen
 */

var gameChoices = [];

var gameSelectView = Titanium.UI.createView({
	id: 'Game Selector',
	backgroundImage:'images/'+device+'/cricket-intro-bottom.jpg',
});


var selectCricket = Titanium.UI.createButton({
	backgroundImage:'images/'+device+'/PlayButtonDisabled.png',
	backgroundSelectedImage:'',
	borderRadius: 10,
	title:'',
	width:112,
	height: 112,
});
debug(Object.keys(Games.Cricket[0]))
var paintGameButtons = function(){
	for(var i=0;i<Object.keys(Games).length;i++){
		gameChoices[i] = Titanium.UI.createButton({
			index: i,
			color:'#fff',
			backgroundImage:'images/ipad/button.png',
			backgroundColor:'#ffffff',
			title:'',
			font:{fontSize:50,fontFamily:'Futura-CondensedMedium'},
			textAlign:'center',
			width:105,
			height: 105,
			top: 100,
			touchEnabled: true,
		});
		gameChoice = gameChoices[i];
		GameSelectWindow.add(gameChoice);
	}
}
paintGameButtons();
GameSelectWindow.add(selectCricket);

Titanium.include('../../models/gameSelect.js');
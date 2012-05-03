
/*
 * View elements for the game selection screen
 */

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

GameSelectWindow.add(selectCricket);

Titanium.include('../../models/gameSelect.js');
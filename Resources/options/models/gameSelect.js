
selectCricket.addEventListener('click', function(){
	Titanium.include('games/cricket/views/'+device+'/tutorial.js');
	Titanium.include('games/cricket/views/'+device+'/dartsModal.js');
	Titanium.include('games/cricket/views/'+device+'/buttons.js');
	Titanium.include('games/cricket/views/'+device+'/gameOptions.js');
	Titanium.include('games/cricket/globalVariables.js');
	Titanium.include('games/cricket/cricket.js');
	Titanium.include('games/cricket/models/global.js');
	if(!(Ti.App.Properties.hasProperty('firstLaunch'))){
		tutorialWindow.open();
	} else {
		PlayerSelectWindow.open();
	}
});
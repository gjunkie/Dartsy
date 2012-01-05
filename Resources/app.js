// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundImage('#000');

var debug = function(code){
	Ti.API.info(code);
}

Titanium.include('games/cricket/models/db.js');

createOrRunDb();


// Games Available
// Available numbers should list bullseye last
var Games = { 
	Cricket : {
		avail_nums : [
			20, 
			19, 
			18, 
			17, 
			16, 
			15, 
			25 
		],
		play : false,
		sets: [1,3,5],
		rounds: 0,
	}
};

if(Titanium.Platform.osname == 'ipad'){
	var possiblePlayers = 4;
	var win1 = Titanium.UI.createWindow({  
	    title:'Instructions',
	});
	var win2 = Titanium.UI.createWindow({  
	    title:'Cricket',
	});
}

if(Titanium.Platform.osname == 'iphone'){
	var possiblePlayers = 2;
	var win1 = Titanium.UI.createWindow({  
	    title:'Instructions',
	});
	var win2 = Titanium.UI.createWindow({  
	    title:'Cricket',
	});
}

Titanium.include('games/cricket/models/global.js');
Titanium.include('games/cricket/views/options.js');
Titanium.include('games/cricket/cricket.js');

// open window with name fields
win1.open();


if(Titanium.Platform.osname == 'ipad'){
	Ti.API.debug('iPad');
} else if(Titanium.Platform.osname == 'iphone'){
	Ti.API.debug('iPhone');
}

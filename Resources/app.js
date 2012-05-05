
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundImage('#000');

var debug = function(code){
	Ti.API.debug(code);
}

Titanium.include('global/db.js');

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

var Facts = [
	'An old name for a dartboard is "butt"; the word comes from the French word "but", meaning "target".',
	'The London Fives board has only 12 equal segments numbered 20,5,15,10,20,5,15,10,20,5,15,10 with the doubles and triples being a quarter of an inch wide.',
	'The standard numbering plan with a 20 on top was created in 1896 by Lancashire carpenter Brian Gamlin. It was devised to penalise inaccuracy.',
	'The left-hand side (near the 14 section) is preferred by beginners for its concentration of larger numbers.',
	'Mathematically, removing the rotational symmetry by placing the "20" at the top, there are 19!, or 121,645,100,408,832,000 possible dartboards.',
	'In the standard game, the dartboard is hung so that the bullseye is 5 feet 8 inches (172.72 cm) from the floor—eye-level for a 6-foot (180 cm) person.',
	'Initially the darts were simply cut down arrows or crossbow bolts.', 
	'The first purpose-made darts were manufactured in one piece from wood; wrapped with a strip of lead for weight and fitted with flights made from split turkey feathers.',
	'A perfect game of Cricket requires 8 throws, each hitting all triples, and the last two hitting a single and double bullseye.',
	'Hitting three bullseyes is called a "hat Trick"',
	'Supposedly based on the typical price of lodging in an old English hostelry (2 shillings and 6 pence), scoring 20, 5, and 1 is called a Bed and Breakfast.',
	'When all three darts hit the same number it is called "Three in a Bed".',
];

// All views common to all devices
var GameSelectWindow = Titanium.UI.createWindow({  
    title:'Game Select',
});
var PlayerSelectWindow = Titanium.UI.createWindow({  
    title:'Player Select',
});
var win3 = Titanium.UI.createWindow({  
    title:'Players View',
});
var win4 = Titanium.UI.createWindow({  
    title:'New Player View',
});
var win5 = Titanium.UI.createWindow({  
    title:'Player Stats View',
});
var CricketWindow = Titanium.UI.createWindow({  
    title:'Player Stats View',
});	
var tutorialWindow = Titanium.UI.createWindow({  
    title:'Tutorial',
});

var ipad = false;
var iphone = false;
var device;
var possiblePlayers = 4;

var iOSCheck = function(){
	if(Titanium.Platform.osname == 'ipad'){
		ipad = true;
		device = 'ipad';
	} else if(Titanium.Platform.osname == 'iphone'){
		iphone = true;
		device = 'phone';
	}
	if(iphone || ipad){
		Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;
	}
}
iOSCheck();

Titanium.include('options/views/'+device+'/gameSelect.js');
Titanium.include('options/views/'+device+'/playerSelect.js');
//Titanium.include('games/cricket/views/ipad/help.js');


paintPlayerSelections();
paintPossibleSets();

pickRandomProperty(Facts);

GameSelectWindow.open();


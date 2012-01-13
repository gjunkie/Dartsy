
// Show Hide players slider in options screen
var playersSliderExposeTop = Titanium.UI.createAnimation();
    playersSliderExposeTop.top = '-6%';
    playersSliderExposeTop.duration = 250;

var playersSliderExposeBottom = Titanium.UI.createAnimation();
    playersSliderExposeBottom.bottom = '-6%';
    playersSliderExposeBottom.duration = 250;
    
var playersSliderHideTop = Titanium.UI.createAnimation();
    playersSliderHideTop.top = '0%';
    playersSliderHideTop.duration = 250;
    playersSliderHideTop.addEventListener('complete', function(){
		PlayerName.blur();
    })

var playersSliderHideBottom = Titanium.UI.createAnimation();
    playersSliderHideBottom.bottom = '0%';
    playersSliderHideBottom.duration = 250;

// Show Hide players slider in options screen when already open
var playersSliderShowHideTop = Titanium.UI.createAnimation();
    playersSliderShowHideTop.top = '0%';
    playersSliderShowHideTop.duration = 250;
	playersSliderShowHideTop.autoreverse = true;

var playersSliderShowHideBottom = Titanium.UI.createAnimation();
    playersSliderShowHideBottom.bottom = '0%';
    playersSliderShowHideBottom.duration = 250;
	playersSliderShowHideBottom.autoreverse = true;


// Game transitions up/down
var gameSlideUp = Titanium.UI.createAnimation();
    gameSlideUp.top = -94;
    gameSlideUp.bottom = 94;
    gameSlideUp.duration = 250;
    gameSlideUp.addEventListener('complete',function(){
		GameOptionsVisible = true;
    });
    
var gameSlideDown = Titanium.UI.createAnimation();
    gameSlideDown.top = 0;
    gameSlideDown.bottom = 0;
    gameSlideDown.duration = 250;
    gameSlideDown.addEventListener('complete',function(){
		GameOptionsVisible = false;
    });
    
// Fade out modal
var fadeOutSlow = Titanium.UI.createAnimation();
    fadeOutSlow.opacity = 0;
    fadeOutSlow.duration = 500;
    fadeOutSlow.addEventListener('complete',function(){
    	modalIsVisible = false;
    })

// Show/Hide numbers when closing or undoing
var hideNumber = Titanium.UI.createAnimation();
	hideNumber.opacity = 0;
	hideNumber.duration = 1000;
var showNumber = Titanium.UI.createAnimation();
	showNumber.opacity = 1;
	showNumber.duration = 750;

// Make Semi See Thru
var notSeeThru = Titanium.UI.createAnimation();
	notSeeThru.opacity = 1;
	notSeeThru.duration = 250;

var seeThru = Titanium.UI.createAnimation();
	seeThru.opacity = .2;
	seeThru.duration = 250;

// Scorable Numbers
var canScore = Titanium.UI.createAnimation();
	canScore.borderColor = '#e5e5e5';
	canScore.borderWidth = 2;
	canScore.duration = 500;

var cantScore = Titanium.UI.createAnimation();
	cantScore.borderColor = '#e5e5e5';
	cantScore.borderWidth = 2;
	cantScore.duration = 500;

// Miss Button Pressed
var buttonPressed = Titanium.UI.createAnimation();
	buttonPressed.top = -10;
	buttonPressed.duration = 50;
	buttonPressed.autoreverse = true;
	
	
// Help View Animations
var helpViewShow = Titanium.UI.createAnimation();
	helpViewShow.left = '100%';
	helpViewShow.duration = 250;

var helpViewHide = Titanium.UI.createAnimation();
	helpViewHide.left = '0%';
	helpViewHide.duration = 250;

// Turn Banners
// Pass in the banner object and direction as string: 'up', 'down'
var top;
var slideBanner = function(banner, direction){
	debug(direction);
	if (direction == 'down'){
		top = 0;
	} else if (direction == 'up'){
		top = -127;
	}
	var turnBannerSlider = Titanium.UI.createAnimation();
	turnBannerSlider.duration = 250;
	turnBannerSlider.top = top;
	banner.animate(turnBannerSlider);
}
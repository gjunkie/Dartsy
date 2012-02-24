var tutorial;
var page1 = Titanium.UI.createView({backgroundImage:'images/phone/tutorial/page1-bg.png', height:460, bottom: -60 });
var page2 = Titanium.UI.createView({backgroundImage:'images/phone/tutorial/page2-bg.png', height:480, top: -20});
var page3 = Titanium.UI.createView({backgroundImage:'images/phone/tutorial/page3-bg.png', height:480, top: -20});
var page4 = Titanium.UI.createView({height:480, top: -20});

var scrollView = Titanium.UI.createScrollableView({
	bottom: 0,
	height: 460,
	left: 0,
	views:[page1,page2,page3,page4], 
	showPagingControl:true,
	pagingControlHeight: 60,
	pagingControlColor: 'none',
	backgroundImage: 'images/phone/tutorial/tutorial-bg.jpg'
});

tutorialWindow.add(scrollView);


// Page 2
var pageTwoTextLine1 = Titanium.UI.createLabel({
	text: 'To change turns, tap a player\'name. Dartsy will',
	font:{fontSize:16,fontFamily:'Futura-CondensedMedium'},
	textAlign: 'center',
	color: '#ffffff',
	height: 20,
	bottom: 100,
})

var pageTwoTextLine2 = Titanium.UI.createLabel({
	text: 'assume misses for any players skipped.',
	font:{fontSize:16,fontFamily:'Futura-CondensedMedium'},
	textAlign: 'center',
	color: '#ffffff',
	height: 20,
	bottom: 80,
})

page2.add(pageTwoTextLine1);
page2.add(pageTwoTextLine2);

// Page 3
var pageThreeTextLine1 = Titanium.UI.createLabel({
	text: 'To score doubles and triples, hold down the number',
	font:{fontSize:16,fontFamily:'Futura-CondensedMedium'},
	textAlign: 'center',
	color: '#ffffff',
	height: 20,
	bottom: 100,
})

var pageThreeTextLine2 = Titanium.UI.createLabel({
	text: 'you scored on to reveal your options.',
	font:{fontSize:16,fontFamily:'Futura-CondensedMedium'},
	textAlign: 'center',
	color: '#ffffff',
	height: 20,
	bottom: 80,
})

page3.add(pageThreeTextLine1);
page3.add(pageThreeTextLine2);


// Page 4
var tutorialPlayButton = Titanium.UI.createButton({
	backgroundImage:'images/phone/tutorial/page4-play.png',
	width: 113,
	height: 113,
})

tutorialPlayButton.addEventListener('click', function(){
	Ti.App.Properties.setBool('firstLaunch',true);
	win1.open();
	tutorialWindow.close();
})

page4.add(tutorialPlayButton);

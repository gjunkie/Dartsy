var tutorial;
var page1 = Titanium.UI.createView({backgroundImage:'images/phone/tutorial/page1-bg.png'});
var page2 = Titanium.UI.createView({backgroundImage:'images/phone/tutorial/page2-bg.png'});
var page3 = Titanium.UI.createView({backgroundImage:'images/phone/tutorial/page3-bg.png'});
var page4 = Titanium.UI.createView({backgroundImage:'images/phone/tutorial/page4-bg.png'});

var scrollView = Titanium.UI.createScrollableView({ 
	views:[page1,page2,page3,page4], 
	showPagingControl:true,
	pagingControlHeight: 40,
	pagingControlColor: '#333',
	backgroundImage: 'images/phone/tutorial/tutorial-bg.jpg'
});

tutorialWindow.add(scrollView);
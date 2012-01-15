var modalIsVisible = false;

var dartsModal = Titanium.UI.createView({
	id: 'dartsModal',
	borderRadius:10,
	backgroundImage:'images/dartsModal.png',
	width:108,
	height:75,
	owner: null,
	myView: null,
});

var dartsModalBull = Titanium.UI.createView({
	id: 'dartsModalBull',
	borderRadius:10,
	backgroundImage:'images/bullseyeModal.png',
	width:65,
	height:76,
	bottom: 145,
	owner: null,
	myView: null,
});

var dartsxtwo = Titanium.UI.createButton({
	title: '',
	backgroundImage: 'images/double.png',
	width: 44,
	height: 44,
	worth: 2,
	top: 8,
	touchEnabled: true
});

var dartsxthree = Titanium.UI.createButton({
	title: '',
	color:'#fff',
	backgroundImage: 'images/triple.png',
	width: 44,
	height: 44,
	worth: 3,
	right: 10,
	top: 8,
	touchEnabled: true
});

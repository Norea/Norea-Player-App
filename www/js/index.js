var isMain = false;
var isPlaying = false;
var program = "";
var text = "";

if(document != undefined){
	document.addEventListener("deviceready", onDeviceReady, false);
}

function assignHTML(el,html){
	document.getElementById(el).innerHTML = html;
}

function setStyle(el,key,val){
	var locObj = document.getElementById(el);
	if (locObj != undefined) {
		if (locObj.style != undefined) {
			document.getElementById(el).style[key] = val;
		}
	}
}

function displayElement(el,visible){
	if (visible) {
		setStyle(el,"display","block");
	} else {
		setStyle(el,"display","none");
	}
}

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

function displayElementByClassName(el,visible){
	var elements = new Array();
	elements = getElementsByClassName(el);
	for(i in elements ){
		if (visible) {
			elements[i].style.display = "block";
		} else {
			elements[i].style.display = "none";
		}
	}
}


/* returns the HTML for a hide box */
function makeHideBox(content, action){
	return '<div id="hidebox" class="hide" title="" onclick="' + action + '"><div id="textbox">' 
			+ content +'</div><div id="overlay" class="show"></div></div>';
}

function onDeviceReady(){
	loadMenu(); // loads main menu

	// checks if we need to compensate for iOS status bar
	if(window.device.platform.toLowerCase() == "ios" && parseFloat(window.device.version) >= 7.0){
		setStyle("header","padding-top","20px");
		setStyle("content","margin-top","120px");
  }

	// hide splash screen
	cordova.exec(null, null, "SplashScreen", "hide", []);

	setTimeout(function(){
		// adds event listener for Android back button
		document.addEventListener("backbutton", backButton, false);

		uiListener(); // adds listener for scrubber bar
	},1);
}

function getjson(url, content){
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.addEventListener("load", function(){
    if(req.status < 400){
      content(req.responseText);
		}
		else {
			content("error");
		}
  });
  req.overrideMimeType("application/json");
  req.send(null);
}

/* handles Android backbutton event */
function backButton(){
	if(isMain){
		if(isPlaying){
			playpause();
		}
		navigator.app.exitApp();
	}
	else{
		loadMenu();
	}
}

/* decides if the "to top" button should be changed */
var showsTopBtn = false;
function scroll(){
	if(!isMain){
		if(window.scrollY>500){
			if(!showsTopBtn){ // prevents changing style at every event call
				showTop();
			}
		}
		else if(showsTopBtn){ // prevents changing style at every event call
		 	hideTop()
		}
	}
}

function sortEpItemByInx( a, b ) {
	var iA = parseInt(a.Index);
	var iB = parseInt(b.Index);
	if (iA < iB) return -1;
	if (iA > iB) return 1;
	return 0;
}

function loadMenu() {
	isMain = true;
	var isFirstMenu = true;
	var mainMenu = "";
	var mainHeader = "";
	for(var index in add_data.swe.items) { 
		var locObj = add_data.swe.items[index];
		var locStrBeg = '<a class="';
		var locStrEnd = ' '+index+'" onclick="loadSerie(\''+index+'\',\'\','+isFirstMenu+');"><img src="'+locObj.Image+'" alt="'+locObj.Title +'">'
						+'<h1>'+locObj.Title+'</h1><p>'+locObj.ShortDescription+'</p></a>';
		if (isFirstMenu) { // Make this the header entry
			mainHeader = locStrBeg+"main-menu"+locStrEnd;
			mainMenu = makeHideBox('<p><b>'+locObj.Title+'</b>'+locObj.ShortDescription+'</p>','loadSerie(\''+index+'\',\'\','+isFirstMenu+');');
			isFirstMenu = false;
		} else { // standard menu entry
			mainMenu += locStrBeg+"menu"+locStrEnd;
		}
	}

	assignHTML("content",mainMenu);
	var locObj = add_data.swe.items.swe_norea_info;
	assignHTML("header",mainHeader);
}

/* shows the "to top" button */
function showTop(){
	displayElement("toTop",true);
	displayElementByClassName("headerLogo",false);
	showsTopBtn = true;
}

/* hides the "to top" button */
function hideTop(){
	displayElement("toTop",false);
	displayElementByClassName("headerLogo",true);
	showsTopBtn = false;
}

/* scrolls to top */
function toTop(){
	window.scrollTo(0,0);
}

function GetBiblebookInfo(osisRef) {
	var locObj = bible_data.bible_books.sv[osisRef];
	return locObj;
}

function GetOsisBiblebook(osisRef) {
	return osisRef.split('.', 1)[0];
}

function GetBibleBooksSorted(section){
	var bookOrder = add_data.swe.bibleBookOrder;
	var locSectionArr = bible_data.bibleBooksInSection[section];
	var locBookArr = bible_data.bible_books.sv;
	var retArr = [];
	for(var index in bible_data.bibleBookOrderOsis[bookOrder]) { 
	    if (locSectionArr[index] != undefined) {
			var curObj = locBookArr[index];
			curObj["osisRef"] = index;
			retArr.push(curObj);
		}
	}
	return retArr;
}

function getBibleSectionTitle(lang,section){
	var locSection = bible_data.bible_part_title[section];
	var locLangCode = add_data[lang].iso639_1;
	return locSection[locLangCode];
}

function getBibleSectionStr(lang,section){
	var locList = '';
	var locBibleBooks = GetBibleBooksSorted(section);
	for(var index in locBibleBooks) {
		var locKey = locBibleBooks[index].osisRef; 
		var locObj = GetBiblebookInfo(locKey);
		locList += '<a onclick="loadSerie(\'l4m_ser_swe_vgb\',\''+locKey+'\',false);" title="'+locObj.Title+'"><p>'+locObj.ShortTitle+'</p></a>';
	}
	return  '<div id="'+section+'">'+
				'<h3>'+getBibleSectionTitle(lang,section)+'</h3>'+locList+
			'</div>';
}

function loadBible(lang){
	isMain = false;
	toTop();
	var backHeader = '<a onclick="loadSerie(\'l4m_ser_swe_vgb\',\'\',false);" id="back">Tillbaka till VGB</a>'
						+'<h1 id="bibleBtn" class="headerLogo">Bibeln</h1><a onclick="toTop();" id="toTop">Tillbaka till toppen</a>';
	document.getElementById("header").innerHTML = backHeader;
	assignHTML("content",'<div id="bible">'+getBibleSectionStr(lang,"OT")+getBibleSectionStr(lang,"NT")+'</div>');
}


function makeLink(program) {
	var locDescr = program["Description"];
	if (locDescr == undefined) {
		locDescr = program["Title"];
	} 
	return '<a title="' + locDescr + '" onclick="playTrack(\'' + program["ser_id"] + '\',\'' + program["ep_id"] 
			+ '\');" class="track"><div class="nr">' 
			+ program["Index"] + '.</div><div class="title">' + program["Title"] + '</div></a>';
}

function loadSerie(key,id,bMainMenu) {
	toTop();
	isMain = false;
	var ser = add_data.swe.items[key];
	var curSerObj = ser.items;
	var maxItems = 30;
	var bHasBibleIndex = (ser.Type == "B");
	var prevOsisRef = undefined;
	var newList = '<div id="textbox"><p><b>'+ser.Title +'</b>'+ser.Description +'</p></div>';
	var epArr = [];
	for(var index in curSerObj) { 
		var curObj = curSerObj[index];
		curObj["ser_id"] = key;
		curObj["ep_id"] = index;
		epArr.push(curObj);
	}
	epArr.sort(sortEpItemByInx);
	if (epArr.length < maxItems) {
		maxItems = epArr.length;
	}
	for(var i=0; i<maxItems; i++){
		if (bHasBibleIndex) {
			var curOsisRef = GetOsisBiblebook(epArr[i].osisRef);
			if (prevOsisRef != curOsisRef) {
				prevOsisRef = curOsisRef;
				newList += "<h2 id='" + curOsisRef + "'>" + GetBiblebookInfo(curOsisRef).Title + "</h2>";
			}
		}
		newList += makeLink(epArr[i]);
	}
	assignHTML("content",newList);

	var imgUrlStr = '';
	if (bMainMenu) { // Use Exception imgUrl
		imgUrlStr = "./img/noreaglobe.png";
	} else { // Standard imgUrl
		imgUrlStr = ser.Image;
	}
	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1>'+ser.Title 
		+'</h1><img src="'+imgUrlStr+'" class="sub-menu headerLogo" alt="'+ser.Title 
		+'"><a onclick="toTop();" id="toTop">Tillbaka till toppen</a>';
	if (bHasBibleIndex) {
		backHeader += '<a onclick="loadBible(\'swe\');" id="bibleBtn">Visa Bibel</a>';
	}
	assignHTML("header",backHeader);

	// loads the rest of the books
	setTimeout(function(){
		for(var i=maxItems; i<epArr.length; i++){
			if (bHasBibleIndex) {
				var curOsisRef = GetOsisBiblebook(epArr[i].osisRef);
				if (prevOsisRef != curOsisRef) {
					prevOsisRef = curOsisRef;
					newList += "<h2 id='" + curOsisRef + "'>" + GetBiblebookInfo(curOsisRef).Title + "</h2>";
				}
			}
			newList += makeLink(epArr[i]);
		}
		assignHTML("content",newList);
		if(id){
			window.scrollTo(0, document.getElementById(id).offsetTop-100);
		}
	},1);
}

/* resets the player UI */
function resetPlayer(){
	setStyle("progressBar","width","0px");
	assignHTML("played",'00:00');
	assignHTML("duration",'00:00');
}

/* adds listeners for click and drag to the scrubber bar */
function uiListener(){
	var scrubber = document.getElementById("scrubber");
	
	scrubber.addEventListener("click", function(e){
		var mouseX = e.clientX-64; // 64 is the width of th play button
		if(mouseX>0){
			moveTo(mouseX);
		}
	});
	
	scrubber.addEventListener("touchmove", function(e){
	var mouseX = e.changedTouches[0].clientX-64;
	if(mouseX>0){
			moveTo(mouseX);
		}
	e.preventDefault()
	}, false);

}

function initOnLoad(){
	loadMenu();
	setTimeout(function(){

		// adds event to see when the user has scrolled a long way
		document.addEventListener("scroll", scroll, false);

		// adds event listener for Android back button
		document.addEventListener("backbutton", backButton, false);

		uiListener(); // adds listener for scrubber bar
	},1);
	
}

/* updates the player currentTime to the mouseX position */
function moveTo(mouseX){
	var width = document.getElementById("scrubber").offsetWidth;
	var percent = mouseX / width;
	var player = document.getElementById("player");
	player.currentTime = player.duration * percent;
}

/* adds event listeners for player events and starts playback */
function initPlay(){
	var player = document.getElementById("player");

	// when there is an error
	player.addEventListener('error', function(){
		showError();
	}, false);

	/* when player updates progress time */
	player.addEventListener("timeupdate", function(){
		updateProgress();
	}, false);

	player.addEventListener("ended", onEnded); // when track ends

	playpause(); // start initial play
}

/* updates progress bar */
function updateProgress(){
	var player = document.getElementById("player");

	assignHTML("played",ms(player.currentTime));
	assignHTML("duration",ms(player.duration));

	var progressBar = document.getElementById("progressBar");
	var percent = 100*(player.currentTime / player.duration);
	setStyle("progressBar","width",percent + '%');
}

/* select track, play it and render it in the playerBox */
function playTrack(ser_key,ep_key) {
	var curSerObj = add_data.swe.items[ser_key];
	var curEpObj = curSerObj.items[ep_key];

	var descrStr = "";
	if (curEpObj["Description"] != undefined) {
		descrStr = curEpObj["Description"];
	}
	
	resetPlayer();

	if ((navigator != undefined) && (navigator.connection != undefined) && (navigator.connection.type == Connection.NONE)) {
	    showError();
	} else {
		assignHTML("playerBox",'<audio id="player" src="' + curEpObj["Url"] + '" preload="metadata"></audio>');
		assignHTML("programinfo",'<div id="player-ser-title" class="ser-title">'+curSerObj["Title"]
						+'</div><div class="audio-title">'+curEpObj["Title"]+'</div><div class="audio-descr">'+descrStr+'</div>');
		displayElement("player-ser-title",(descrStr.length <= 0));

		initPlay(); // start playback
		showFooter(); // make the player visible
	}
}


/*------------------------------*/
/* Editing the rendered content */
/*------------------------------*/

/* adds listeners for click and drag to the scrubber bar */
function uiListener(){
	var scrubber = document.getElementById("scrubber");

	scrubber.addEventListener("click", function(e){
		var mouseX = e.clientX-64; // 64 is the width of th play button
		if(mouseX>0){
			moveTo(mouseX);
		}
	});

	scrubber.addEventListener("touchmove", function(e){
	    var mouseX = e.changedTouches[0].clientX-64;
	    if(mouseX>0){
			moveTo(mouseX);
		}
	    e.preventDefault()
	}, false);
}

function initPlay(){
	var player = document.getElementById("player");

	// when there is an error
	player.addEventListener('error', function(){
		showError();
	}, false);

	/* when player updates progress time */
	player.addEventListener("timeupdate", function(){
		updateProgress();
	}, false);

	player.addEventListener("ended", onEnded); // when track ends

	playpause(); // start initial play
}

/* split time in minutes and seconds */
function ms(time){
	if(isNaN(time)){
		return '00:00';
	}
	else{
		var m = Math.floor(time / 60);
		var s = Math.floor(time % 60);
		return ((m<10?'0':'') + m + ':' + (s<10?'0':'') + s);
	}
}

/* toggles play and pause */
function playpause(){
	player = document.getElementById("player");
	if(player.paused){
		player.play();
		pauseButton();
	}
	else{
		player.pause();
		playButton();
	}
}

/* shows pause button */
function pauseButton(){
	displayElement("pause",true);
	displayElement("play",false);
	displayElement("closeFooter",false);
	isPlaying = true;
}

/* shows play button */
function playButton(){
	displayElement("pause",false);
	displayElement("play",true);
	displayElement("closeFooter",true);
	isPlaying = false;
}

/* when track ends */
function onEnded(){
	closeFooter();
	isPlaying = false;
}

/* shows the footer where the player is */
function showFooter(){
	setStyle("content","margin-bottom","64px");
	displayElement("error",false);
	displayElement("footer",true);
}

/* closes the footer */
function closeFooter(){
	setStyle("content","margin-bottom","0px");
	displayElement("footer",false);
}

/* shows the error message */
function showError(){
	setStyle("content","margin-bottom","64px");
	displayElement("footer",false);
	displayElement("error",true);
}

/* closes the error message */
function closeError(){
	setStyle("content","margin-bottom","0px");
	displayElement("error",false);
}

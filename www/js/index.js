var isMain = false;
var isPlaying = false;
var program = "";

if (document != undefined) {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	loadMenu(); // loads main menu

	// checks if we need to compensate for iOS status bar
	if (window.device.platform.toLowerCase() == "ios" && parseFloat(window.device.version) >= 7.0) {
		document.getElementById("header").style["padding-top"] = "20px";
		document.getElementById("content").style["margin-top"] = "120px";
  }

	// hide splash screen
	cordova.exec(null, null, "SplashScreen", "hide", []);

	// loads programdata.json in the background
	getjson("./data/programdata.json", function(content){
		program = JSON.parse(content);
	});

	// adds event to see when the user has scrolled a long way
	document.addEventListener("scroll", scroll, false);

	// adds event listener for Android back button
	document.addEventListener("backbutton", backButton, false);

	uiListener(); // adds listener for scrubber bar

}

function getjson(url, content) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.addEventListener("load", function() {
    if (req.status < 400) {
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
function backButton() {
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

/* loads main menu into #content */
function loadMenu() {
	isMain = true;
	var mainMenu = makeHideBox("<p><b>Norea Sverige</b> är en fristående missionsorganisation som vill sprida budskapet om Jesus med hjälp av media. Vi är verksamma både i Sverige och internationellt. I Sverige utvecklar vi olika mediabaserade koncept och verktyg som enskilda kristna, församlingar och organisationer kan använda i sitt evangelisations- och missionsarbete.</p>", "loadInfo()") + '<a onclick="loadOmg();" id="omg"><h1>Ögonblick med Gud</h1><p>Korta andakter på 2 minuter</p></a><a onclick="loadHc();" id="hc"><h1>Hannas Café</h1><p>Kvinnors berättelser om livet</p></a><a onclick="loadVgb();" id="vgb"><h1>Vägen genom Bibeln</h1><p>Bibelutläggning i 1245 program</p></a>'
	document.getElementById("content").innerHTML = mainMenu;
	var mainHeader = '<a onclick="loadInfo();" id="home">Norea Sverige</a>';
	document.getElementById("header").innerHTML = mainHeader;
}

/* returns the HTML for a hide box */
function makeHideBox(content, action) {
	return '<div id="hidebox" title="" onclick="' + action + '"><div id="textbox">' + content + '</div><div id="overlay"></div></div>';
}

/* hides and unhides a hide box */
var hide = true;
function toggleHide(){
	if(hide){
		document.getElementById('hidebox').style.height = "auto";
		document.getElementById('overlay').style.display = "none";
		hide = false;
		}
	else{
		document.getElementById('hidebox').style.height = "100px";
		document.getElementById('overlay').style.display = "block";
		hide = true;
	}
}

/* decides if the "to top" button should be visible */
function scroll(){
	if(!isMain){
		if (window.scrollY>500) { showTop() }
		else { hideTop() }
	}
}

/* shows the "to top" button */
function showTop(){
	document.getElementById("toTop").style["display"] = "block";
	document.getElementsByClassName("headerLogo")[0].style["display"] = "none";
}

/* hides the "to top" button */
function hideTop(){
	document.getElementById("toTop").style["display"] = "none";
	document.getElementsByClassName("headerLogo")[0].style["display"] = "block";
}

/* scrolls to top */
function toTop(){
	window.scrollTo(0,0);
}

/* Loads "Norea Sverige" info into #content */
function loadInfo() {
	isMain = false;
	var info = '<div id="textbox"><p><b>Norea Sverige</b> är en fristående missionsorganisation som vill sprida budskapet om Jesus med hjälp av media. Vi är verksamma både i Sverige och internationellt. I Sverige utvecklar vi olika mediabaserade koncept och verktyg som enskilda kristna, församlingar och organisationer kan använda i sitt evangelisations- och missionsarbete.</p><p>Internationellt samarbetar vi med två stora organisationer: Trans World Radio (TWR), som sänder kristen radio på mer än 230 språk och dialekter i 160 länder, och SAT-7, som sänder satellit-TV i Nordafrika och Mellanöstern.</p><p>Om du undrar något eller vill komma i kontakt med oss är du alltid välkommen att höra av dig.</p><p><b>Norea Sverige</b></br>Östergatan 20</br>262 31 Ängelholm</br></br>Telefon: 0431-414750</br>Epost: norea@noreasverige.se</br>Webb: noreasverige.se</p></div>';
	var content = document.getElementById("content");
	content.innerHTML = info;
	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="norea" class="headerLogo">Om Norea Sverige</h1><a onclick="toTop();" id="toTop">Tillbaka till toppen</a>';
	var header = document.getElementById("header");
	header.innerHTML = backHeader;
}

/* Loads "Ögonblick med Gud" info and tracks into #content */
function loadOmg() {
	isMain = false;
	var newList = makeHideBox("<p><b>Ögonblick med Gud</b> är en programserie med små korta andakter som kan fungera som en hjälp att förstå mer om Guds kärlek. Oavsett om du har hittat regelbundenhet i ditt andaktsliv eller om du fortfarande kämpar kan det här programmet hjälpa dig att ta tid för Gud.</p>", "toggleHide()");
	for(var i=0; i<program.omg.length; i++){
		newList += makeLink(program.omg[i]);
	}
	var content = document.getElementById("content");
	content.innerHTML = newList;
	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="omg" class="headerLogo">Ögonblick med Gud</h1><a onclick="toTop();" id="toTop">Tillbaka till toppen</a>';
	var header = document.getElementById("header");
	header.innerHTML = backHeader;
}

/* Loads "Hannas Café" info and tracks into #content */
function loadHc() {
	isMain = false;
	var newList = makeHideBox("<p><b>Hannas Café</b> är en programserie där en mängd kvinnor delar med sig av olika livssituationer som drabbat dem. Det gemensamma för alla vittnesbörd är upplevelsen av hur Gud, mitt i all hopplöshet, grep in och gjorde det trasiga helt.</p>", "toggleHide()");
	for(var i=0; i<program.hc.length; i++){
		newList += makeLink(program.hc[i]);
	}
	var content = document.getElementById("content");
	content.innerHTML = newList;
	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="hc" class="headerLogo">Hannas Café</h1><a onclick="toTop();" id="toTop">Tillbaka till toppen</a>';
	var header = document.getElementById("header");
	header.innerHTML = backHeader;
}

/* Loads "Vägen genom Bibeln" info and tracks into #content */
function loadVgb() {
	isMain = false;
	var newList = makeHideBox("<p><b>Vägen genom Bibeln</b> är en programserie som går igenom hela Bibeln från pärm till pärm i 1245 halvtimmeslånga program. Det går när som helst att hoppa på resan och när Uppenbarelsebokens sista kapitel är läst börjar serien om igen i 1 Mosebok.</p>", "toggleHide()");
	for(var i=0; i<program.vgb.length; i++){
		newList += "<h2 id='" + program.vgb[i].heading + "'>" + program.vgb[i].heading + "</h2>";
		newList += "<ul>";
		for(var j=0; j<program.vgb[i].track.length; j++){
			newList += makeLink(program.vgb[i].track[j]);
		}
		newList += "</ul>";
	}
	var content = document.getElementById("content");
	content.innerHTML = newList;
	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="vgb" class="headerLogo">Vägen genom Bibeln</h1><a onclick="toTop();" id="toTop">Tillbaka till toppen</a>';
	var header = document.getElementById("header");
	header.innerHTML = backHeader;
}

/* returns html for a track */
function makeLink(track) {
	return '<a title="' + track["title"] + '" onclick="playTrack(\'' + track["url"] + '\');" class="track"><div class="nr">' + track["nr"] + '</div><div class="title">' + track["title"] + '</div></a>';
}

/* puts a track in the #playerBox */
function playTrack(track) {
	resetPlayer();

	document.getElementById("playerBox").innerHTML = '<audio id="player" src="' + track + '" preload="none"></audio>'; // puts the html audio tag into the playerBox

	showFooter(); // make the player visible
	initPlay(); // start playback
}

/* resets the player UI */
function resetPlayer(){
	document.getElementById("progressBar").style.width = '0px';
	document.getElementById("played").innerHTML = '00:00';
	document.getElementById("duration").innerHTML = '00:00';
}

/* adds listeners for click and drag to the scrubber bar */
function uiListener(){
	var footer = document.getElementById("footer");

	footer.addEventListener("click", function(e){
		var mouseX = e.clientX-64; // 64 is the width of th play button
		if (mouseX>0) {
			moveTo(mouseX);
		}
	});

  footer.addEventListener("touchmove", function(e){
    var mouseX = e.changedTouches[0].clientX-64;
    if (mouseX>0){
			moveTo(mouseX);
		}
    e.preventDefault()
  }, false);
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

	/* when player updates progress time */
	player.addEventListener("timeupdate", function(){
		updateProgress();
	}, false);

	player.addEventListener("ended", onEnded); // when track ends
	player.addEventListener("error", showError); // when there is an error

	playpause(); // start initial play
}

/* updates progress bar */
function updateProgress(){
	var player = document.getElementById("player");

	document.getElementById("played").innerHTML = ms(player.currentTime);
	document.getElementById("duration").innerHTML = ms(player.duration);

	var progressBar = document.getElementById("progressBar");
	var percent = 100*(player.currentTime / player.duration);
	progressBar.style.width = percent + '%';
}

/* returns minutes and seconds */
function ms(time){
	if (isNaN(time)){
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
	if (player.paused){
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
	document.getElementById("pause").style.display = 'block';
	document.getElementById("play").style.display = 'none';
	isPlaying = true;
}

/* shows play button */
function playButton(){
	document.getElementById("pause").style.display = 'none';
	document.getElementById("play").style.display = 'block';
	isPlaying = false;
}

/* when track ends */
function onEnded(){
	closeFooter();
	isPlaying = false;
}

/* shows the footer where the player is */
function showFooter(){
	document.getElementById("content").style["margin-bottom"] = "64px"; // adds extra margin at the bottom
	document.getElementById("error").style["display"] = "none"; // hides error message
	document.getElementById("footer").style["display"] = "block"; // shows footer
}

/* closes the footer */
function closeFooter(){
	document.getElementById("content").style["margin-bottom"] = "0px"; // removes extra margin at the bottom
	document.getElementById("footer").style["display"] = "none"; // hides footer
}

/* shows the error message */
function showError(){
	document.getElementById("content").style["margin-bottom"] = "64px"; // adds extra margin at the bottom
	document.getElementById("footer").style["display"] = "none"; // hides footer containing the player
	document.getElementById("error").style["display"] = "block"; // shows error message
}

/* closes the error message */
function closeError(){
	document.getElementById("content").style["margin-bottom"] = "0px"; // removes extra margin at the bottom
	document.getElementById("error").style["display"] = "none"; // hides error message
}

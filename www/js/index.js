var isMain = false;
var isPlaying = false;
var program;

if (document != undefined) {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	uiListener();

	// loads programdata.json in the background
	getjson("./data/programdata.json", function(content){
		program = JSON.parse(content);
	});

	// Android back button
	document.addEventListener("backbutton", backButton, false);

	// if we need to compensate for iOS status bar
	if (window.device.platform.toLowerCase() == "ios" && parseFloat(window.device.version) >= 7.0) {
		document.getElementById("header").style["padding-top"] = "20px";
		document.getElementById("content").style["margin-top"] = "120px";
  }
	cordova.exec(null, null, "SplashScreen", "hide", []);
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

function loadMenu() {
	isMain = true;
	var mainMenu = '<a onclick="loadOmg();" id="omg">Ögonblick med Gud</a><a onclick="loadHc();" id="hc">Hannas Café</a><a onclick="loadVgb();" id="vgb">VGB</a>'
	document.getElementById("content").innerHTML = mainMenu;
	var mainHeader = '<a onclick="loadInfo();" id="home">Norea Sverige</a>';
	document.getElementById("header").innerHTML = mainHeader;
}

/* returns html for a track */
function makeLink(track) {
	return '<a title="' + track["title"] + '" onclick="playTrack(\'' + track["url"] + '\');" class="track"><div class="nr">' + track["nr"] + '</div><div class="title">' + track["title"] + '</div></a>';
}

function loadOmg() {
	isMain = false;
	var newList = '<div id="textbox"><p><b>Ögonblick med Gud</b> är en programserie med små korta andakter som kan fungera som en hjälp att förstå mer om Guds kärlek. Oavsett om du har hittat regelbundenhet i ditt andaktsliv eller om du fortfarande kämpar kan det här programmet hjälpa dig att ta tid för Gud.</p></div>';
	for(var i=0; i<program.omg.length; i++){
		newList += makeLink(program.omg[i]);
	}
	var content = document.getElementById("content");
	content.innerHTML = newList;
	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="omg">Ögonblick med Gud</h1>';
	var header = document.getElementById("header");
	header.innerHTML = backHeader;
}

function loadHc() {
	isMain = false;
	var newList = '<div id="textbox"><p><b>Hannas Café</b> är en programserie där en mängd kvinnor delar med sig av olika livssituationer som drabbat dem. Det gemensamma för alla vittnesbörd är upplevelsen av hur Gud, mitt i all hopplöshet, grep in och gjorde det trasiga helt.</p></div>';
	for(var i=0; i<program.hc.length; i++){
		newList += makeLink(program.hc[i]);
	}
	var content = document.getElementById("content");
	content.innerHTML = newList;
	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="hc">Hannas Café</h1>';
	var header = document.getElementById("header");
	header.innerHTML = backHeader;
}

function loadVgb() {
	isMain = false;
	var newList = '<div id="textbox"><p><b>Vägen genom Bibeln</b> är en programserie som går igenom hela Bibeln från pärm till pärm i 1245 halvtimmeslånga program. Det går när som helst att hoppa på resan och när Uppenbarelsebokens sista kapitel är läst börjar serien om igen i 1 Mosebok.</p></div>';
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
	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="vgb">Vägen genom Bibeln</h1>';
	var header = document.getElementById("header");
	header.innerHTML = backHeader;
}

function loadInfo() {
	isMain = false;
	var info = '<div id="textbox"><p><b>Norea Sverige</b> är en fristående missionsorganisation som vill sprida budskapet om Jesus med hjälp av media. Vi är verksamma både i Sverige och internationellt. I Sverige utvecklar vi olika mediabaserade koncept och verktyg som enskilda kristna, församlingar och organisationer kan använda i sitt evangelisations- och missionsarbete.</p><p>Internationellt samarbetar vi med två stora organisationer: Trans World Radio (TWR), som sänder kristen radio på mer än 230 språk och dialekter i 160 länder, och SAT-7, som sänder satellit-TV i Nordafrika och Mellanöstern.</p><p>Om du undrar något eller vill komma i kontakt med oss är du alltid välkommen att höra av dig.</p><p><b>Norea Sverige</b></br>Östergatan 20</br>262 31 Ängelholm</br></br>Telefon: 0431-414750</br>Epost: norea@noreasverige.se</br>Webb: noreasverige.se</p></div>';
	var content = document.getElementById("content");
	content.innerHTML = info;
	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="norea">Om Norea Sverige</h1>';
	var header = document.getElementById("header");
	header.innerHTML = backHeader;
}

/* puts the chosen track in the player */
function playTrack(track) {
	resetPlayer();

	// puts the html audio tag into the playerBox
	document.getElementById("playerBox").innerHTML = '<audio id="player" src="' + track + '" preload="none"></audio>';

	showFooter(); // make the player visible
	initPlay(); // start playback
}

/* resets the player UI */
function resetPlayer(){
	document.getElementById("progressBar").style.width = '0px';
	document.getElementById("bufferBar").style.width = '0px';
	document.getElementById("played").innerHTML = '00:00';
	document.getElementById("duration").innerHTML = '00:00';
}

function uiListener(){
	var footer = document.getElementById("footer");

	footer.addEventListener("touchstart", function(e){
    var mouseX = e.changedTouches[0].clientX-64; // 64 is the width of th play button
		if (mouseX<0){
			playpause();
		}
		else{
			moveTo(mouseX);
		}
    e.preventDefault()
  }, false);

  footer.addEventListener("touchmove", function(e){
    var mouseX = e.changedTouches[0].clientX-64;
    if (mouseX>0){
			moveTo(mouseX);
		}
    e.preventDefault()
  }, false);

	/* updates the time to the mouse X position */
	function moveTo(mouseX){
		var width = document.getElementById("scrubber").offsetWidth;
		var percent = mouseX / width;
		var player = document.getElementById("player");
		player.currentTime = player.duration * percent;
	}
}

function initPlay(){
	var player = document.getElementById("player");

	/* when player updates progress time */
	player.addEventListener("timeupdate", function(){
		updateProgress();
	}, false);

	/* when player updates buffer time */
	player.addEventListener("progress", function(){
		updateBuffer();
	}, false);

	/* when track ends */
	player.addEventListener("ended", onEnded);

	player.addEventListener("error", function(e){
		var footer = document.getElementById("footer");
		footer.style.display = 'none';
		var error = document.getElementById("error");
		error.style.display = 'block';
	}, false);

	/* start initial play */
	playpause();

}


/* split time in minutes and seconds */
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

/* updates progress bar */
function updateProgress(){
	var player = document.getElementById("player");

	document.getElementById("played").innerHTML = ms(player.currentTime);
	document.getElementById("duration").innerHTML = ms(player.duration);

	var progressBar = document.getElementById("progressBar");
	var percent = 100*(player.currentTime / player.duration);
	progressBar.style.width = percent + '%';
}

/* updates buffer bar */
function updateBuffer(){
	var player = document.getElementById("player");

	var bufferBar = document.getElementById("bufferBar");
	if (player.buffered.length > 0){
		var bufferEnd = player.buffered.end(player.buffered.length-1);
		//var bufferEnd = player.buffered.end(0);
		var percent = 100 * (bufferEnd / player.duration);
		bufferBar.style.width = percent + '%';
		console.log(100*(bufferEnd / player.duration));

	}
	else{
		bufferBar.style.width = '0px';
	}
}

function playButton(){
	var pausebtn = document.getElementById("pause");
	pausebtn.style.display = 'block';
	var playbtn = document.getElementById("play");
	playbtn.style.display = 'none';
	isPlaying = true;
}

function pauseButton(){
	var pausebtn = document.getElementById("pause");
	pausebtn.style.display = 'none';
	var playbtn = document.getElementById("play");
	playbtn.style.display = 'block';
	isPlaying = false;
}

/* toggles play and pause */
function playpause(){
	player = document.getElementById("player");
	if (player.paused){
		player.play();
		playButton();
	}
	else{
		player.pause();
		pauseButton();
	}
}

/* when track ends */
function onEnded(){
	closeFooter();
	isPlaying = false;
}

function showFooter(){
	/* adds extra margin at the bottom */
	var content = document.getElementById("content");
	content.style["margin-bottom"] = "64px";

	/* hides error message if it exists */
	var error = document.getElementById("error");
	error.style["display"] = "none";

	/* shows footer */
	var footer = document.getElementById("footer");
	footer.style["display"] = "block";
}

function closeFooter(){
	/* removes extra margin at the bottom */
	var content = document.getElementById("content");
	content.style["margin-bottom"] = "0px";

	/* hides footer */
	var footer = document.getElementById("footer");
	footer.style["display"] = "none";
}

function showError(){
	/* adds extra margin at the bottom */
	var content = document.getElementById("content");
	content.style["margin-bottom"] = "64px";

	/* hides footer containing the player */
	var footer = document.getElementById("footer");
	footer.style["display"] = "none";

	/* shows error message */
	var error = document.getElementById("error");
	error.style["display"] = "block";
}

function closeError(){
	/* removes extra margin at the bottom */
	var content = document.getElementById("content");
	content.style["margin-bottom"] = "0px";

	/* hides error message */
	var error = document.getElementById("error");
	error.style["display"] = "none";
}

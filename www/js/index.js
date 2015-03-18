/*---------------------------*/
/* Rendering dynamic content */
/*---------------------------*/

document.addEventListener("deviceready", onDeviceReady, false);
var isMain = false;
var isPlaying = false;

function onDeviceReady() {
	uiListener();
	cordova.exec(null, null, "SplashScreen", "hide", []);
	document.addEventListener("backbutton", backButton, false);
}

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
	var content = document.getElementById("content");
	content.innerHTML = mainMenu;
	var mainHeader = '<a onclick="loadInfo();" id="home">Norea Sverige</a>';
	var header = document.getElementById("header");
	header.innerHTML = mainHeader;
}

function makeLink(program) {
	return '<a title="' + program["title"] + '" onclick="playTrack(\'' + program["url"] + '\');" class="track"><div class="nr">' + program["nr"] + '</div><div class="title">' + program["title"] + '</div></a>';
}

function loadOmg() {
	isMain = false;
	var newList = '<div id="textbox"><p><b>Ögonblick med Gud</b> är en programserie med små korta andakter som kan fungera som en hjälp att förstå mer om Guds kärlek. Oavsett om du har hittat regelbundenhet i ditt andaktsliv eller om du fortfarande kämpar kan det här programmet hjälpa dig att ta tid för Gud.</p></div>';
	for(var i=0; i<omg.length; i++){
		newList += makeLink(omg[i]);
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
	for(var i=0; i<hc.length; i++){
		newList += makeLink(hc[i]);
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
	for(var i=0; i<vgb.length; i++){
		newList += makeLink(vgb[i]);
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

	/* lägg det valda programmet i spelaren */
function playTrack(track) {

	// Återställ spelarens kontroller
	var progress = document.getElementById("progress");
	progress.style.width = '0';

	var loaded = document.getElementById("loaded");
	loaded.style.width = '0';

	// Lägg rätt spår i spelaren
	var playerBox = document.getElementById("playerBox");
	playerBox.innerHTML = '<audio id="player" src="' + track + '" preload="metadata"></audio>';

	// Gör spelaren synlig
	showFooter();

	// Starta uppspelning
	initPlay();

}


/*------------------------------*/
/* Editing the rendered content */
/*------------------------------*/

function uiListener(){

	var footer = document.getElementById("footer");

	/* when user clicks in the footer */
	footer.addEventListener("click", function(e){clicks(e);});

}


function initPlay(){

	var player = document.getElementById("player");

	/* when player updates time */
	player.addEventListener("timeupdate", function(){progress();});

	/* when track ends */
	player.addEventListener("ended", onEnded);

	player.addEventListener("error", function(e) {
		var footer = document.getElementById("footer");
		footer.style.display = 'none';
		var error = document.getElementById("error");
		error.style.display = 'block';
	});

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

/* updates duration, buffered and progress bars */
function progress(){
	var player = document.getElementById("player");

	var duration = document.getElementById("duration");
	duration.innerHTML = ms(player.duration);
	var loadedBar = document.getElementById("loaded");

	/* updates time buffered */
	if (player && player.buffered && player.buffered.length > 0){
		var loaded = player.buffered.end(0);
		var percent = 100*(loaded / player.duration);
		loadedBar.style.width = percent + '%';
	}
	else{
		loadedBar.style.width = '0px';
	}

	/* updates time played */
	played.innerHTML = ms(player.currentTime);
	percent = 100*(player.currentTime / player.duration);
	var progress = document.getElementById("progress");
	progress.style.width = percent + '%';
}

function playing(){
	var pausebtn = document.getElementById("pause");
	pausebtn.style.display = 'block';
	var playbtn = document.getElementById("play");
	playbtn.style.display = 'none';
	isPlaying = true;
}

function pausing(){
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
		playing();
	}
	else{
		player.pause();
		pausing();
	}
}

/* when track ends */
function onEnded(){
	closeFooter();
	isPlaying = false;
}

/* changes playing location based on mouse click x-value */
function clicks(e){
	var clickX = e.clientX-64; // 64 is the width of the play-pause button
	if (clickX<0){
		playpause();
	}
	else{
		var width = document.getElementById("scrubber").offsetWidth;
		var percent = clickX / width;
		var player = document.getElementById("player");
		player.currentTime = player.duration * percent;
	}
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

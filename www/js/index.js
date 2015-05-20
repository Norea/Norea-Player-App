
/*---------------------------------------------------*/
/* INDEX                                             */
/* 1. global variables                               */
/* 2. initial loading                                */
/* 3. functions for loading pages                    */
/* 4. content generating and fetching helpers        */
/* 5. actions (gets called by other functions)       */
/* 6. functions for adding event listeners           */
/* 7. event handlers (gets fired directly by events) */
/*---------------------------------------------------*/


/*---------------------*/
/* 1. global variables */
/*---------------------*/

var isPlaying = false;   // variable that shows if the player is playing
var showsTopBtn = false; // variable that shows if the to top button is visible
var isPage = "";         // variable that contains the name of the active page
var program = "";        // variable that the program lists get loaded into
var headerHeight = 100;  // default height of the header (different on larger screens)
var footerHeight = 64;   // default footer height (different on larger screens)


/*--------------------*/
/* 2. initial loading */
/*--------------------*/

if(document != undefined){
	document.addEventListener("deviceready", onDeviceReady, false);
}


/*--------------------------------*/
/* 3. functions for loading pages */
/*--------------------------------*/

/* loads main menu */
function loadMenu(){
	isPage = "main";
	var mainMenu = makeHideBox("<p><b>Norea Sverige</b> är en fristående missionsorganisation som vill sprida budskapet om Jesus med hjälp av media. Du kan lyssna till våra programserier via radio, internet eller direkt i din mobil genom vår app. Programmen går också att beställa på CD-skivor eller USB-minne.</p>", "loadInfo()") +
	'<div id="center">'+
		'<a onclick="loadHc();" id="hc">'+
			'<h1>Hannas Café</h1>'+
			'<p>Kvinnor delar med sig om livet</p>'+
		'</a>'+
	'</div>'+
	'<div id="center">'+
		'<a onclick="loadVgb();" id="vgb">'+
			'<h1>Vägen genom Bibeln</h1>'+
			'<p>Bibelutläggning i 1245 program</p>'+
		'</a>'+
	'</div>'+
	'<div id="center">'+
		'<a onclick="loadOmg();" id="omg">'+
			'<h1>Ögonblick med Gud</h1>'+
			'<p>Korta andakter på ca. 2 minuter</p>'+
		'</a>'+
	'</div>'+
	'<div id="center">'+
		'<a onclick="loadHistory();" id="history">'+
			'<h1>Historik</h1>'+
			'<p>Senast spelade avsnitt</p>'+
		'</a>'+
	'</div>'+
	'<div id="center">'+
		'<a href="sms:" id="sms">'+
			'<h1>Tipsa en vän!</h1>'+
			'<p>Tipsa om Noreas app via SMS</p>'+
		'</a>'+
	'</div>';
	document.getElementById("content").innerHTML = mainMenu;
	var mainHeader = '<a onclick="loadInfo();" id="home">Norea Sverige</a>';
	var header = document.getElementById("header");
	header.innerHTML = mainHeader;
	header.style["background"] = "#82982e";
  header.style["border-bottom"] = "1px solid #774";
}

/* loads "Norea Sverige" info */
function loadInfo(){
	isPage = "info";
	goToTop();

	var newHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a>'+
	'<h1 id="norea" class="headerLogo">Om Norea Sverige</h1>'+
	'<a onclick="goToTop();" id="toTop">Tillbaka till toppen</a>';
	var header = document.getElementById("header");
	header.innerHTML = newHeader;
	header.style["background"] = "#eaeaea";
  header.style["border-bottom"] = "1px solid #ccc";

	var info = '<div id="textbox"><p>'+
	'<b>Norea Sverige</b> är en fristående missionsorganisation som vill sprida budskapet om Jesus med hjälp av media. Du kan lyssna till våra programserier via radio, internet eller direkt i din mobil genom vår app. Programmen går också att beställa på CD-skivor eller USB-minne.'+
	'</p><p>'+
	'För att nå så många som möjligt är appen gratis, men allt har ju en kostnad... Vill du vara med och bidra till utvecklingen av nya programserier? Swisha en gåva, sätt in pengar på vårt PlusGiro-konto eller ge med kort på vår hemsida!'+
	'</p><p>'+
	'Swish: <i>1235142054</i><br/>'+
	'PlusGiro: <i>52 41 80-7</i><br/>'+
	'Webb: <i>noreasverige.se</i><br/>'+
	'</p><p>'+
	'För mer info om Norea eller för att beställa våra program så finns vi här:'+
	'</p><p>'+
	'<b>Norea Sverige</b><br/>'+
	'Östergatan 20<br/>'+
	'262 31 Ängelholm<br/>'+
	'</p><p>'+
	'Telefon: <i>0431-414750</i><br/>'+
	'Epost: <i>norea@noreasverige.se</i>'+
	'</p></div>';
	document.getElementById("content").innerHTML = info;
}

/* loads "Hannas Café" info and tracks */
function loadHc(){
	isPage = "hc";
	goToTop();

	var newHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a>'+
	'<h1 id="hc" class="headerLogo">Hannas Café</h1>'+
	'<a onclick="goToTop();" id="toTop">Tillbaka till toppen</a>';
	var header = document.getElementById("header");
	header.innerHTML = newHeader;
	header.style["background"] = "#eaeaea";
  header.style["border-bottom"] = "1px solid #ccc";

	var newContent = '<div id="textbox"><p><b>Hannas Café</b> är en programserie där en mängd kvinnor delar med sig av olika livssituationer som drabbat dem. Det gemensamma för alla vittnesbörd är upplevelsen av hur Gud, mitt i all hopplöshet, grep in och gjorde det trasiga helt.</p></div>';
	for(var i=0; i<program.hc.length; i++){
		newContent += makeLink(program.hc[i]);
	}
	document.getElementById("content").innerHTML = newContent;
}

/* loads "Vägen genom Bibeln" info and tracks */
function loadVgb(id){
	isPage = "vgb";
	goToTop();

	var newHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a>'+
	'<h1 id="vgb" class="headerLogo">Vägen genom Bibeln</h1>'+
	'<a onclick="goToTop();" id="toTop">Tillbaka till toppen</a>'+
	'<a onclick="loadBible();" id="bibleBtn">Visa Bibel</a>';
	var header = document.getElementById("header");
	header.innerHTML = newHeader;
	header.style["background"] = "#eaeaea";
  header.style["border-bottom"] = "1px solid #ccc";

	var newContent = '<div id="textbox"><p><b>Vägen genom Bibeln</b> är en programserie som går igenom hela Bibeln från pärm till pärm i 1245 halvtimmeslånga program. Det går när som helst att hoppa på resan och när Uppenbarelsebokens sista kapitel är läst börjar serien om igen i 1 Mosebok.</p></div>';

	/* loads just the first book and draws it */
	newContent += "<h2 id='" + program.vgb[0].heading + "'>" + program.vgb[0].heading + "</h2>";
	newContent += "<ul>";
	for(var j=0; j<program.vgb[0].track.length; j++){
		newContent += makeLink(program.vgb[0].track[j]);
	}
	newContent += "</ul>";
	document.getElementById("content").innerHTML = newContent;

	/* loads the rest of the books */
	setTimeout(function(){
		for(var i=1; i<program.vgb.length; i++){
			newContent += "<h2 id='" + program.vgb[i].heading + "'>" + program.vgb[i].heading + "</h2>";
			newContent += "<ul>";
			for(var j=0; j<program.vgb[i].track.length; j++){
				newContent += makeLink(program.vgb[i].track[j]);
			}
			newContent += "</ul>";
		}
		document.getElementById("content").innerHTML = newContent;
		if(id){
			window.scrollTo(0, document.getElementById(id).offsetTop-headerHeight-1);
		}
	},1);
}

/* loads "Ögonblick med Gud" info and tracks */
function loadOmg(){
	isPage = "omg";
	goToTop();

	var newHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a>'+
	'<h1 id="omg" class="headerLogo">Ögonblick med Gud</h1>'+
	'<a onclick="goToTop();" id="toTop">Tillbaka till toppen</a>';
	var header = document.getElementById("header");
	header.innerHTML = newHeader;
	header.style["background"] = "#eaeaea";
  header.style["border-bottom"] = "1px solid #ccc";

	var newContent = '<div id="textbox"><p><b>Ögonblick med Gud</b> är en programserie med små korta andakter som kan fungera som en hjälp att förstå mer om Guds kärlek. Oavsett om du har hittat regelbundenhet i ditt andaktsliv eller om du fortfarande kämpar kan det här programmet hjälpa dig att ta tid för Gud.</p></div>';
	for(var i=0; i<program.omg.length; i++){
		newContent += makeLink(program.omg[i]);
	}
	document.getElementById("content").innerHTML = newContent;
}

/* loads track history */
function loadHistory(){
	isPage = "history";
	goToTop();

	var newHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a>'+
	'<h1 id="history" class="headerLogo">Historik</h1>'+
	'<a onclick="goToTop();" id="toTop">Tillbaka till toppen</a>';
	var header = document.getElementById("header");
	header.innerHTML = newHeader;
	header.style["background"] = "#eaeaea";
  header.style["border-bottom"] = "1px solid #ccc";

	var newContent = '<div id="textbox"><p>Här kan du se dina senast spelade program från alla programserier.</p></div>';
	var history = getHistory();
	if (history != ""){
		newContent += '<a onclick="clearHistory();" id="back"><h2>Rensa historik</h2></a>';
		for (var i = history.length - 1; i >= 0; i--){
			newContent += makeLink(history[i]);
		}
	}
	else{
		newContent += '<h2>Historiken är tom</h2>';
	}
	document.getElementById("content").innerHTML = newContent;
}

/* loads bible book chooser */
function loadBible(){
	isPage = "bible";
	goToTop();
	var newHeader = '<a onclick="loadVgb();" id="back">Tillbaka till VGB</a><h1 id="bibleBtn" class="headerLogo">Bibeln</h1><a onclick="goToTop();" id="toTop">Tillbaka till toppen</a>';
	document.getElementById("header").innerHTML = newHeader;

	var newContent = ''+
		'<div id="bible">'+
			'<div id="GT">'+
				'<h3>Gamla Testamentet</h3>'+
				'<a onclick="loadVgb(\'Första Moseboken\');" title="Första Moseboken">'+
					'<p>1 Mos</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Andra Moseboken\');" title="Andra Moseboken">'+
					'<p>2 Mos</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Tredje Moseboken\');" title="Tredje Moseboken">'+
					'<p>3 Mos</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Fjärde Moseboken\');" title="Fjärde Moseboken">'+
					'<p>4 Mos</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Femte Moseboken\');" title="Femte Moseboken">'+
					'<p>5 Mos</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Josua\');" title="Josua">'+
					'<p>Jos</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Domarboken\');" title="Domarboken">'+
					'<p>Dom</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Rut\');" title="Rut">'+
					'<p>Rut</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Första Samuelsboken\');" title="Första Samuelsboken">'+
					'<p>1 Sam</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Andra Samuelsboken\');" title="Andra Samuelsboken">'+
					'<p>2 Sam</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Första Kungaboken\');" title="Första Kungaboken">'+
					'<p>1 Kung</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Andra Kungaboken\');" title="Andra Kungaboken">'+
					'<p>2 Kung</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Första Krönikeboken\');" title="Första Krönikeboken">'+
					'<p>1 Krön</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Andra Krönikeboken\');" title="Andra Krönikeboken">'+
					'<p>2 Krön</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Esra\');" title="Esra">'+
					'<p>Esra</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Nehemja\');" title="Nehemja">'+
					'<p>Neh</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Ester\');" title="Ester">'+
					'<p>Ester</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Job\');" title="Job">'+
					'<p>Job</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Psaltaren\');" title="Psaltaren">'+
					'<p>Ps</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Ordspråksboken\');" title="Ordspråksboken">'+
					'<p>Ords</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Predikaren\');" title="Predikaren">'+
					'<p>Pred</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Höga Visan\');" title="Höga Visan">'+
					'<p>Höga V</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Jesaja\');" title="Jesaja">'+
					'<p>Jes</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Jeremia\');" title="Jeremia">'+
					'<p>Jer</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Klagovisorna\');" title="Klagovisorna">'+
					'<p>Klag</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Hesekiel\');" title="Hesekiel">'+
					'<p>Hes</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Daniel\');" title="Daniel">'+
					'<p>Dan</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Hosea\');" title="Hosea">'+
					'<p>Hos</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Joel\');" title="Joel">'+
					'<p>Joel</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Amos\');" title="Amos">'+
					'<p>Amos</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Obadja\');" title="Obadja">'+
					'<p>Ob</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Jona\');" title="Jona">'+
					'<p>Jona</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Mika\');" title="Mika">'+
					'<p>Mika</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Nahum\');" title="Nahum">'+
					'<p>Nah</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Habackuk\');" title="Habackuk">'+
					'<p>Hab</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Sefanja\');" title="Sefanja">'+
					'<p>Sef</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Haggai\');" title="Haggai">'+
					'<p>Hagg</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Sakarja\');" title="Sakarja">'+
					'<p>Sak</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Malaki\');" title="Malaki">'+
					'<p>Mal</p>'+
				'</a>'+
				''+
			'</div>'+
			'<div id="NT">'+
				'<h3>Nya Testamentet</h3>'+
				'<a onclick="loadVgb(\'Matteusevangeliet\');" title="Matteusevangeliet">'+
					'<p>Matt</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Markusevangeliet\');" title="Markusevangeliet">'+
					'<p>Mark</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Lukasevangeliet\');" title="Lukasevangeliet">'+
					'<p>Luk</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Johannesevangeliet\');" title="Johannesevangeliet">'+
					'<p>Joh</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Apostlagärningarna\');" title="Apostlagärningarna">'+
					'<p>Apg</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Romarbrevet\');" title="Romarbrevet">'+
					'<p>Rom</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Första Korintierbrevet\');" title="Första Korintierbrevet">'+
					'<p>1 Kor</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Andra Korintierbrevet\');" title="Andra Korintierbrevet">'+
					'<p>2 Kor</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Galaterbrevet\');" title="Galaterbrevet">'+
					'<p>Gal</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Efesierbrevet\');" title="Efesierbrevet">'+
					'<p>Ef</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Filipperbrevet\');" title="Filipperbrevet">'+
					'<p>Fil</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Kolosserbrevet\');" title="Kolosserbrevet">'+
					'<p>Kol</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Första Tessalonikerbrevet\');" title="Första Tessalonikerbrevet">'+
					'<p>1 Tess</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Andra Tessalonikerbrevet\');" title="Andra Tessalonikerbrevet">'+
					'<p>2 Tess</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Första Timoteusbrevet\');" title="Första Timoteusbrevet">'+
					'<p>1 Tim</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Andra Timoteusbrevet\');" title="Andra Timoteusbrevet">'+
					'<p>2 Tim</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Brevet till Titus\');" title="Brevet till Titus">'+
					'<p>Tit</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Brevet till Filemon\');" title="Brevet till Filemom">'+
					'<p>Filem</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Hebreerbrevet\');" title="Hebreerbrevet">'+
					'<p>Hebr</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Jakobs brev\');" title="Jakobs brev">'+
					'<p>Jak</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Första Petrusbrevet\');" title="Första Petrusbrevet">'+
					'<p>1 Petr</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Andra Petrusbrevet\');" title="Andra Petrusbrevet">'+
					'<p>2 Petr</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Första Johannesbrevet\');" title="Första Johannesbrevet">'+
					'<p>1 Joh</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Andra och tredje Johannesbrevet\');" title="Andra Johannesbrevet">'+
					'<p>2 Joh</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Andra och tredje Johannesbrevet\');" title="Tredje Johannesbrevet">'+
					'<p>3 Joh</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Judas brev\');" title="Judas brev">'+
					'<p>Jud</p>'+
				'</a>'+
				'<a onclick="loadVgb(\'Uppenbarelseboken\');" title="Uppenbarelseboken">'+
					'<p>Upp</p>'+
				'</a>'+
			'</div>'+
		'</div>';
	document.getElementById("content").innerHTML = newContent;
}


/*--------------------------------------------*/
/* 4. content generating and fetching helpers */
/*--------------------------------------------*/

/* fetches a JSON file fron an url */
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

/* generates the HTML for a hide box */
function makeHideBox(content, action){
	return '<div id="hidebox" class="hide" title="" onclick="' + action + '"><div id="textbox">' + content + '</div><div id="overlay" class="show"></div></div>';
}

/* generates html for a track */
function makeLink(track){
	return '<a title="' + track["title"] + '" onclick="playTrack(\'' + track["nr"] + '\',\'' + track["title"] + '\',\'' + track["url"] + '\');" class="track"><div class="nr">' + track["nr"] + '.</div><div class="title">' + track["title"] + '</div></a>';
}

/* fetches player history */
function getHistory(){
	if(window.localStorage.getItem('history') != null){
		return JSON.parse(window.localStorage.getItem('history'));
	}
	else{
		return "";
	}
}

/* generates time in minutes and seconds */
function ms(seconds){
	if(isNaN(seconds)){
		return '00:00';
	}
	else{
		var m = Math.floor(seconds / 60);
		var s = Math.floor(seconds % 60);
		return ((m<10?'0':'') + m + ':' + (s<10?'0':'') + s);
	}
}


/*---------------------------------------------*/
/* 5. actions (gets called by other functions) */
/*---------------------------------------------*/

/* shows the "to top" button */
function showToTopBtn(){
	document.getElementById("toTop").style["display"] = "block";
	document.getElementsByClassName("headerLogo")[0].style["display"] = "none";
	showsTopBtn = true;
}

/* hides the "to top" button */
function hideToTopBtn(){
	document.getElementById("toTop").style["display"] = "none";
	document.getElementsByClassName("headerLogo")[0].style["display"] = "block";
	showsTopBtn = false;
}

/* scrolls to top of page */
function goToTop(){
	window.scrollTo(0,0);
}

/* updates the player currentTime to the mouse X position */
function moveTimeTo(mouseX){
	var width = document.getElementById("scrubber").offsetWidth;
	var percent = mouseX / width;
	var player = document.getElementById("player");
	player.currentTime = player.duration * percent;
}

/* stores history in local storage */
function storeHistory(track){
	var history = getHistory();
	if(history != ""){
		history.push(track);
	}
	else{
		history = [track];
	}
	window.localStorage.setItem('history', JSON.stringify(history));
}

/* deletes history tracks from local storage */
function clearHistory(){
	window.localStorage.removeItem('history');
	loadHistory(); // updates history page
}

/* puts a track in the player and plays it */
function playTrack(nr, title, url){
	resetPlayer();
	if(navigator.connection.type == Connection.NONE){
    showError();
  }
	else{
		document.getElementById("playerBox").innerHTML = '<audio id="player" src="' + url + '" preload="metadata" type="audio/mpeg"></audio>'; // puts the html audio tag into the playerBox
		playPause();                 // start initial playback
		addPlaybackListener();       // add playback listeners
		showFooter();                // make the player visible
		document.getElementById("programinfo").innerHTML = title;
		var trackObj = {"nr": nr, "title": title, "url": url};
		storeHistory(trackObj);
		if(isPage == "history"){
			loadHistory();
		}
	}
}

/* resets the player interface */
function resetPlayer(){
	document.getElementById("progressBar").style.width = '0px';
	document.getElementById("played").innerHTML = '00:00';
	document.getElementById("duration").innerHTML = '00:00';
}

/* updates progress bar */
function updateProgress(){
	var player = document.getElementById("player");

	document.getElementById("duration").innerHTML = ms(player.duration);
	document.getElementById("played").innerHTML = ms(player.currentTime);

	var percent = 100*(player.currentTime / player.duration);
	document.getElementById("progressBar").style.width = percent + '%';
}

/* toggles play and pause */
function playPause(){
	player = document.getElementById("player");
	if(player.paused){
		player.play();
		showPauseButton();
	}
	else{
		player.pause();
		showPlayButton();
	}
}

/* shows pause button */
function showPauseButton(){
	document.getElementById("pause").style.display = 'block';
	document.getElementById("play").style.display = 'none';
	document.getElementById("closeFooter").style.display = 'none';
	isPlaying = true;
}

/* shows play button */
function showPlayButton(){
	document.getElementById("pause").style.display = 'none';
	document.getElementById("play").style.display = 'block';
	document.getElementById("closeFooter").style.display = 'block';
	isPlaying = false;
}

/* shows the footer where the player is */
function showFooter(){
	document.getElementById("content").style["margin-bottom"] = footerHeight+"px"; // adds extra margin at the bottom
	document.getElementById("error").style["display"] = "none";                    // hides error message
	document.getElementById("footer").style["display"] = "block";                  // shows footer
}

/* closes the footer */
function closeFooter(){
	document.getElementById("content").style["margin-bottom"] = "0px"; // removes extra margin at the bottom
	document.getElementById("footer").style["display"] = "none";       // hides footer
	document.getElementById("playerBox").innerHTML = '';               // removes audio tag from content
}

/* shows the error message */
function showError(){
	document.getElementById("content").style["margin-bottom"] = footerHeight+"px"; // adds extra margin at the bottom
	document.getElementById("footer").style["display"] = "none";                   // hides footer containing the player
	document.getElementById("error").style["display"] = "block";                   // shows error message
}

/* closes the error message */
function closeError(){
	document.getElementById("content").style["margin-bottom"] = "0px"; // removes extra margin at the bottom
	document.getElementById("error").style["display"] = "none";        // hides error message
}


/*-----------------------------------------*/
/* 6. functions for adding event listeners */
/*-----------------------------------------*/

/* adds listeners for click and drag to the scrubber bar */
function addScrubberListener(){
	var scrubber = document.getElementById("scrubber");

	scrubber.addEventListener("click", function(e){
		var mouseX = e.clientX-footerHeight;
		if(mouseX>0){
			moveTimeTo(mouseX);
		}
	});

  scrubber.addEventListener("touchmove", function(e){
    var mouseX = e.changedTouches[0].clientX-footerHeight;
    if(mouseX>0){
			// pausing on scrubb makes it snappier
			if(isPlaying){
				player = document.getElementById("player");
				player.pause();
				moveTimeTo(mouseX);
				player.play();
			}
			else{
				moveTimeTo(mouseX);
			}
		}
    e.preventDefault();
  }, false);
}

/* adds event listeners for player events */
function addPlaybackListener(){
	var player = document.getElementById("player");

	/* when player updates progress time */
	player.addEventListener("timeupdate", function(){
		updateProgress();
	}, false);

	/* when there is an error */
	player.addEventListener("error", function(e){
		showError();
	}, false);

	player.addEventListener("ended", onEnded); // when track ends
}


/*---------------------------------------------------*/
/* 7. event handlers (gets fired directly by events) */
/*---------------------------------------------------*/

/* first function called. sets everything up */
function onDeviceReady(){
	loadMenu(); // loads the main menu

	/* checks if we need to compensate for iOS status bar */
	if(window.device.platform.toLowerCase() == "ios" && parseFloat(window.device.version) >= 7.0){
		document.getElementById('header').style['padding-top'] = "20px";
  }

	/* sets a top margin to the "content" container to prevent the header from hiding the content */
	var headerStyle = window.getComputedStyle(document.getElementById('header'));
	headerHeight = parseInt(headerStyle.getPropertyValue('height')) + parseInt(headerStyle.getPropertyValue('padding-top'));
	document.getElementById('content').style['margin-top'] = headerHeight+"px";

	/* hides the splash screen (everything visible on the start page is done by now) */
	cordova.exec(null, null, "SplashScreen", "hide", []);

	/* setting a timeout function to clear the way for a redrawing of DOM */
	setTimeout(function(){
		/* calculates the footerHeight variable so that it can be used later */
		var footerStyle = window.getComputedStyle(document.getElementById('footer'));
		footerHeight = parseInt(footerStyle.getPropertyValue('height'));

		/* loads programdata.json into global vaiable program */
		getjson("./data/programdata.json", function(content){
			program = JSON.parse(content);
		});

		document.addEventListener("scroll", onScroll, false);         // fires when the user is scrolling
		document.addEventListener("backbutton", onBackButton, false); // firen when the Android back button is clicked
		addScrubberListener();                                        // adds listeners for scrubber bar

	},1);
}

/* handles Android backbutton event */
function onBackButton(){
	if(isPage == "main"){
		if(isPlaying){
			playPause();
		}
		navigator.app.exitApp();
	}
	else{
		loadMenu();
	}
}

/* decides if the "to top" button should be changed */
function onScroll(){
	if(isPage!="main"){ // there is no "to top" button on the front page
		if(window.scrollY>500){
			if(!showsTopBtn){ // prevents changing style at every scroll event call
				showToTopBtn();
			}
		}
		else if(showsTopBtn){ // prevents changing style at every scroll event call
		 	hideToTopBtn();
		}
	}
}

/* gets called when a track ends */
function onEnded(){
	closeFooter();
	isPlaying = false;
}

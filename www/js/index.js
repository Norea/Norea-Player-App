var isMain = false;
var isPlaying = false;
var program = "";
var text = "";

if(document != undefined){
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	loadMenu(); // loads main menu

	// checks if we need to compensate for iOS status bar
	if(window.device.platform.toLowerCase() == "ios" && parseFloat(window.device.version) >= 7.0){
		document.getElementById("header").style["padding-top"] = "20px";
		document.getElementById("content").style["margin-top"] = "120px";
  }

	// hide splash screen
	cordova.exec(null, null, "SplashScreen", "hide", []);

	setTimeout(function(){
		// loads programdata.json
		getjson("./data/programdata.json", function(content){
			program = JSON.parse(content);
		});

		// adds event to see when the user has scrolled a long way
		document.addEventListener("scroll", scroll, false);

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

/* loads main menu into #content */
function loadMenu(){
	isMain = true;
	var mainMenu = makeHideBox("<p><b>Norea Sverige</b> är en fristående missionsorganisation som vill sprida budskapet om Jesus med hjälp av media. Vi är verksamma både i Sverige och internationellt. I Sverige utvecklar vi olika mediabaserade koncept och verktyg som enskilda kristna, församlingar och organisationer kan använda i sitt evangelisations- och missionsarbete.</p>", "loadInfo()") + '<a onclick="loadOmg();" id="omg"><h1>Ögonblick med Gud</h1><p>Korta andakter på 2 minuter</p></a><a onclick="loadHc();" id="hc"><h1>Hannas Café</h1><p>Kvinnors berättelser om livet</p></a><a onclick="loadVgb();" id="vgb"><h1>Vägen genom Bibeln</h1><p>Bibelutläggning i 1245 program</p></a>'
	document.getElementById("content").innerHTML = mainMenu;
	var mainHeader = '<a onclick="loadInfo();" id="home">Norea Sverige</a>';
	document.getElementById("header").innerHTML = mainHeader;
}

/* returns the HTML for a hide box */
function makeHideBox(content, action){
	return '<div id="hidebox" class="hide" title="" onclick="' + action + '"><div id="textbox">' + content + '</div><div id="overlay" class="show"></div></div>';
}

/* decides if the "to top" button should be changed */
var showsTopBtn = false;
function scroll(){
	console.log("scroll!");
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

/* shows the "to top" button */
function showTop(){
	document.getElementById("toTop").style["display"] = "block";
	document.getElementsByClassName("headerLogo")[0].style["display"] = "none";
	showsTopBtn = true;
}

/* hides the "to top" button */
function hideTop(){
	document.getElementById("toTop").style["display"] = "none";
	document.getElementsByClassName("headerLogo")[0].style["display"] = "block";
	showsTopBtn = false;
}

/* scrolls to top */
function toTop(){
	window.scrollTo(0,0);
}

/* Loads "Norea Sverige" info into #content */
function loadInfo(){
	isMain = false;

	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="norea" class="headerLogo">Om Norea Sverige</h1><a onclick="toTop();" id="toTop">Tillbaka till toppen</a>';
	document.getElementById("header").innerHTML = backHeader;

	var info = '<div id="textbox"><p><b>Norea Sverige</b> är en fristående missionsorganisation som vill sprida budskapet om Jesus med hjälp av media. Vi är verksamma både i Sverige och internationellt. I Sverige utvecklar vi olika mediabaserade koncept och verktyg som enskilda kristna, församlingar och organisationer kan använda i sitt evangelisations- och missionsarbete.</p><p>Internationellt samarbetar vi med två stora organisationer: Trans World Radio (TWR), som sänder kristen radio på mer än 230 språk och dialekter i 160 länder, och SAT-7, som sänder satellit-TV i Nordafrika och Mellanöstern.</p><p>Om du undrar något eller vill komma i kontakt med oss är du alltid välkommen att höra av dig.</p><p><b>Norea Sverige</b></br>Östergatan 20</br>262 31 Ängelholm</br></br>Telefon: 0431-414750</br>Epost: norea@noreasverige.se</br>Webb: noreasverige.se</p></div>';
	document.getElementById("content").innerHTML = info;

}

/* Loads "Ögonblick med Gud" info and tracks into #content */
function loadOmg(){
	isMain = false;

	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="omg" class="headerLogo">Ögonblick med Gud</h1><a onclick="toTop();" id="toTop">Tillbaka till toppen</a>';
	document.getElementById("header").innerHTML = backHeader;

	var newList = '<div id="textbox"><p><b>Ögonblick med Gud</b> är en programserie med små korta andakter som kan fungera som en hjälp att förstå mer om Guds kärlek. Oavsett om du har hittat regelbundenhet i ditt andaktsliv eller om du fortfarande kämpar kan det här programmet hjälpa dig att ta tid för Gud.</p></div>';
	for(var i=0; i<program.omg.length; i++){
		newList += makeLink(program.omg[i]);
	}
	document.getElementById("content").innerHTML = newList;

}

/* Loads "Hannas Café" info and tracks into #content */
function loadHc(){
	isMain = false;

	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="hc" class="headerLogo">Hannas Café</h1><a onclick="toTop();" id="toTop">Tillbaka till toppen</a>';
	document.getElementById("header").innerHTML = backHeader;

	var newList = '<div id="textbox"><p><b>Hannas Café</b> är en programserie där en mängd kvinnor delar med sig av olika livssituationer som drabbat dem. Det gemensamma för alla vittnesbörd är upplevelsen av hur Gud, mitt i all hopplöshet, grep in och gjorde det trasiga helt.</p></div>';
	for(var i=0; i<program.hc.length; i++){
		newList += makeLink(program.hc[i]);
	}
	document.getElementById("content").innerHTML = newList;
}

/* Loads "Vägen genom Bibeln" info and tracks into #content */
function loadVgb(id){
	isMain = false;

	var backHeader = '<a onclick="loadMenu();" id="back">Tillbaka till menyn</a><h1 id="vgb" class="headerLogo">Vägen genom Bibeln</h1><a onclick="toTop();" id="toTop">Tillbaka till toppen</a><a onclick="loadBible();" id="bibleBtn">Visa Bibel</a>';
	document.getElementById("header").innerHTML = backHeader;

	var newList = '<div id="textbox"><p><b>Vägen genom Bibeln</b> är en programserie som går igenom hela Bibeln från pärm till pärm i 1245 halvtimmeslånga program. Det går när som helst att hoppa på resan och när Uppenbarelsebokens sista kapitel är läst börjar serien om igen i 1 Mosebok.</p></div>';

	// loads just the first book and draws it
	newList += "<h2 id='" + program.vgb[0].heading + "'>" + program.vgb[0].heading + "</h2>";
	newList += "<ul>";
	for(var j=0; j<program.vgb[0].track.length; j++){
		newList += makeLink(program.vgb[0].track[j]);
	}
	newList += "</ul>";
	document.getElementById("content").innerHTML = newList;

	// loads the rest of the books
	setTimeout(function(){
		for(var i=1; i<program.vgb.length; i++){
			newList += "<h2 id='" + program.vgb[i].heading + "'>" + program.vgb[i].heading + "</h2>";
			newList += "<ul>";
			for(var j=0; j<program.vgb[i].track.length; j++){
				newList += makeLink(program.vgb[i].track[j]);
			}
			newList += "</ul>";
		}
		document.getElementById("content").innerHTML = newList;
		if(id){
			document.getElementById(id).scrollIntoView(true);
			window.scrollBy(0,-100);
		}
	},1);
}

/* returns html for a track */
function makeLink(track){
	return '<a title="' + track["title"] + '" onclick="playTrack(\'' + track["url"] + '\',\'' + track["title"] + '\');" class="track"><div class="nr">' + track["nr"] + '.</div><div class="title">' + track["title"] + '</div></a>';
}

function loadBible(){
	isMain = false;
	window.scrollTo(0,0);
	var backHeader = '<a onclick="loadVgb();" id="back">Tillbaka till VGB</a><h1 id="bibleBtn" class="headerLogo">Bibeln</h1><a onclick="toTop();" id="toTop">Tillbaka till toppen</a>';
	document.getElementById("header").innerHTML = backHeader;

	var newList = ''+
		'<div id="bible">'+
			'<div class="GT">'+
				'<h3>Gamla Testamentet</h3>'+
				'<ul>'+
					'<li><a onclick="goTo(\'Första Moseboken\');" title="Första Moseboken">1 Mos</a></li>'+
					'<li><a onclick="goTo(\'Andra Moseboken\');" title="Andra Moseboken">2 Mos</a></li>'+
					'<li><a onclick="goTo(\'Tredje Moseboken\');" title="Tredje Moseboken">3 Mos</a></li>'+
					'<li><a onclick="goTo(\'Fjärde Moseboken\');" title="Fjärde Moseboken">4 Mos</a></li>'+
					'<li><a onclick="goTo(\'Femte Moseboken\');" title="Femte Moseboken">5 Mos</a></li>'+
					'<li><a onclick="goTo(\'Josua\');" title="Josua">Jos</a></li>'+
					'<li><a onclick="goTo(\'Domarboken\');" title="Domarboken">Dom</a></li>'+
					'<li><a onclick="goTo(\'Rut\');" title="Rut">Rut</a></li>'+
					'<li><a onclick="goTo(\'Första Samuelsboken\');" title="Första Samuelsboken">1 Sam</a></li>'+
					'<li><a onclick="goTo(\'Andra Samuelsboken\');" title="Andra Samuelsboken">2 Sam</a></li>'+
				'</ul>'+
				'<ul>'+
					'<li><a onclick="goTo(\'Första Kungaboken\');" title="Första Kungaboken">1 Kung</a></li>'+
					'<li><a onclick="goTo(\'Andra Kungaboken\');" title="Andra Kungaboken">2 Kung</a></li>'+
					'<li><a onclick="goTo(\'Första Krönikeboken\');" title="Första Krönikeboken">1 Krön</a></li>'+
					'<li><a onclick="goTo(\'Andra Krönikeboken\');" title="Andra Krönikeboken">2 Krön</a></li>'+
					'<li><a onclick="goTo(\'Esra\');" title="Esra">Esra</a></li>'+
					'<li><a onclick="goTo(\'Nehemja\');" title="Nehemja">Neh</a></li>'+
					'<li><a onclick="goTo(\'Ester\');" title="Ester">Ester</a></li>'+
					'<li><a onclick="goTo(\'Job\');" title="Job">Job</a></li>'+
					'<li><a onclick="goTo(\'Psaltaren\');" title="Psaltaren">Ps</a></li>'+
					'<li><a onclick="goTo(\'Ordspråksboken\');" title="Ordspråksboken">Ords</a></li>'+
				'</ul>'+
				'<ul>'+
					'<li><a onclick="goTo(\'Predikaren\');" title="Predikaren">Pred</a></li>'+
					'<li><a onclick="goTo(\'Höga Visan\');" title="Höga Visan">Höga V</a></li>'+
					'<li><a onclick="goTo(\'Jesaja\');" title="Jesaja">Jes</a></li>'+
					'<li><a onclick="goTo(\'Jeremia\');" title="Jeremia">Jer</a></li>'+
					'<li><a onclick="goTo(\'Klagovisorna\');" title="Klagovisorna">Klag</a></li>'+
					'<li><a onclick="goTo(\'Hesekiel\');" title="Hesekiel">Hes</a></li>'+
					'<li><a onclick="goTo(\'Daniel\');" title="Daniel">Dan</a></li>'+
					'<li><a onclick="goTo(\'Hosea\');" title="Hosea">Hos</a></li>'+
					'<li><a onclick="goTo(\'Joel\');" title="Joel">Joel</a></li>'+
					'<li><a onclick="goTo(\'Amos\');" title="Amos">Amos</a></li>'+
				'</ul>'+
				'<ul>'+
					'<li><a onclick="goTo(\'Obadja\');" title="Obadja">Ob</a></li>'+
					'<li><a onclick="goTo(\'Jona\');" title="Jona">Jona</a></li>'+
					'<li><a onclick="goTo(\'Mika\');" title="Mika">Mika</a></li>'+
					'<li><a onclick="goTo(\'Nahum\');" title="Nahum">Nah</a></li>'+
					'<li><a onclick="goTo(\'Habackuk\');" title="Habackuk">Hab</a></li>'+
					'<li><a onclick="goTo(\'Sefanja\');" title="Sefanja">Sef</a></li>'+
					'<li><a onclick="goTo(\'Haggai\');" title="Haggai">Hagg</a></li>'+
					'<li><a onclick="goTo(\'Sakarja\');" title="Sakarja">Sak</a></li>'+
					'<li><a onclick="goTo(\'Malaki\');" title="Malaki">Mal</a></li>'+
				'</ul>'+
			'</div>'+
			'<div class="NT">'+
				'<h3>Nya Testamentet</h3>'+
				'<ul>'+
					'<li><a onclick="goTo(\'Matteusevangeliet\');" title="Matteusevangeliet">Matt</a></li>'+
					'<li><a onclick="goTo(\'Markusevangeliet\');" title="Markusevangeliet">Mark</a></li>'+
					'<li><a onclick="goTo(\'Lukasevangeliet\');" title="Lukasevangeliet">Luk</a></li>'+
					'<li><a onclick="goTo(\'Johannesevangeliet\');" title="Johannesevangeliet">Joh</a></li>'+
					'<li><a onclick="goTo(\'Apostlagärningarna\');" title="Apostlagärningarna">Apg</a></li>'+
					'<li><a onclick="goTo(\'Romarbrevet\');" title="Romarbrevet">Rom</a></li>'+
					'<li><a onclick="goTo(\'Första Korintierbrevet\');" title="Första Korintierbrevet">1 Kor</a></li>'+
				'</ul>'+
				'<ul>'+
					'<li><a onclick="goTo(\'Andra Korintierbrevet\');" title="Andra Korintierbrevet">2 Kor</a></li>'+
					'<li><a onclick="goTo(\'Galaterbrevet\');" title="Galaterbrevet">Gal</a></li>'+
					'<li><a onclick="goTo(\'Efesierbrevet\');" title="Efesierbrevet">Ef</a></li>'+
					'<li><a onclick="goTo(\'Filipperbrevet\');" title="Filipperbrevet">Fil</a></li>'+
					'<li><a onclick="goTo(\'Kolosserbrevet\');" title="Kolosserbrevet">Kol</a></li>'+
					'<li><a onclick="goTo(\'Första Tessalonikerbrevet\');" title="Första Tessalonikerbrevet">1 Tess</a></li>'+
					'<li><a onclick="goTo(\'Andra Tessalonikerbrevet\');" title="Andra Tessalonikerbrevet">2 Tess</a></li>'+
				'</ul>'+
				'<ul>'+
					'<li><a onclick="goTo(\'Första Timoteusbrevet\');" title="Första Timoteusbrevet">1 Tim</a></li>'+
					'<li><a onclick="goTo(\'Andra Timoteusbrevet\');" title="Andra Timoteusbrevet">2 Tim</a></li>'+
					'<li><a onclick="goTo(\'Brevet till Titus\');" title="Brevet till Titus">Tit</a></li>'+
					'<li><a onclick="goTo(\'Brevet till Filemon\');" title="Brevet till Filemom">Filem</a></li>'+
					'<li><a onclick="goTo(\'Hebreerbrevet\');" title="Hebreerbrevet">Hebr</a></li>'+
					'<li><a onclick="goTo(\'Jakobs brev\');" title="Jakobs brev">Jak</a></li>'+
					'<li><a onclick="goTo(\'Första Petrusbrevet\');" title="Första Petrusbrevet">1 Petr</a></li>'+
				'</ul>'+
				'<ul>'+
					'<li><a onclick="goTo(\'Andra Petrusbrevet\');" title="Andra Petrusbrevet">2 Petr</a></li>'+
					'<li><a onclick="goTo(\'Första Johannesbrevet\');" title="Första Johannesbrevet">1 Joh</a></li>'+
					'<li><a onclick="goTo(\'Andra och tredje Johannesbrevet\');" title="Andra Johannesbrevet">2 Joh</a></li>'+
					'<li><a onclick="goTo(\'Andra och tredje Johannesbrevet\');" title="Tredje Johannesbrevet">3 Joh</a></li>'+
					'<li><a onclick="goTo(\'Judas brev\');" title="Judas brev">Jud</a></li>'+
					'<li><a onclick="goTo(\'Uppenbarelseboken\');" title="Uppenbarelseboken">Upp</a></li>'+
				'</ul>'+
			'</div>'+
		'</div>';
	document.getElementById("content").innerHTML = newList;
}

function goTo(id){
	loadVgb(id);
}


/* puts a track in the #playerBox */
function playTrack(track, title){
	resetPlayer();
	if(navigator.connection.type == Connection.NONE){
    showError();
  }
	else{
		document.getElementById("playerBox").innerHTML = '<audio id="player" src="' + track + '" preload="none"></audio>'; // puts the html audio tag into the playerBox
		document.getElementById("programinfo").innerHTML = title;
		initPlay(); // start playback
		showFooter(); // make the player visible
	}
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
		if(mouseX>0){
			moveTo(mouseX);
		}
	});

  footer.addEventListener("touchmove", function(e){
    var mouseX = e.changedTouches[0].clientX-64;
    if(mouseX>0){
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

	document.getElementById("played").innerHTML = ms(player.currentTime);
	document.getElementById("duration").innerHTML = ms(player.duration);

	var progressBar = document.getElementById("progressBar");
	var percent = 100*(player.currentTime / player.duration);
	progressBar.style.width = percent + '%';
}

/* returns minutes and seconds */
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

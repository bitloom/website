const floatkey = document.getElementById("floatkey");

const letterEntries = document.getElementsByClassName("letterspace");

const cursorOffset = 10;

var curLetter = "";

var returnKey = null;
var hoveredLetterspace = null;

var shareString = "";

function buttonClicked(element)
{
    if(element == null || element.innerHTML == "")
    {
        return;
    }

    if (curLetter == "")
    {
        curLetter = element.innerHTML;
        element.innerHTML = "";
        returnKey = element;

        floatkey.style.display = "flex";
        floatkey.innerHTML = curLetter;

        unhoverKey(element);
    }
}

function mouseReleased()
{
    if(curLetter == "")
    {
        return;
    }

    if(hoveredLetterspace != null)
    {
        hoveredLetterspace.innerHTML = curLetter;
        hoveredLetterspace.style.opacity = 1.0;
        unhoverLetterspace(hoveredLetterspace);

        if(checkGameEnd())
        {
            scoreBoard();
        }
    }
    else if (returnKey != null)
    {   
        returnKey.innerHTML = curLetter; 
    }

    floatkey.style.display = "none";
    curLetter = "";
    returnKey = null;
    
}

function placeLetter(element)
{
	element.innerHTML = curLetter;
	element.style.opacity = 1.0;
	unhoverLetterspace(element);
}

function updateFloatKey(event)
{
    floatkey.style.top = `${event.clientY+cursorOffset}px`;
    floatkey.style.left = `${event.clientX+cursorOffset}px`;
}

//https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function mulberry32(a) 
{
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function setup()
{	
    document.addEventListener("mouseup", mouseReleased);
    document.addEventListener("mousemove", updateFloatKey);

	var date = new Date();
	var seed = date.getDate()*1000000 + date.getMonth() * 10000 + date.getFullYear();

	let rando = mulberry32(seed);
	
    const keyboard = document.getElementsByClassName("key");
	
	var randomLetter = Math.floor(rando()*keyboard.length);
	var chosenLetter = "";
    for(let i = 0; i < keyboard.length; i++)
    {
        keyboard[i].addEventListener("mousedown", function(){buttonClicked(keyboard[i])});
        keyboard[i].addEventListener("pointerenter", function(){hoverKey(keyboard[i])});
        keyboard[i].addEventListener("pointerleave", function(){unhoverKey(keyboard[i])});
		
		if(randomLetter == i)
		{
			chosenLetter = keyboard[i].innerHTML;
			
			buttonClicked(keyboard[i]);
		}
    }

	var randomPosition = Math.floor(rando()*letterEntries.length);
    for(let i = 0; i < letterEntries.length; i++)
    {
        letterEntries[i].addEventListener("pointerenter", function(){hoverLetterspace(letterEntries[i])});
        letterEntries[i].addEventListener("pointerleave", function(){unhoverLetterspace(letterEntries[i])});
		
		if(randomPosition == i)
		{
			hoverLetterspace(letterEntries[i]);
			mouseReleased();
		}
    }
	
	/*const scoreSpaces = document.getElementsByClassName("scorespace");
	for(let i = 0; i < scoreSpaces.length; i++)
	{
		scoreSpaces[i].addEventListener("pointerenter", function(){hoverScore(scoreSpaces[i])});
        scoreSpaces[i].addEventListener("pointerleave", function(){unhoverScore(scoreSpaces[i])});
	}*/
}

function hoverKey(element)
{
    if(element.innerHTML != "" && curLetter == "")
    {
        element.style.background = "whitesmoke";
        element.style.color = "var(--purple)";
    }
}

function unhoverKey(element)
{
    element.style.background = "none";
    element.style.color = "whitesmoke";
}

function hoverLetterspace(element)
{
    if(element.innerHTML == "" && curLetter != "")
    {
        element.style.background = "whitesmoke"
        element.style.opacity = "0.5";
        hoveredLetterspace = element;
    }
}

function unhoverLetterspace(element)
{
    if(element.innerHTML == "")
    {
        element.style.background = "none"
        element.style.opacity = "1.0";
    }
    hoveredLetterspace = null;
}

/*function hoverScore(element)
{
    if(element.innerHTML != "0" && element.style.opacity != "0")
    {
        floatkey.style.display = "flex";
		floatkey.innerHTML = 
    }
}

function unhoverScore(element)
{
    if(element.innerHTML == "")
    {
        element.style.background = "none"
        element.style.opacity = "1.0";
    }
    hoveredLetterspace = null;
}*/

function checkGameEnd()
{
    for(let i = 0; i < letterEntries.length; i++)
    {
        if(letterEntries[i].innerHTML == "")
        {
            return false;
        }
    }

    return true;
}

function getWords()
{
    let returnObject = {}

    returnObject.rtl = `${getLetter("tl")}${getLetter("tm")}${getLetter("tr")}`;
    returnObject.rtr = `${getLetter("tr")}${getLetter("tm")}${getLetter("tl")}`;
    returnObject.rml = `${getLetter("ml")}${getLetter("mm")}${getLetter("mr")}`;
    returnObject.rmr =  `${getLetter("mr")}${getLetter("mm")}${getLetter("ml")}`;
    returnObject.rbl = `${getLetter("bl")}${getLetter("bm")}${getLetter("br")}`;
    returnObject.rbr = `${getLetter("br")}${getLetter("bm")}${getLetter("bl")}`;

    returnObject.ctl = `${getLetter("tl")}${getLetter("ml")}${getLetter("bl")}`;
    returnObject.cbl = `${getLetter("bl")}${getLetter("ml")}${getLetter("tl")}`;
    returnObject.ctm = `${getLetter("tm")}${getLetter("mm")}${getLetter("bm")}`;
    returnObject.cbm = `${getLetter("bm")}${getLetter("mm")}${getLetter("tm")}`;
    returnObject.ctr = `${getLetter("tr")}${getLetter("mr")}${getLetter("br")}`;
    returnObject.cbr = `${getLetter("br")}${getLetter("mr")}${getLetter("tr")}`;

    returnObject.dtl = `${getLetter("tl")}${getLetter("mm")}${getLetter("br")}`;
    returnObject.dbr = `${getLetter("br")}${getLetter("mm")}${getLetter("tl")}`;
    returnObject.dtr = `${getLetter("tr")}${getLetter("mm")}${getLetter("bl")}`;
    returnObject.dbl = `${getLetter("bl")}${getLetter("mm")}${getLetter("tr")}`;

    return returnObject;
}

function getLetter(id)
{
    return document.getElementById(id).innerHTML;
}

function getLetterGrid()
{
	return `${getLetter("tl")}|${getLetter("tm")}|${getLetter("tr")}\n${getLetter("ml")}|${getLetter("mm")}|${getLetter("mr")}\n${getLetter("bl")}|${getLetter("bm")}|${getLetter("br")}\n`;
}

function scoreBoard()
{
    var words = getWords();

    var score = 0;

    Object.keys(words).forEach(key => 
        {
            var addScore = checkWord(words[key]);
            var scoreElement = document.getElementById(key);
            scoreElement.innerHTML = addScore;
            scoreElement.style.opacity = 1.0;
			scoreElement.style.fontsize = addScore > 0.0 ? `2em` : `1em`;
            document.getElementById(key).innerHTML 
            score += addScore

        });
    document.getElementById("score").style.display = "flex";
    document.getElementById("scoreText").innerHTML = `Game Over! you scored: ${score}`;

    document.getElementById("keyboard").style.display = "none";
	
	shareString = `I scored ${score} points in Noughts and Crosswords!\n\n${getLetterGrid()}\nwww.bitloomgames.com/ncw`;
}

function checkWord(word)
{
    word = word.toUpperCase();
    var score = 0;
    if(dict.includes(word))
    {
        score += 1;
        if(word.includes("X"))
        {
            score += 1;
        }
    }
	
    return score;
}

function copyShareString()
{
    navigator.clipboard.writeText(shareString);
	
	//show copied message!
	if (animatingNotify == false)
	{
		requestAnimationFrame((t)=>animateNotifyIn(t));
	}
}

//Animation
function easeOutBack(x)
{
	const c1 = 1.70158;
	const c3 = c1 + 1;

	return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeInOutQuad(x) 
{
	return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}


let notifyStart;
let animatingNotify = false;
const notifyDuration = 500.0;
const notifyStay = 500.0;

function animateNotifyIn(timestamp)
{
	if(notifyStart === undefined)
	{
		animatingNotify = true;
		notifyStart = timestamp;
	}
	
	let t = (timestamp-notifyStart)/notifyDuration;
	t = Math.max(0.0, Math.min(t, 1.0));
	
	let et = easeOutBack(t);
	setNotifyPosition(et);
	
	if(t < 1.0)
	{
		requestAnimationFrame((time)=>animateNotifyIn(time));
	}
	else
	{
		notifyStart = undefined;
		setTimeout(()=>{requestAnimationFrame((time)=>animateNotifyOut(time))}, notifyStay);
	}
}

function animateNotifyOut(timestamp)
{
	if(notifyStart === undefined)
	{
		notifyStart = timestamp;
	}
	
	let t = (timestamp-notifyStart)/notifyDuration;
	t = Math.max(0.0, Math.min(t, 1.0));
	
	let et = easeOutBack(1.0-t);
	setNotifyPosition(et);
	
	if(t < 1.0)
	{
		requestAnimationFrame((time)=>animateNotifyOut(time));
	}
	else
	{
		notifyStart = undefined;
		animatingNotify = false;
	}
}

function setNotifyPosition(t)
{
	let element = document.getElementById("notification");
	
	element.style.opacity = `${t}`;
	
	let scoreRect = document.getElementById("score").getBoundingClientRect();
	let notifyRect = element.getBoundingClientRect();
	
	let top = scoreRect.top - (notifyRect.height+10) * t;
	
	let mid = scoreRect.left + (scoreRect.width)*0.5;
	let w = (notifyRect.width)*0.5;
	
	element.style.top = `${top}px`;
	element.style.left = `${mid-w}px`;
}

setup();
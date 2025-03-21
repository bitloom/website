const floatkey = document.getElementById("floatkey");

const letterEntries = document.getElementsByClassName("letterspace");

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
    floatkey.style.top = `${event.clientY}px`;
    floatkey.style.left = `${event.clientX}px`;
}

//https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function mulberry32(a) {
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
	
    const elements = document.getElementsByClassName("key");
	
	var randomLetter = Math.floor(rando()*elements.length);
	var chosenLetter = "";
    for(let i = 0; i < elements.length; i++)
    {
        elements[i].addEventListener("mousedown", function(){buttonClicked(elements[i])});
        elements[i].addEventListener("pointerenter", function(){hoverKey(elements[i])});
        elements[i].addEventListener("pointerleave", function(){unhoverKey(elements[i])});
		
		if(randomLetter == i)
		{
			chosenLetter = elements[i].innerHTML;
			
			buttonClicked(elements[i]);
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
            document.getElementById(key).innerHTML 
            score += addScore

        });
    
    var scoreDisplay = document.getElementById("score");
    scoreDisplay.innerHTML = `Game Over! you scored: ${score}`;
    scoreDisplay.innerHTML += `<br><a onclick="copyShareString()">SHARE!</a>`;
    scoreDisplay.style.display = "flex";

    document.getElementById("keyboard").style.display = "none";
	
	shareString = `I scored ${score} points in Noughts and Crosswords!\n${getLetterGrid()}\nwww.bitloomgames.com/ncw`;
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
    console.log(shareString);
}

setup();
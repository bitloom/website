const floatkey = document.getElementById("floatkey");

const letterEntries = document.getElementsByClassName("letterspace");
const keyboard = document.getElementsByClassName("key");

const cursorOffset = 10;

var curLetter = "";

var returnKey = null;
var hoveredLetterspace = null;

var shareString = "";

var saveKey;

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
    document.addEventListener("pointerup", mouseReleased);
    document.addEventListener("pointermove", updateFloatKey);

	var date = new Date();
	var seed = date.getDate()*1000000 + date.getMonth() * 10000 + date.getFullYear();
	saveKey = seed;
	let progress = localStorage.getItem(saveKey);
	
	if(progress != null && progress == "")
	{
		progress = null;
	}
	
	console.log("Loaded progress: " + progress);
	
	let rando = mulberry32(seed);
	
	var randomLetter = Math.floor(rando()*keyboard.length);
	var chosenLetter = "";
	
    for(let i = 0; i < keyboard.length; i++)
    {
        keyboard[i].addEventListener("pointerdown", buttonClicked);
        keyboard[i].addEventListener("mouseenter", keyOver);
        keyboard[i].addEventListener("mouseleave", keyOut);
		
		if(progress != null)
		{
			if(progress.includes(keyboard[i].innerHTML))
			{
				keyboard[i].innerHTML = "";
			}
		}
		else if(randomLetter == i)
		{
			chosenLetter = keyboard[i].innerHTML;
			
			buttonClicked(keyboard[i]);
		}
    }

	var randomPosition = Math.floor(rando()*letterEntries.length);
    for(let i = 0; i < letterEntries.length; i++)
    {
        letterEntries[i].addEventListener("mouseenter", function(){hoverLetterspace(letterEntries[i])});
        letterEntries[i].addEventListener("mouseleave", function(){unhoverLetterspace(letterEntries[i])});
		letterEntries[i].addEventListener("pointerdown", touchLetterspace);
		
		if(progress != null)
		{
			let progressIndex = getLetterSpaceIndex(letterEntries[i].id);
			if(progressIndex >= 0 && progressIndex < progress.length)
			{
				if(progress[progressIndex] != "_")
				{
					curLetter = progress[progressIndex];
					hoverLetterspace(letterEntries[i]);
					mouseReleased();
					
					animateLetter(letterEntries[i], 0);
				}
			}
		}
		else if(randomPosition == i)
		{
			hoverLetterspace(letterEntries[i]);
			mouseReleased();
			
			animateLetter(letterEntries[i], 0);
		}
    }
}

function buttonClicked(event)
{
	let element = event.target;
    if(element == null || element.innerHTML == "")
    {
        return;
    }
	

	if(event.pointerType == "mouse")
	{
		handleButtonClicked(element);
	}
	else
	{
		handleButtonTouched(element);
	}
}

function handleButtonClicked(button)
{
	if (curLetter == "")
    {
        curLetter = button.innerHTML;
		returnKey = button;
	
		button.innerHTML = "";

		floatkey.style.display = "flex";
		floatkey.innerHTML = curLetter;

		unhoverKey(button);
    }
}

function handleButtonTouched(button)
{
	let unhighlight = button == returnKey;
	if(curLetter != "")
	{		
		unhoverKey(returnKey);
		curLetter = "";
		returnKey = null;	
	}
	
	if(unhighlight == false)
	{
		curLetter = button.innerHTML;
		returnKey = button;
		hoverKey(button);
	}
}

function mouseReleased(event)
{
    if(curLetter == "")
    {
        return;
    }
	
	if(event && event.pointerType == "touch")
	{
		return;
	}

    if(hoveredLetterspace != null)
    {
        hoveredLetterspace.innerHTML = curLetter;
        hoveredLetterspace.style.opacity = 1.0;
        unhoverLetterspace(hoveredLetterspace);
		
		localStorage.setItem(saveKey, getLetterGrid(false));
		
        if(animators <= 0)
		{
			checkScore();
		}
		
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

function keyOver(event)
{
	let element = event.target;
	if(element.innerHTML != "" && curLetter == "")
    {
		hoverKey(element);
	}
}

function keyOut(event)
{
	unhoverKey(event.target);
}

function hoverKey(element)
{
	element.style.background = "whitesmoke";
	element.style.color = "var(--purple)";
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

function touchLetterspace(event)
{
	if(event.pointerType == "mouse")
	{
		return;
	}
	
	
	if(curLetter != "" )
	{
		hoverLetterspace(event.target);
		
		if(hoveredLetterspace != null && returnKey != null)
		{
			returnKey.innerHTML = "";
			unhoverKey(returnKey);
		}
		
		mouseReleased(null);
	}
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
    returnObject.rmr = `${getLetter("mr")}${getLetter("mm")}${getLetter("ml")}`;
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

function getWordIds(key)
{
    switch(key)
	{
		case "rtl": return ["tl","tm", "tr"];
		case "rtr": return ["tr","tm", "tl"];
		case "rml": return ["ml","mm", "mr"];
		case "rmr": return ["mr","mm", "ml"];
		case "rbl": return ["bl","bm", "br"];
		case "rbr": return ["br","bm", "bl"];

		case "ctl": return ["tl", "ml", "bl"];
		case "cbl": return ["bl", "ml", "tl"];
		case "ctm": return ["tm", "mm", "bm"];
		case "cbm": return ["bm", "mm", "tm"];
		case "ctr": return ["tr", "mr", "br"];
		case "cbr": return ["br", "mr", "tr"];

		case "dtl": return ["tl", "mm", "br"];
		case "dbr": return ["br", "mm", "tl"];
		case "dtr": return ["tr", "mm", "bl"];
		case "dbl": return ["bl", "mm", "tr"];
	}
}

function getLetterSpaceIndex(id)
{
	switch(id)
	{
		case "tl": return 0;
		case "tm": return 1;
		case "tr": return 2;
		case "ml": return 3;
		case "mm": return 4;
		case "mr": return 5;
		case "bl": return 6;
		case "bm": return 7;
		case "br": return 8;
	}
	
	return -1;
}

function getLetter(id)
{
    return document.getElementById(id).innerHTML;
}

function getSaveLetter(id)
{
	let letter = document.getElementById(id).innerHTML;
	if(letter == "")
	{
		letter = "_";
	}
	return letter;
}

function getShareLetter(id)
{
	let letter = getLetter(id);
	let diff = letter.charCodeAt(0) - "A".charCodeAt(0);
	
	return String.fromCodePoint(0xFF21 + diff);
}

function getElement(id)
{
	return document.getElementById(id);
}

function getLetterGrid(forShare)
{
	if(forShare)
	{
		return `${getShareLetter("tl")}|${getShareLetter("tm")}|${getShareLetter("tr")}\n${getShareLetter("ml")}|${getShareLetter("mm")}|${getShareLetter("mr")}\n${getShareLetter("bl")}|${getShareLetter("bm")}|${getShareLetter("br")}\n`;
	}
	
	return `${getSaveLetter("tl")}${getSaveLetter("tm")}${getSaveLetter("tr")}${getSaveLetter("ml")}${getSaveLetter("mm")}${getSaveLetter("mr")}${getSaveLetter("bl")}${getSaveLetter("bm")}${getSaveLetter("br")}`;
}

function checkScore()
{
	var words = getWords();
	
	let delay = 0;
	const keys = Object.keys(words);
	for(let i = 0; i < keys.length; i++)
	{
		let key = keys[i];
		if(words[key].length < 3)
		{
			continue;
		}
		
		let scoreElement = document.getElementById(key);
		
		//only check scores that havent been set
		if (scoreElement.innerHTML == "")
		{
			var addScore = checkWord(words[key]);
			scoreElement.innerHTML = addScore > 0 ? addScore : "X";
			
			scoreElement.classList.add(addScore > 0 ? "scoreGood" : "scoreBad");
			scoreElement.style.animationDelay = `${delay*letterPopDelay}s`
			
			if(addScore <= 0)
			{
				scoreElement.addEventListener("animationend", scoreAnimationFinished);
			}
			
			delay++;
			
			if(addScore > 0)
			{
				animateWord(getWordIds(key));
				break;
			}
		}
	}
}

function scoreBoard()
{
    var words = getWords();

    var score = 0;

    Object.keys(words).forEach(key => 
        {
            var addScore = checkWord(words[key]);
			
			score += addScore
			
        });
    document.getElementById("score").style.display = "flex";
    document.getElementById("scoreText").innerHTML = `Game Over! <br> You scored: ${score}`;

    document.getElementById("keyboard").style.display = "none";
	
	shareString = `I scored ${score} points in Noughts and Crosswords!\n\n${getLetterGrid(true)}\nhttps://www.bitloomgames.com/ncw`;
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

const letterPopTime = 0.5;
const letterPopDelay = 0.25;

let animators = 0

function animateLetter(element, delay)
{
	if(animators < 0)
	{
		animators = 0;
	}
	animators++;
	element.style.animation = `${letterPopTime}s ease-in-out ${delay}s letterPop`;
	element.addEventListener("animationend", letterAnimationFinished);
}

function letterAnimationFinished(event)
{
	animators--;
	this.style.animation = "";
	
	if(animators <= 0)
	{
		setTimeout(checkScore);
	}
}

function animateWord(letterIds)
{
	for(let i=0; i < letterIds.length; i++)
	{
		animateLetter(document.getElementById(letterIds[i]), letterPopDelay*i);
	}
}

function scoreAnimationFinished(event)
{
	if(this.innerHTML == "X")
	{
		this.innerHTML = "0";
	}
}

setup();
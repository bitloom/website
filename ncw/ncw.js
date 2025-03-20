const floatkey = document.getElementById("floatkey");

const letterEntries = document.getElementsByClassName("letterspace");

var curLetter = "";

var returnKey = null;
var hoveredLetterspace = null;

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
            console.log(getWords());
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

function updateFloatKey(event)
{
    floatkey.style.top = `${event.clientY}px`;
    floatkey.style.left = `${event.clientX}px`;
}

function setup()
{
    document.addEventListener("mouseup", mouseReleased);
    document.addEventListener("mousemove", updateFloatKey);

    const elements = document.getElementsByClassName("key");
    for(let i = 0; i < elements.length; i++)
    {
        //console.log("element setting up... " + elements[i].innerHTML);
        elements[i].addEventListener("mousedown", function(){buttonClicked(elements[i])});
        elements[i].addEventListener("pointerenter", function(){hoverKey(elements[i])});
        elements[i].addEventListener("pointerleave", function(){unhoverKey(elements[i])});
    }

    for(let i = 0; i < letterEntries.length; i++)
    {
        letterEntries[i].addEventListener("pointerenter", function(){hoverLetterspace(letterEntries[i])});
        letterEntries[i].addEventListener("pointerleave", function(){unhoverLetterspace(letterEntries[i])});
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

    returnObject.topLeft = `${getLetter("tl")}${getLetter("tm")}${getLetter("tr")}`;
    returnObject.topRight = `${getLetter("tr")}${getLetter("tm")}${getLetter("tl")}`;
    returnObject.midLeft = `${getLetter("ml")}${getLetter("mm")}${getLetter("mr")}`;
    returnObject.midRight =  `${getLetter("mr")}${getLetter("mm")}${getLetter("ml")}`;
    returnObject.bottomLeft = `${getLetter("bl")}${getLetter("bm")}${getLetter("br")}`;
    returnObject.bottomRight = `${getLetter("br")}${getLetter("bm")}${getLetter("bl")}`;

    returnObject.leftDown = `${getLetter("tl")}${getLetter("ml")}${getLetter("bl")}`;
    returnObject.leftUp = `${getLetter("bl")}${getLetter("ml")}${getLetter("tl")}`;
    returnObject.midDown = `${getLetter("tm")}${getLetter("mm")}${getLetter("bm")}`;
    returnObject.midUp = `${getLetter("bm")}${getLetter("mm")}${getLetter("tm")}`;
    returnObject.rightDown = `${getLetter("tr")}${getLetter("mr")}${getLetter("br")}`;
    returnObject.rightUp = `${getLetter("br")}${getLetter("mr")}${getLetter("tr")}`;

    returnObject.diagTL = `${getLetter("tl")}${getLetter("mm")}${getLetter("br")}`;
    returnObject.diagBR = `${getLetter("br")}${getLetter("mm")}${getLetter("tl")}`;
    returnObject.diagTR = `${getLetter("tr")}${getLetter("mm")}${getLetter("bl")}`;
    returnObject.diagBL = `${getLetter("bl")}${getLetter("mm")}${getLetter("tr")}`;


    return returnObject;
}

function getLetter(id)
{
    return document.getElementById(id).innerHTML;
}


setup();
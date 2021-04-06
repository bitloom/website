var captionId = 0;
var fullscreenImage = null;

var hiddenContainer = document.getElementById('hiddenContent');
var displayContainer = document.getElementById('displayContent');
var taglineContainer = document.getElementById('tagline');
var navigationContainer = document.getElementById('navigation');

var captions = [
  "creating cyber surprises",
  "collaborating on cool content",
  "interactive goop",
  "that tickles",
  "stop it",
  "I said stop.",
  "I will just leave if you keep doing that.",
  "Please, I am asking nicely.",
  "Okay have it your way.",
  "Goodbye.",
  "" ]

function setCaption()
{
  console.log("setting caption");
  document.getElementById("caption").innerHTML = captions[Math.min(captionId, captions.length - 1)];
  captionId += 1;
}

function swapContent(contentId, clickedButton)
{
  for(var i = 0; i < navigationContainer.children.length; i++)
  {
    if(navigationContainer.children[i] == clickedButton)
    {
      navigationContainer.children[i].className = "selected";
    }
    else
    {
      navigationContainer.children[i].className = "";
    }
  }

  while(displayContainer.childNodes.length > 0)
  {
    hiddenContainer.appendChild(displayContainer.childNodes[0]);
  }

  displayContainer.appendChild(document.getElementById(contentId));
}
